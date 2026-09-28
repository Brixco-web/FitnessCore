import './style.css';
import { renderAdminOverview } from './features/admin_console/admin_overview';
import { renderAdminLiveDesk } from './features/admin_console/admin_livedesk';
import { renderAdminApprovals } from './features/admin_console/admin_approvals';
import { renderAdminAccess } from './features/admin_console/admin_access';
import { renderMemberHome } from './features/member_portal/member_home';
import { renderMemberCalendar } from './features/member_portal/member_calendar';
import { renderMemberRanks } from './features/member_portal/member_ranks';
import { renderMemberFeed } from './features/member_portal/member_feed';
import { renderBottomNav } from './features/navigation/bottom_nav';

// ── App state ──────────────────────────────────────────────────────────────
type Role = 'admin' | 'user';
type AdminTab = 'overview' | 'livedesk' | 'approvals' | 'access';
type MemberTab = 'home' | 'calendar' | 'ranks' | 'feed';

let currentRole: Role = 'admin';
let adminTab: AdminTab = 'overview';
let memberTab: MemberTab = 'home';

// ── Render ─────────────────────────────────────────────────────────────────
function renderApp(): void {
  const app = document.getElementById('app');
  if (!app) return;

  let screenHtml = '';
  let navHtml = '';

  if (currentRole === 'admin') {
    navHtml = renderBottomNav('admin', adminTab);
    switch (adminTab) {
      case 'overview':  screenHtml = renderAdminOverview();  break;
      case 'livedesk':  screenHtml = renderAdminLiveDesk();  break;
      case 'approvals': screenHtml = renderAdminApprovals(); break;
      case 'access':    screenHtml = renderAdminAccess();    break;
    }
  } else {
    navHtml = renderBottomNav('user', memberTab);
    switch (memberTab) {
      case 'home':     screenHtml = renderMemberHome();     break;
      case 'calendar': screenHtml = renderMemberCalendar(); break;
      case 'ranks':    screenHtml = renderMemberRanks();    break;
      case 'feed':     screenHtml = renderMemberFeed();     break;
    }
  }

  app.innerHTML = `
    <div class="flex flex-col min-h-screen relative">
      ${screenHtml}
      ${navHtml}
    </div>
  `;
}

// ── Global handlers attached to window ────────────────────────────────────
(window as any).fitcoreSetRole = (role: Role): void => {
  currentRole = role;
  renderApp();
};

(window as any).fitcoreAdminTab = (tab: AdminTab): void => {
  currentRole = 'admin';
  adminTab = tab;
  renderApp();
};

(window as any).fitcoreMemberTab = (tab: MemberTab): void => {
  currentRole = 'user';
  memberTab = tab;
  renderApp();
};

(window as any).fitcoreManualCheckin = (): void => {
  const input = document.getElementById('checkin-search') as HTMLInputElement;
  const resultEl = document.getElementById('checkin-result');
  if (!input || !resultEl) return;
  if (input.value.trim().length < 2) {
    input.classList.add('border-error', 'ring-error');
    setTimeout(() => input.classList.remove('border-error', 'ring-error'), 1500);
    return;
  }
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `
    <span class="material-symbols-outlined text-secondary" style="font-size:18px;font-variation-settings:'FILL' 1">check_circle</span>
    <span class="text-body-sm font-body-md font-semibold text-secondary">Check-in successful — <strong>${input.value}</strong>!</span>
  `;
  input.value = '';
  setTimeout(() => resultEl.classList.add('hidden'), 3000);
};

// ── Boot ──────────────────────────────────────────────────────────────────
renderApp();
