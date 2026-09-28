# FitCore: School Gym Attendance & Member Management System

FitCore is a modern Android application engineered for school and university recreation centers. It streamlines gym member onboarding, attendance tracking via dynamic daily QR check-ins, multi-tier staff permissions (Super Admin, Sub-Manager/Gatekeeper, Member), motivational workout streak metrics, and interactive calendar attendance analytics with real-time cloud synchronization and offline caching.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following revisions have been incorporated based on your latest instructions:
> - **Luminous Light Color Palette**: Specifically tuned for an ultra-light, clean, and airy aesthetic. Pure porcelain white (`#FFFFFF`) and crisp ivory cream (`#FAF9F6`) canvas, soft vanilla-beige cards (`#FFFDF8` / `#FEF3C7`), vibrant sunburst orange (`#F97316` / `#EA580C`), radiant warm amber (`#F59E0B`), and crisp slate charcoal typography (`#1E293B`) for maximum readability without any dark or muddy heaviness.
> - **Interactive Light Palette Selector**: An in-app theme bar allowing you to switch between 3 curated light palettes (*Sunburst Ivory*, *Citrus Porcelain*, and *Warm Linen*) to directly compare and find the perfect feel.
> - **Motivational Streak Engine**: Dynamic workout streak tracking on the member portal (current consecutive days, weekly streak goal, milestone badges like "3-Day Spark", "7-Day Warrior", and "Monthly Legend") to keep students motivated.
> - **Two-Fold Role & Onboarding Architecture**:
>   1. *Staff Accounts*: Super Admin creates Sub-Manager and Admin accounts directly with granular permission assignment.
>   2. *Member Self-Registration & Verification Queue*: Students can self-register in-app; new accounts enter `PENDING_APPROVAL` status ("Pending Admin Payment & Student ID Verification").
>   3. *Admin Verification Hub*: Super Admin reviews incoming signups, checks off physical/manual membership payment records, and approves or denies entry with a single tap. Once approved, the member's digital gym pass activates and unlocks QR check-in.
> - **Interactive Multi-Role Test Switcher**: A persistent, quick-toggle tester bar allowing instant switching between **Super Admin**, **Sub-Manager (Gatekeeper)**, **Active Member (John Doe)**, and **Pending Member (Sarah Smith)** to thoroughly test and verify every workflow.
> - **QR Check-in Flow**: Gatekeeper/Manager desk displays the active dynamic daily/session QR code; members open the scanner in their FitCore app to register an instant check-in.

---

## 1. Overview & Core Concept

FitCore replaces paper sign-in sheets and clumsy tracking spreadsheets with a responsive, role-differentiated mobile platform:
- **Gym Members (Students & Staff)**:
  - Self-service registration with immediate pending verification status tracker.
  - Active members receive a digital membership pass card with student barcode/QR, real-time motivational workout streak counter, upcoming daily session info, and in-app camera QR check-in scanner.
  - Monthly attendance calendar with visual workout markers and personal semester stats.
- **Sub-Managers (Desk Staff & Gatekeepers)**:
  - Operational desk console to generate and project the active daily event QR code.
  - Live check-in log stream showing incoming students as they scan in.
  - Quick member lookup and manual attendance check-in for students without their phones.
  - Gym capacity gauge and active session status.
- **Super Admin (Head Gym Director)**:
  - Pending Member Approval Queue: Verify manual registration fees/tuition status and approve/reject new members with one tap.
  - Staff Provisioning: Create sub-manager accounts, assign privileges (e.g., enable/disable manual attendance overrides, member profile edits).
  - Centralized member directory with filterable statuses (`Active`, `Pending`, `Suspended`).
  - Attendance analytics: Peak gym hours, monthly visit tallies, and exportable attendance reports.

---

## 2. User Experience & Visual Design

### Aesthetic Direction
- **Luminous Editorial & Athletic Elegance**: A light, breezy, clean aesthetic reminiscent of modern athletic clubs. Avoiding dark grids or clinical gray tables, FitCore utilizes light ivory (`#FAF9F6`), crisp porcelain cards (`#FFFFFF`), airy warm vanilla borders (`#F3EFE6`), and energetic sunburst orange (`#F97316`) accents.
- **Tactile Depth & Hierarchy**: Soft curved surfaces (`RoundedCornerShape(18.dp)`), gentle warm elevation shadows, prominent statistical callouts, and clean status tags (`Active`, `Pending Verification`, `Checked-In`).

