import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { WeatherService } from '../weather/weather.service';
import { AskGuideDto, AdaptItineraryDto, ExplainPlaceStoryDto } from './dto/ai-requests.dto';
import { InMemoryDbService, HuePlace } from '../../database/in-memory-db.service';

@Injectable()
export class AiAssistantService {
  private readonly logger = new Logger(AiAssistantService.name);
  private genAI: GoogleGenerativeAI | null = null;

  constructor(
    private readonly weatherService: WeatherService,
    private readonly inMemoryDb: InMemoryDbService,
  ) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'your_gemini_api_key_here') {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  /**
   * Hỏi đáp với Hướng dẫn viên AI "Mệ Huế"
   */
  async chatWithGuide(dto: AskGuideDto) {
    const { question, language = 'vi', currentNearbyPlace } = dto;

    if (this.genAI) {
      try {
        const systemInstruction = `
          Bạn là "Mệ Huế" - Trợ lý du lịch AI thông minh của ứng dụng HUEGO (Khám phá Huế thông minh).
          Bạn am hiểu tường tận 13 đời vua triều Nguyễn, di sản vật thể & phi vật thể, ca Huế sông Hương, ẩm thực cung đình & dân dã, văn hóa nhà vườn.
          Phong cách: Giọng điệu ân cần, nhã nhặn, mang đậm bản sắc văn hóa xứ Huế hiền hòa.
          Nếu khách hỏi bằng tiếng Anh, trả lời bằng tiếng Anh trang trọng nhưng gần gũi.
        `;

        const model = this.genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction,
        });

        let prompt = question;
        if (currentNearbyPlace) {
          prompt += `\n[Du khách đang đứng gần địa danh: ${currentNearbyPlace}]`;
        }

        const result = await model.generateContent(prompt);
        return {
          answer: result.response.text(),
          source: 'GEMINI_AI',
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        this.logger.warn(`Gemini API gặp sự cố: ${err.message}. Chuyển sang phản hồi tri thức nội bộ.`);
      }
    }

    // Heuristic Knowledge Engine fallback mang đậm kiến thức Huế
    return {
      answer: this.generateHueKnowledgeFallback(question, language, currentNearbyPlace),
      source: 'HUEGO_KNOWLEDGE_BASE',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Tự động điều chỉnh lịch trình thông minh dựa trên diễn biến thời tiết thực tế
   */
  async adaptItineraryByWeather(dto: AdaptItineraryDto) {
    const weather = await this.weatherService.getCurrentHueWeather();

    if (this.genAI) {
      try {
        const systemInstruction = `
          Bạn là kiến trúc sư lịch trình du lịch thông minh của HUEGO Huế.
          Nhiệm vụ: Dựa vào tình hình thời tiết, nếu trời MƯA hoặc NẮNG GẮT (>37°C), hãy thay thế các điểm ngoài trời (OUTDOOR)
          bằng các trải nghiệm văn hóa trong nhà (INDOOR) đặc sắc của Huế (Bảo tàng Cổ vật Cung đình, Không gian lưu niệm Lê Bá Đảng, Nhà rường Kim Long thưởng trà, v.v.).
          BẮT BUỘC TRẢ VỀ DẠNG JSON HỢP LỆ.
        `;

        const model = this.genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
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
      } catch (err) {
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
            culturalHighlight: 'Điểm đến lý tưởng, tiếp tục hành trình khám phá di sản cố đô.',
            action: 'KEEP',
          };
        }),
      },
    };
  }

  /**
   * TÍNH NĂNG TRỌNG TÂM: Thuyết minh & Kể chuyện văn hóa địa điểm du lịch Huế (Gemini AI & RAG)
   */
  async narratePlaceStory(dto: ExplainPlaceStoryDto) {
    const { placeId, visitingContext = 'AFTERNOON', tone = 'DEEP_CULTURE', language = 'vi' } = dto;
    const place = this.inMemoryDb.places.find((p) => p.id === placeId);
    const placeName = place ? place.name : 'Địa danh Cố Đô Huế';
    const placeAddress = place ? place.address : 'TP Huế';
    const placeDesc = place ? place.descriptionVi : 'Di sản văn hóa Huế';

    this.logger.log(`Yêu cầu AI thuyết minh: [${placeName}] - Bối cảnh: ${visitingContext}`);

    if (this.genAI) {
      try {
        const systemInstruction = `
          Bạn là "Mệ Huế" - Hướng dẫn viên du lịch văn hóa AI 24/7 của ứng dụng HUEGO.
          Bạn có kiến thức uyên bác về 13 đời vua triều Nguyễn, phong thủy kinh thành, nhã nhạc, ẩm thực, thơ ca tiền nhân và lối sống người Cố Đô.
          Phong cách thuyết minh:
          - Nếu language là "vi": Dùng giọng điệu tha thiết, nhẹ nhàng, pha lẫn chất giọng Huế truyền cảm (dạ, thưa quý khách, con nhen...), từ ngữ giàu tính gợi hình, đậm chất thơ.
          - Nếu language là "en": Trịnh trọng, giàu chất thơ lịch sử, truyền cảm hứng.
          BẮT BUỘC TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON THEO SCHEMA QUY ĐỊNH.
        `;

        const model = this.genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction,
          generationConfig: { responseMimeType: 'application/json' },
        });

        const prompt = `
          Hãy thuyết minh sâu sắc về địa danh sau:
          - Tên địa điểm: "${placeName}"
          - Địa chỉ: "${placeAddress}"
          - Mô tả cơ sở: "${placeDesc}"
          - Bối cảnh tham quan của du khách: ${visitingContext} (Sáng/Chiều/Tối/Mưa)
          - Phong cách yêu cầu: ${tone}
          - Ngôn ngữ: ${language}

          Yêu cầu cấu trúc JSON trả về:
          {
            "placeName": "${placeName}",
            "audioNarrationScript": "Đoạn văn thuyết minh truyền cảm từ 120-180 từ, phù hợp để máy đọc Text-to-Speech phát qua tai nghe cho du khách khi đứng trước địa danh.",
            "secretHistoricalFact": "Một câu chuyện hoặc bí mật lịch sử triều Nguyễn / giai thoại dân gian ít người biết về nơi này.",
            "photoSpotAdvice": "Gợi ý góc chụp hình sống ảo hoặc ngắm cảnh đắt giá nhất theo thời điểm ${visitingContext}.",
            "localSpecialtyPairing": "Món ăn hoặc thức uống đặc sản Cố Đô nên thử sau khi rời địa điểm này.",
            "ecoGreenTip": "Lời khuyên du lịch xanh bảo vệ di sản xứ Huế."
          }
        `;

        const result = await model.generateContent(prompt);
        const parsed = JSON.parse(result.response.text());
        return {
          source: 'GEMINI_AI',
          placeId,
          placeName,
          narration: parsed,
          generatedAt: new Date().toISOString(),
        };
      } catch (err) {
        this.logger.warn(`Lỗi khi gọi Gemini thuyết minh: ${err.message}. Sử dụng kho tri thức nội bộ.`);
      }
    }

    // Heuristic Fallback chất lượng cao nếu chưa cấu hình GEMINI_API_KEY
    return {
      source: 'HUEGO_CULTURE_VAULT',
      placeId,
      placeName,
      narration: {
        placeName,
        audioNarrationScript: `Dạ thưa quý khách, bước chân đến ${placeName}, xin người hãy chầm chậm lắng lại một chút để cảm nhận hơi thở trầm mặc của nghìn năm Cố Đô. Nơi đây từng ghi dấu biết bao thăng trầm của triều đại nhà Nguyễn, nơi mỗi phiến đá, mái ngói rêu phong đều ẩn chứa một câu chuyện vàng son. Đứng tại đây trong buổi chiều tà, khi ánh nắng hoàng hôn buông xuống dòng sông Hương, lòng người như được gột rửa khỏi những ồn ào phố thị.`,
        secretHistoricalFact: `Tương truyền, khi xây dựng các công trình cung điện và lăng tẩm, các bậc thầy phong thủy triều Nguyễn đã tính toán thế núi Ngự Bình và sông Hương làm tiền án, minh đường để tụ khí vượng cho muôn đời con cháu.`,
        photoSpotAdvice: `Hãy đứng ở góc chếch 45 độ đón ánh sáng vàng ấm của buổi chiều, lấy trọn vẹn mái ngói lưu ly và bóng cây xanh cổ thụ làm tiền cảnh.`,
        localSpecialtyPairing: `Rời bước khỏi ${placeName}, kính mời bạn ghé quán mụ Rơi thưởng thức tô bún bò Huế thơm lừng mùi sả ruốc hoặc tách trà sen Kim Long thanh tao.`,
        ecoGreenTip: `Hãy giữ trọn nét thanh tịnh nơi di sản: di chuyển bằng xe đạp xanh quanh hào thành và tuyệt đối không để lại rác thải nhựa bạn nhé!`,
      },
      generatedAt: new Date().toISOString(),
    };
  }

  private generateHueKnowledgeFallback(question: string, lang: string, nearbyPlace?: string): string {
    const q = question.toLowerCase();
    if (lang === 'en') {
      return `Welcome to Hue! ${nearbyPlace ? `Since you are near ${nearbyPlace}, ` : ''}Hue is Vietnam's ancient capital renowned for its 13 Nguyen Dynasty emperors, tranquil Perfume River, and royal gastronomy. For imperial history, visit the Citadel and Khai Dinh Tomb. For an eco-friendly journey, consider taking a bicycle tour around Kim Long traditional garden houses.`;
    }

    if (q.includes('cầu tràng tiền') || q.includes('tràng tiền')) {
      return 'Cầu Tràng Tiền (xưa gọi là cầu Thành Thái) được khởi công xây dựng vào năm 1897 dưới thời vua Thành Thái và do hãng Eiffel của Pháp thiết kế. Cây cầu gồm 6 nhịp thép hình vành lược duyên dáng vắt qua dòng sông Hương thơ mộng. Buổi tối quanh chân cầu, bạn có thể thưởng thức chè hẻm 20 món trứ danh hoặc bánh mì bột lọc giòn rụm!';
    }

    if (q.includes('ăn gì') || q.includes('ẩm thực') || q.includes('món ngon')) {
      return 'Dạ, ẩm thực xứ Huế có hơn 1.000 món từ cung đình đến dân dã. Mệ gợi ý bạn nhất định phải thử: Bún bò Huế chuẩn vị mắm ruốc sả ớt, bánh bèo - nậm - lọc nóng hổi, cơm hến cồn Hến giòn rụm tóp mỡ, và kết thúc bằng chè bột lọc bọc heo quay độc nhất vô nhị nhé!';
    }

    if (q.includes('đại nội') || q.includes('hoàng thành')) {
      return 'Đại Nội Huế gồm hai phần chính: Hoàng Thành (nơi thiết triều và tế lễ) và Tử Cấm Thành (nơi sinh hoạt của Hoàng gia). Được khởi công từ năm 1804 dưới triều vua Gia Long, quần thể có Ngọ Môn tráng lệ, Điện Thái Hòa uy nghiêm và Thế Miếu linh thiêng thờ các vị vua triều Nguyễn.';
    }

    return `Dạ chào bạn! Mệ Huế rất hân hạnh được đồng hành cùng bạn trên mảnh đất Cố Đô. ${nearbyPlace ? `Hiện bạn đang ở rất gần ${nearbyPlace} - một địa danh chứa đựng nhiều tầng văn hóa sâu sắc.` : ''} Bạn có muốn tìm hiểu về lịch sử các lăng tẩm, điểm thưởng trà ngày mưa hay lộ trình du lịch xanh khám phá Huế bằng xe đạp không?`;
  }
}
