import 'package:flutter/material.dart';

class HuegoTheme {
  // Bảng màu Nhận diện Cố Đô Huế
  static const Color royalViolet = Color(0xFF582C83);      // Tím Hoàng Gia Huế
  static const Color imperialGold = Color(0xFFD4AF37);     // Vàng Hoàng Cung (Mở khóa, Điểm Xanh)
  static const Color perfumeRiverTeal = Color(0xFF1E6B7B); // Xanh Ngọc Sông Hương
  static const Color emeraldGreen = Color(0xFF2E7D32);     // Xanh Du lịch Sinh thái
  static const Color backgroundCloud = Color(0xFFF8F9FA);  // Trắng Khói
  static const Color cardSurface = Colors.white;
  static const Color textDark = Color(0xFF212121);
  static const Color textMuted = Color(0xFF757575);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: backgroundCloud,
      colorScheme: ColorScheme.fromSeed(
        seedColor: royalViolet,
        primary: royalViolet,
        secondary: imperialGold,
        tertiary: perfumeRiverTeal,
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: royalViolet,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          letterSpacing: 0.5,
          color: Colors.white,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: royalViolet,
          foregroundColor: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 14),
          elevation: 2,
        ),
      ),
      cardTheme: CardTheme(
        color: cardSurface,
        elevation: 3,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
    );
  }
}
