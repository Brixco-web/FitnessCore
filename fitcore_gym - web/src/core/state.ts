/* ═══════════════════════════════════════════════════════════════
   FitCore — Application State Manager (TypeScript Port)
   Mirrors fitcore_state.dart with reactive listener pattern
   ═══════════════════════════════════════════════════════════════ */

import {
  UserRole,
  CheckInStatus,
  type Member,
  type AttendanceRecord,
  type StaffPermission,
} from './models';

type Listener = () => void;

export class FitCoreState {
  // ── Observable state ──────────────────────────────────────
  private _currentRole: UserRole = UserRole.User;
  private _activeMember!: Member;
  private _pendingMembers: Member[] = [];
  private _attendanceHistory: AttendanceRecord[] = [];
  private _staffList: StaffPermission[] = [];
  private _currentInsideCount = 64;
  readonly maxCapacity = 100;

  // ── Listeners ─────────────────────────────────────────────
  private _listeners: Set<Listener> = new Set();

  constructor() {
    this._initializeMockData();
  }

  // ── Public Getters ────────────────────────────────────────
  get currentRole(): UserRole {
    return this._currentRole;
  }

  get activeMember(): Member {
    return this._activeMember;
  }

  get pendingMembers(): ReadonlyArray<Member> {
    return this._pendingMembers;
  }

  get attendanceHistory(): ReadonlyArray<AttendanceRecord> {
    return this._attendanceHistory;
  }

  get staffList(): ReadonlyArray<StaffPermission> {
    return this._staffList;
  }

  get currentInsideCount(): number {
    return this._currentInsideCount;
  }

  // ── Listener Registration ─────────────────────────────────
  addListener(listener: Listener): void {
    this._listeners.add(listener);
  }

  removeListener(listener: Listener): void {
    this._listeners.delete(listener);
  }

  private _notify(): void {
    this._listeners.forEach((fn) => fn());
  }

  // ── Actions ───────────────────────────────────────────────
  switchRole(newRole: UserRole): void {
    this._currentRole = newRole;
    this._notify();
  }

  approveMember(memberId: string): void {
    const idx = this._pendingMembers.findIndex((m) => m.id === memberId);
    if (idx !== -1) {
      this._pendingMembers.splice(idx, 1);
      this._notify();
    }
  }

  rejectMember(memberId: string): void {
    this._pendingMembers = this._pendingMembers.filter(
      (m) => m.id !== memberId,
    );
    this._notify();
  }

  registerSelfCheckIn(): void {
    const now = new Date();
    const newRecord: AttendanceRecord = {
      id: `att_${now.getTime()}`,
      memberId: this._activeMember.id,
      memberName: this._activeMember.fullName,
      studentId: this._activeMember.studentId,
      checkInTime: now,
      gateLocation: 'Main Rec Turnstile A',
      duration: 'Just Started',
      status: CheckInStatus.Verified,
      qrTokenHash: `#FC-${now.getTime() % 10000}`,
    };
    this._attendanceHistory.unshift(newRecord);
    this._currentInsideCount = Math.min(
      this._currentInsideCount + 1,
      this.maxCapacity,
    );
    this._activeMember = {
      ...this._activeMember,
      streakDays: this._activeMember.streakDays + 1,
      weeklySessionsCompleted:
        this._activeMember.weeklySessionsCompleted + 1,
    };
    this._notify();
  }

  manualCheckIn(studentId: string, fullName: string, gateLocation = 'Main Rec Turnstile A'): void {
    const now = new Date();
    const newRecord: AttendanceRecord = {
      id: `att_${now.getTime()}`,
      memberId: `usr_${now.getTime() % 1000}`,
      memberName: fullName,
      studentId: studentId,
      checkInTime: now,
      gateLocation,
      duration: 'Just Started',
      status: CheckInStatus.ManualOverride,
      qrTokenHash: `#FC-ADMIN-${now.getTime() % 10000}`,
    };
    this._attendanceHistory.unshift(newRecord);
    this._currentInsideCount = Math.min(
      this._currentInsideCount + 1,
      this.maxCapacity,
    );
    this._notify();
  }

