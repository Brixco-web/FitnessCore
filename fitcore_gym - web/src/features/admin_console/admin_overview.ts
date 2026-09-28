/** Admin — Facility Overview & Telemetry screen */
export function renderAdminOverview(): string {
  return `
  <!-- ===== HEADER ===== -->
  <div class="fixed inset-x-0 top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-outline-variant/40">
    <div class="flex items-center gap-3 px-4 pt-safe h-14 pt-3">
      <div class="flex items-center gap-2 flex-1">
        <div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-on-primary-container" style="font-size:18px;font-variation-settings:'FILL' 1">bolt</span>
        </div>
        <span class="text-headline-sm font-headline-sm text-on-surface">FitCore</span>
        <span class="px-1.5 py-0.5 bg-tertiary-container text-on-tertiary-container text-label-caps font-label-caps rounded uppercase tracking-widest">Admin</span>
      </div>
      <div class="flex items-center gap-1">
        <button id="hdr-notif" class="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center relative transition-colors">
          <span class="material-symbols-outlined text-on-surface-variant" style="font-size:20px">notifications</span>
          <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary"></span>
        </button>
        <button id="hdr-avatar" class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-on-primary-container" style="font-size:20px;font-variation-settings:'FILL' 1">manage_accounts</span>
        </button>
      </div>
    </div>
    <!-- Role Tabs -->
    <div class="flex items-center px-4 gap-2 pb-2 pt-1">
      <button id="role-tab-admin" class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-primary text-on-primary transition-colors" onclick="window.fitcoreSetRole('admin')">Admin</button>
      <button id="role-tab-user" class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-surface-container text-on-surface-variant transition-colors" onclick="window.fitcoreSetRole('user')">Member</button>
    </div>
    <!-- Admin Tab Bar -->
    <div class="flex overflow-x-auto no-scrollbar gap-1 px-4 pb-2">
      <button id="tab-overview" class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-primary text-on-primary transition-colors" onclick="window.fitcoreAdminTab('overview')">Overview</button>
      <button id="tab-livedesk" class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant transition-colors" onclick="window.fitcoreAdminTab('livedesk')">Live Desk</button>
      <button id="tab-approvals" class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant transition-colors" onclick="window.fitcoreAdminTab('approvals')">Approvals</button>
      <button id="tab-access" class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant transition-colors" onclick="window.fitcoreAdminTab('access')">Access Control</button>
    </div>
  </div>

  <!-- ===== SCROLLABLE CONTENT ===== -->
  <div class="overflow-y-auto flex-1" style="padding-top: 132px; padding-bottom: 80px;">
    <!-- Live Status Banner -->
    <div class="mx-4 mt-3 p-3 rounded-xl bg-secondary-container/30 border border-secondary/20 flex items-center gap-3">
      <span class="relative flex h-3 w-3">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
      </span>
      <div class="flex-1">
        <p class="text-body-sm font-body-md font-semibold text-secondary">Facility Pulse — LIVE</p>
        <p class="text-body-sm font-body-md text-on-surface-variant">Updated just now · All systems nominal</p>
      </div>
      <span class="material-symbols-outlined text-secondary" style="font-size:18px;font-variation-settings:'FILL' 1">radio_button_checked</span>
    </div>

    <!-- KPI Grid -->
    <div class="grid grid-cols-2 gap-3 mx-4 mt-4">
      <div class="p-4 rounded-xl bg-primary-container/10 border border-primary/20">
        <div class="flex items-center gap-1.5 mb-2">
          <span class="material-symbols-outlined text-primary" style="font-size:16px;font-variation-settings:'FILL' 1">groups</span>
          <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Occupancy</span>
        </div>
        <p class="text-data-metric font-data-metric text-on-surface">247</p>
        <p class="text-body-sm font-body-md text-on-surface-variant mt-0.5">of 400 capacity</p>
        <div class="mt-2 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
          <div class="h-full bg-primary rounded-full transition-all duration-700" style="width:62%"></div>
        </div>
      </div>
      <div class="p-4 rounded-xl bg-secondary-container/20 border border-secondary/20">
        <div class="flex items-center gap-1.5 mb-2">
          <span class="material-symbols-outlined text-secondary" style="font-size:16px;font-variation-settings:'FILL' 1">check_in</span>
          <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Check-ins Today</span>
        </div>
        <p class="text-data-metric font-data-metric text-on-surface">1,284</p>
        <p class="text-body-sm font-body-md text-secondary mt-0.5">↑ 18% vs yesterday</p>
      </div>
      <div class="p-4 rounded-xl bg-surface-container border border-outline-variant/40">
        <div class="flex items-center gap-1.5 mb-2">
          <span class="material-symbols-outlined text-tertiary" style="font-size:16px;font-variation-settings:'FILL' 1">schedule</span>
          <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Avg Duration</span>
        </div>
        <p class="text-data-metric font-data-metric text-on-surface">58<span class="text-headline-sm">m</span></p>
        <p class="text-body-sm font-body-md text-on-surface-variant mt-0.5">−4m vs 7-day avg</p>
      </div>
      <div class="p-4 rounded-xl bg-tertiary-container/20 border border-tertiary/20">
        <div class="flex items-center gap-1.5 mb-2">
          <span class="material-symbols-outlined text-tertiary" style="font-size:16px;font-variation-settings:'FILL' 1">pending_actions</span>
          <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Pending</span>
        </div>
        <p class="text-data-metric font-data-metric text-on-surface">12</p>
        <p class="text-body-sm font-body-md text-tertiary mt-0.5">Approvals needed</p>
      </div>
    </div>

    <!-- Traffic Chart -->
    <div class="mx-4 mt-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
      <div class="flex items-center justify-between mb-3">
        <p class="text-headline-sm font-headline-sm text-on-surface">Hourly Traffic</p>
        <span class="text-body-sm font-body-md text-on-surface-variant">Today</span>
      </div>
      <div class="flex items-end gap-1.5 h-24">
        ${[14,22,35,48,62,78,91,85,72,64,58,70,85,77,68,62,55,48,38,28,18,12,8,6].map((h, i) => {
          const labels = ['12a','1','2','3','4','5','6','7','8','9','10','11','12p','1','2','3','4','5','6','7','8','9','10','11'];
          const isNow = i === 13;
          return `<div class="flex-1 flex flex-col items-center gap-1">
            <div class="w-full rounded-sm ${isNow ? 'bg-primary' : 'bg-primary/30'}" style="height:${h}%"></div>
            ${i % 4 === 0 ? `<span class="text-label-caps font-label-caps text-on-surface-variant" style="font-size:9px">${labels[i]}</span>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Zone Density -->
    <div class="mx-4 mt-4">
      <div class="flex items-center justify-between mb-3">
        <p class="text-headline-sm font-headline-sm text-on-surface">Zone Density</p>
        <button class="text-body-sm font-body-md text-primary">Manage zones</button>
      </div>
      <div class="flex flex-col gap-2">
        ${[
          { zone: 'Weight Floor', count: 89, cap: 120, color: 'secondary' },
          { zone: 'Cardio Zone', count: 64, cap: 80, color: 'primary' },
          { zone: 'Group Classes', count: 48, cap: 50, color: 'tertiary' },
          { zone: 'Pool Deck', count: 31, cap: 60, color: 'secondary' },
          { zone: 'Stretching / Mats', count: 15, cap: 40, color: 'primary' },
        ].map(z => {
          const pct = Math.round((z.count / z.cap) * 100);
          const heat = pct >= 90 ? 'text-error' : pct >= 70 ? 'text-tertiary' : `text-${z.color}`;
          return `<div class="flex items-center gap-3 p-3 rounded-xl bg-surface-container border border-outline-variant/40">
            <div class="flex-1">
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-body-sm font-body-md font-semibold text-on-surface">${z.zone}</span>
                <span class="text-data-tabular font-data-tabular ${heat}">${z.count}<span class="text-on-surface-variant font-body-md">/${z.cap}</span></span>
              </div>
              <div class="h-1.5 bg-surface-container-high rounded-full overflow-hidden">
                <div class="h-full bg-${z.color} rounded-full transition-all duration-700" style="width:${pct}%"></div>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>

    <!-- Hardware Health -->
    <div class="mx-4 mt-4">
      <div class="flex items-center justify-between mb-3">
        <p class="text-headline-sm font-headline-sm text-on-surface">Hardware Health</p>
        <button class="text-body-sm font-body-md text-primary">View all</button>
      </div>
      <div class="grid grid-cols-3 gap-2">
        ${[
          { label: 'Turnstiles', ok: 8, total: 8, icon: 'door_sliding' },
          { label: 'Cameras', ok: 23, total: 24, icon: 'videocam' },
          { label: 'Scanners', ok: 12, total: 12, icon: 'qr_code_scanner' },
        ].map(hw => `
          <div class="p-3 rounded-xl bg-surface-container border border-outline-variant/40 text-center">
            <span class="material-symbols-outlined ${hw.ok === hw.total ? 'text-secondary' : 'text-tertiary'}" style="font-size:22px;font-variation-settings:'FILL' 1">${hw.icon}</span>
            <p class="text-data-tabular font-data-tabular text-on-surface mt-1">${hw.ok}/${hw.total}</p>
            <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:10px">${hw.label}</p>
          </div>`).join('')}
      </div>
    </div>

    <!-- Live Roster -->
    <div class="mx-4 mt-4 mb-2">
      <div class="flex items-center justify-between mb-3">
        <p class="text-headline-sm font-headline-sm text-on-surface">Live Roster</p>
        <button class="text-body-sm font-body-md text-primary">See all 247</button>
      </div>
      <div class="flex flex-col gap-2">
        ${[
          { name: 'Arjun Mehta', tag: 'Weight Floor', time: '2h 14m', avatar: 'A' },
          { name: 'Priya Sharma', tag: 'Cardio Zone', time: '48m', avatar: 'P' },
          { name: 'Rahul Verma', tag: 'Group Classes', time: '1h 02m', avatar: 'R' },
          { name: 'Neha Singh', tag: 'Pool Deck', time: '35m', avatar: 'N' },
        ].map(m => `
          <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-container border border-outline-variant/40">
            <div class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
              <span class="text-body-sm font-body-md font-bold text-on-primary-container">${m.avatar}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-body-sm font-body-md font-semibold text-on-surface truncate">${m.name}</p>
              <p class="text-body-sm font-body-md text-on-surface-variant">${m.tag}</p>
            </div>
            <div class="flex items-center gap-1 text-on-surface-variant">
              <span class="material-symbols-outlined" style="font-size:14px">schedule</span>
              <span class="text-body-sm font-body-md font-data-tabular">${m.time}</span>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </div>
  `;
}
