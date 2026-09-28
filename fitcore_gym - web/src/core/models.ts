/* ═══════════════════════════════════════════════════════════════
   FitCore — Data Models (TypeScript Port)
   ═══════════════════════════════════════════════════════════════ */

export const UserRole = {
  User: 'user',
  Admin: 'admin',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const CheckInStatus = {
  Verified: 'verified',
  ManualOverride: 'manualOverride',
  Flagged: 'flagged',
} as const;
export type CheckInStatus = (typeof CheckInStatus)[keyof typeof CheckInStatus];

export interface Member {
  id: string;
  studentId: string;
  fullName: string;
  department: string;
  photoUrl: string;
  role: UserRole;
  streakDays: number;
  weeklySessionsCompleted: number;
  weeklySessionsGoal: number;
  registeredAt: Date;
  tuitionVerified: boolean;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  studentId: string;
  checkInTime: Date;
  gateLocation: string;
  duration: string;
  status: CheckInStatus;
  qrTokenHash: string;
}

export interface StaffPermission {
  staffId: string;
  staffName: string;
  station: string;
  enableManualOverrides: boolean;
  dailyQrRegeneration: boolean;
  allowProfileEdits: boolean;
}
