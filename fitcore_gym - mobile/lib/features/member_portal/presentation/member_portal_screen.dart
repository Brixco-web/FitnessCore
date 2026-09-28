import 'package:flutter/material.dart';
import 'package:vvu_fitness_core/core/theme/app_theme.dart';
import 'package:vvu_fitness_core/core/state/fitcore_state.dart';

class MemberPortalScreen extends StatelessWidget {
  final FitCoreState state;

  const MemberPortalScreen({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    final member = state.activeMember;

    return Scaffold(
      backgroundColor: FitCoreColors.canvas,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Welcome back,',
                        style: TextStyle(
                          color: FitCoreColors.textSecondary,
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        member.fullName,
                        style: const TextStyle(
                          color: FitCoreColors.textPrimary,
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                          letterSpacing: -0.5,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: FitCoreColors.surface,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: FitCoreColors.border),
                    ),
                    child: const Icon(
                      Icons.notifications_none_rounded,
                      color: FitCoreColors.textPrimary,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Motivational Streak Widget
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: FitCoreColors.surface,
                  borderRadius: BorderRadius.circular(FitCoreRadius.card),
                  border: Border.all(color: FitCoreColors.border),
                  boxShadow: [
                    BoxShadow(
                      color: FitCoreColors.textPrimary.withValues(alpha: 0.03),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                          decoration: BoxDecoration(
                            color: FitCoreColors.primaryContainer,
                            borderRadius: BorderRadius.circular(FitCoreRadius.pill),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.local_fire_department_rounded, color: FitCoreColors.primary, size: 20),
                              const SizedBox(width: 4),
                              Text(
                                '${member.streakDays}-Day Streak',
                                style: const TextStyle(
                                  color: FitCoreColors.primaryDark,
                                  fontWeight: FontWeight.w800,
                                  fontSize: 13,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const Spacer(),
                        Text(
                          '${member.weeklySessionsCompleted}/${member.weeklySessionsGoal} weekly target',
                          style: TextStyle(
                            color: FitCoreColors.textSecondary,
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: LinearProgressIndicator(
                        value: member.weeklySessionsCompleted / member.weeklySessionsGoal,
                        backgroundColor: FitCoreColors.border,
                        valueColor: const AlwaysStoppedAnimation<Color>(FitCoreColors.primary),
                        minHeight: 8,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Digital Pass Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(FitCoreRadius.card),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF0F172A).withValues(alpha: 0.15),
                      blurRadius: 16,
                      offset: const Offset(0, 8),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(6),
                              decoration: BoxDecoration(
                                color: FitCoreColors.primary,
                                borderRadius: BorderRadius.circular(8),
                              ),
                              child: const Text('F', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16)),
                            ),
                            const SizedBox(width: 8),
                            const Text(
                              'FitCore Pass',
                              style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 16),
                            ),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: FitCoreColors.success.withValues(alpha: 0.2),
                            borderRadius: BorderRadius.circular(FitCoreRadius.pill),
                            border: Border.all(color: FitCoreColors.success.withValues(alpha: 0.4)),
                          ),
                          child: const Text(
                            'ACTIVE MEMBER',
                            style: TextStyle(color: Color(0xFF4ADE80), fontWeight: FontWeight.w800, fontSize: 10, letterSpacing: 0.5),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    Text(
                      member.fullName,
                      style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'ID: ${member.studentId} • ${member.department}',
                      style: TextStyle(color: Colors.white.withValues(alpha: 0.7), fontSize: 12),
                    ),
                    const SizedBox(height: 20),
                    Container(
                      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 14),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Icon(Icons.qr_code_2_rounded, color: FitCoreColors.textPrimary, size: 28),
                          Text(
                            'VALID • FALL 2026',
                            style: TextStyle(color: FitCoreColors.textPrimary, fontWeight: FontWeight.w800, fontSize: 12, letterSpacing: 1),
                          ),
                          const Icon(Icons.check_circle_rounded, color: FitCoreColors.success, size: 20),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Quick Action CTA
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton.icon(
                  onPressed: () {
                    state.registerSelfCheckIn();
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('✓ Checked into Main Rec Center! Streak updated.'),
                        backgroundColor: FitCoreColors.success,
                      ),
                    );
                  },
                  icon: const Icon(Icons.qr_code_scanner_rounded, color: Colors.white),
                  label: const Text(
                    'Scan Gym QR Station',
                    style: TextStyle(color: Colors.white, fontSize: 15, fontWeight: FontWeight.bold),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: FitCoreColors.primary,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(FitCoreRadius.button),
                    ),
                    elevation: 0,
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Upcoming Events / Notices
              const Text(
                'Upcoming Gym Events',
                style: TextStyle(color: FitCoreColors.textPrimary, fontSize: 16, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 12),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    _eventCard('CrossFit Workshop', 'Tomorrow 5:00 PM', 'Coach Michael', FitCoreColors.primary),
                    const SizedBox(width: 12),
                    _eventCard('Gym Maintenance Notice', 'Friday 6 AM - 8 AM', 'North Bay Closed', FitCoreColors.warning),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Wall of Fame Leaderboard Preview
              const Text(
                'Top Members This Month',
                style: TextStyle(color: FitCoreColors.textPrimary, fontSize: 16, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 12),
              _leaderboardRow('🥇', 'Alex Morgan (You)', '24 Sessions', true),
              _leaderboardRow('🥈', 'Kofi Addo', '22 Sessions', false),
              _leaderboardRow('🥉', 'Grace Ohene', '21 Sessions', false),
            ],
          ),
        ),
      ),
    );
  }

  Widget _eventCard(String title, String time, String subtext, Color accent) {
    return Container(
      width: 220,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: FitCoreColors.surface,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: FitCoreColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(width: 6, height: 6, decoration: BoxDecoration(color: accent, shape: BoxShape.circle)),
              const SizedBox(width: 6),
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: FitCoreColors.textPrimary),
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(time, style: const TextStyle(color: FitCoreColors.textSecondary, fontSize: 12, fontWeight: FontWeight.w600)),
          const SizedBox(height: 2),
          Text(subtext, style: const TextStyle(color: FitCoreColors.textTertiary, fontSize: 11)),
        ],
      ),
    );
  }

  Widget _leaderboardRow(String medal, String name, String sessions, bool isYou) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: isYou ? FitCoreColors.primaryContainer.withValues(alpha: 0.5) : FitCoreColors.surface,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: isYou ? FitCoreColors.primary.withValues(alpha: 0.3) : FitCoreColors.border),
      ),
      child: Row(
        children: [
          Text(medal, style: const TextStyle(fontSize: 18)),
          const SizedBox(width: 12),
          Expanded(
            child: Text(
              name,
              style: TextStyle(
                fontWeight: isYou ? FontWeight.bold : FontWeight.w600,
                color: FitCoreColors.textPrimary,
                fontSize: 13,
              ),
            ),
          ),
          Text(
            sessions,
            style: const TextStyle(fontWeight: FontWeight.w700, color: FitCoreColors.primaryDark, fontSize: 13),
          ),
        ],
      ),
    );
  }
}
