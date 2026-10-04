import 'app_config.dart';

class ApiEndpoints {
  // Thay đổi sang IP máy chủ thực tế hoặc localhost khi chạy emulator (10.0.2.2 cho Android Emulator)
  static final String baseUrl = AppConfig.apiBaseUrl;

  // Geofencing & Itinerary Check-in
  static final String unlockGeofence = '$baseUrl/geofencing/unlock';
  static final String checkInItinerary = '$baseUrl/geofencing/check-in-itinerary';
  static final String unlockedHistory = '$baseUrl/geofencing/unlocked-history';

  // Places
  static final String places = '$baseUrl/places';
  static final String nearbyPlaces = '$baseUrl/places/nearby';

  // Random Wheel (Vòng quay ngẫu nhiên)
  static final String randomWheelSpin = '$baseUrl/random-wheel/spin';
  static final String randomWheelFilters = '$baseUrl/random-wheel/filters';

  // Smart Weather
  static final String currentWeather = '$baseUrl/weather/hue-current';

  // AI Assistant (Mệ Huế)
  static final String aiChat = '$baseUrl/ai-guide/chat';
  static final String placeStory = '$baseUrl/ai-guide/place-story';
  static final String adaptItinerary = '$baseUrl/ai-guide/adapt-itinerary';

  // Gamification & Green Points
  static final String gamificationProfile = '$baseUrl/gamification/profile';
  static final String certificate = '$baseUrl/gamification/certificate';

  // Crowdsourcing & Affiliate
  static final String crowdsourceSubmit = '$baseUrl/crowdsource/submit';
  static final String affiliatePartners = '$baseUrl/affiliate/partners';
}
