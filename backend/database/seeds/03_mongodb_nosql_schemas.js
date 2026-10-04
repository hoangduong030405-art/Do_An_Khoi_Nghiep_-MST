/**
 * ============================================================================
 * HUEGO – MONGODB NOSQL SCHEMAS (DOCUMENT COLLECTIONS SPECIFICATION)
 * Thiết kế NoSQL cho dữ liệu phi cấu trúc, Luồng GPS Telemetry & Phiên AI Chat
 * ============================================================================
 */

// 1. COLLECTION: gps_telemetry_stream (Timeseries Collection - Lưu vết GPS thời gian thực)
// Mục đích: Phân tích hành vi di chuyển du khách, tính toán lượng CO2 giảm thiểu mà không làm phình PostgreSQL
db.createCollection("gps_telemetry_stream", {
  timeseries: {
    timeField: "timestamp",
    metaField: "metadata",
    granularity: "seconds"
  }
});

// Document mẫu:
/*
{
  "timestamp": ISODate("2026-10-01T15:30:00Z"),
  "metadata": {
    "userId": "e7b0e774-7243-41bb-9be4-8a4b868e82ef",
    "itineraryId": "550e8400-e29b-41d4-a716-446655440000",
    "devicePlatform": "FLUTTER_ANDROID",
    "transportMode": "BICYCLE"
  },
  "coordinates": {
    "type": "Point",
    "coordinates": [107.5779, 16.4697] // [Lng, Lat]
  },
  "speedKmh": 12.5,
  "accuracyMeters": 4.2,
  "batteryLevel": 88
}
*/

// 2. COLLECTION: ai_chat_sessions (Lịch sử hội thoại với Trợ lý ảo "Mệ Huế" & Ngữ cảnh RAG)
db.createCollection("ai_chat_sessions");
db.ai_chat_sessions.createIndex({ "userId": 1, "lastActiveAt": -1 });
db.ai_chat_sessions.createIndex({ "sessionId": 1 }, { unique: true });

// Document mẫu:
/*
{
  "sessionId": "session_mhue_98234123",
  "userId": "e7b0e774-7243-41bb-9be4-8a4b868e82ef",
  "userPersona": "Du khách lần đầu tới Huế thích chụp ảnh và ẩm thực cay",
  "language": "vi",
  "weatherSnapshot": {
    "condition": "Mưa ngâu",
    "tempCelsius": 23.5
  },
  "currentLocationName": "Chùa Thiên Mụ",
  "messages": [
    {
      "sender": "USER",
      "text": "Mệ ơi, chùa ni có chuyện chi hay về tháp Phước Duyên không mệ?",
      "sentAt": ISODate("2026-10-01T15:31:00Z")
    },
    {
      "sender": "AI_ME_HUE",
      "text": "Dạ thưa con, tháp Phước Duyên ni được vua Thiệu Trị cho dựng vào năm 1844, cao 7 tầng tượng trưng cho 7 kiếp hóa thân của Đức Phật. Mệ mách nhỏ: đứng từ chân tháp nhìn ra sông Hương lúc hoàng hôn buông là thơ mộng bậc nhất Cố Đô đó con nhen!",
      "suggestedPlaces": [
        {
          "placeId": "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
          "name": "Chùa Thiên Mụ",
          "action": "OPEN_AUDIO_GUIDE"
        }
      ],
      "sentAt": ISODate("2026-10-01T15:31:02Z")
    }
  ],
  "lastActiveAt": ISODate("2026-10-01T15:31:02Z")
}
*/

// 3. COLLECTION: crowdsource_media_vault (Lưu trữ ảnh chất lượng cao & Metadata EXIF)
db.createCollection("crowdsource_media_vault");
db.crowdsource_media_vault.createIndex({ "submissionId": 1 });
