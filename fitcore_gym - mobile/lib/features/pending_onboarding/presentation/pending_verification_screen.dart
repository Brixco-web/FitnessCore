import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';
import '../../core/state/fitcore_state.dart';

class PendingVerificationScreen extends StatelessWidget {
  final FitCoreState state;

  const PendingVerificationScreen({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: FitCoreColors.canvas,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              const Text(
                'Registration Status',
                style: TextStyle(
                  color: FitCoreColors.textPrimary,
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                  letterSpacing: -0.5,
                ),
              ),
              const SizedBox(height: 20),

              // Amber Warning Banner
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(18),
                decoration: BoxDecoration(
                  color: FitCoreColors.warningContainer,
                  borderRadius: BorderRadius.circular(FitCoreRadius.card),
                  border: Border.all(color: FitCoreColors.warning.withValues(alpha: 0.3)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.all(6),
                          decoration: BoxDecoration(
                            color: FitCoreColors.warning,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Icon(Icons.hourglass_top_rounded, color: Colors.white, size: 20),
                        ),
                        const SizedBox(width: 10),
                        const Text(
                          'Pending Verification',
                          style: TextStyle(
                            color: FitCoreColors.textPrimary,
                            fontWeight: FontWeight.w800,
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    const Text(
                      'Your student account is awaiting Super Admin verification and physical membership payment confirmation at the front desk.',
                      style: TextStyle(
                        color: FitCoreColors.textPrimary,
                        fontSize: 13,
                        height: 1.4,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              // Progress Stepper
              const Text(
                'Onboarding Progress',
                style: TextStyle(color: FitCoreColors.textPrimary, fontSize: 16, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 16),

              _stepItem(
                stepNum: '1',
                title: 'Account Details Submitted',
                subtitle: 'Student ID & biometric profile recorded',
                isCompleted: true,
                isActive: false,
              ),
              _stepConnector(isCompleted: true),
              _stepItem(
                stepNum: '2',
                title: 'ID & Payment Verification',
                subtitle: 'Front desk admin is reviewing your dues',
                isCompleted: false,
                isActive: true,
              ),
              _stepConnector(isCompleted: false),
              _stepItem(
                stepNum: '3',
                title: 'Digital Gym Pass Activation',
                subtitle: 'QR turnstile check-in unlocks upon approval',
                isCompleted: false,
                isActive: false,
              ),

              const Spacer(),

              // Help / Desk Action
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
                    const Icon(Icons.info_outline_rounded, color: FitCoreColors.textSecondary),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Text(
                        'Need quick access? Visit Desk Turnstile A with your student ID card.',
                        style: TextStyle(fontSize: 12, color: FitCoreColors.textSecondary),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _stepItem({
    required String stepNum,
    required String title,
    required String subtitle,
    required bool isCompleted,
    required bool isActive,
  }) {
    Color circleColor = FitCoreColors.border;
    Color textColor = FitCoreColors.textTertiary;
    Widget innerIcon = Text(stepNum, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.white));

    if (isCompleted) {
      circleColor = FitCoreColors.success;
      innerIcon = const Icon(Icons.check, size: 14, color: Colors.white);
    } else if (isActive) {
      circleColor = FitCoreColors.warning;
      textColor = FitCoreColors.textPrimary;
    }

    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          width: 28,
          height: 28,
          decoration: BoxDecoration(color: circleColor, shape: BoxShape.circle),
          alignment: Alignment.center,
          child: innerIcon,
        ),
        const SizedBox(width: 14),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  fontSize: 14,
                  color: isCompleted || isActive ? FitCoreColors.textPrimary : textColor,
                ),
              ),
              const SizedBox(height: 2),
              Text(
                subtitle,
                style: const TextStyle(fontSize: 12, color: FitCoreColors.textSecondary),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _stepConnector({required bool isCompleted}) {
    return Container(
      margin: const EdgeInsets.only(left: 13, top: 4, bottom: 4),
      width: 2,
      height: 28,
      color: isCompleted ? FitCoreColors.success : FitCoreColors.border,
    );
  }
}
