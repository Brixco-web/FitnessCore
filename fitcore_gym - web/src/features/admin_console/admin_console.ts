/* ═══════════════════════════════════════════════════════════════
   FitCore — Admin Console Screen (Role: Admin)
   Comprehensive operational management interface for gym admins
   ═══════════════════════════════════════════════════════════════ */

import { FitCoreState } from '../../core/state';
import { CheckInStatus } from '../../core/models';
import { icon, showToast } from '../../core/utils';

export function renderAdminConsole(state: FitCoreState): string {
  const occupancyPct = Math.round(
    (state.currentInsideCount / state.maxCapacity) * 100,
  );
  const pending = state.pendingMembers;
  const history = state.attendanceHistory;
  const staff = state.staffList;

  return `
    <div class="screen admin-console-screen" id="admin-console">
      <!-- Admin Header -->
      <div class="admin-header flex items-center justify-between">
        <div>
          <div class="badge badge-warning mb-6">● Administrator Access • Full Gym Control</div>
          <h1 class="screen-title">FitCore Administrative Command</h1>
          <p class="text-secondary mt-4">Real-time gatekeeper feed, member clearance approvals, and security rules</p>
        </div>
        <div class="header-actions flex items-center gap-12">
          <button class="btn-secondary" id="btn-export-logs">
            ${icon('download', 'icon-sm')}
            <span>Export Daily Log</span>
          </button>
        </div>
      </div>

      <!-- Quick Metrics Ribbon -->
      <div class="grid grid-3 mt-20 gap-16">
        <!-- Live Occupancy Card -->
        <div class="card card-shadow metric-card">
          <div class="flex items-center justify-between">
            <span class="text-secondary text-sm font-semibold">LIVE GYM OCCUPANCY</span>
            <span class="badge ${occupancyPct > 85 ? 'badge-error' : 'badge-success'}">
              ${occupancyPct}% Full
            </span>
          </div>
          <div class="metric-value mt-8 flex items-baseline gap-8">
            <span style="font-size:32px;font-weight:700;">${state.currentInsideCount}</span>
            <span class="text-secondary" style="font-size:16px;">/ ${state.maxCapacity} Max</span>
          </div>
          <div class="progress-bar mt-12">
            <div class="progress-fill ${occupancyPct > 85 ? 'bg-error' : ''}" style="width:${occupancyPct}%"></div>
          </div>
          <div class="text-secondary text-xs mt-8">North & South Turnstiles Synchronized</div>
        </div>

        <!-- Pending Clearances Card -->
        <div class="card card-shadow metric-card">
          <div class="flex items-center justify-between">
            <span class="text-secondary text-sm font-semibold">PENDING CLEARANCES</span>
            <span class="badge ${pending.length > 0 ? 'badge-warning' : 'badge-muted'}">
              ${pending.length} Waiting
            </span>
          </div>
          <div class="metric-value mt-8">
            <span style="font-size:32px;font-weight:700;">${pending.length}</span>
            <span class="text-secondary" style="font-size:16px;"> Students</span>
          </div>
          <div class="text-secondary text-xs mt-12">Requires tuition and medical review</div>
        </div>

        <!-- Today's Visits Card -->
        <div class="card card-shadow metric-card">
          <div class="flex items-center justify-between">
            <span class="text-secondary text-sm font-semibold">TOTAL VISITS TODAY</span>
            <span class="badge badge-info">Active</span>
          </div>
          <div class="metric-value mt-8">
            <span style="font-size:32px;font-weight:700;">${history.length + 142}</span>
            <span class="text-secondary" style="font-size:16px;"> Check-ins</span>
          </div>
          <div class="text-secondary text-xs mt-12">Peak traffic between 4:00 PM - 7:30 PM</div>
        </div>
      </div>

      <!-- Main Operational Area: 2 Columns -->
      <div class="grid grid-2 mt-20 gap-20">
        <!-- Left: Manual Gate Check-in & Member Verification Queue -->
        <div>
          <!-- Desk Manual Check-In -->
          <div class="card card-shadow">
            <div class="flex items-center justify-between mb-12">
              <h3 style="font-size:16px;font-weight:600;display:flex;align-items:center;gap:8px;">
                ${icon('how_to_reg')}
                <span>Quick Manual Gate Check-In</span>
              </h3>
              <span class="badge badge-muted text-xs">Staff Override</span>
            </div>
            <form id="form-manual-checkin" class="flex flex-col gap-10">
              <div class="grid grid-2 gap-10">
                <input
                  type="text"
                  id="input-student-name"
                  placeholder="Student Full Name"
                  required
                  class="input-field"
                />
                <input
                  type="text"
                  id="input-student-id"
                  placeholder="Student ID (e.g. VVU-2024-9921)"
                  required
                  class="input-field"
                />
              </div>
              <div class="flex items-center gap-10">
                <select id="select-gate" class="input-field" style="flex:1;">
                  <option value="Main Rec Turnstile A">Main Rec Turnstile A</option>
                  <option value="North Bay Turnstile B">North Bay Turnstile B</option>
                  <option value="Olympic Pool Turnstile">Olympic Pool Turnstile</option>
                </select>
                <button type="submit" class="btn-primary" style="white-space:nowrap;">
                  ${icon('login')}
                  <span>Authorize Entry</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Pending Member Verification Queue -->
          <div class="card card-shadow mt-16">
            <div class="flex items-center justify-between mb-12">
              <h3 style="font-size:16px;font-weight:600;display:flex;align-items:center;gap:8px;">
                ${icon('assignment_ind')}
                <span>Member Clearance Queue</span>
              </h3>
              <span class="badge badge-warning text-xs">${pending.length} Review(s)</span>
            </div>

            ${
              pending.length === 0
                ? `<div class="empty-state p-16 text-center text-secondary">
                    ${icon('check_circle', 'icon-lg')}
                    <p class="mt-8 font-semibold">Queue is clear!</p>
                    <p class="text-xs">No pending student membership registrations at this time.</p>
                  </div>`
                : `
              <div class="pending-list flex flex-col gap-10">
                ${pending
                  .map(
                    (user) => `
                  <div class="pending-card p-12 border rounded-lg flex items-center justify-between">
                    <div>
                      <div class="font-semibold" style="font-size:14px;">${user.fullName}</div>
                      <div class="text-secondary text-xs">${user.department} • ID: ${user.studentId}</div>
                      <div class="flex items-center gap-6 mt-4">
                        <span class="badge ${user.tuitionVerified ? 'badge-success' : 'badge-error'} text-xs">
                          ${user.tuitionVerified ? '✓ Tuition Paid' : '⚠ Tuition Unverified'}
                        </span>
                      </div>
                    </div>
                    <div class="flex items-center gap-6">
                      <button
                        class="btn-approve btn-sm"
                        data-id="${user.id}"
                        data-name="${user.fullName}"
                        title="Approve Member"
                      >
                        ${icon('check', 'icon-sm')} Approve
                      </button>
                      <button
                        class="btn-reject btn-sm"
                        data-id="${user.id}"
                        data-name="${user.fullName}"
                        title="Reject Member"
                      >
                        ${icon('close', 'icon-sm')} Reject
                      </button>
                    </div>
                  </div>
                `,
                  )
                  .join('')}
              </div>
            `
            }
          </div>

          <!-- Staff & Station Security Settings -->
          <div class="card card-shadow mt-16">
            <div class="flex items-center justify-between mb-12">
              <h3 style="font-size:16px;font-weight:600;display:flex;align-items:center;gap:8px;">
                ${icon('admin_panel_settings')}
                <span>Gatekeeper Station Rules</span>
              </h3>
              <span class="badge badge-info text-xs">Access Controls</span>
            </div>

            <div class="staff-permissions-list flex flex-col gap-10">
              ${staff
                .map(
                  (s) => `
                <div class="staff-card p-10 border rounded-lg flex items-center justify-between">
                  <div>
                    <div class="font-semibold" style="font-size:13px;">${s.staffName}</div>
                    <div class="text-secondary text-xs">${s.station}</div>
                  </div>
                  <div class="flex items-center gap-12">
                    <label class="toggle-label flex items-center gap-4 text-xs">
                      <input
                        type="checkbox"
                        class="toggle-override"
                        data-staff-id="${s.staffId}"
                        ${s.enableManualOverrides ? 'checked' : ''}
                      />
                      <span>Override Access</span>
                    </label>
                    <label class="toggle-label flex items-center gap-4 text-xs">
                      <input
                        type="checkbox"
                        class="toggle-regen"
                        data-staff-id="${s.staffId}"
                        ${s.dailyQrRegeneration ? 'checked' : ''}
                      />
                      <span>Daily QR Regen</span>
                    </label>
                  </div>
                </div>
              `,
                )
                .join('')}
            </div>
          </div>
        </div>

        <!-- Right: Real-time Live Gate Turnstile Activity Feed -->
        <div>
          <div class="card card-shadow h-full">
            <div class="flex items-center justify-between mb-12">
              <div class="flex items-center gap-8">
                <div class="pulse-indicator"></div>
                <h3 style="font-size:16px;font-weight:600;">Live Gate Turnstile Stream</h3>
              </div>
              <span class="badge badge-success text-xs">Real-Time</span>
            </div>

            <div class="activity-feed-scroll" style="max-height:640px;overflow-y:auto;">
              ${history
                .map((item) => {
                  const isOverride = item.status === CheckInStatus.ManualOverride;
                  const isFlagged = item.status === CheckInStatus.Flagged;
                  const badgeClass = isOverride
                    ? 'badge-warning'
                    : isFlagged
                      ? 'badge-error'
                      : 'badge-success';
                  const badgeText = isOverride
                    ? 'Manual Override'
                    : isFlagged
                      ? 'Flagged'
                      : 'QR Verified';

                  return `
                  <div class="feed-item p-10 border-b flex items-center justify-between">
                    <div class="flex items-center gap-10">
                      <div class="feed-icon ${isOverride ? 'override' : 'verified'}">
                        ${icon(isOverride ? 'badge' : 'verified')}
                      </div>
                      <div>
                        <div class="font-semibold" style="font-size:13px;">${item.memberName}</div>
                        <div class="text-secondary text-xs">
                          ${item.gateLocation} • ${new Date(item.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                        <div class="text-secondary text-xs">Token: <code>${item.qrTokenHash}</code></div>
                      </div>
                    </div>
                    <span class="badge ${badgeClass} text-xs">${badgeText}</span>
                  </div>
                `;
                })
                .join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindAdminConsoleEvents(state: FitCoreState): void {
  // Manual check-in form
  const form = document.getElementById('form-manual-checkin') as HTMLFormElement;
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('input-student-name') as HTMLInputElement;
    const idInput = document.getElementById('input-student-id') as HTMLInputElement;
    const gateSelect = document.getElementById('select-gate') as HTMLSelectElement;

    if (nameInput.value.trim() && idInput.value.trim()) {
      state.manualCheckIn(idInput.value.trim(), nameInput.value.trim(), gateSelect.value);
      showToast(`✓ Authorized manual entry for ${nameInput.value.trim()}`, 'success');
      nameInput.value = '';
      idInput.value = '';
    }
  });

  // Approve buttons
  document.querySelectorAll('.btn-approve').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const id = target.getAttribute('data-id');
      const name = target.getAttribute('data-name');
      if (id) {
        state.approveMember(id);
        showToast(`✓ Clearance approved for ${name ?? 'Member'}`, 'success');
      }
    });
  });

  // Reject buttons
  document.querySelectorAll('.btn-reject').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const id = target.getAttribute('data-id');
      const name = target.getAttribute('data-name');
      if (id) {
        state.rejectMember(id);
        showToast(`✕ Application rejected for ${name ?? 'Member'}`, 'warning');
      }
    });
  });

  // Staff permission toggles
  document.querySelectorAll('.toggle-override').forEach((input) => {
    input.addEventListener('change', (e) => {
      const target = e.currentTarget as HTMLInputElement;
      const staffId = target.getAttribute('data-staff-id');
      if (staffId) {
        state.toggleStaffOverride(staffId);
        showToast('Station override permission updated', 'info');
      }
    });
  });

  document.querySelectorAll('.toggle-regen').forEach((input) => {
    input.addEventListener('change', (e) => {
      const target = e.currentTarget as HTMLInputElement;
      const staffId = target.getAttribute('data-staff-id');
      if (staffId) {
        state.toggleStaffQrRegen(staffId);
        showToast('Daily QR regeneration rule updated', 'info');
      }
    });
  });

  // Export logs button
  const exportBtn = document.getElementById('btn-export-logs');
  exportBtn?.addEventListener('click', () => {
    showToast('Exporting daily attendance log CSV...', 'info');
  });
}
