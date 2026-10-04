import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'core/theme/app_theme.dart';
import 'features/map/presentation/screens/huego_map_screen.dart';
import 'features/itinerary/presentation/screens/itinerary_planner_screen.dart';
import 'features/random_wheel/presentation/screens/random_wheel_screen.dart';
import 'features/ai_guide/presentation/screens/ai_guide_screen.dart';
import 'features/gamification/presentation/screens/green_points_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const HuegoApp());
}

class HuegoApp extends StatelessWidget {
  const HuegoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HUEGO – Khám Phá Huế Thông Minh',
      debugShowCheckedModeBanner: false,
      theme: HuegoTheme.lightTheme,
      home: const MainNavigationScreen(),
      builder: (context, child) {
        if (kIsWeb) {
          return Container(
            color: const Color(0xFF150B22),
            child: Center(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(40),
                child: Container(
                  width: 412,
                  height: 840,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(40),
                    boxShadow: const [
                      BoxShadow(
                        color: Colors.black54,
                        blurRadius: 40,
                        spreadRadius: 8,
                        offset: Offset(0, 14),
                      ),
                    ],
                    border: Border.all(color: Colors.white24, width: 4),
                  ),
                  child: child,
                ),
              ),
            ),
          );
        }
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
