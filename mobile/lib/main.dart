import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'core/theme/app_theme.dart';
import 'features/map/presentation/screens/huego_map_screen.dart';
import 'features/itinerary/presentation/screens/itinerary_planner_screen.dart';
import 'features/random_wheel/presentation/screens/random_wheel_screen.dart';
import 'features/ai_guide/presentation/screens/ai_guide_screen.dart';
import 'features/gamification/presentation/screens/green_points_screen.dart';
import 'core/services/token_storage_service.dart';
import 'features/auth/presentation/screens/login_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const HuegoApp());
}

class HuegoApp extends StatefulWidget {
  const HuegoApp({super.key});

  @override
  State<HuegoApp> createState() => _HuegoAppState();
}

class _HuegoAppState extends State<HuegoApp> {
  bool _isLoading = true;
  bool _isAuthenticated = false;

  @override
  void initState() {
    super.initState();
    _checkAuth();
  }

  Future<void> _checkAuth() async {
    String? token;
    try {
      token = await TokenStorageService.instance.getAccessToken();
    } catch (e) {
      debugPrint('HUEGO: doc token that bai, coi nhu chua dang nhap: $e');
      try {
        await TokenStorageService.instance.clearTokens();
      } catch (_) {}
    }
    if (!mounted) return;
    setState(() {
      _isAuthenticated = token != null;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const MaterialApp(
        home: Scaffold(
          body: Center(child: CircularProgressIndicator()),
        ),
      );
    }

    return MaterialApp(
      title: 'HUEGO – Khám Phá Huế Thông Minh',
      debugShowCheckedModeBanner: false,
      theme: HuegoTheme.lightTheme,
      home: _isAuthenticated ? const MainNavigationScreen() : const LoginScreen(),
      builder: (context, child) {
        // Hỗ trợ PWA toàn màn hình trên Web (Safari iPhone, Add to Home Screen)
        return child!;
      },
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({Key? key}) : super(key: key);

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    HuegoMapScreen(),
    ItineraryPlannerScreen(),
    RandomWheelScreen(),
    AiGuideScreen(),
    GreenPointsScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (idx) => setState(() => _currentIndex = idx),
        indicatorColor: HuegoTheme.imperialGold.withOpacity(0.3),
        backgroundColor: Colors.white,
        elevation: 8,
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.map_outlined),
            selectedIcon: Icon(Icons.map, color: HuegoTheme.royalViolet),
            label: 'Bản Đồ',
          ),
          NavigationDestination(
            icon: Icon(Icons.route_outlined),
            selectedIcon: Icon(Icons.route, color: HuegoTheme.royalViolet),
            label: 'Lộ Trình',
          ),
          NavigationDestination(
            icon: Icon(Icons.casino_outlined),
            selectedIcon: Icon(Icons.casino, color: HuegoTheme.royalViolet),
            label: 'Vòng Quay',
          ),
          NavigationDestination(
            icon: Icon(Icons.chat_bubble_outline),
            selectedIcon: Icon(Icons.chat_bubble, color: HuegoTheme.royalViolet),
            label: 'O Huế AI',
          ),
          NavigationDestination(
            icon: Icon(Icons.workspace_premium_outlined),
            selectedIcon: Icon(Icons.workspace_premium, color: HuegoTheme.imperialGold),
            label: 'Chứng Nhận',
          ),
        ],
      ),
    );
  }
}