### Color Palette Tokens (Default: Sunburst Ivory)
| Role / Semantic Token | Color Value | Purpose |
| :--- | :--- | :--- |
| `Background` | `#FAF9F6` | Ultra-light ivory cream canvas |
| `Surface / Card` | `#FFFFFF` | Crisp porcelain white panels |
| `SurfaceVariant` | `#FFFDF5` | Soft warm vanilla highlight |
| `Primary (Active Accent)` | `#F97316` | Radiant sunburst orange for primary CTAs and active states |
| `PrimaryContainer` | `#FFEDD5` | Light peach cream for active chip backgrounds |
| `Secondary (Warm Gold)` | `#F59E0B` | Radiant amber for badges, streaks, and flame counters |
| `Tertiary (Honey Amber)` | `#FEF3C7` | Soft honey accent for secondary tags and card borders |
| `OnBackground / Text Primary` | `#0F172A` | Deep slate charcoal for crisp, effortless readability |
| `Text Secondary` | `#64748B` | Slate gray for subtitles, timestamps, and captions |
| `Border / Divider` | `#F1EBE1` | Subtle warm border for card structure |
| `Success / Check-in` | `#16A34A` | Emerald green for verified check-in badges |
| `Pending / Attention` | `#D97706` | Warm amber for pending verification states |
| `Error / Denied` | `#DC2626` | Crimson red for access alerts or expired memberships |

### Key User Flows

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FITCORE APP NAVIGATION                          │
└────────────────────────────────────────────────────────────────────────┘
                                    │
               ┌────────────────────┼───────────────────┐
               ▼                    ▼                   ▼
      ┌──────────────────┐ ┌──────────────────┐ ┌───────────────┐
      │  MEMBER PORTAL   │ │   SUB-MANAGER    │ │  SUPER ADMIN  │
      ├──────────────────┤ ├──────────────────┤ ├───────────────┤
      │ • Streak Counter │ │ • Daily QR Board │ │ • Approval Hub│
      │ • Digital ID Pass│ │ • Live Stream Log│ │ • Staff & Role│
      │ • In-App QR Scan │ │ • Manual Check-In│ │ • All Members │
      │ • Attendance Cal │ │ • Session Status │ │ • Analytics   │
      └──────────────────┘ └──────────────────┘ └───────────────┘
