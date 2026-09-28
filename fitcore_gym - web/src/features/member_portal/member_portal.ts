/* ═══════════════════════════════════════════════════════════════
   FitCore — Member Portal Screen
   Mirrors member_portal_screen.dart
   ═══════════════════════════════════════════════════════════════ */

import { FitCoreState } from '../../core/state';
import { icon, showToast } from '../../core/utils';

export function renderMemberPortal(state: FitCoreState): string {
  const m = state.activeMember;
  const progressPct = Math.round(
    (m.weeklySessionsCompleted / m.weeklySessionsGoal) * 100,
  );

  return `
    <div class="screen" id="member-portal">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <div style="color:var(--fc-text-secondary);font-size:14px;font-weight:500;">Welcome back,</div>
          <div class="screen-title mt-2">${m.fullName}</div>
        </div>
        <button class="notif-btn" id="notif-btn" aria-label="Notifications">
          ${icon('notifications')}
        </button>
      </div>

      <!-- Streak Widget -->
      <div class="card card-shadow mt-20">
        <div class="streak-card">
          <div class="streak-badge">
            ${icon('local_fire_department', 'icon-md')}
            <span>${m.streakDays}-Day Streak</span>
          </div>
          <div class="streak-target">${m.weeklySessionsCompleted}/${m.weeklySessionsGoal} weekly target</div>
        </div>
        <div class="progress-bar mt-12">
          <div class="progress-fill" style="width:${progressPct}%"></div>
        </div>
      </div>

      <!-- Digital Pass Card -->
      <div class="digital-pass mt-20">
        <div class="pass-header">
          <div class="pass-logo">
            <div class="pass-logo-icon">F</div>
            <div class="pass-logo-text">FitCore Pass</div>
          </div>
          <div class="pass-status">ACTIVE MEMBER</div>
        </div>
        <div class="pass-name">${m.fullName}</div>
        <div class="pass-details">ID: ${m.studentId} • ${m.department}</div>
        <div class="pass-barcode">
          ${icon('qr_code_2', 'icon-xl')}
          <span class="pass-validity">VALID • FALL 2026</span>
          ${icon('check_circle', 'icon-md')}
        </div>
      </div>

      <!-- Quick Check-in CTA -->
      <button class="btn-primary mt-24" id="btn-checkin">
        ${icon('qr_code_scanner')}
        Scan Gym QR Station
      </button>

      <!-- Upcoming Events -->
      <div class="section-title mt-24">Upcoming Gym Events</div>
      <div class="events-scroll mt-12">
        <div class="event-card">
          <div class="event-title-row">
            <div class="event-dot" style="background:var(--fc-primary)"></div>
            <div class="event-title">CrossFit Workshop</div>
          </div>
          <div class="event-time">Tomorrow 5:00 PM</div>
          <div class="event-sub">Coach Michael</div>
        </div>
        <div class="event-card">
          <div class="event-title-row">
            <div class="event-dot" style="background:var(--fc-warning)"></div>
            <div class="event-title">Gym Maintenance Notice</div>
          </div>
          <div class="event-time">Friday 6 AM - 8 AM</div>
          <div class="event-sub">North Bay Closed</div>
        </div>
      </div>

      <!-- Leaderboard -->
      <div class="section-title mt-24">Top Members This Month</div>
      <div class="mt-12">
        <div class="leaderboard-row is-you">
          <span class="leaderboard-medal">🥇</span>
          <span class="leaderboard-name">Alex Morgan (You)</span>
          <span class="leaderboard-sessions">24 Sessions</span>
        </div>
        <div class="leaderboard-row">
          <span class="leaderboard-medal">🥈</span>
          <span class="leaderboard-name">Kofi Addo</span>
          <span class="leaderboard-sessions">22 Sessions</span>
        </div>
        <div class="leaderboard-row">
          <span class="leaderboard-medal">🥉</span>
          <span class="leaderboard-name">Grace Ohene</span>
          <span class="leaderboard-sessions">21 Sessions</span>
        </div>
      </div>
    </div>
  `;
}

export function bindMemberPortalEvents(state: FitCoreState): void {
  const btn = document.getElementById('btn-checkin');
  btn?.addEventListener('click', () => {
    state.registerSelfCheckIn();
    showToast('✓ Checked into Main Rec Center! Streak updated.', 'success');
  });
}
