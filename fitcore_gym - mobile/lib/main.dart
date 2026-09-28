import 'package:flutter/material.dart';
import 'core/theme/app_theme.dart';
import 'core/models/app_models.dart';
import 'core/state/fitcore_state.dart';
import 'features/member_portal/presentation/member_portal_screen.dart';
import 'features/attendance_calendar/presentation/attendance_calendar_screen.dart';
import 'features/pending_onboarding/presentation/pending_verification_screen.dart';
import 'features/gatekeeper_console/presentation/gatekeeper_console_screen.dart';
import 'features/super_admin_hub/presentation/super_admin_hub_screen.dart';

void main() {
  runApp(const FitCoreApp());
}

class FitCoreApp extends StatefulWidget {
  const FitCoreApp({super.key});

  @override
  State<FitCoreApp> createState() => _FitCoreAppState();
}

class _FitCoreAppState extends State<FitCoreApp> {
  final FitCoreState _state = FitCoreState();
  int _memberBottomNavIndex = 0;

  @override
  void initState() {
    super.initState();
    _state.addListener(() {
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FitCore Gym',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: FitCoreColors.canvas,
        colorScheme: ColorScheme.fromSeed(
          seedColor: FitCoreColors.primary,
          primary: FitCoreColors.primary,
          surface: FitCoreColors.surface,
        ),
        useMaterial3: true,
      ),
      home: Scaffold(
        body: Column(
          children: [
            // Top Persistent Role-Switcher Tester Banner
            _buildRoleTesterBar(),

            // Main Active Role Interface
            Expanded(
              child: _buildCurrentInterface(),
            ),
          ],
        ),
        bottomNavigationBar: _state.currentRole == UserRole.memberActive
            ? BottomNavigationBar(
                currentIndex: _memberBottomNavIndex,
                onTap: (index) {
                  setState(() {
                    _memberBottomNavIndex = index;
                  });
                },
                selectedItemColor: FitCoreColors.primary,
                unselectedItemColor: FitCoreColors.textSecondary,
                backgroundColor: FitCoreColors.surface,
                elevation: 8,
                items: const [
                  BottomNavigationBarItem(
                    icon: Icon(Icons.dashboard_rounded),
                    label: 'Portal',
                  ),
                  BottomNavigationBarItem(
                    icon: Icon(Icons.calendar_month_rounded),
                    label: 'Calendar & Activity',
                  ),
                ],
              )
            : null,
      ),
    );
  }

  Widget _buildRoleTesterBar() {
    return SafeArea(
      bottom: false,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
        decoration: const BoxDecoration(
          color: Color(0xFF0F172A),
          border: Border(bottom: BorderSide(color: Color(0xFF1E293B))),
        ),
        child: SingleChildScrollView(
          scrollDirection: Axis.horizontal,
          child: Row(
            children: [
              const Row(
                children: [
                  Icon(Icons.tune_rounded, color: FitCoreColors.primary, size: 16),
                  SizedBox(width: 6),
                  Text(
                    'TEST ROLE:',
                    style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 0.5),
                  ),
                  SizedBox(width: 8),
                ],
              ),
              _roleChip('Active Member', UserRole.memberActive),
              _roleChip('Pending Member', UserRole.memberPending),
              _roleChip('Gatekeeper Desk', UserRole.subManager),
              _roleChip('Super Admin', UserRole.superAdmin),
            ],
          ),
        ),
      ),
    );
  }

  Widget _roleChip(String label, UserRole role) {
    final isSelected = _state.currentRole == role;
    return Padding(
      padding: const EdgeInsets.only(right: 6),
      child: ChoiceChip(
        label: Text(
          label,
          style: TextStyle(
            color: isSelected ? Colors.white : Colors.white70,
            fontSize: 11,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
          ),
        ),
        selected: isSelected,
        selectedColor: FitCoreColors.primary,
        backgroundColor: const Color(0xFF1E293B),
        visualDensity: VisualDensity.compact,
        showCheckmark: false,
        padding: const EdgeInsets.symmetric(horizontal: 4),
        onSelected: (_) {
          _state.switchRole(role);
        },
      ),
    );
  }

  Widget _buildCurrentInterface() {
    switch (_state.currentRole) {
      case UserRole.memberActive:
        return _memberBottomNavIndex == 0
            ? MemberPortalScreen(state: _state)
            : AttendanceCalendarScreen(state: _state);
      case UserRole.memberPending:
        return PendingVerificationScreen(state: _state);
      case UserRole.subManager:
        return GatekeeperConsoleScreen(state: _state);
      case UserRole.superAdmin:
        return SuperAdminHubScreen(state: _state);
    }
  }
}
