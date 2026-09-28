import 'package:flutter/material.dart';
import 'package:vvu_fitness_core/core/theme/app_theme.dart';
import 'package:vvu_fitness_core/core/state/fitcore_state.dart';

class GatekeeperConsoleScreen extends StatelessWidget {
  final FitCoreState state;

  const GatekeeperConsoleScreen({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: FitCoreColors.canvas,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Desk Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Gatekeeper Desk Console',
                        style: TextStyle(
                          color: FitCoreColors.textPrimary,
                          fontSize: 20,
                          fontWeight: FontWeight.w800,
                          letterSpacing: -0.5,
                        ),
                      ),
                      SizedBox(height: 2),
                      Text(
                        'Station: Main Rec Turnstile A',
                        style: TextStyle(color: FitCoreColors.textSecondary, fontSize: 13),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: FitCoreColors.successContainer,
                      borderRadius: BorderRadius.circular(FitCoreRadius.pill),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.wifi_tethering, color: FitCoreColors.success, size: 14),
                        SizedBox(width: 4),
                        Text('ONLINE', style: TextStyle(color: FitCoreColors.success, fontWeight: FontWeight.bold, fontSize: 11)),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 18),

              // Occupancy Gauge Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: FitCoreColors.surface,
                  borderRadius: BorderRadius.circular(FitCoreRadius.card),
                  border: Border.all(color: FitCoreColors.border),
                ),
                child: Row(
                  children: [
                    Stack(
                      alignment: Alignment.center,
                      children: [
                        SizedBox(
                          width: 58,
                          height: 58,
                          child: CircularProgressIndicator(
                            value: state.currentInsideCount / state.maxCapacity,
                            backgroundColor: FitCoreColors.border,
                            valueColor: const AlwaysStoppedAnimation<Color>(FitCoreColors.primary),
                            strokeWidth: 6,
                          ),
                        ),
                        Text(
                          '${((state.currentInsideCount / state.maxCapacity) * 100).toInt()}%',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
                        ),
                      ],
                    ),
                    const SizedBox(width: 16),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Live Gym Capacity', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                        const SizedBox(height: 2),
                        Text(
                          '${state.currentInsideCount} / ${state.maxCapacity} Members inside',
                          style: const TextStyle(color: FitCoreColors.textSecondary, fontSize: 13),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Dynamic Daily QR Projection Station
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: FitCoreColors.surface,
                  borderRadius: BorderRadius.circular(FitCoreRadius.card),
                  border: Border.all(color: FitCoreColors.border),
                  boxShadow: [
                    BoxShadow(
                      color: FitCoreColors.textPrimary.withValues(alpha: 0.04),
                      blurRadius: 12,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: FitCoreColors.primaryContainer,
                        borderRadius: BorderRadius.circular(FitCoreRadius.pill),
                      ),
                      child: const Text(
                        'DAILY CHECK-IN QR • ACTIVE',
                        style: TextStyle(color: FitCoreColors.primaryDark, fontWeight: FontWeight.bold, fontSize: 10),
                      ),
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'Fall Semester Open Gym',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: FitCoreColors.textPrimary),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'Students scan this display to log attendance',
                      style: TextStyle(color: FitCoreColors.textSecondary, fontSize: 12),
                    ),
                    const SizedBox(height: 16),
                    // Large QR Simulation
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: FitCoreColors.canvas,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: FitCoreColors.border),
                      ),
                      child: const Icon(
                        Icons.qr_code_2_rounded,
                        size: 140,
                        color: FitCoreColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 14),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.refresh_rounded, size: 14, color: FitCoreColors.textSecondary),
                        SizedBox(width: 4),
                        Text('Rotates automatically in 04:42', style: TextStyle(fontSize: 11, color: FitCoreColors.textSecondary)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Manual Entry Override Search Bar
              TextField(
                decoration: InputDecoration(
                  hintText: 'Manual Search (Student ID or Name)...',
                  hintStyle: const TextStyle(color: FitCoreColors.textTertiary, fontSize: 13),
                  prefixIcon: const Icon(Icons.search_rounded, color: FitCoreColors.textSecondary),
                  suffixIcon: Container(
                    margin: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: FitCoreColors.primary,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Icon(Icons.check, color: Colors.white, size: 18),
                  ),
                  filled: true,
                  fillColor: FitCoreColors.surface,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(FitCoreRadius.button),
                    borderSide: const BorderSide(color: FitCoreColors.border),
                  ),
                  enabledBorder: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(FitCoreRadius.button),
                    borderSide: const BorderSide(color: FitCoreColors.border),
                  ),
                ),
              ),
              const SizedBox(height: 24),

              // Live Entry Stream
              const Text(
                'Live Turnstile Entry Stream',
                style: TextStyle(color: FitCoreColors.textPrimary, fontSize: 16, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 12),
              ...state.attendanceHistory.map(
                (att) => Container(
                  margin: const EdgeInsets.only(bottom: 8),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: FitCoreColors.surface,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: FitCoreColors.border),
                  ),
                  child: Row(
                    children: [
                      CircleAvatar(
                        radius: 18,
                        backgroundColor: FitCoreColors.primaryContainer,
                        child: Text(
                          att.memberName.isNotEmpty ? att.memberName[0] : 'S',
                          style: const TextStyle(fontWeight: FontWeight.bold, color: FitCoreColors.primaryDark),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              att.memberName,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: FitCoreColors.textPrimary),
                            ),
                            Text(
                              'ID: ${att.studentId} • Just scanned',
                              style: const TextStyle(color: FitCoreColors.textSecondary, fontSize: 11),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: FitCoreColors.successContainer,
                          borderRadius: BorderRadius.circular(FitCoreRadius.pill),
                        ),
                        child: const Text(
                          'ENTRY GRANTED',
                          style: TextStyle(color: FitCoreColors.success, fontWeight: FontWeight.bold, fontSize: 10),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
