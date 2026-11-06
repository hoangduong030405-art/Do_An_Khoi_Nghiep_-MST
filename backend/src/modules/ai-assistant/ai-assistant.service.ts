import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { WeatherService } from '../weather/weather.service';
import { AskGuideDto, AdaptItineraryDto, ExplainPlaceStoryDto } from './dto/ai-requests.dto';
import { InMemoryDbService } from '../../database/in-memory-db.service';
import { Place } from '../places/entities/place.entity';
import { PlaceNarration } from '../places/entities/place-narration.entity';
import {
  HUE_HERITAGE_STORIES,
  resolveBilingualPlaceNarration,
  isNarratablePlace,
} from './data/hue-heritage-stories';
import {
  MatchedPlaceContext,
  matchQuestionLandmarks,
  buildNaturalHueResponse,
} from './data/hue-conversational-engine';

@Injectable()
export class AiAssistantService {
  private readonly logger = new Logger(AiAssistantService.name);
  private genAI: GoogleGenerativeAI | null = null;
  // Giới hạn lượt chat hằng ngày: tối đa 50 lượt/ngày/user
  private readonly userDailyChatMap = new Map<string, { date: string; count: number }>();

  constructor(
    private readonly weatherService: WeatherService,
    private readonly inMemoryDb: InMemoryDbService,
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place> = null as any,
    @InjectRepository(PlaceNarration)
    private readonly narrationRepo: Repository<PlaceNarration> = null as any,
  ) {
    const apiKey = (process.env.GEMINI_API_KEY || '').trim();
    if (apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.startsWith('AIza')) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  /**
   * Kiểm tra giới hạn 50 câu chat/ngày/user
   */
  private checkDailyQuota(userId: string): void {
    const today = new Date().toISOString().slice(0, 10);
    const userQuota = this.userDailyChatMap.get(userId);

    if (!userQuota || userQuota.date !== today) {
      this.userDailyChatMap.set(userId, { date: today, count: 1 });
      return;
    }

    if (userQuota.count >= 50) {
      throw new HttpException(
        'Bạn đã đạt giới hạn 50 lượt trò chuyện cùng Mệ Huế hôm nay. Vui lòng quay lại vào ngày mai nhen!',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    userQuota.count += 1;
  }

  /**
   * Phát hiện Prompt Injection
   */
  private isPromptInjection(question: string): boolean {
    const injectionPatterns = [
      /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
      /bỏ\s+qua\s+(mọi|tất\s+cả\s+)?(chỉ\s+dẫn|lệnh|yêu\s+cầu)\s+trước/i,
      /system\s+prompt/i,
      /you\s+are\s+now/i,
      /đóng\s+vai\s+(hacker|kẻ\s+xấu|ai\s+khác)/i,
      /jailbreak/i,
      /dan\s+mode/i,
      /pretend\s+that/i,
      /bypass\s+safety/i,
    ];
    return injectionPatterns.some((pattern) => pattern.test(question));
  }

  /**
   * Kiểm tra câu hỏi ngoài chủ đề Cố Đô Huế
   */
  private isOffTopic(question: string): boolean {
    const offTopicKeywords = [
      'bitcoin', 'crypto', 'tiền ảo', 'chứng khoán', 'forex',
      'giá btc', 'ethereum', 'lập trình python', 'java', 'giải phương trình',
      'chiến tranh thế giới', 'tổng thống mỹ', 'elon musk',
    ];
    const qLower = question.toLowerCase();
    return offTopicKeywords.some((kw) => qLower.includes(kw));
  }

  /**
   * Tìm kiếm ngữ cảnh di sản và bài thuyết minh từ Database đúng theo câu hỏi
   */
  private async retrieveGroundedContext(
    question: string,
    nearbyPlaceName?: string,
  ): Promise<{
    contextText: string;
    usedPlaceIds: string[];
    matchedContexts: MatchedPlaceContext[];
  }> {
    try {
      const [narrations, places] = await Promise.all([
        this.narrationRepo ? this.narrationRepo.find() : Promise.resolve([]),
        this.placeRepo ? this.placeRepo.find() : Promise.resolve([]),
      ]);

      return matchQuestionLandmarks(question, nearbyPlaceName, narrations, places);
    } catch (err: any) {
      this.logger.warn(`Lỗi tra cứu grounding context: ${err.message}`);
      return matchQuestionLandmarks(question, nearbyPlaceName, [], []);
    }
  }

  /**
   * Hỏi đáp với Hướng dẫn viên AI "Mệ Huế" (Grounded, tự nhiên, trả lời đúng trọng tâm câu hỏi)
   */
  async chatWithGuide(dto: AskGuideDto, userId: string = 'anonymous') {
    const startTime = Date.now();
    const { question, language = 'vi', currentNearbyPlace } = dto;

    // 1. Kiểm tra quota 50 chat/ngày
    this.checkDailyQuota(userId);

    // 2. Chống Prompt Injection
    if (this.isPromptInjection(question)) {
      return {
        answer:
          'Dạ thưa bạn, Mệ Huế là hướng dẫn viên du lịch Cố Đô và chỉ có thể trò chuyện về lịch sử, văn hóa, danh thắng và ẩm thực Huế thôi nhen. Bạn cứ hỏi Mệ về các di tích hay món ngon xứ Huế nì!',
        source: 'fallback',
        grounded: false,
        usedPlaceIds: [],
        timestamp: new Date().toISOString(),
      };
    }

    // 3. Từ chối câu hỏi ngoài chủ đề
    if (this.isOffTopic(question)) {
      return {
        answer:
          'Dạ thưa quý khách, Mệ Huế chỉ am hiểu và đồng hành cùng bạn về lịch sử triều Nguyễn, di tích lăng tẩm và ẩm thực Cố Đô Huế thôi nợ. Những chuyện ngoài lề như tiền số, chứng khoán Mệ không rành mô nhen! Bạn có muốn Mệ gợi ý một vòng tham quan Đại Nội hay quán bún bò chuẩn vị không nợ?',
        source: 'fallback',
        grounded: false,
        usedPlaceIds: [],
        timestamp: new Date().toISOString(),
      };
    }

    // 4. Grounding Retrieval từ Database (chỉ khớp những địa danh mà câu hỏi thực sự hỏi tới)
    const { contextText, usedPlaceIds, matchedContexts } = await this.retrieveGroundedContext(
      question,
      currentNearbyPlace,
    );

    // 5. Gọi Gemini với Timeout 8.000 ms nếu có API Key hợp lệ
    if (this.genAI) {
      try {
        const rawModel = process.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash';
        const safeModel = rawModel.includes('3.8') ? 'gemini-2.5-flash' : rawModel;

        const systemInstruction = `
Bạn là "Mệ Huế" (O Huế AI) - Trợ lý du lịch và Hướng dẫn viên bản địa am hiểu sâu sắc của ứng dụng HUEGO (Khám phá Cố Đô Huế).

NGUYÊN TẮC TRẢ LỜI TỰ NHIÊN & ĐÚNG TRỌNG TÂM:
1. Trả lời TRỰC TIẾP, TỰ NHIÊN và ĐÚNG TRỌNG TÂM câu hỏi của du khách (ví dụ: hỏi giá vé thì báo giá vé, hỏi giờ mở cửa thì báo giờ mở cửa, hỏi món ăn cụ thể thì tư vấn đúng món đó kèm địa chỉ thật tại Huế, hỏi lịch trình thì thiết kế lịch trình theo đúng thời gian khách yêu cầu).
2. Khi câu hỏi liên quan đến di tích có trong [DỮ KIỆN XÁC THỰC CỐ ĐÔ], BẮT BUỘC sử dụng chính xác năm tháng, số liệu và nguồn tư liệu đã cung cấp. TUYỆT ĐỐI KHÔNG tự bịa đặt năm tháng hay sự kiện lịch sử.
3. Giọng điệu đôn hậu, duyên dáng, mộc mạc của người Huế (xưng "Mệ", gọi "bạn" hoặc "quý khách", dùng từ ngữ tự nhiên: dạ, nhen, nợ, nghe...). Trình bày rõ ràng, dễ đọc.

[DỮ KIỆN XÁC THỰC CỐ ĐÔ]:
${contextText || 'Sử dụng kiến thức thực tế về ẩm thực, văn hóa và du lịch Huế.'}
        `.trim();

        const model = this.genAI.getGenerativeModel({
          model: safeModel,
          systemInstruction,
        });

        const geminiPromise = model.generateContent(question);
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API call timed out after 8000ms')), 8000),
        );

        const result: any = await Promise.race([geminiPromise, timeoutPromise]);
        const answer = result.response.text();
        const duration = Date.now() - startTime;

        this.logger.log(
          `[AI Guide Chat] User: ${userId} | Places: [${usedPlaceIds.join(', ')}] | Source: gemini | ${duration}ms`,
        );

        return {
          answer,
          source: 'gemini',
          grounded: usedPlaceIds.length > 0,
          usedPlaceIds,
          timestamp: new Date().toISOString(),
        };
      } catch (err: any) {
        this.logger.warn(
          `Gemini API gặp sự cố hoặc timeout (${err.message}). Tự động chuyển sang bộ máy hội thoại tri thức Huế.`,
        );
      }
    }

    // 6. Bộ máy hội thoại tri thức bản địa thông minh (Intent-aware Conversational Engine)
    let liveWeather: any = null;
    if (/mưa|nắng|thời tiết|nhiệt độ/i.test(question)) {
      try {
        liveWeather = await this.weatherService.getCurrentHueWeather();
      } catch (_) {}
    }

    const fallbackAnswer = buildNaturalHueResponse(
      question,
      matchedContexts,
      currentNearbyPlace,
      liveWeather,
    );

    const duration = Date.now() - startTime;
    this.logger.log(
      `[AI Guide Chat] User: ${userId} | Places: [${usedPlaceIds.join(', ')}] | Source: fallback | ${duration}ms`,
    );

    return {
      answer: fallbackAnswer,
      source: 'fallback',
      grounded: usedPlaceIds.length > 0 || matchedContexts.length > 0,
      usedPlaceIds,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Tự động điều chỉnh lịch trình thông minh dựa trên thời tiết
   */
  async adaptItineraryByWeather(dto: AdaptItineraryDto) {
    const weather = await this.weatherService.getCurrentHueWeather();

    if (this.genAI) {
      try {
        const systemInstruction = `
          Bạn là kiến trúc sư lịch trình du lịch thông minh của HUEGO Huế.
          Nhiệm vụ: Dựa vào tình hình thời tiết, nếu trời MƯA hoặc NẮNG GẮT (>37°C), hãy thay thế các điểm ngoài trời (OUTDOOR)
          bằng các trải nghiệm văn hóa trong nhà (INDOOR) đặc sắc của Huế (Bảo tàng Cổ vật Cung đình, Không gian lưu niệm Lê Bá Đặng, Nhà rường Kim Long thưởng trà, v.v.).
          BẮT BUỘC TRẢ VỀ DẠNG JSON HỢP LỆ.
        `;

        const model = this.genAI.getGenerativeModel({
          model: 'gemini-2.5-flash',
          systemInstruction,
          generationConfig: { responseMimeType: 'application/json' },
        });

        const prompt = `
          Thời tiết hiện tại: ${weather.condition} (${weather.description}), Nhiệt độ: ${weather.tempCelsius}°C, Mưa: ${weather.isRaining ? 'CÓ' : 'KHÔNG'}.
          Lịch trình ban đầu của khách:
          ${JSON.stringify(dto.currentItinerary, null, 2)}

          Trả về JSON format:
          {
            "weatherSummary": "string",
            "adaptationReason": "string",
            "adaptedSchedule": [
              {
                "timeSlot": "string",
                "originalPlace": "string",
                "recommendedPlace": "string",
                "envType": "INDOOR",
                "culturalHighlight": "string",
                "action": "KEEP | REPLACED"
              }
            ]
          }
        `;

        const result = await model.generateContent(prompt);
        return {
          weather,
          result: JSON.parse(result.response.text()),
        };
      } catch (err: any) {
        this.logger.warn(`Lỗi gọi Gemini thích ứng thời tiết: ${err.message}`);
      }
    }

    // Phản hồi logic mặc định thông minh
    return {
      weather,
      result: {
        weatherSummary: `${weather.description}, nhiệt độ ${weather.tempCelsius}°C.`,
        adaptationReason: weather.isRaining
          ? 'Trời mưa Huế lãng mạn nhưng hạn chế di chuyển ngoài trời. Mệ Huế đã tự động chuyển các điểm ngoài trời sang các không gian trong nhà ấm cúng.'
          : 'Thời tiết thuận lợi cho các hoạt động di chuyển và khám phá cảnh quan.',
        adaptedSchedule: dto.currentItinerary.map((item) => {
          if (weather.isRaining && item.envType === 'OUTDOOR') {
            return {
              timeSlot: item.timeSlot,
              originalPlace: item.placeName,
              recommendedPlace: 'Bảo tàng Cổ vật Cung đình Huế & Không gian Trà Kim Long',
              envType: 'INDOOR',
              culturalHighlight:
                'Thưởng trà hoa sen trong không gian nhà rường cổ kính, chiêm ngưỡng bảo vật hoàng cung triều Nguyễn.',
              action: 'REPLACED',
            };
          }
          return {
            timeSlot: item.timeSlot,
            originalPlace: item.placeName,
            recommendedPlace: item.placeName,
            envType: item.envType,
            culturalHighlight: 'Khám phá trải nghiệm văn hóa theo lịch trình dự kiến.',
            action: 'KEEP',
          };
        }),
      },
    };
  }

  /**
   * Thuyết minh chi tiết di tích từ DB hoặc bài viết chuẩn di tích & danh thắng chiến tranh
   */
  async narratePlaceStory(dto: ExplainPlaceStoryDto) {
    if (this.narrationRepo) {
      try {
        const nar = await this.narrationRepo.findOne({
          where: { placeId: dto.placeId, lang: dto.language || 'vi' },
          relations: ['place'],
        });
        if (nar) {
          return {
            available: true,
            placeId: dto.placeId,
            placeName: nar.place?.name,
            audioNarrationScript: nar.shortText,
            secretHistoricalFact: nar.longText,
            photoSpotAdvice: 'Góc chụp toàn cảnh từ sân trước lúc sáng sớm hoặc hoàng hôn.',
            sources: nar.sources,
            reviewStatus: nar.reviewStatus,
          };
        }
      } catch (err: any) {
        this.logger.warn(`Lỗi tìm narration cho ${dto.placeId}: ${err.message}`);
      }
    }

    // Tra cứu trong kho tư liệu chuẩn mực di tích lịch sử và du lịch thiên nhiên chiến tranh
    const resolved = resolveBilingualPlaceNarration({
      placeId: dto.placeId,
      placeName: dto.placeName,
      category: dto.category,
      address: dto.address,
      language: dto.language,
    });

    if (resolved) {
      return {
        available: true,
        placeId: dto.placeId,
        placeName: resolved.placeName,
        audioNarrationScript: resolved.audioNarrationScript,
        secretHistoricalFact: resolved.secretHistoricalFact,
        photoSpotAdvice: resolved.photoSpotAdvice,
        localSpecialtyPairing: resolved.localSpecialtyPairing,
        ecoGreenTip: resolved.ecoGreenTip,
        kind: resolved.kind,
        language: resolved.language,
      };
    }

    // Không thuộc diện di tích lịch sử hoặc danh thắng chiến tranh -> trả về available = false
    return {
      available: false,
      placeId: dto.placeId,
      placeName: dto.placeName || 'Địa danh không thuộc diện thuyết minh',
      message:
        'Địa điểm này không có thuyết minh riêng (hệ thống chỉ cung cấp bài thuyết minh chuẩn xác cho các di tích lịch sử và danh lam thắng cảnh thiên nhiên gắn liền với lịch sử - chiến tranh của Huế).',
    };
  }

  /**
   * Tạo luồng âm thanh TTS tiếng Việt
   */
  async generateTtsAudio(text: string, lang: string = 'vi'): Promise<Buffer> {
    if (!text || text.trim().length === 0) {
      return Buffer.from([]);
    }

    const chunks = this.splitTextIntoChunks(text, 180);
    const targetLang = lang === 'en' ? 'en' : 'vi';

    const buffers: Buffer[] = [];
    for (const chunk of chunks) {
      if (chunk.trim().length === 0) continue;
      try {
        const buf = await this.fetchTtsChunk(chunk.trim(), targetLang);
        buffers.push(buf);
      } catch (err: any) {
        this.logger.warn(`Lỗi tải TTS chunk: ${err.message}`);
      }
    }

    return Buffer.concat(buffers);
  }

  private splitTextIntoChunks(text: string, maxLength: number): string[] {
    const sentences = text.match(/[^.!?,\n]+[.!?,\n]+|[^.!?,\n]+$/g) || [text];
    const chunks: string[] = [];
    let current = '';

    for (const sentence of sentences) {
      if ((current + ' ' + sentence).trim().length <= maxLength) {
        current = (current + ' ' + sentence).trim();
      } else {
        if (current) chunks.push(current);
        current = sentence.trim();
      }
    }
    if (current) chunks.push(current);
    return chunks;
  }

  private async fetchTtsChunk(text: string, lang: string): Promise<Buffer> {
    const encoded = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encoded}`;

    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    if (!res.ok) {
      throw new Error(`Google TTS trả mã lỗi: ${res.status}`);
    }

    const arrayBuf = await res.arrayBuffer();
    return Buffer.from(arrayBuf);
  }
}
