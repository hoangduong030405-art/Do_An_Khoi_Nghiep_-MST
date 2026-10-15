import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { WeatherService } from '../weather/weather.service';
import { AskGuideDto, AdaptItineraryDto, ExplainPlaceStoryDto } from './dto/ai-requests.dto';
import { InMemoryDbService, HuePlace } from '../../database/in-memory-db.service';
import { HUE_HERITAGE_STORIES, HeritageNarrationItem } from './data/hue-heritage-stories';

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
          Bạn là "Mệ Huế" (O Huế AI) - Trợ lý du lịch và Hướng dẫn viên AI bản địa thông minh của ứng dụng HUEGO (Khám phá Cố Đô Huế).
          Bạn có kho tri thức toàn diện và am hiểu sâu sắc về:
          - Ẩm thực Cố Đô: từ yến tiệc cung đình đến thiên đường ăn vặt đường phố dân dã (Bánh ép dẻo đường Nhật Lệ, chè bột lọc bọc heo quay Mợ Tôn Đích ở cửa Thượng Tứ/Thương Bạc, bánh tráng kẹp bờ hồ Lê Huân, bánh bèo nậm lọc khay Mai Thúc Loan/Đinh Tiên Hoàng, bún bò mụ Rơi, cơm hến cồn Hến, chè hẻm 20 món Hùng Vương, cà phê muối Nguyễn Huệ, quán trà cung đình Kim Long...). Khi khách hỏi món ăn, HÃY GỢI Ý TÊN MÓN VÀ CON ĐƯỜNG/QUÁN ĂN CỤ THỂ NGAY LẬP TỨC.
          - Di tích & Lịch sử: 13 đời vua nhà Nguyễn, Hoàng Thành/Đại Nội (Ngọ Môn, Điện Thái Hòa, Thế Miếu), hệ thống lăng tẩm hoàng gia (Gia Long, Minh Mạng, Thiệu Trị, Tự Đức, Đồng Khánh, Khải Định), các chùa cổ thiền môn (Thiên Mụ, Từ Hiếu, Huyền Không Sơn Thượng).
          - Điểm ngắm cảnh & check-in: Cầu Tràng Tiền, cầu Dã Viên, đồi Vọng Cảnh, đồi Thiên An & hồ Thủy Tiên, làng hương trầm Thủy Xuân, rừng ngập mặn Rú Chá, đầm phá Tam Giang.
          - Văn hóa, lối sống & lịch trình: Ca Huế trên sông Hương, áo dài ngũ thân, nhà rường truyền thống, lịch trình trải nghiệm theo thời tiết nắng mưa.

          Quy tắc ứng xử và phong cách trả lời:
          1. TRẢ LỜI ĐÚNG TRỌNG TÂM CÂU HỎI của khách, cực kỳ linh hoạt, giải thích chi tiết, gợi ý địa chỉ và trải nghiệm thiết thực. TUYỆT ĐỐI KHÔNG dùng câu trả lời chung chung lặp đi lặp lại.
          2. Giọng điệu thân mật, ân cần, nhã nhặn của người Huế (xưng Mệ, gọi quý khách/bạn/người con, dùng các thán từ mộc mạc nhẹ nhàng: dạ, thưa, nhen, rứa...).
          3. Trình bày đẹp mắt, thoáng, dễ đọc trên màn hình di động (có thể dùng gạch đầu dòng, emoji sinh động).
          4. Nếu khách hỏi bằng tiếng Anh, trả lời bằng tiếng Anh lưu loát, mến khách và chuẩn xác.
        `;

        const model = this.genAI.getGenerativeModel({
          model: process.env.GEMINI_MODEL_NAME || 'gemini-3.8-flash',
          systemInstruction,
        });

        let prompt = question;
        if (currentNearbyPlace) {
          prompt += `\n[Vị trí du khách đang tham quan hoặc gần đó: ${currentNearbyPlace}]`;
        }

        const result = await model.generateContent(prompt);
        return {
          answer: result.response.text(),
          source: 'gemini',
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        this.logger.warn(`Gemini API gặp sự cố: ${err.message}. Chuyển sang phản hồi tri thức nội bộ.`);
      }
    }

    // Heuristic Knowledge Engine fallback mang đậm kiến thức Huế
    return {
      answer: this.generateHueKnowledgeFallback(question, language, currentNearbyPlace),
      source: 'fallback',
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
          model: process.env.GEMINI_MODEL_NAME || 'gemini-1.5-flash',
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
    const searchKey = String(placeId).toLowerCase();

    // Tìm kiếm địa danh linh hoạt theo id, slug hoặc tên
    const place = this.inMemoryDb.places.find(
      (p) => p.id === placeId || p.slug === placeId || p.name.toLowerCase().includes(searchKey),
    );
    const placeName = place ? place.name : 'Địa danh Di sản Cố Đô Huế';
    const placeAddress = place ? place.address : 'TP Huế';
    const placeDesc = place ? place.descriptionVi : 'Di sản văn hóa Huế';

    // Khớp kho tri thức lịch sử đã được nghiên cứu chính xác
    let verifiedStory: HeritageNarrationItem | undefined = HUE_HERITAGE_STORIES[searchKey];
    if (!verifiedStory) {
      if (searchKey.includes('đại nội') || searchKey.includes('hoàng thành') || searchKey === '1' || searchKey.includes('8f8b0596')) {
        verifiedStory = HUE_HERITAGE_STORIES['dai-noi'];
      } else if (searchKey.includes('thiên mụ') || searchKey === '2' || searchKey.includes('1a2b3c4d')) {
        verifiedStory = HUE_HERITAGE_STORIES['thien-mu'];
      } else if (searchKey.includes('cổ vật') || searchKey.includes('long an') || searchKey === '3' || searchKey.includes('1b34ad29')) {
        verifiedStory = HUE_HERITAGE_STORIES['bao-tang-co-vat'];
      } else if (searchKey.includes('khải định') || searchKey === '4' || searchKey.includes('4f5e6d7c')) {
        verifiedStory = HUE_HERITAGE_STORIES['lang-khai-dinh'];
      } else if (searchKey.includes('tự đức') || searchKey === '5' || searchKey.includes('tu-duc')) {
        verifiedStory = HUE_HERITAGE_STORIES['lang-tu-duc'];
      } else if (searchKey.includes('minh mạng') || searchKey.includes('minh-mang')) {
        verifiedStory = HUE_HERITAGE_STORIES['lang-minh-mang'];
      } else if (searchKey.includes('tràng tiền') || searchKey === '6' || searchKey.includes('5a6b7c8d')) {
        verifiedStory = HUE_HERITAGE_STORIES['cau-trang-tien'];
      } else if (searchKey.includes('vọng cảnh') || searchKey === '8' || searchKey.includes('doi-vong-canh')) {
        verifiedStory = HUE_HERITAGE_STORIES['doi-vong-canh'];
      } else if (searchKey.includes('thủy xuân') || searchKey === '11' || searchKey.includes('lang-huong')) {
        verifiedStory = HUE_HERITAGE_STORIES['lang-huong-thuy-xuan'];
      } else if (searchKey.includes('kim long') || searchKey.includes('trà') || searchKey === '14' || searchKey.includes('6b7c8d9e')) {
        verifiedStory = HUE_HERITAGE_STORIES['tra-cung-dinh-kim-long'];
      }
    }

    this.logger.log(`Yêu cầu AI thuyết minh: [${placeName}] - Bối cảnh: ${visitingContext}`);

    if (this.genAI) {
      try {
        const systemInstruction = `
          Bạn là "Mệ Huế" - Hướng dẫn viên du lịch văn hóa AI 24/7 của ứng dụng HUEGO.
          Bạn có kiến thức uyên bác, CHÍNH XÁC TUYỆT ĐỐI về 13 đời vua triều Nguyễn, phong thủy kinh thành, năm khởi công, niên hiệu, kiến trúc thực tế.
          Phong cách thuyết minh:
          - Nếu language là "vi": Thuyết minh bằng TIẾNG VIỆT trước hết. Giọng điệu tha thiết, nhẹ nhàng, pha lẫn chất giọng Huế truyền cảm (dạ, thưa quý khách, con nhen...), từ ngữ giàu tính gợi hình, số liệu lịch sử chính xác.
          - Nếu language là "en": Trịnh trọng, giàu chất thơ lịch sử, chuẩn xác.
          BẮT BUỘC TRẢ VỀ ĐÚNG ĐỊNH DẠNG JSON THEO SCHEMA QUY ĐỊNH.
        `;

        const model = this.genAI.getGenerativeModel({
          model: process.env.GEMINI_MODEL_NAME || 'gemini-1.5-flash',
          systemInstruction,
          generationConfig: { responseMimeType: 'application/json' },
        });

        const prompt = `
          Hãy thuyết minh sâu sắc và CHÍNH XÁC TUYỆT ĐỐI về địa danh sau:
          - Tên địa điểm: "${placeName}"
          - Địa chỉ: "${placeAddress}"
          - Dữ liệu lịch sử chuẩn xác được cung cấp: ${verifiedStory ? JSON.stringify(verifiedStory) : placeDesc}
          - Bối cảnh tham quan của du khách: ${visitingContext} (Sáng/Chiều/Tối/Mưa)
          - Phong cách yêu cầu: ${tone}
          - Ngôn ngữ: ${language}

          Yêu cầu cấu trúc JSON trả về:
          {
            "placeName": "${placeName}",
            "audioNarrationScript": "Đoạn văn thuyết minh truyền cảm từ 150-250 từ chuẩn xác về lịch sử, năm tháng, kiến trúc để máy đọc Text-to-Speech phát qua tai nghe cho du khách khi đứng trước địa danh.",
            "secretHistoricalFact": "Một câu chuyện hoặc bí mật lịch sử triều Nguyễn / điển tích dân gian chính xác về nơi này.",
            "photoSpotAdvice": "Gợi ý góc chụp hình sống ảo hoặc ngắm cảnh đắt giá nhất theo thời điểm ${visitingContext}.",
            "localSpecialtyPairing": "Món ăn hoặc thức uống đặc sản Cố Đô nên thử gần địa điểm này.",
            "ecoGreenTip": "Lời khuyên du lịch xanh bảo vệ di sản xứ Huế."
          }
        `;

        const result = await model.generateContent(prompt);
        const parsed = JSON.parse(result.response.text());
        return {
          source: 'gemini',
          placeId,
          placeName,
          narration: parsed,
          generatedAt: new Date().toISOString(),
        };
      } catch (err) {
        this.logger.warn(`Lỗi khi gọi Gemini thuyết minh: ${err.message}. Sử dụng kho tri thức lịch sử chuẩn.`);
      }
    }

    // Trả về dữ liệu lịch sử chuẩn xác được chứng thực từ tư liệu văn hóa Cố Đô
    if (verifiedStory) {
      return {
        source: 'heritage-database',
        placeId,
        placeName: verifiedStory.placeName,
        narration: verifiedStory,
        generatedAt: new Date().toISOString(),
      };
    }

    return {
      source: 'fallback',
      placeId,
      placeName,
      narration: {
        placeName,
        audioNarrationScript: `Dạ thưa quý khách, chào mừng người ghé thăm ${placeName}. Mảnh đất Cố Đô Huế trải qua hơn một thế kỷ là kinh đô của triều đại nhà Nguyễn, nơi mỗi bờ thành, bến nước đều gắn liền với những thăng trầm của tiền nhân. Đứng trước di tích trong không gian trầm mặc của xứ Huế, lòng người như được lắng đọng để cảm nhận hồn thiêng non nước ngàn năm.`,
        secretHistoricalFact: `Các bậc thầy phong thủy triều Nguyễn khi quy hoạch các công trình kinh thành và lăng tẩm đều tuân thủ nghiêm ngặt thuyết âm dương ngũ hành, lấy núi Ngự Bình làm tiền án, cồn Hến và cồn Dã Viên làm tả thanh long hữu bạch hổ để tụ khí trường tồn.`,
        photoSpotAdvice: `Hãy chọn góc chụp chếch 45 độ đón ánh sáng hoàng hôn dịu nhẹ của buổi chiều Cố Đô, lấy trọn vẹn mái ngói lưu ly và không gian cây xanh cổ thụ làm tiền cảnh.`,
        localSpecialtyPairing: `Sau chuyến tản bộ tham quan, mời quý khách thưởng thức tô bún bò Huế bốc khói cay nồng hoặc chén chè hạt sen long nhãn thanh tao.`,
        ecoGreenTip: `Hãy giữ gìn nét thanh tịnh nơi di sản bằng việc đi bộ, sử dụng xe đạp xanh và tuyệt đối không để lại rác thải nhựa bạn nhé!`,
      },
      generatedAt: new Date().toISOString(),
    };
  }

  private generateHueKnowledgeFallback(question: string, lang: string, nearbyPlace?: string): string {
    const q = question.toLowerCase();
    if (lang === 'en') {
      return `Dạ chào bạn! Welcome to Hue! ${nearbyPlace ? `Since you are near ${nearbyPlace}, ` : ''}Hue is renowned for its 13 Nguyen Dynasty emperors, tranquil Perfume River, and extraordinary royal & street cuisine. For imperial heritage, explore the Citadel and Khai Dinh Tomb. For authentic local gastronomy, try Bun Bo Hue, royal sweet soups, and savoury Banh Ep pancakes!`;
    }

    if (q.includes('ăn vặt') || q.includes('hoàng thành') || q.includes('đại nội') || q.includes('thành nội') || q.includes('bánh ép') || q.includes('chè')) {
      return `Dạ thưa quý khách, quanh Hoàng Thành (khu vực Thành Nội) chính là "thiên đường ăn vặt" nức tiếng nhất Cố Đô! Mệ gợi ý ngay cho bạn những món đỉnh nhất kèm địa chỉ cụ thể:

