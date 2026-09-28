import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';
import '../../core/state/fitcore_state.dart';

class AttendanceCalendarScreen extends StatefulWidget {
  final FitCoreState state;

  const AttendanceCalendarScreen({super.key, required this.state});

  @override
  State<AttendanceCalendarScreen> createState() => _AttendanceCalendarScreenState();
}

class _AttendanceCalendarScreenState extends State<AttendanceCalendarScreen> {
  int _selectedDay = 24;

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
              // Screen Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Activity & Attendance',
                        style: TextStyle(
                          color: FitCoreColors.textPrimary,
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                          letterSpacing: -0.5,
                        ),
                      ),
                      SizedBox(height: 2),
                      Text(
                        'Verified check-in telemetry',
                        style: TextStyle(color: FitCoreColors.textSecondary, fontSize: 13),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: FitCoreColors.primaryContainer,
                      borderRadius: BorderRadius.circular(FitCoreRadius.pill),
                    ),
                    child: const Text(
                      '18 Check-ins',
                      style: TextStyle(color: FitCoreColors.primaryDark, fontWeight: FontWeight.bold, fontSize: 12),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 18),

              // Calendar Grid Container
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: FitCoreColors.surface,
                  borderRadius: BorderRadius.circular(FitCoreRadius.card),
                  border: Border.all(color: FitCoreColors.border),
                ),
                child: Column(
                  children: [
                    // Month Selector
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'September 2026',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: FitCoreColors.textPrimary),
                        ),
                        Row(
                          children: [
                            IconButton(
                              icon: const Icon(Icons.chevron_left, size: 20),
                              onPressed: () {},
                              visualDensity: VisualDensity.compact,
                            ),
                            IconButton(
                              icon: const Icon(Icons.chevron_right, size: 20),
                              onPressed: () {},
                              visualDensity: VisualDensity.compact,
                            ),
                          ],
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    // Weekday headers
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
                          .map((d) => Text(d, style: TextStyle(color: FitCoreColors.textTertiary, fontWeight: FontWeight.bold, fontSize: 12)))
                          .toList(),
                    ),
                    const SizedBox(height: 12),

                    // Calendar Days (Demo month grid)
                    GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 7,
                        mainAxisSpacing: 8,
                        crossAxisSpacing: 8,
                      ),
                      itemCount: 30,
                      itemBuilder: (context, index) {
                        final day = index + 1;
                        final isSelected = day == _selectedDay;
                        final hasAttended = [3, 5, 8, 10, 12, 15, 17, 19, 22, 23, 24].contains(day);

                        return GestureDetector(
                          onTap: () {
                            setState(() {
                              _selectedDay = day;
                            });
                          },
                          child: Container(
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? FitCoreColors.primary
                                  : hasAttended
                                      ? FitCoreColors.successContainer.withValues(alpha: 0.5)
                                      : Colors.transparent,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(
                                color: isSelected
                                    ? FitCoreColors.primary
                                    : hasAttended
                                        ? FitCoreColors.success.withValues(alpha: 0.3)
                                        : Colors.transparent,
                              ),
                            ),
                            child: Stack(
                              alignment: Alignment.center,
                              children: [
                                Text(
                                  '$day',
                                  style: TextStyle(
                                    fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                                    color: isSelected
                                        ? Colors.white
                                        : hasAttended
                                            ? FitCoreColors.success
                                            : FitCoreColors.textPrimary,
                                    fontSize: 12,
                                  ),
                                ),
                                if (hasAttended && !isSelected)
                                  Positioned(
                                    bottom: 4,
                                    child: Container(
                                      width: 4,
                                      height: 4,
                                      decoration: const BoxDecoration(
                                        color: FitCoreColors.success,
                                        shape: BoxShape.circle,
                                      ),
                                    ),
                                  ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Selected Date Detail Bottom Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: FitCoreColors.surface,
                  borderRadius: BorderRadius.circular(FitCoreRadius.card),
                  border: Border.all(color: FitCoreColors.border),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Wednesday, Sep $_selectedDay',
                          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: FitCoreColors.textPrimary),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: FitCoreColors.successContainer,
                            borderRadius: BorderRadius.circular(FitCoreRadius.pill),
                          ),
                          child: const Row(
                            children: [
                              Icon(Icons.check_circle_rounded, color: FitCoreColors.success, size: 14),
                              SizedBox(width: 4),
                              Text('QR Verified', style: TextStyle(color: FitCoreColors.success, fontWeight: FontWeight.bold, fontSize: 11)),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        _StatChip(label: 'Check-In', value: '07:15 AM'),
                        _StatChip(label: 'Duration', value: '1h 25m'),
                        _StatChip(label: 'Turnstile', value: 'Gate A'),
                      ],
                    ),
                    const SizedBox(height: 14),
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: FitCoreColors.canvas,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(color: FitCoreColors.border),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.qr_code, size: 28, color: FitCoreColors.textPrimary),
                          SizedBox(width: 10),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Dynamic QR Token Scanned', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                              Text('HASH: #FC-9401-8829-VALID', style: TextStyle(color: FitCoreColors.textSecondary, fontSize: 10)),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Recent Chronological Activity Feed
              const Text(
                'Recent Check-in Logs',
                style: TextStyle(color: FitCoreColors.textPrimary, fontSize: 16, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 12),
              ...widget.state.attendanceHistory.map(
                (att) => Container(
                  margin: const EdgeInsets.only(bottom: 10),
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: FitCoreColors.surface,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: FitCoreColors.border),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: FitCoreColors.successContainer,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(Icons.sensors_rounded, color: FitCoreColors.success, size: 20),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              att.gateLocation,
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: FitCoreColors.textPrimary),
                            ),
                            Text(
                              '${att.checkInTime.hour}:${att.checkInTime.minute.toString().padLeft(2, '0')} • Duration: ${att.duration}',
                              style: const TextStyle(color: FitCoreColors.textSecondary, fontSize: 11),
                            ),
                          ],
                        ),
                      ),
                      Text(
                        att.qrTokenHash,
                        style: const TextStyle(fontFamily: 'monospace', fontSize: 10, color: FitCoreColors.textTertiary),
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

class _StatChip extends StatelessWidget {
  final String label;
  final String value;

  const _StatChip({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(color: FitCoreColors.textTertiary, fontSize: 11)),
        const SizedBox(height: 2),
        Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13, color: FitCoreColors.textPrimary)),
      ],
    );
  }
}
