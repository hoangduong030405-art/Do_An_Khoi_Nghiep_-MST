class ApiEndpoints {
  // Thay đổi sang IP máy chủ thực tế hoặc localhost khi chạy emulator (10.0.2.2 cho Android Emulator)
  static const String baseUrl = 'http://10.0.2.2:3000/api/v1';

  // Geofencing & Itinerary Check-in
  static const String unlockGeofence = '$baseUrl/geofencing/unlock';
  static const String checkInItinerary = '$baseUrl/geofencing/check-in-itinerary';
  static const String unlockedHistory = '$baseUrl/geofencing/unlocked-history';

  // Places
  static const String places = '$baseUrl/places';
  static const String nearbyPlaces = '$baseUrl/places/nearby';

  // Random Wheel (Vòng quay ngẫu nhiên)
  static const String randomWheelSpin = '$baseUrl/random-wheel/spin';
  static const String randomWheelFilters = '$baseUrl/random-wheel/filters';

  // Smart Weather
  static const String currentWeather = '$baseUrl/weather/hue-current';

  // AI Assistant (Mệ Huế)
  static const String aiChat = '$baseUrl/ai-guide/chat';
  static const String placeStory = '$baseUrl/ai-guide/place-story';
  static const String adaptItinerary = '$baseUrl/ai-guide/adapt-itinerary';

  // Gamification & Green Points
  static const String gamificationProfile = '$baseUrl/gamification/profile';
  static const String certificate = '$baseUrl/gamification/certificate';

  // Crowdsourcing & Affiliate
  static const String crowdsourceSubmit = '$baseUrl/crowdsource/submit';
  static const String affiliatePartners = '$baseUrl/affiliate/partners';
}