```

1. **Role Testing Switcher**:
   - Persistent top bar allows instant 1-tap switching between:
     - 👑 **Super Admin**: Access approval queue, staff management, and analytics.
     - 🛡️ **Sub-Manager**: Access daily QR station, live entry feed, and manual override.
     - ⚡ **Active Member**: Access workout streak, digital pass, and scanner.
     - ⏳ **Pending Member**: View real-time "Registration Pending Admin Approval" screen with status updates.

2. **Member Motivation & Streak System**:
   - Prominent flame counter showing current consecutive gym days.
   - Weekly target tracker (e.g., "3 of 4 sessions completed this week").
   - Milestone badges unlocked dynamically based on attendance milestones.

3. **Daily Dynamic QR Check-in**:
   - **Desk Mode (Manager View)**: Displays the daily session QR code on the desk tablet/phone with session title, current time, and live attendance counter.
   - **Member Mode (Scan View)**: Member taps "Check In", scanning the desk QR code. Upon recognition, a success modal pops up with sound/haptic feedback, user welcome message, check-in timestamp, and updated streak count.

4. **Self-Registration & Admin Approval Workflow**:
   - Prospective members fill out an intuitive signup form (Full Name, Student ID, Email, Phone, Year/Department).
   - Account created in `PENDING_APPROVAL` state with instructions on manual payment/student verification.
   - Super Admin dashboard displays an alert badge on "Pending Approvals".
   - Admin reviews student details, cross-checks payment receipt, and taps "Approve Membership" or "Reject".
   - Upon approval, the member's account switches to `ACTIVE` immediately.

---

## 3. Key Product Decisions & Trade-Offs

- **Hybrid Data Architecture (Firestore + Room)**:
  - *Chosen Approach*: Android Room acts as the high-speed local source-of-truth and offline cache, with bidirectional synchronization to Firebase Firestore when network connectivity is available.
  - *Why*: Ensures zero check-in delay at the gym turnstile even when campus Wi-Fi drops, while syncing seamlessly across gatekeeper and student devices.
- **Embedded QR Engine**:
  - *Chosen Approach*: Pure Kotlin QR matrix generator and CameraX barcode scanning.
  - *Why*: Eliminates heavy external web dependencies or bulky third-party binaries, keeping APK size lightweight and check-in response sub-second.
- **Dynamic Daily QR Security**:
  - *Chosen Approach*: Daily QR codes rotate every morning with an event-bound signature, preventing members from screenshotting a single QR code and sharing it remotely.

---

## 4. Technical Architecture & Data Strategy

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           FITCORE ARCHITECTURE                            │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│   ┌───────────────────────────────────────────────────────────────────┐   │
│   │                        JETPACK COMPOSE UI                         │   │
│   │  ┌───────────────┐ ┌───────────────┐ ┌─────────────┐ ┌──────────┐ │   │
│   │  │ MemberHome    │ │ AttendanceCal │ │ QRDeskBoard │ │ AdminHub │ │   │
│   │  └───────┬───────┘ └───────┬───────┘ └──────┬──────┘ └────┬─────┘ │   │
│   └──────────┼─────────────────┼────────────────┼─────────────┼───────┘   │
│              │                 │                │             │           │
│              ▼                 ▼                ▼             ▼           │
│   ┌───────────────────────────────────────────────────────────────────┐   │
│   │                  FITCORE VIEWMODEL & STATE FLOW                   │   │
│   │  • CurrentUser & ActiveRole (SuperAdmin | SubManager | Member)    │   │
│   │  • TodaySession & DynamicQRCodeState                              │   │
│   │  • LiveAttendanceList, MonthlyStats, & PendingApprovalsQueue     │   │
│   │  • MotivationalStreakState (CurrentStreak, WeeklyGoal, Badges)    │   │
│   │  • ActiveColorTheme (Sunburst Ivory | Citrus Light | Warm Linen)  │   │
│   └───────────────────────────────┬───────────────────────────────────┘   │
│                                   │                                       │
│                                   ▼                                       │
│   ┌───────────────────────────────────────────────────────────────────┐   │
│   │                        FITCORE REPOSITORY                         │   │
│   │      ┌────────────────────────┴────────────────────────┐          │   │
│   │      ▼                                                 ▼          │   │
│   │ ┌───────────────────────────┐         ┌─────────────────────────┐ │   │
│   │ │    ROOM LOCAL DATABASE    │         │    FIREBASE FIRESTORE   │ │   │
│   │ │  • MemberEntity           │◄───────►│  • members collection   │ │   │
│   │ │  • AttendanceLogEntity    │ (Sync)  │  • logs collection      │ │   │
│   │ │  • SessionEntity          │         │  • staff collection     │ │   │
│   │ └───────────────────────────┘         └─────────────────────────┘ │   │
│   └───────────────────────────────────────────────────────────────────┘   │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

### Core Data Entities

1. **GymMember**:
   - `id`: String (UUID / Student ID)
   - `fullName`: String
   - `studentNumber`: String
   - `email`: String
   - `membershipType`: String ("Student", "Faculty", "Alumni", "VIP")
   - `status`: String ("ACTIVE", "PENDING_APPROVAL", "SUSPENDED")
   - `role`: String ("MEMBER", "SUB_MANAGER", "SUPER_ADMIN")
   - `registeredAt`: Long
   - `approvedAt`: Long?
   - `approvedByAdminId`: String?
   - `currentStreak`: Int
   - `bestStreak`: Int
   - `totalCheckIns`: Int
   - `profileAvatarUrl`: String?

2. **AttendanceRecord**:
   - `id`: String
   - `memberId`: String
   - `memberName`: String
   - `studentNumber`: String
   - `timestamp`: Long
   - `dateString`: String (YYYY-MM-DD)
   - `sessionId`: String
   - `checkInType`: String ("QR_SELF_SCAN", "MANAGER_DESK_SCAN", "MANUAL_OVERRIDE")
   - `gatekeeperId`: String?

3. **DailySession**:
   - `id`: String (e.g. `SESSION_2026-09-25`)
   - `date`: String
   - `title`: String ("Fall Semester Open Gym")
   - `qrPayload`: String (Dynamic code verified on scan)
   - `isOpen`: Boolean
   - `totalCheckIns`: Int
   - `createdAt`: Long

---

## 5. Implementation Roadmap & Verification

1. **Project Setup & Dependencies**:
   - Update `app/build.gradle.kts` to enable CameraX, Room, and necessary UI dependencies.
   - Update `metadata.json` and `strings.xml` to **FitCore**.
2. **Database & Repository Layer**:
   - Implement Room entities, DAOs, and repository with reactive `Flow` emissions and sample school gym members across all roles (`SuperAdmin`, `SubManager`, `ActiveMember`, `PendingMember`).
   - Streak calculation engine based on attendance record dates.
3. **Design System & Theme**:
   - Build custom M3 theme with the warm porcelain ivory, soft vanilla cream, radiant sunburst orange, and crisp slate charcoal token system, plus interactive light palette presets.
4. **Key Feature Views**:
   - **Role Tester Header**: One-tap switching between Super Admin, Sub-Manager, Active Member, and Pending Member.
   - **Member Dashboard**: Motivational streak flame card, digital membership pass with barcode, quick QR scanner launcher, and recent check-ins.
   - **Pending Verification Screen**: Friendly status card informing the student that registration is submitted and awaiting payment/admin verification.
   - **Gatekeeper/Manager Console**: Dynamic daily QR generator screen with full-screen desk mode, live entry feed, and rapid manual search.
   - **Attendance Calendar & Stats**: Monthly grid with day status markers, monthly/yearly tallies, and peak-hour metrics.
   - **Admin Management Hub**: Pending Approvals Queue (1-tap approve/deny), Staff privilege controls, new member registration modal, and exportable attendance summary.
5. **Build & Compilation Verification**:
   - Run `compile_applet` to confirm zero errors and successful packaging.