1. 🥞 **Bánh ép dẻo giòn Thành Nội:**
   • *Khu vực:* Phố ẩm thực Nhật Lệ (ngay sát cửa Quảng Đức & Ngọ Môn).
   • *Quán ngon:* Bánh ép Cây Dừa (73 Nhật Lệ) hoặc Bánh ép Chị Huệ (118 Nhật Lệ). Bánh ép nóng hổi ăn kèm rau răm, dưa leo chấm mắm chua ngọt hoặc mắm nêm đậm đà.

2. 🍨 **Chè bột lọc bọc heo quay & chè Cung đình:**
   • *Khu vực:* Công viên Thương Bạc (ngay trước Cửa Thượng Tứ).
   • *Quán nổi tiếng:* Chè Mợ Tôn Đích — món chè bột lọc bọc thịt heo quay mằn mặn béo giòn thơm lừng nước đường gừng độc nhất vô nhị.

3. 🍘 **Bánh tráng nướng & kẹp bờ hồ hào thành:**
   • *Khu vực:* Dọc bờ hồ đường Lê Huân (tường thành phía Tây) và đường Đoàn Thị Điểm. Chiều mát ngồi hóng gió hồ ăn bánh tráng kẹp pa-tê trứng bò khô giòn cay.

4. 🥟 **Khay bánh Huế (Bèo - Nậm - Lọc - Ram ít):**
   • *Địa chỉ:* Bánh bèo nậm lọc Mai Thúc Loan hoặc gánh hàng rong trước cửa Hiển Nhơn, bánh mướt mềm thơm tôm chấy đỏ au.

