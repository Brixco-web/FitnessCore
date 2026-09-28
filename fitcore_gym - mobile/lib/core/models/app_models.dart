enum UserRole {
  memberActive,
  memberPending,
  subManager,
  superAdmin,
}

enum CheckInStatus {
  verified,
  manualOverride,
  flagged,
}

class Member {
  final String id;
  final String studentId;
  final String fullName;
  final String department;
  final String photoUrl;
  final UserRole role;
  final int streakDays;
  final int weeklySessionsCompleted;
  final int weeklySessionsGoal;
  final DateTime registeredAt;
  final bool tuitionVerified;

  const Member({
    required this.id,
    required this.studentId,
    required this.fullName,
    required this.department,
    required this.photoUrl,
    required this.role,
    this.streakDays = 0,
    this.weeklySessionsCompleted = 0,
    this.weeklySessionsGoal = 4,
    required this.registeredAt,
    this.tuitionVerified = false,
  });

  Member copyWith({
    UserRole? role,
    int? streakDays,
    int? weeklySessionsCompleted,
    bool? tuitionVerified,
  }) {
    return Member(
      id: id,
      studentId: studentId,
      fullName: fullName,
      department: department,
      photoUrl: photoUrl,
      role: role ?? this.role,
      streakDays: streakDays ?? this.streakDays,
      weeklySessionsCompleted: weeklySessionsCompleted ?? this.weeklySessionsCompleted,
      weeklySessionsGoal: weeklySessionsGoal,
      registeredAt: registeredAt,
      tuitionVerified: tuitionVerified ?? this.tuitionVerified,
    );
  }
}

class AttendanceRecord {
  final String id;
  final String memberId;
  final String memberName;
  final String studentId;
  final DateTime checkInTime;
  final String gateLocation;
  final String duration;
  final CheckInStatus status;
  final String qrTokenHash;

  const AttendanceRecord({
    required this.id,
    required this.memberId,
    required this.memberName,
    required this.studentId,
    required this.checkInTime,
    required this.gateLocation,
    required this.duration,
    required this.status,
    required this.qrTokenHash,
  });
}

class StaffPermission {
  final String staffId;
  final String staffName;
  final String station;
  final bool enableManualOverrides;
  final bool dailyQrRegeneration;
  final bool allowProfileEdits;

  const StaffPermission({
    required this.staffId,
    required this.staffName,
    required this.station,
    this.enableManualOverrides = true,
    this.dailyQrRegeneration = true,
    this.allowProfileEdits = false,
  });

  StaffPermission copyWith({
    bool? enableManualOverrides,
    bool? dailyQrRegeneration,
    bool? allowProfileEdits,
  }) {
    return StaffPermission(
      staffId: staffId,
      staffName: staffName,
      station: station,
      enableManualOverrides: enableManualOverrides ?? this.enableManualOverrides,
      dailyQrRegeneration: dailyQrRegeneration ?? this.dailyQrRegeneration,
      allowProfileEdits: allowProfileEdits ?? this.allowProfileEdits,
    );
  }
}
