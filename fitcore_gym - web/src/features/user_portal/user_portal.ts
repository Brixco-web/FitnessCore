/* ═══════════════════════════════════════════════════════════════
   FitCore — User Portal Screen (Role: User)
   Complete interactive interface for gym members
   ═══════════════════════════════════════════════════════════════ */

import { FitCoreState } from '../../core/state';
import { icon, showToast } from '../../core/utils';

export function renderUserPortal(state: FitCoreState): string {
  const m = state.activeMember;
  const progressPct = Math.min(
    100,
    Math.round((m.weeklySessionsCompleted / m.weeklySessionsGoal) * 100),
  );

  // Recent attendance for this user
  const userHistory = state.attendanceHistory
    .filter((a) => a.memberId === m.id)
    .slice(0, 5);

  return `
    <div class="screen user-portal-screen" id="user-portal">
      <!-- Welcome Header -->
      <div class="portal-header flex items-center justify-between">
        <div>
          <div class="badge badge-success mb-6">● Member Portal • Active Pass</div>
          <h1 class="screen-title">Welcome back, ${m.fullName}</h1>
          <p class="text-secondary mt-4">${m.department} • Student ID: <strong>${m.studentId}</strong></p>
        </div>
        <div class="header-actions flex items-center gap-12">
          <button class="notif-btn" id="btn-user-notif" aria-label="Notifications" title="Notifications">
            ${icon('notifications')}
            <span class="notif-badge"></span>
          </button>
        </div>
      </div>

      <!-- Main Grid Layout -->
      <div class="grid grid-2 mt-20 gap-20">
        <!-- Left Column: Pass & Check-In -->
        <div>
          <!-- Digital Pass Card -->
          <div class="digital-pass">
            <div class="pass-header flex items-center justify-between">
              <div class="pass-logo flex items-center gap-8">
                <div class="pass-logo-icon">FC</div>
                <div class="pass-logo-text">FitCore Campus Pass</div>
              </div>
              <div class="pass-status ${m.tuitionVerified ? 'verified' : 'pending'}">
                ${m.tuitionVerified ? '✓ TUITION VERIFIED' : 'PENDING CLEARANCE'}
              </div>
            </div>
            
            <div class="pass-body mt-16">
              <div class="pass-name">${m.fullName}</div>
              <div class="pass-details">ID: ${m.studentId} • ${m.department}</div>
              <div class="pass-badge-pill mt-8">Active Member Access • 2026/2027 Academic Year</div>
            </div>

            <div class="pass-footer flex items-center justify-between mt-20">
              <div class="pass-barcode flex items-center gap-12">
                <div class="qr-preview-box">
                  ${icon('qr_code_2', 'icon-xl')}
                </div>
                <div>
                  <div class="pass-token-label">DIGITAL TOKEN</div>
                  <div class="pass-token-code">#FC-${m.studentId.replace(/[^0-9]/g, '')}-PASS</div>
                </div>
              </div>
              <div class="pass-chip flex items-center gap-4">
                ${icon('verified_user', 'icon-sm')}
                <span>NFC / QR ENABLED</span>
              </div>
            </div>
          </div>

          <!-- Quick Check-in Button -->
          <div class="card card-shadow mt-16 text-center">
            <h3 style="font-size:16px;font-weight:600;margin-bottom:6px;">Arrived at the Gym?</h3>
            <p class="text-secondary mb-12" style="font-size:13px;">Tap below to simulate an automated turnstile check-in at North Bay.</p>
            <button class="btn-primary w-full" id="btn-self-checkin">
              ${icon('qr_code_scanner')}
              <span>Instant Turnstile Check-In</span>
            </button>
          </div>

          <!-- Streak & Weekly Target Card -->
          <div class="card card-shadow mt-16">
            <div class="flex items-center justify-between">
              <div class="streak-badge flex items-center gap-8">
                <span class="fire-icon">${icon('local_fire_department', 'icon-md')}</span>
                <strong>${m.streakDays}-Day Workout Streak!</strong>
              </div>
              <div class="badge badge-warning">${m.weeklySessionsCompleted}/${m.weeklySessionsGoal} this week</div>
            </div>

            <div class="progress-bar mt-12">
              <div class="progress-fill" style="width:${progressPct}%"></div>
            </div>
            <div class="flex justify-between items-center mt-8 text-secondary" style="font-size:12px;">
              <span>Target: ${m.weeklySessionsGoal} sessions/week</span>
              <span><strong>${progressPct}%</strong> achieved</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Recent Activity & Announcements -->
        <div>
          <!-- Recent User Attendance Records -->
          <div class="card card-shadow">
            <div class="flex items-center justify-between mb-12">
              <h3 style="font-size:16px;font-weight:600;">Your Recent Check-Ins</h3>
              <span class="badge badge-info">${userHistory.length} Recorded</span>
            </div>

            ${
              userHistory.length === 0
                ? `<div class="empty-state p-16 text-center text-secondary">No recent visits recorded yet. Check in above to start your streak!</div>`
                : `
              <div class="attendance-list">
                ${userHistory
                  .map(
                    (record) => `
                  <div class="attendance-item flex items-center justify-between p-10 border-b">
                    <div class="flex items-center gap-10">
                      <div class="checkin-icon-circle verified">
                        ${icon('check_circle')}
                      </div>
                      <div>
                        <div style="font-weight:600;font-size:14px;">${record.gateLocation}</div>
                        <div class="text-secondary" style="font-size:12px;">
                          ${new Date(record.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • Duration: ${record.duration}
                        </div>
                      </div>
                    </div>
                    <span class="badge badge-success text-xs">Verified</span>
                  </div>
                `,
                  )
                  .join('')}
              </div>
            `
            }
          </div>

          <!-- Upcoming Gym Events -->
          <div class="card card-shadow mt-16">
            <div class="flex items-center justify-between mb-12">
              <h3 style="font-size:16px;font-weight:600;">Gym Workshops & Events</h3>
              <span class="text-secondary text-xs">Free for members</span>
            </div>
            <div class="events-scroll">
              <div class="event-card mb-8">
                <div class="event-title-row flex items-center justify-between">
                  <div class="flex items-center gap-8">
                    <div class="event-dot" style="background:var(--fc-primary)"></div>
                    <strong class="event-title">CrossFit & Cardio Bootcamp</strong>
                  </div>
                  <span class="badge badge-primary text-xs">Tomorrow 5:00 PM</span>
                </div>
                <div class="text-secondary text-xs mt-4">Coach Michael • Main Fitness Arena</div>
              </div>

              <div class="event-card">
                <div class="event-title-row flex items-center justify-between">
                  <div class="flex items-center gap-8">
                    <div class="event-dot" style="background:var(--fc-warning)"></div>
                    <strong class="event-title">HIIT & Core Conditioning</strong>
                  </div>
                  <span class="badge badge-warning text-xs">Thursday 6:30 PM</span>
                </div>
                <div class="text-secondary text-xs mt-4">Coach Sarah • Studio 2</div>
              </div>
            </div>
          </div>

          <!-- Leaderboard -->
          <div class="card card-shadow mt-16">
            <div class="flex items-center justify-between mb-12">
              <h3 style="font-size:16px;font-weight:600;">Monthly Fitness Board</h3>
              <span class="text-secondary text-xs">Updated hourly</span>
            </div>
            <div class="leaderboard-list">
              <div class="leaderboard-row is-you flex items-center justify-between p-8">
                <div class="flex items-center gap-8">
                  <span class="medal">🥇</span>
                  <strong>${m.fullName} (You)</strong>
                </div>
                <span class="badge badge-success">${m.weeklySessionsCompleted * 4 + 12} Sessions</span>
              </div>
              <div class="leaderboard-row flex items-center justify-between p-8 border-t">
                <div class="flex items-center gap-8">
                  <span class="medal">🥈</span>
                  <span>Kofi Mensah</span>
                </div>
                <span class="text-secondary text-xs">22 Sessions</span>
              </div>
              <div class="leaderboard-row flex items-center justify-between p-8 border-t">
                <div class="flex items-center gap-8">
                  <span class="medal">🥉</span>
                  <span>Grace Ohene</span>
                </div>
                <span class="text-secondary text-xs">20 Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindUserPortalEvents(state: FitCoreState): void {
  const checkinBtn = document.getElementById('btn-self-checkin');
  checkinBtn?.addEventListener('click', () => {
    state.registerSelfCheckIn();
    showToast('✓ Verified Turnstile Check-In recorded! Streak updated.', 'success');
  });

  const notifBtn = document.getElementById('btn-user-notif');
  notifBtn?.addEventListener('click', () => {
    showToast('🔔 All gym facilities operating normally today.', 'info');
  });
}