  toggleStaffOverride(staffId: string): void {
    const idx = this._staffList.findIndex((s) => s.staffId === staffId);
    if (idx !== -1) {
      this._staffList[idx] = {
        ...this._staffList[idx],
        enableManualOverrides: !this._staffList[idx].enableManualOverrides,
      };
      this._notify();
    }
  }

  toggleStaffQrRegen(staffId: string): void {
    const idx = this._staffList.findIndex((s) => s.staffId === staffId);
    if (idx !== -1) {
      this._staffList[idx] = {
        ...this._staffList[idx],
        dailyQrRegeneration: !this._staffList[idx].dailyQrRegeneration,
      };
      this._notify();
    }
  }

  // ── Mock Data ─────────────────────────────────────────────
  private _initializeMockData(): void {
    const now = new Date();

    this._activeMember = {
      id: 'usr_01',
      studentId: 'VVU-2024-5519',
      fullName: 'Alex Morgan',
      department: 'Sports Science & Kinesiology',
      photoUrl: '',
      role: UserRole.User,
      streakDays: 12,
      weeklySessionsCompleted: 3,
      weeklySessionsGoal: 4,
      registeredAt: new Date(now.getTime() - 45 * 86400000),
      tuitionVerified: true,
    };

    this._pendingMembers = [
      {
        id: 'usr_02',
        studentId: 'VVU-2024-8841',
        fullName: 'Kwame Mensah',
        department: 'Computer Science',
        photoUrl: '',
        role: UserRole.User,
        streakDays: 0,
        weeklySessionsCompleted: 0,
        weeklySessionsGoal: 4,
        registeredAt: new Date(now.getTime() - 2 * 3600000),
        tuitionVerified: true,
      },
      {
        id: 'usr_03',
        studentId: 'VVU-2024-9102',
        fullName: 'Amina Bello',
        department: 'Nursing',
        photoUrl: '',
        role: UserRole.User,
        streakDays: 0,
        weeklySessionsCompleted: 0,
        weeklySessionsGoal: 4,
        registeredAt: new Date(now.getTime() - 5 * 3600000),
        tuitionVerified: false,
      },
      {
        id: 'usr_04',
        studentId: 'VVU-2024-7719',
        fullName: 'Marcus Vance',
        department: 'Business Administration',
        photoUrl: '',
        role: UserRole.User,
        streakDays: 0,
        weeklySessionsCompleted: 0,
        weeklySessionsGoal: 4,
        registeredAt: new Date(now.getTime() - 8 * 3600000),
        tuitionVerified: true,
      },
    ];

    this._attendanceHistory = [
      {
        id: 'att_01',
        memberId: 'usr_01',
        memberName: 'Alex Morgan',
        studentId: 'VVU-2024-5519',
        checkInTime: new Date(now.getTime() - 18 * 60000),
        gateLocation: 'Main Rec Center Turnstile A',
        duration: '1h 10m',
        status: CheckInStatus.Verified,
        qrTokenHash: '#FC-9401-8829',
      },
      {
        id: 'att_02',
        memberId: 'usr_09',
        memberName: 'Elena Rostova',
        studentId: 'VVU-2024-3321',
        checkInTime: new Date(now.getTime() - 34 * 60000),
        gateLocation: 'Olympic Bay Turnstile B',
        duration: '45m',
        status: CheckInStatus.Verified,
        qrTokenHash: '#FC-8812-3391',
      },
      {
        id: 'att_03',
        memberId: 'usr_12',
        memberName: 'David Osei',
        studentId: 'VVU-2024-1180',
        checkInTime: new Date(now.getTime() - 72 * 60000),
        gateLocation: 'Main Rec Center Turnstile A',
        duration: '1h 35m',
        status: CheckInStatus.ManualOverride,
        qrTokenHash: '#FC-OVERRIDE-MANUAL',
      },
    ];

    this._staffList = [
      {
        staffId: 'stf_01',
        staffName: 'Kofi Boateng',
        station: 'Desk Supervisor • North Gate',
        enableManualOverrides: true,
        dailyQrRegeneration: true,
        allowProfileEdits: false,
      },
      {
        staffId: 'stf_02',
        staffName: 'Sarah Lin',
        station: 'Shift Gatekeeper • Olympic Bay',
        enableManualOverrides: true,
        dailyQrRegeneration: false,
        allowProfileEdits: false,
      },
    ];
  }
}
