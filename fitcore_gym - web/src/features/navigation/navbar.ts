/* ═══════════════════════════════════════════════════════════════
   FitCore — Global Top Navigation & Role Switcher
   Supports the 2 primary roles: User and Admin
   ═══════════════════════════════════════════════════════════════ */

import { FitCoreState } from '../../core/state';
import { UserRole } from '../../core/models';
import { icon, showToast } from '../../core/utils';

export function renderNavbar(state: FitCoreState): string {
  const isUser = state.currentRole === UserRole.User;
  const isAdmin = state.currentRole === UserRole.Admin;

  return `
    <header class="app-header">
      <div class="header-container flex items-center justify-between">
        <!-- Brand & Live Indicator -->
        <div class="brand flex items-center gap-12">
          <div class="brand-logo flex items-center justify-center">
            <span class="brand-icon">⚡</span>
          </div>
          <div>
            <div class="brand-title">FITCORE <span>GYM</span></div>
            <div class="brand-sub">Campus Fitness Center</div>
          </div>
          <div class="live-status-pill flex items-center gap-6 ml-12">
            <span class="status-pulse-dot"></span>
            <span>Gym Open • <strong>${state.currentInsideCount}</strong> inside</span>
          </div>
        </div>

        <!-- 2-Role Switcher Toggle (User vs Admin) -->
        <div class="role-switcher-container flex items-center gap-8">
          <span class="role-switcher-label text-secondary text-xs">Switch Preview:</span>
          <div class="role-switcher-pill flex items-center p-4">
            <button
              class="role-btn ${isUser ? 'active' : ''}"
              id="role-btn-user"
              data-role="${UserRole.User}"
            >
              ${icon('person', 'icon-sm')}
              <span>User (Member)</span>
            </button>
            <button
              class="role-btn ${isAdmin ? 'active' : ''}"
              id="role-btn-admin"
              data-role="${UserRole.Admin}"
            >
              ${icon('admin_panel_settings', 'icon-sm')}
              <span>Admin</span>
            </button>
          </div>
        </div>

        <!-- User Profile Pill -->
        <div class="user-profile-badge flex items-center gap-8">
          <div class="avatar-circle">
            ${isUser ? 'AM' : 'AD'}
          </div>
          <div class="user-meta">
            <div class="user-name">${isUser ? state.activeMember.fullName : 'Lead Administrator'}</div>
            <div class="user-role-tag">${isUser ? 'Student Member' : 'System Admin'}</div>
          </div>
        </div>
      </div>
    </header>
  `;
}

export function bindNavbarEvents(state: FitCoreState): void {
  const userBtn = document.getElementById('role-btn-user');
  const adminBtn = document.getElementById('role-btn-admin');

  userBtn?.addEventListener('click', () => {
    if (state.currentRole !== UserRole.User) {
      state.switchRole(UserRole.User);
      showToast('Switched to User (Member) Portal', 'info');
    }
  });

  adminBtn?.addEventListener('click', () => {
    if (state.currentRole !== UserRole.Admin) {
      state.switchRole(UserRole.Admin);
      showToast('Switched to Admin Command Console', 'info');
    }
  });
}
