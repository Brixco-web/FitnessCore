import 'package:flutter/foundation.dart';
import '../models/app_models.dart';

class FitCoreState extends ChangeNotifier {
  // Current active preview role
  UserRole _currentRole = UserRole.user;
  UserRole get currentRole => _currentRole;

  // Active user profile
  late Member _activeMember;
  Member get activeMember => _activeMember;

  // Pending members queue for Super Admin
  List<Member> _pendingMembers = [];
  List<Member> get pendingMembers => List.unmodifiable(_pendingMembers);

  // Live gym attendance stream
  List<AttendanceRecord> _attendanceHistory = [];
  List<AttendanceRecord> get attendanceHistory => List.unmodifiable(_attendanceHistory);

  // Staff permissions
  List<StaffPermission> _staffList = [];
  List<StaffPermission> get staffList => List.unmodifiable(_staffList);

  // Live capacity
  int _currentInsideCount = 64;
  final int maxCapacity = 100;
  int get currentInsideCount => _currentInsideCount;

  FitCoreState() {
    _initializeMockData();
  }

  void _initializeMockData() {
    _activeMember = Member(
      id: 'usr_01',
      studentId: 'VVU-2024-5519',
      fullName: 'Alex Morgan',
      department: 'Sports Science & Kinesiology',
      photoUrl: '',
      role: UserRole.user,
      streakDays: 12,
      weeklySessionsCompleted: 3,
      weeklySessionsGoal: 4,
      registeredAt: DateTime.now().subtract(const Duration(days: 45)),
      tuitionVerified: true,
    );

    _pendingMembers = [
      Member(
        id: 'usr_02',
        studentId: 'VVU-2024-8841',
        fullName: 'Kwame Mensah',
        department: 'Computer Science',
        photoUrl: '',
        role: UserRole.user,
        registeredAt: DateTime.now().subtract(const Duration(hours: 2)),
        tuitionVerified: true,
      ),
      Member(
        id: 'usr_03',
        studentId: 'VVU-2024-9102',
        fullName: 'Amina Bello',
        department: 'Nursing',
        photoUrl: '',
        role: UserRole.user,
        registeredAt: DateTime.now().subtract(const Duration(hours: 5)),
        tuitionVerified: false,
      ),
      Member(
        id: 'usr_04',
        studentId: 'VVU-2024-7719',
        fullName: 'Marcus Vance',
        department: 'Business Administration',
        photoUrl: '',
        role: UserRole.user,
        registeredAt: DateTime.now().subtract(const Duration(hours: 8)),
        tuitionVerified: true,
      ),
    ];

    _attendanceHistory = [
      AttendanceRecord(
        id: 'att_01',
        memberId: 'usr_01',
        memberName: 'Alex Morgan',
        studentId: 'VVU-2024-5519',
        checkInTime: DateTime.now().subtract(const Duration(minutes: 18)),
        gateLocation: 'Main Rec Center Turnstile A',
        duration: '1h 10m',
        status: CheckInStatus.verified,
        qrTokenHash: '#FC-9401-8829',
      ),
      AttendanceRecord(
        id: 'att_02',
        memberId: 'usr_09',
        memberName: 'Elena Rostova',
        studentId: 'VVU-2024-3321',
        checkInTime: DateTime.now().subtract(const Duration(minutes: 34)),
        gateLocation: 'Olympic Bay Turnstile B',
        duration: '45m',
        status: CheckInStatus.verified,
        qrTokenHash: '#FC-8812-3391',
      ),
      AttendanceRecord(
        id: 'att_03',
        memberId: 'usr_12',
        memberName: 'David Osei',
        studentId: 'VVU-2024-1180',
        checkInTime: DateTime.now().subtract(const Duration(hours: 1, minutes: 12)),
        gateLocation: 'Main Rec Center Turnstile A',
        duration: '1h 35m',
        status: CheckInStatus.manualOverride,
        qrTokenHash: '#FC-OVERRIDE-MANUAL',
      ),
    ];

    _staffList = [
      const StaffPermission(
        staffId: 'stf_01',
        staffName: 'Kofi Boateng',
        station: 'Desk Supervisor • North Gate',
        enableManualOverrides: true,
        dailyQrRegeneration: true,
        allowProfileEdits: false,
      ),
      const StaffPermission(
        staffId: 'stf_02',
        staffName: 'Sarah Lin',
        station: 'Shift Gatekeeper • Olympic Bay',
        enableManualOverrides: true,
        dailyQrRegeneration: false,
        allowProfileEdits: false,
      ),
    ];
  }

  void switchRole(UserRole newRole) {
    _currentRole = newRole;
    notifyListeners();
  }

  void approveMember(String memberId) {
    final index = _pendingMembers.indexWhere((m) => m.id == memberId);
    if (index != -1) {
      _pendingMembers.removeAt(index);
      notifyListeners();
    }
  }

  void rejectMember(String memberId) {
    _pendingMembers.removeWhere((m) => m.id == memberId);
    notifyListeners();
  }

  void registerSelfCheckIn() {
    _attendanceHistory.insert(
      0,
      AttendanceRecord(
        id: 'att_${DateTime.now().millisecondsSinceEpoch}',
        memberId: _activeMember.id,
        memberName: _activeMember.fullName,
        studentId: _activeMember.studentId,
        checkInTime: DateTime.now(),
        gateLocation: 'Main Rec Turnstile A',
        duration: 'Just Started',
        status: CheckInStatus.verified,
        qrTokenHash: '#FC-${DateTime.now().millisecondsSinceEpoch % 10000}',
      ),
    );
    _currentInsideCount = (_currentInsideCount + 1).clamp(0, maxCapacity);
    _activeMember = _activeMember.copyWith(
      streakDays: _activeMember.streakDays + 1,
      weeklySessionsCompleted: _activeMember.weeklySessionsCompleted + 1,
    );
    notifyListeners();
  }

  void toggleStaffOverride(String staffId) {
    final idx = _staffList.indexWhere((s) => s.staffId == staffId);
    if (idx != -1) {
      final current = _staffList[idx];
      _staffList[idx] = current.copyWith(
        enableManualOverrides: !current.enableManualOverrides,
      );
      notifyListeners();
    }
  }

  void toggleStaffQrRegen(String staffId) {
    final idx = _staffList.indexWhere((s) => s.staffId == staffId);
    if (idx != -1) {
      final current = _staffList[idx];
      _staffList[idx] = current.copyWith(
        dailyQrRegeneration: !current.dailyQrRegeneration,
      );
      notifyListeners();
    }
  }
}
