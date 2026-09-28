import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';
import '../../core/state/fitcore_state.dart';

class SuperAdminHubScreen extends StatelessWidget {
  final FitCoreState state;

  const SuperAdminHubScreen({super.key, required this.state});

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
              // Admin Header
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Super Admin Hub',
                        style: TextStyle(
                          color: FitCoreColors.textPrimary,
                          fontSize: 22,
                          fontWeight: FontWeight.w800,
                          letterSpacing: -0.5,
                        ),
                      ),
                      SizedBox(height: 2),
                      Text(
                        'Valley View University Rec Center',
                        style: TextStyle(color: FitCoreColors.textSecondary, fontSize: 13),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: FitCoreColors.surface,
                      borderRadius: BorderRadius.circular(FitCoreRadius.pill),
                      border: Border.all(color: FitCoreColors.border),
                    ),
                    child: const Row(
                      children: [
                        CircleAvatar(radius: 8, backgroundColor: FitCoreColors.primary),
                        SizedBox(width: 6),
                        Text('Director Sarah', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 18),

              // KPI Analytics Cards
              Row(
                children: [
                  _kpiCard('Active Members', '1,248', '+12%', FitCoreColors.primary),
                  const SizedBox(width: 10),
                  _kpiCard('Daily Peak', '4:30 - 7 PM', '88/hr', FitCoreColors.warning),
                  const SizedBox(width: 10),
                  _kpiCard('Monthly Visits', '8,420', '94%', FitCoreColors.success),
                ],
              ),
              const SizedBox(height: 24),

              // Pending Approvals Queue
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Pending Approvals (${state.pendingMembers.length})',
                    style: const TextStyle(color: FitCoreColors.textPrimary, fontSize: 16, fontWeight: FontWeight.w700),
                  ),
                  Text(
                    'Priority Queue',
                    style: TextStyle(color: FitCoreColors.warning, fontWeight: FontWeight.bold, fontSize: 12),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              if (state.pendingMembers.isEmpty)
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: FitCoreColors.surface,
                    borderRadius: BorderRadius.circular(FitCoreRadius.card),
                    border: Border.all(color: FitCoreColors.border),
                  ),
                  child: const Center(
                    child: Text('All pending student registrations verified!', style: TextStyle(color: FitCoreColors.textSecondary)),
                  ),
                )
              else
                ...state.pendingMembers.map(
                  (member) => Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    padding: const EdgeInsets.all(14),
                    decoration: BoxDecoration(
                      color: FitCoreColors.surface,
                      borderRadius: BorderRadius.circular(FitCoreRadius.card),
                      border: Border.all(color: FitCoreColors.border),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            CircleAvatar(
                              radius: 18,
                              backgroundColor: FitCoreColors.primaryContainer,
                              child: Text(member.fullName[0], style: const TextStyle(fontWeight: FontWeight.bold, color: FitCoreColors.primaryDark)),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(member.fullName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                                  Text('ID: ${member.studentId} • ${member.department}', style: const TextStyle(color: FitCoreColors.textSecondary, fontSize: 11)),
                                ],
                              ),
                            ),
                            if (member.tuitionVerified)
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: FitCoreColors.successContainer,
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: const Text('Tuition Paid', style: TextStyle(color: FitCoreColors.success, fontSize: 10, fontWeight: FontWeight.bold)),
                              ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Expanded(
                              child: OutlinedButton(
                                onPressed: () {
                                  state.rejectMember(member.id);
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(content: Text('Registration rejected for ${member.fullName}')),
                                  );
                                },
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: FitCoreColors.error,
                                  side: BorderSide(color: FitCoreColors.error.withValues(alpha: 0.5)),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                ),
                                child: const Text('Reject'),
                              ),
                            ),
                            const SizedBox(width: 10),
                            Expanded(
                              child: ElevatedButton(
                                onPressed: () {
                                  state.approveMember(member.id);
                                  ScaffoldMessenger.of(context).showSnackBar(
                                    SnackBar(
                                      content: Text('✓ ${member.fullName} approved! Digital Pass activated.'),
                                      backgroundColor: FitCoreColors.success,
                                    ),
                                  );
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: FitCoreColors.success,
                                  foregroundColor: Colors.white,
                                  elevation: 0,
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                                ),
                                child: const Text('Approve Pass'),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              const SizedBox(height: 20),

              // Staff Provisioning & Permission Matrix
              const Text(
                'Staff & Gatekeeper Permissions',
                style: TextStyle(color: FitCoreColors.textPrimary, fontSize: 16, fontWeight: FontWeight.w700),
              ),
              const SizedBox(height: 12),
              ...state.staffList.map(
                (staff) => Container(
                  margin: const EdgeInsets.only(bottom: 12),
                  padding: const EdgeInsets.all(14),
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
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(staff.staffName, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                              Text(staff.station, style: const TextStyle(color: FitCoreColors.textSecondary, fontSize: 11)),
                            ],
                          ),
                          const Icon(Icons.shield_outlined, color: FitCoreColors.primary, size: 20),
                        ],
                      ),
                      const Divider(height: 20),
                      SwitchListTile(
                        title: const Text('Manual Check-in Override', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                        subtitle: const Text('Allow checking in students without phones', style: TextStyle(fontSize: 10)),
                        value: staff.enableManualOverrides,
                        activeColor: FitCoreColors.primary,
                        contentPadding: EdgeInsets.zero,
                        dense: true,
                        onChanged: (val) => state.toggleStaffOverride(staff.staffId),
                      ),
                      SwitchListTile(
                        title: const Text('Daily QR Station Regeneration', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                        subtitle: const Text('Permission to refresh daily event codes', style: TextStyle(fontSize: 10)),
                        value: staff.dailyQrRegeneration,
                        activeColor: FitCoreColors.primary,
                        contentPadding: EdgeInsets.zero,
                        dense: true,
                        onChanged: (val) => state.toggleStaffQrRegen(staff.staffId),
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

  Widget _kpiCard(String label, String value, String badge, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: FitCoreColors.surface,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: FitCoreColors.border),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(color: FitCoreColors.textSecondary, fontSize: 10, fontWeight: FontWeight.w600)),
            const SizedBox(height: 6),
            Text(value, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 14, color: FitCoreColors.textPrimary)),
            const SizedBox(height: 4),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
              decoration: BoxDecoration(
                color: color.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(badge, style: TextStyle(color: color, fontSize: 9, fontWeight: FontWeight.bold)),
            ),
          ],
        ),
      ),
    );
  }
}
