/** Admin — Access Control screen */
export function renderAdminAccess(): string {
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
        </button>
        <button class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-on-primary-container" style="font-size:20px;font-variation-settings:'FILL' 1">manage_accounts</span>
        </button>
      </div>
    </div>
    <div class="flex items-center px-4 gap-2 pb-2 pt-1">
      <button class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-primary text-on-primary" onclick="window.fitcoreSetRole('admin')">Admin</button>
      <button class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-surface-container text-on-surface-variant" onclick="window.fitcoreSetRole('user')">Member</button>
    </div>
    <div class="flex overflow-x-auto no-scrollbar gap-1 px-4 pb-2">
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant" onclick="window.fitcoreAdminTab('overview')">Overview</button>
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant" onclick="window.fitcoreAdminTab('livedesk')">Live Desk</button>
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant" onclick="window.fitcoreAdminTab('approvals')">Approvals</button>
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-primary text-on-primary" onclick="window.fitcoreAdminTab('access')">Access Control</button>
    </div>
  </div>

  <!-- ===== SCROLLABLE CONTENT ===== -->
  <div class="overflow-y-auto flex-1" style="padding-top: 132px; padding-bottom: 80px;">

    <!-- Search -->
    <div class="mx-4 mt-3">
      <div class="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface-container border border-outline-variant/40 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        <span class="material-symbols-outlined text-on-surface-variant" style="font-size:18px">search</span>
        <input type="text" placeholder="Search members, staff, or badge IDs..." class="flex-1 bg-transparent text-body-sm font-body-md text-on-surface placeholder-on-surface-variant/60 focus:outline-none" />
      </div>
    </div>

    <!-- Access Zones -->
    <div class="mx-4 mt-4">
      <p class="text-headline-sm font-headline-sm text-on-surface mb-3">Zone Access Rules</p>
      <div class="flex flex-col gap-2">
        ${[
          { zone: 'Main Gym Floor', access: 'All Active Members', icon: 'fitness_center', enabled: true },
          { zone: 'Cardio Zone', access: 'All Active Members', icon: 'directions_run', enabled: true },
          { zone: 'Pool & Aqua', access: 'Premium+ Members', icon: 'pool', enabled: true },
          { zone: 'Sauna / Steam', access: 'Premium+ Members', icon: 'local_fire_department', enabled: true },
          { zone: 'Yoga Studio', access: 'Class Enrolled Members', icon: 'self_improvement', enabled: true },
          { zone: 'Staff Office', access: 'Staff Only', icon: 'badge', enabled: false },
        ].map(z => `
          <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
            <div class="w-10 h-10 rounded-xl bg-primary-container/30 flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-primary" style="font-size:20px;font-variation-settings:'FILL' 1">${z.icon}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-body-sm font-body-md font-semibold text-on-surface">${z.zone}</p>
              <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">${z.access}</p>
            </div>
            <button class="relative w-11 h-6 rounded-full transition-colors duration-200 ${z.enabled ? 'bg-primary' : 'bg-outline'}">
              <span class="absolute top-0.5 ${z.enabled ? 'right-0.5' : 'left-0.5'} w-5 h-5 rounded-full bg-white shadow transition-all duration-200"></span>
            </button>
          </div>`).join('')}
      </div>
    </div>

    <!-- Staff Roster -->
    <div class="mx-4 mt-4">
      <div class="flex items-center justify-between mb-3">
        <p class="text-headline-sm font-headline-sm text-on-surface">Staff Roster</p>
        <button class="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-on-primary text-body-sm font-body-md font-semibold hover:bg-primary/90 transition-colors">
          <span class="material-symbols-outlined" style="font-size:14px">add</span>
          Add Staff
        </button>
      </div>
      <div class="flex flex-col gap-2">
        ${[
          { name: 'Rajesh Kumar', role: 'Facility Manager', badge: 'STAFF-001', status: 'on-duty', avatar: 'R' },
          { name: 'Asha Patel', role: 'Front Desk Officer', badge: 'STAFF-004', status: 'on-duty', avatar: 'A' },
          { name: 'Mohammed Ali', role: 'Personal Trainer', badge: 'STAFF-007', status: 'on-duty', avatar: 'M' },
          { name: 'Deepa Nair', role: 'Aquatics Coach', badge: 'STAFF-009', status: 'off-duty', avatar: 'D' },
          { name: 'Suresh Menon', role: 'Security', badge: 'STAFF-012', status: 'on-duty', avatar: 'S' },
          { name: 'Anjali Sinha', role: 'Yoga Instructor', badge: 'STAFF-015', status: 'off-duty', avatar: 'A' },
        ].map(s => `
          <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-container border border-outline-variant/40">
            <div class="w-10 h-10 rounded-full ${s.status === 'on-duty' ? 'bg-secondary-container' : 'bg-surface-container-high'} flex items-center justify-center flex-shrink-0 relative">
              <span class="text-body-sm font-body-md font-bold ${s.status === 'on-duty' ? 'text-on-secondary-container' : 'text-on-surface-variant'}">${s.avatar}</span>
              <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface ${s.status === 'on-duty' ? 'bg-secondary' : 'bg-outline'}"></span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-body-sm font-body-md font-semibold text-on-surface">${s.name}</p>
              <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">${s.role} · <span class="font-data-tabular">${s.badge}</span></p>
            </div>
            <div class="flex items-center gap-1">
              <span class="px-2 py-0.5 rounded-full text-label-caps font-label-caps uppercase tracking-widest ${s.status === 'on-duty' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-high text-on-surface-variant'}" style="font-size:10px">${s.status.replace('-', ' ')}</span>
              <button class="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors">
                <span class="material-symbols-outlined text-on-surface-variant" style="font-size:16px">more_vert</span>
              </button>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Recent Access Events -->
    <div class="mx-4 mt-4 mb-2">
      <div class="flex items-center justify-between mb-3">
        <p class="text-headline-sm font-headline-sm text-on-surface">Recent Access Events</p>
        <button class="text-body-sm font-body-md text-primary">Audit log</button>
      </div>
      <div class="rounded-xl border border-outline-variant/40 overflow-hidden">
        ${[
          { event: 'Badge deactivated', member: 'Neha K.', reason: 'Expired membership', time: '14:21', type: 'warn' },
          { event: 'Zone restriction lifted', member: 'Dev A.', reason: 'Plan upgraded to Premium+', time: '13:55', type: 'ok' },
          { event: 'New staff badge issued', member: 'Priya R.', reason: 'Role: Front Desk', time: '12:30', type: 'ok' },
          { event: 'Access denied ×3', member: 'Rahul T.', reason: 'Pool without Premium', time: '11:18', type: 'error' },
        ].map((e, i) => `
          <div class="flex items-start gap-3 px-3 py-2.5 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-lowest'} border-t border-outline-variant/30">
            <span class="material-symbols-outlined mt-0.5 flex-shrink-0 ${e.type === 'ok' ? 'text-secondary' : e.type === 'warn' ? 'text-tertiary' : 'text-error'}" style="font-size:16px;font-variation-settings:'FILL' 1">${e.type === 'ok' ? 'check_circle' : e.type === 'warn' ? 'warning' : 'cancel'}</span>
            <div class="flex-1 min-w-0">
              <p class="text-body-sm font-body-md font-semibold text-on-surface">${e.event}</p>
              <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">${e.member} · ${e.reason}</p>
            </div>
            <span class="text-data-tabular font-data-tabular text-on-surface-variant flex-shrink-0" style="font-size:11px">${e.time}</span>
          </div>`).join('')}
      </div>
    </div>
  </div>
  `;
}
