/** Admin — Live Desk screen */
export function renderAdminLiveDesk(): string {
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
        <button class="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center relative transition-colors">
          <span class="material-symbols-outlined text-on-surface-variant" style="font-size:20px">notifications</span>
          <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary"></span>
        </button>
        <button class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-on-primary-container" style="font-size:20px;font-variation-settings:'FILL' 1">manage_accounts</span>
        </button>
      </div>
    </div>
    <!-- Role Tabs -->
    <div class="flex items-center px-4 gap-2 pb-2 pt-1">
      <button class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-primary text-on-primary" onclick="window.fitcoreSetRole('admin')">Admin</button>
      <button class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-surface-container text-on-surface-variant" onclick="window.fitcoreSetRole('user')">Member</button>
    </div>
    <!-- Admin Tab Bar -->
    <div class="flex overflow-x-auto no-scrollbar gap-1 px-4 pb-2">
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant" onclick="window.fitcoreAdminTab('overview')">Overview</button>
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-primary text-on-primary" onclick="window.fitcoreAdminTab('livedesk')">Live Desk</button>
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant" onclick="window.fitcoreAdminTab('approvals')">Approvals</button>
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant" onclick="window.fitcoreAdminTab('access')">Access Control</button>
    </div>
  </div>

  <!-- ===== SCROLLABLE CONTENT ===== -->
  <div class="overflow-y-auto flex-1" style="padding-top: 132px; padding-bottom: 80px;">

    <!-- Station Status -->
    <div class="mx-4 mt-3">
      <div class="flex items-center justify-between mb-3">
        <p class="text-headline-sm font-headline-sm text-on-surface">Gate Stations</p>
        <div class="flex items-center gap-1.5">
          <span class="relative flex h-2.5 w-2.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
          </span>
          <span class="text-body-sm font-body-md text-secondary font-semibold">LIVE</span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 mb-4">
        ${[
          { gate: 'Main Entrance A', status: 'online', scans: 1284, icon: 'door_front' },
          { gate: 'Main Entrance B', status: 'online', scans: 843, icon: 'door_front' },
          { gate: 'Side Gate — Gym', status: 'online', scans: 512, icon: 'door_sliding' },
          { gate: 'Pool Access', status: 'offline', scans: 0, icon: 'pool' },
        ].map(g => `
          <div class="p-3 rounded-xl border ${g.status === 'online' ? 'bg-secondary-container/20 border-secondary/30' : 'bg-error-container/20 border-error/30'}">
            <div class="flex items-center gap-2 mb-2">
              <span class="material-symbols-outlined ${g.status === 'online' ? 'text-secondary' : 'text-error'}" style="font-size:18px;font-variation-settings:'FILL' 1">${g.icon}</span>
              <span class="text-body-sm font-body-md font-semibold text-on-surface text-xs leading-tight">${g.gate}</span>
            </div>
            <p class="text-data-tabular font-data-tabular text-on-surface">${g.scans.toLocaleString()}</p>
            <div class="flex items-center gap-1 mt-1">
              <span class="w-1.5 h-1.5 rounded-full ${g.status === 'online' ? 'bg-secondary' : 'bg-error'}"></span>
              <span class="text-body-sm font-body-md capitalize text-on-surface-variant" style="font-size:11px">${g.status}</span>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Manual Check-in -->
    <div class="mx-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
      <div class="flex items-center gap-2 mb-3">
        <span class="material-symbols-outlined text-primary" style="font-size:20px;font-variation-settings:'FILL' 1">qr_code_scanner</span>
        <p class="text-headline-sm font-headline-sm text-on-surface">Manual Check-in</p>
      </div>
      <div class="flex gap-2 mb-3">
        <input id="checkin-search" type="text" placeholder="Search member by name or ID..." class="flex-1 px-3 py-2 rounded-lg bg-surface border border-outline-variant text-body-sm font-body-md text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors" />
        <button id="checkin-go" onclick="window.fitcoreManualCheckin()" class="px-4 py-2 rounded-lg bg-primary text-on-primary text-body-sm font-body-md font-semibold hover:bg-primary/90 transition-colors active:scale-95">
          Check In
        </button>
      </div>
      <div id="checkin-result" class="hidden p-3 rounded-lg bg-secondary-container/30 border border-secondary/30 flex items-center gap-2">
        <span class="material-symbols-outlined text-secondary" style="font-size:18px;font-variation-settings:'FILL' 1">check_circle</span>
        <span class="text-body-sm font-body-md font-semibold text-secondary">Check-in successful!</span>
      </div>
    </div>

    <!-- Live Turnstile Stream -->
    <div class="mx-4 mt-4 mb-2">
      <div class="flex items-center justify-between mb-3">
        <p class="text-headline-sm font-headline-sm text-on-surface">Live Turnstile Stream</p>
        <span class="text-body-sm font-body-md text-on-surface-variant">Last 20 scans</span>
      </div>
      <div class="rounded-xl border border-outline-variant/40 overflow-hidden">
        <!-- Table Header -->
        <div class="grid grid-cols-4 px-3 py-2 bg-surface-container-high">
          <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Member</span>
          <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Gate</span>
          <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Time</span>
          <span class="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest text-right">Status</span>
        </div>
        <!-- Live rows -->
        ${[
          { name: 'Arjun M.', gate: 'Ent A', time: '14:22:08', status: 'granted' },
          { name: 'Priya S.', gate: 'Ent B', time: '14:21:55', status: 'granted' },
          { name: 'Rahul V.', gate: 'Side', time: '14:21:43', status: 'granted' },
          { name: 'Neha K.', gate: 'Ent A', time: '14:21:30', status: 'denied' },
          { name: 'Amit J.', gate: 'Pool', time: '14:21:14', status: 'granted' },
          { name: 'Sonia R.', gate: 'Ent B', time: '14:20:58', status: 'granted' },
          { name: 'Vikram D.', gate: 'Ent A', time: '14:20:41', status: 'granted' },
          { name: 'Kavya P.', gate: 'Side', time: '14:20:29', status: 'denied' },
        ].map((row, i) => `
          <div class="grid grid-cols-4 items-center px-3 py-2.5 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-lowest'} border-t border-outline-variant/30">
            <span class="text-body-sm font-body-md font-semibold text-on-surface truncate">${row.name}</span>
            <span class="text-body-sm font-body-md text-on-surface-variant">${row.gate}</span>
            <span class="text-data-tabular font-data-tabular text-on-surface-variant" style="font-size:11px">${row.time}</span>
            <div class="flex justify-end">
              <span class="px-2 py-0.5 rounded-full text-label-caps font-label-caps uppercase tracking-widest ${row.status === 'granted' ? 'bg-secondary-container text-on-secondary-container' : 'bg-error-container text-on-error-container'}" style="font-size:10px">${row.status}</span>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </div>
  `;
}
