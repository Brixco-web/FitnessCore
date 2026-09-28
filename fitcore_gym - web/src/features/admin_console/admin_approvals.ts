/** Admin — Approvals screen */
export function renderAdminApprovals(): string {
  const requests = [
    { name: 'Kiran Patel', id: 'FC-2841', type: 'New Member Registration', submitted: '2h ago', avatar: 'K', priority: 'high' },
    { name: 'Sunita Rao', id: 'FC-2840', type: 'Premium Upgrade Request', submitted: '3h ago', avatar: 'S', priority: 'normal' },
    { name: 'Dev Anand', id: 'FC-2839', type: 'Freeze Account (Medical)', submitted: '4h ago', avatar: 'D', priority: 'high' },
    { name: 'Meera Joshi', id: 'FC-2838', type: 'Guest Pass — 7 days', submitted: '5h ago', avatar: 'M', priority: 'normal' },
    { name: 'Arun Kumar', id: 'FC-2837', type: 'Locker Assignment', submitted: '6h ago', avatar: 'A', priority: 'low' },
    { name: 'Pooja Iyer', id: 'FC-2836', type: 'Personal Trainer Request', submitted: '7h ago', avatar: 'P', priority: 'normal' },
    { name: 'Rohan Das', id: 'FC-2835', type: 'Membership Transfer', submitted: '8h ago', avatar: 'R', priority: 'high' },
    { name: 'Lakshmi Nair', id: 'FC-2834', type: 'Group Class Enrolment', submitted: '9h ago', avatar: 'L', priority: 'low' },
    { name: 'Vijay Shetty', id: 'FC-2833', type: 'New Member Registration', submitted: '10h ago', avatar: 'V', priority: 'normal' },
    { name: 'Anita Bose', id: 'FC-2832', type: 'Cancellation Request', submitted: '11h ago', avatar: 'A', priority: 'high' },
    { name: 'Sanjay Gupta', id: 'FC-2831', type: 'Plan Downgrade', submitted: '12h ago', avatar: 'S', priority: 'low' },
    { name: 'Tanya Kapoor', id: 'FC-2830', type: 'Guest Pass — 3 days', submitted: '13h ago', avatar: 'T', priority: 'normal' },
  ];

  const priorityBadge: Record<string, string> = {
    high: 'bg-error-container text-on-error-container',
    normal: 'bg-surface-container-high text-on-surface-variant',
    low: 'bg-secondary-container/40 text-on-secondary-container',
  };

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
    <div class="flex items-center px-4 gap-2 pb-2 pt-1">
      <button class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-primary text-on-primary" onclick="window.fitcoreSetRole('admin')">Admin</button>
      <button class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-surface-container text-on-surface-variant" onclick="window.fitcoreSetRole('user')">Member</button>
    </div>
    <div class="flex overflow-x-auto no-scrollbar gap-1 px-4 pb-2">
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant" onclick="window.fitcoreAdminTab('overview')">Overview</button>
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant" onclick="window.fitcoreAdminTab('livedesk')">Live Desk</button>
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-primary text-on-primary" onclick="window.fitcoreAdminTab('approvals')">Approvals</button>
      <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest bg-surface-container text-on-surface-variant" onclick="window.fitcoreAdminTab('access')">Access Control</button>
    </div>
  </div>

  <!-- ===== SCROLLABLE CONTENT ===== -->
  <div class="overflow-y-auto flex-1" style="padding-top: 132px; padding-bottom: 80px;">

    <!-- Stats row -->
    <div class="flex gap-3 mx-4 mt-3">
      <div class="flex-1 p-3 rounded-xl bg-error-container/20 border border-error/20 text-center">
        <p class="text-data-metric font-data-metric text-error" style="font-size:24px">12</p>
        <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">High Priority</p>
      </div>
      <div class="flex-1 p-3 rounded-xl bg-surface-container border border-outline-variant/40 text-center">
        <p class="text-data-metric font-data-metric text-on-surface" style="font-size:24px">31</p>
        <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">Total Pending</p>
      </div>
      <div class="flex-1 p-3 rounded-xl bg-secondary-container/20 border border-secondary/20 text-center">
        <p class="text-data-metric font-data-metric text-secondary" style="font-size:24px">94</p>
        <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">Approved Today</p>
      </div>
    </div>

    <!-- Filter Chips -->
    <div class="flex overflow-x-auto no-scrollbar gap-2 px-4 mt-3 pb-1">
      ${['All', 'Registration', 'Upgrade', 'Freeze', 'Guest Pass', 'Locker', 'Transfer', 'Cancellation'].map((f, i) => `
        <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest ${i === 0 ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant border border-outline-variant/40'}">${f}</button>
      `).join('')}
    </div>

    <!-- Queue List -->
    <div class="mx-4 mt-3 flex flex-col gap-2 mb-2">
      ${requests.map(r => `
        <div class="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
              <span class="text-body-sm font-body-md font-bold text-on-primary-container">${r.avatar}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-0.5 flex-wrap">
                <span class="text-body-sm font-body-md font-semibold text-on-surface">${r.name}</span>
                <span class="text-body-sm font-body-md text-on-surface-variant font-data-tabular" style="font-size:11px">${r.id}</span>
                <span class="px-1.5 py-0.5 rounded-full text-label-caps font-label-caps uppercase tracking-widest ${priorityBadge[r.priority]}" style="font-size:10px">${r.priority}</span>
              </div>
              <p class="text-body-sm font-body-md text-on-surface">${r.type}</p>
              <p class="text-body-sm font-body-md text-on-surface-variant mt-0.5" style="font-size:11px">Submitted ${r.submitted}</p>
            </div>
          </div>
          <div class="flex gap-2 mt-3">
            <button class="flex-1 py-2 rounded-lg bg-secondary text-on-secondary text-body-sm font-body-md font-semibold hover:bg-secondary/90 transition-colors active:scale-95 flex items-center justify-center gap-1">
              <span class="material-symbols-outlined" style="font-size:16px;font-variation-settings:'FILL' 1">check_circle</span>
              Approve
            </button>
            <button class="flex-1 py-2 rounded-lg bg-surface-container text-on-surface-variant text-body-sm font-body-md font-semibold hover:bg-error-container hover:text-on-error-container transition-colors active:scale-95 flex items-center justify-center gap-1">
              <span class="material-symbols-outlined" style="font-size:16px">cancel</span>
              Decline
            </button>
            <button class="px-3 py-2 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-95">
              <span class="material-symbols-outlined" style="font-size:16px">more_horiz</span>
            </button>
          </div>
        </div>`).join('')}
    </div>
  </div>
  `;
}
