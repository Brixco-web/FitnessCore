import 'package:flutter_test/flutter_test.dart';
import 'package:vvu_fitness_core/main.dart';
import 'package:vvu_fitness_core/core/state/fitcore_state.dart';
import 'package:vvu_fitness_core/core/models/app_models.dart';

void main() {
  group('FitCore State Tests', () {
    test('Initial state loads active member and pending members', () {
      final state = FitCoreState();
      expect(state.currentRole, equals(UserRole.user));
      expect(state.activeMember.fullName, equals('Alex Morgan'));
      expect(state.pendingMembers.length, equals(3));
    });

    test('Approving a member removes them from pending queue', () {
      final state = FitCoreState();
      final targetId = state.pendingMembers.first.id;
      state.approveMember(targetId);
      expect(state.pendingMembers.any((m) => m.id == targetId), isFalse);
    });

    test('Self check-in increments streak and adds attendance record', () {
      final state = FitCoreState();
      final initialStreak = state.activeMember.streakDays;
      final initialRecords = state.attendanceHistory.length;

      state.registerSelfCheckIn();

      expect(state.activeMember.streakDays, equals(initialStreak + 1));
      expect(state.attendanceHistory.length, equals(initialRecords + 1));
    });
  });

  group('FitCore App Widget Test', () {
    testWidgets('App renders role switcher banner and member portal', (WidgetTester tester) async {
      await tester.pumpWidget(const FitCoreApp());
      await tester.pumpAndSettle();

      expect(find.text('TEST ROLE:'), findsOneWidget);
      expect(find.text('User (Member)'), findsOneWidget);
      expect(find.text('Admin'), findsOneWidget);
      expect(find.text('Welcome back,'), findsOneWidget);
      expect(find.text('Scan Gym QR Station'), findsOneWidget);
    });
  });
}
