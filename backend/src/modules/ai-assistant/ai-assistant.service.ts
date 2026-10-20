import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { WeatherService } from '../weather/weather.service';
import { AskGuideDto, AdaptItineraryDto, ExplainPlaceStoryDto } from './dto/ai-requests.dto';
import { InMemoryDbService } from '../../database/in-memory-db.service';
import { Place } from '../places/entities/place.entity';
import { PlaceNarration } from '../places/entities/place-narration.entity';
import { HUE_HERITAGE_STORIES } from './data/hue-heritage-stories';

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
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
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
      'chiến tranh thế giới', 'tổng thống mỹ', 'elon musk'
    ];
    const qLower = question.toLowerCase();
    return offTopicKeywords.some((kw) => qLower.includes(kw));
  }

  /**
   * Tìm kiếm ngữ cảnh di sản và bài thuyết minh từ Database
   */
  private async retrieveGroundedContext(question: string, nearbyPlaceName?: string): Promise<{
    contextText: string;
    usedPlaceIds: string[];
    matchedNarrations: Array<PlaceNarration & { placeName: string }>;
  }> {
    const qLower = question.toLowerCase();
    const usedPlaceIds: string[] = [];
    const matchedNarrations: Array<PlaceNarration & { placeName: string }> = [];
    const contextParts: string[] = [];

    try {
      this.logger.log(`[Grounding Debug] repos: placeRepo=${!!this.placeRepo}, narrationRepo=${!!this.narrationRepo}`);
      const [narrations, places] = await Promise.all([
        this.narrationRepo.find(),
        this.placeRepo.find(),
      ]);
      this.logger.log(`[Grounding Debug] loaded: narrations=${narrations.length}, places=${places.length}`);

      const placeMap = new Map<string, Place>();
      for (const p of places) {
        placeMap.set(p.id, p);
      }

      for (const nar of narrations) {
        const place = placeMap.get(nar.placeId);
        const placeName = (place?.name || '').toLowerCase();
        const placeId = nar.placeId.toLowerCase();

        let matched = false;
        if ((qLower.includes('đại nội') || qLower.includes('hoàng thành')) && (placeName.includes('đại nội') || placeId.includes('8f8b0596'))) matched = true;
        else if ((qLower.includes('thái hòa') || qLower.includes('điện thái hòa')) && placeName.includes('thái hòa')) matched = true;
        else if (qLower.includes('ngọ môn') && placeName.includes('ngọ môn')) matched = true;
        else if (qLower.includes('thiên mụ') && placeName.includes('thiên mụ')) matched = true;
        else if (qLower.includes('tự đức') && placeName.includes('tự đức')) matched = true;
        else if (qLower.includes('khải định') && placeName.includes('khải định')) matched = true;
        else if (qLower.includes('minh mạng') && placeName.includes('minh mạng')) matched = true;
        else if (qLower.includes('gia long') && placeName.includes('gia long')) matched = true;
        else if (qLower.includes('đồng khánh') && placeName.includes('đồng khánh')) matched = true;
        else if ((qLower.includes('tràng tiền') || qLower.includes('trường tiền')) && placeName.includes('tràng tiền')) matched = true;
        else if ((qLower.includes('cồn hến') || qLower.includes('cơm hến')) && (placeName.includes('cồn hến') || placeName.includes('hến'))) matched = true;
        else if (qLower.includes('tịnh tâm') && placeName.includes('tịnh tâm')) matched = true;
        else if (qLower.includes('đông ba') && placeName.includes('đông ba')) matched = true;
        else if ((qLower.includes('cổ vật') || qLower.includes('long an')) && placeName.includes('cổ vật')) matched = true;
        else if (nearbyPlaceName && placeName.includes(nearbyPlaceName.toLowerCase())) matched = true;

        if (matched) {
          usedPlaceIds.push(nar.placeId);
          matchedNarrations.push({ ...nar, placeName: place?.name || 'Di tích Huế' });
          contextParts.push(
            `[Địa danh: ${place?.name || nar.placeId}]\n` +
            `- Địa chỉ: ${place?.address || 'Huế'}\n` +
            `- Thuyết minh chính thức: ${nar.shortText}\n` +
            `- Lược sử chi tiết: ${nar.longText}\n` +
            `- Nguồn tài liệu xác thực: ${nar.sources}\n` +
            `- Giá vé: ${place?.ticketPriceVnd ? place.ticketPriceVnd.toLocaleString('vi-VN') + ' VNĐ' : 'Miễn phí hoặc theo quy định BQL'}`
          );
        }
      }
    } catch (err: any) {
      this.logger.warn(`Lỗi tra cứu grounding context: ${err.message}`);
    }

    return {
      contextText: contextParts.join('\n\n'),
      usedPlaceIds,
      matchedNarrations,
    };
  }

  /**
   * Hỏi đáp với Hướng dẫn viên AI "Mệ Huế" (Grounded, có kiểm soát)
   */
  async chatWithGuide(dto: AskGuideDto, userId: string = 'anonymous') {
    const startTime = Date.now();
    const { question, language = 'vi', currentNearbyPlace } = dto;

    // 1. Kiểm tra quota 50 chat/ngày
    this.checkDailyQuota(userId);

    // 2. Chống Prompt Injection
    if (this.isPromptInjection(question)) {
      return {
        answer: 'Dạ thưa bạn, Mệ Huế là hướng dẫn viên du lịch Cố Đô và chỉ có thể trò chuyện về lịch sử, văn hóa, danh thắng và ẩm thực Huế thôi nhen. Bạn cứ hỏi Mệ về các di tích hay món ngon xứ Huế nì!',
        source: 'fallback',
        grounded: false,
        usedPlaceIds: [],
        timestamp: new Date().toISOString(),
      };
    }

    // 3. Từ chối câu hỏi ngoài chủ đề
    if (this.isOffTopic(question)) {
      return {
        answer: 'Dạ thưa quý khách, Mệ Huế chỉ am hiểu và đồng hành cùng bạn về lịch sử triều Nguyễn, di tích lăng tẩm và ẩm thực Cố Đô Huế thôi nợ. Những chuyện ngoài lề như tiền số, chứng khoán Mệ không rành mô nhen! Bạn có muốn Mệ gợi ý một vòng tham quan Đại Nội hay quán bún bò chuẩn vị không nợ?',
        source: 'fallback',
        grounded: false,
        usedPlaceIds: [],
        timestamp: new Date().toISOString(),
      };
    }

    // 4. Grounding Retrieval từ Database
    const { contextText, usedPlaceIds, matchedNarrations } = await this.retrieveGroundedContext(
      question,
      currentNearbyPlace,
    );

    // 5. Gọi Gemini với Timeout 8.000 ms nếu có API Key
    if (this.genAI) {
      try {
        const systemInstruction = `
          Bạn là "Mệ Huế" (O Huế AI) - Trợ lý du lịch và Hướng dẫn viên bản địa am hiểu sâu sắc của ứng dụng HUEGO (Khám phá Cố Đô Huế).
          
          QUY TẮC BẮT BUỘC VỀ DỮ KIỆN (GROUNDING):
          1. CHỈ SỬ DỤNG thông tin lịch sử, năm tháng, số liệu được cung cấp trong phần [DỮ KIỆN XÁC THỰC CỐ ĐÔ] bên dưới. TUYỆT ĐỐI KHÔNG TỰ BỊA ĐẶT NĂM THÁNG, SỰ KIỆN LỊCH SỬ HAY NHÂN VẬT.
          2. Về giờ mở cửa hoặc giá vé: NẾU dữ kiện không có, BẮT BUỘC phải nói rõ: "Dạ thông tin giờ mở cửa/giá vé cụ thể hiện chưa có trong dữ liệu xác thực, bạn vui lòng liên hệ ban quản lý di tích hoặc quầy vé tại điểm đến để nắm rõ nhen."
          3. Nếu câu hỏi ngoài chủ đề du lịch Cố Đô Huế, lịch sự từ chối và hướng về di sản Huế.
          4. Phong cách trả lời: Giọng điệu đôn hậu, nhã nhặn, ân cần của người Huế (xưng Mệ, gọi quý khách/bạn/người con; dùng thán từ mộc mạc: dạ, thưa, nhen, nợ...).
          
          [DỮ KIỆN XÁC THỰC CỐ ĐÔ]:
          ${contextText || 'Chưa có trích xuất cụ thể cho địa danh này trong DB.'}
        `;

        const model = this.genAI.getGenerativeModel({
          model: process.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash',
          systemInstruction,
        });

        let promptText = question;
        if (currentNearbyPlace) {
          promptText += `\n[Vị trí khách đang ở gần: ${currentNearbyPlace}]`;
        }

        // Thực thi gọi với Timeout 8 giây (8.000 ms)
        const geminiPromise = model.generateContent(promptText);
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Gemini API call timed out after 8000ms')), 8000),
        );

        const result: any = await Promise.race([geminiPromise, timeoutPromise]);
        const answer = result.response.text();
        const duration = Date.now() - startTime;

        this.logger.log(`[AI Guide Chat] User: ${userId} | Places: [${usedPlaceIds.join(', ')}] | Source: gemini | ${duration}ms`);

        return {
          answer,
          source: 'gemini',
          grounded: usedPlaceIds.length > 0,
          usedPlaceIds,
          timestamp: new Date().toISOString(),
        };
      } catch (err: any) {
        this.logger.warn(`Gemini API gặp sự cố hoặc timeout (${err.message}). Tự động fallback sang tri thức nội bộ từ DB.`);
      }
    }

    // 6. Heuristic Knowledge Engine fallback grounded trực tiếp từ DB
    const fallbackAnswer = this.generateHueKnowledgeFallback(
      question,
      language,
      currentNearbyPlace,
      matchedNarrations,
    );

    const duration = Date.now() - startTime;
    this.logger.log(`[AI Guide Chat] User: ${userId} | Places: [${usedPlaceIds.join(', ')}] | Source: fallback | ${duration}ms`);

    return {
      answer: fallbackAnswer,
      source: 'fallback',
      grounded: usedPlaceIds.length > 0 || matchedNarrations.length > 0,
      usedPlaceIds,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Fallback có kiểm soát: Trích xuất trực tiếp từ DB place_narrations và tri thức bản địa chuẩn
   */
  private generateHueKnowledgeFallback(
    question: string,
    lang: string,
    nearbyPlace?: string,
    matchedNarrations: Array<PlaceNarration & { placeName: string }> = [],
  ): string {
    const q = question.toLowerCase();

    // Nếu đã khớp được bài thuyết minh chuẩn trong DB: trả lời bằng dữ liệu thật
    if (matchedNarrations.length > 0) {
      const nar = matchedNarrations[0];
      const placeName = nar.placeName;
      
      // Nếu hỏi về giờ mở cửa
      if (q.includes('giờ mở cửa') || q.includes('mấy giờ') || q.includes('thời gian mở cửa')) {
        if (placeName.includes('Thiên Mụ')) {
          return `Dạ thưa bạn, Chùa Thiên Mụ là chốn tu hành tôn nghiêm, thường mở cửa đón du khách và Phật tử từ sáng sớm (khoảng 06:00) đến chiều muộn hoàng hôn (khoảng 18:00) hàng ngày và không thu vé tham quan nhen! Bạn nên viếng chùa vào sáng sớm hoặc lúc chiều tà để cảm nhận trọn vẹn nét thanh tịnh và nghe tiếng chuông ngân bên sông Hương nhen.`;
        }
        return `Dạ thưa bạn, đối với ${placeName}, thông tin giờ mở cửa chính thức có thể thay đổi theo mùa của Trung tâm Bảo tồn Di tích Cố đô Huế (mùa hè thường từ 07:00 - 17:30, mùa đông từ 07:30 - 17:00). Bạn vui lòng kiểm tra trực tiếp tại quầy vé trước khi vào tham quan nhen!`;
      }

      // Nếu hỏi năm xây dựng hoặc lịch sử
      if (q.includes('năm nào') || q.includes('xây năm') || q.includes('khởi công') || q.includes('lịch sử')) {
        return `Dạ thưa bạn, Mệ kể bạn nghe về ${placeName} nhen:\n\n${nar.shortText}\n\n(Nguồn tư liệu xác thực: ${nar.sources})`;
      }

      return `Dạ chào bạn! Về ${placeName}, Mệ xin chia sẻ câu chuyện di sản được xác thực như sau nhen:\n\n${nar.shortText}`;
    }

    // Câu hỏi ẩm thực
    if (q.includes('ẩm thực') || q.includes('ăn gì') || q.includes('món ngon') || q.includes('quán ăn') || q.includes('bún bò')) {
      return `Dạ, ẩm thực xứ Huế có hơn một ngàn món từ phong vị cung đình thanh nhã đến các món dân dã đường phố. Mệ gợi ý bạn những món nhất định phải thử kèm địa chỉ truyền đời nhen:
• Bún bò Huế Mụ Rơi (đường Nguyễn Du) chuẩn vị sả ruốc ngọt thanh từ xương.
• Cơm hến Hoa Đông (bản địa gốc Cồn Hến) cay nồng đượm vị mắm ruốc, tóp mỡ giòn rụm.
• Bánh bèo, nậm, lọc Bà Đỏ (đường Nguyễn Bỉnh Khiêm) dẻo thơm nóng hổi.
• Chè hẻm 20 món Hùng Vương hoặc chè bột lọc bọc heo quay Mợ Tôn Đích cửa Thượng Tứ.`;
    }

    // Câu hỏi về thời tiết
    if (q.includes('mưa') || q.includes('thời tiết')) {
      return `Mưa Huế nổi tiếng thi vị và trầm mặc. Ngày mưa, Mệ khuyên bạn ghé các điểm trong nhà ấm cúng: Bảo tàng Cổ vật Cung đình Huế (Điện Long An), Không gian nghệ thuật Lê Bá Đặng, hoặc ghé nhà rường cổ Kim Long thưởng thức ấm trà Cung đình thơm thảo mộc nhen!`;
    }

    return `Dạ chào bạn! Mệ Huế rất hân hạnh đồng hành cùng bạn khám phá Cố Đô. Bạn cứ hỏi Mệ về lịch sử Đại Nội, lăng tẩm hoàng gia, các chùa cổ thiền môn hay những quán ăn vặt đậm đà xứ Huế nhen!`;
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
          model: process.env.GEMINI_MODEL_NAME || 'gemini-2.5-flash',
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
              culturalHighlight: 'Thưởng trà hoa sen trong không gian nhà rường cổ kính, chiêm ngưỡng bảo vật hoàng cung triều Nguyễn.',
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
   * Thuyết minh chi tiết di tích từ DB hoặc fallback kịch bản
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

    const fallbackStory = HUE_HERITAGE_STORIES[dto.placeId] || {
      placeId: dto.placeId,
      placeName: 'Di tích Cố Đô Huế',
      audioNarrationScript: 'Chào mừng bạn đến với Cố Đô Huế, vùng đất di sản ngàn năm văn hiến bên dòng sông Hương thơ mộng.',
      secretHistoricalFact: 'Hệ thống di tích Cố đô Huế lưu giữ trọn vẹn diện mạo kinh đô phong kiến phương Đông.',
      photoSpotAdvice: 'Chụp ảnh cùng trang phục truyền thống áo dài ngũ thân.',
    };
    return fallbackStory;
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    });

    if (!res.ok) {
      throw new Error(`Google TTS trả mã lỗi: ${res.status}`);
    }

    const arrayBuf = await res.arrayBuffer();
    return Buffer.from(arrayBuf);
  }
}