5. ☕ **Cà phê muối & giải khát ngắm thành cổ:**
   • Dọc đường Đinh Tiên Hoàng hoặc đường Lê Huân có nhiều quán cà phê phong cách hoài niệm rất đẹp.`;
    }

    if (q.includes('cầu tràng tiền') || q.includes('tràng tiền')) {
      return 'Cầu Tràng Tiền (xưa gọi là cầu Thành Thái) được khởi công xây dựng vào năm 1897 dưới thời vua Thành Thái và do hãng Eiffel của Pháp thiết kế. Cây cầu gồm 6 vài 12 nhịp thép hình vành lược duyên dáng soi bóng sông Hương. Buổi tối quanh chân cầu, bạn có thể dạo phố đi bộ, thưởng thức chè hẻm 20 món trứ danh hoặc bánh mì bột lọc giòn rụm!';
    }

    if (q.includes('cà phê') || q.includes('cafe') || q.includes('quán nước')) {
      return 'Dạ, thưởng thức cà phê ở Huế là một nét văn hóa chậm rãi rất tao nhã. Mệ mách bạn: Ghé Cà phê Muối (gốc 10 Nguyễn Huệ hoặc 142 Đặng Thái Thân Thành Nội) để nhâm nhi lớp kem muối béo mặn; hoặc ghé Tân Cafe vintage (Lê Huân / Đinh Tiên Hoàng) để chụp hình hoài niệm nhé!';
    }

    if (q.includes('ăn gì') || q.includes('ẩm thực') || q.includes('món ngon') || q.includes('quán ăn')) {
      return 'Dạ, ẩm thực xứ Huế có hơn 1.000 món từ cung đình đến dân dã. Mệ gợi ý bạn nhất định phải thử: Bún bò Huế Mụ Rơi (Nguyễn Du) chuẩn vị sả ruốc, Cơm hến Hoa Đông (Cồn Hến) cay nồng tóp mỡ giòn rụm, Bánh bèo nậm lọc Bà Đỏ (Nguyễn Bỉnh Khiêm), và kết thúc bằng chè sen long nhãn thanh mát!';
    }

    if (q.includes('mưa') || q.includes('thời tiết')) {
      return 'Mưa Huế nổi tiếng thi vị và trầm mặc. Ngày mưa Mệ khuyên bạn ưu tiên các điểm tham quan trong nhà mát mẻ: Bảo tàng Cổ vật Cung đình (Điện Long An), Không gian nghệ thuật Lê Bá Đảng, hoặc ghé nhà rường cổ Kim Long thưởng thức ấm trà Cung đình 26 vị thảo mộc ấm lòng nhen!';
    }

    return `Dạ chào bạn! Mệ Huế rất hân hạnh được đồng hành cùng bạn trên mảnh đất Cố Đô. ${nearbyPlace ? `Hiện bạn đang ở rất gần ${nearbyPlace} - một địa danh chứa đựng nhiều tầng văn hóa sâu sắc.` : ''} Bạn muốn Mệ chia sẻ về món ngon ăn vặt Thành Nội, lịch sử các lăng tẩm hoàng gia, hay gợi ý quán cà phê ngắm hoàng hôn sông Hương? Cứ hỏi Mệ bất cứ điều chi nhen!`;
  }

  /**
   * Tạo luồng âm thanh phát thanh viên tiếng Việt chuẩn cho Audio Guide
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
      } catch (err) {
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
        if (sentence.length > maxLength) {
          const words = sentence.split(' ');
          let temp = '';
          for (const w of words) {
            if ((temp + ' ' + w).trim().length <= maxLength) {
              temp = (temp + ' ' + w).trim();
            } else {
              if (temp) chunks.push(temp);
              temp = w;
            }
          }
          current = temp;
        } else {
          current = sentence.trim();
        }
      }
    }
    if (current) chunks.push(current);
    return chunks;
  }

  private fetchTtsChunk(chunk: string, lang: string): Promise<Buffer> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const https = require('https');
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodeURIComponent(chunk)}`;
    return new Promise((resolve, reject) => {
      https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res: any) => {
        const bufs: Buffer[] = [];
        res.on('data', (c: Buffer) => bufs.push(c));
        res.on('end', () => resolve(Buffer.concat(bufs)));
      }).on('error', reject);
    });
  }
}
