/** Shared bottom navigation bar */
export function renderBottomNav(role: 'admin' | 'user', activeTab: string): string {
  const adminTabs = [
    { id: 'overview', label: 'Overview', icon: 'monitoring', fillIcon: 'monitoring' },
    { id: 'livedesk', label: 'Live Desk', icon: 'sensors', fillIcon: 'sensors' },
    { id: 'approvals', label: 'Approvals', icon: 'pending_actions', fillIcon: 'pending_actions' },
    { id: 'access', label: 'Access', icon: 'lock', fillIcon: 'lock' },
  ];

  const memberTabs = [
    { id: 'home', label: 'Home', icon: 'home', fillIcon: 'home' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar_month', fillIcon: 'calendar_month' },
    { id: 'ranks', label: 'Ranks', icon: 'leaderboard', fillIcon: 'leaderboard' },
    { id: 'feed', label: 'Feed', icon: 'newspaper', fillIcon: 'newspaper' },
  ];

  const tabs = role === 'admin' ? adminTabs : memberTabs;
  const onClickFn = role === 'admin' ? 'window.fitcoreAdminTab' : 'window.fitcoreMemberTab';

  return `
  <nav class="fixed inset-x-0 bottom-0 z-40 bg-surface/95 backdrop-blur-md border-t border-outline-variant/40 pb-safe">
    <div class="flex items-stretch h-16">
      ${tabs.map(t => {
        const isActive = t.id === activeTab;
        return `
        <button onclick="${onClickFn}('${t.id}')"
          class="flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-all group"
          id="nav-${t.id}">
          <div class="relative">
            ${isActive ? `<div class="absolute inset-x-[-8px] inset-y-[-4px] rounded-full bg-primary-container/60"></div>` : ''}
            <span class="material-symbols-outlined relative ${isActive ? 'text-primary' : 'text-on-surface-variant'} transition-colors"
              style="font-size:22px;font-variation-settings:'FILL' ${isActive ? 1 : 0}">${t.icon}</span>
          </div>
          <span class="text-label-caps font-label-caps uppercase tracking-widest ${isActive ? 'text-primary font-semibold' : 'text-on-surface-variant'}" style="font-size:9px">${t.label}</span>
        </button>`;
      }).join('')}
    </div>
  </nav>
  `;
}
