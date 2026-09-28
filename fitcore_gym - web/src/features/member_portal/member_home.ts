/** Member — Home / Portal screen */
export function renderMemberHome(): string {
  return `
  <!-- ===== HEADER ===== -->
  <div class="fixed inset-x-0 top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-outline-variant/40">
    <div class="flex items-center gap-3 px-4 pt-safe h-14 pt-3">
      <div class="flex items-center gap-2 flex-1">
        <div class="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-on-primary-container" style="font-size:18px;font-variation-settings:'FILL' 1">bolt</span>
        </div>
        <span class="text-headline-sm font-headline-sm text-on-surface">FitCore</span>
      </div>
      <div class="flex items-center gap-1">
        <button class="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center relative transition-colors">
          <span class="material-symbols-outlined text-on-surface-variant" style="font-size:20px">notifications</span>
        </button>
        <button class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-on-primary-container" style="font-size:20px;font-variation-settings:'FILL' 1">person</span>
        </button>
      </div>
    </div>
    <!-- Role Tabs -->
    <div class="flex items-center px-4 gap-2 pb-2 pt-1">
      <button class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-surface-container text-on-surface-variant" onclick="window.fitcoreSetRole('admin')">Admin</button>
      <button class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-primary text-on-primary" onclick="window.fitcoreSetRole('user')">Member</button>
    </div>
  </div>

  <!-- ===== SCROLLABLE CONTENT ===== -->
  <div class="overflow-y-auto flex-1" style="padding-top: 96px; padding-bottom: 80px;">

    <!-- Hero / Welcome -->
    <div class="mx-4 mt-3 p-5 rounded-2xl bg-gradient-to-br from-primary via-primary to-tertiary overflow-hidden relative">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 80% 20%, white 0%, transparent 60%)"></div>
      <p class="text-label-caps font-label-caps text-on-primary/70 uppercase tracking-widest mb-1">Good afternoon</p>
      <p class="text-headline-xl-mobile font-headline-xl-mobile text-on-primary mb-1">Arjun Mehta</p>
      <p class="text-body-sm font-body-md text-on-primary/80">Premium Member · Active</p>
      <div class="mt-4 flex items-center gap-3">
        <div class="flex-1 p-2.5 rounded-xl bg-on-primary/10 backdrop-blur-sm text-center">
          <p class="text-data-metric font-data-metric text-on-primary" style="font-size:22px">48</p>
          <p class="text-body-sm font-body-md text-on-primary/70" style="font-size:11px">Visits this month</p>
        </div>
        <div class="flex-1 p-2.5 rounded-xl bg-on-primary/10 backdrop-blur-sm text-center">
          <p class="text-data-metric font-data-metric text-on-primary" style="font-size:22px">12</p>
          <p class="text-body-sm font-body-md text-on-primary/70" style="font-size:11px">Day streak 🔥</p>
        </div>
        <div class="flex-1 p-2.5 rounded-xl bg-on-primary/10 backdrop-blur-sm text-center">
          <p class="text-data-metric font-data-metric text-on-primary" style="font-size:22px">87</p>
          <p class="text-body-sm font-body-md text-on-primary/70" style="font-size:11px">Points earned</p>
        </div>
      </div>
    </div>

    <!-- QR Check-in Card -->
    <div class="mx-4 mt-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
      <div class="flex items-center gap-3">
        <div class="w-16 h-16 rounded-xl bg-on-surface flex items-center justify-center flex-shrink-0">
          <!-- QR placeholder -->
          <div class="grid grid-cols-3 gap-0.5 w-10 h-10">
            ${Array(9).fill(0).map((_, i) => `<div class="${[0,2,6,8].includes(i) ? 'bg-white' : [4].includes(i) ? 'bg-white' : 'bg-white/30'} rounded-sm"></div>`).join('')}
          </div>
        </div>
        <div class="flex-1">
          <p class="text-headline-sm font-headline-sm text-on-surface">My Check-in QR</p>
          <p class="text-body-sm font-body-md text-on-surface-variant mt-0.5">Scan at the gate to enter.</p>
          <p class="text-body-sm font-data-tabular text-primary mt-1">FC-MBR-2024-00841</p>
        </div>
        <button class="px-3 py-2 rounded-lg bg-primary text-on-primary text-body-sm font-body-md font-semibold hover:bg-primary/90 transition-colors active:scale-95">
          Show
        </button>
      </div>
    </div>

    <!-- Facility Status -->
    <div class="mx-4 mt-4">
      <div class="flex items-center justify-between mb-3">
        <p class="text-headline-sm font-headline-sm text-on-surface">Facility Status</p>
        <div class="flex items-center gap-1.5">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
          </span>
          <span class="text-body-sm font-body-md text-secondary font-semibold" style="font-size:11px">LIVE</span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2">
        ${[
          { zone: 'Weight Floor', pct: 74, status: 'Moderate', color: 'tertiary' },
          { zone: 'Cardio Zone', pct: 80, status: 'Busy', color: 'primary' },
          { zone: 'Pool Deck', pct: 52, status: 'Available', color: 'secondary' },
          { zone: 'Group Classes', pct: 96, status: 'Almost Full', color: 'error' },
        ].map(z => `
          <div class="p-3 rounded-xl bg-surface-container border border-outline-variant/40">
            <p class="text-body-sm font-body-md font-semibold text-on-surface">${z.zone}</p>
            <div class="my-1.5 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
              <div class="h-full bg-${z.color} rounded-full" style="width:${z.pct}%"></div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-body-sm font-body-md text-${z.color}" style="font-size:11px">${z.status}</span>
              <span class="text-data-tabular font-data-tabular text-on-surface-variant" style="font-size:11px">${z.pct}%</span>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Upcoming Classes -->
    <div class="mx-4 mt-4">
      <div class="flex items-center justify-between mb-3">
        <p class="text-headline-sm font-headline-sm text-on-surface">Upcoming Classes</p>
        <button class="text-body-sm font-body-md text-primary" onclick="window.fitcoreMemberTab('calendar')">View all</button>
      </div>
      <div class="flex flex-col gap-2">
        ${[
          { name: 'HIIT Bootcamp', time: 'Today · 5:30 PM', trainer: 'Mohammed Ali', spots: 4, enrolled: true },
          { name: 'Yoga Flow', time: 'Tomorrow · 7:00 AM', trainer: 'Anjali Sinha', spots: 12, enrolled: false },
          { name: 'Aqua Aerobics', time: 'Tomorrow · 9:00 AM', trainer: 'Deepa Nair', spots: 8, enrolled: false },
        ].map(c => `
          <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/40">
            <div class="w-10 h-10 rounded-xl bg-primary-container/30 flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-primary" style="font-size:20px;font-variation-settings:'FILL' 1">fitness_center</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-body-sm font-body-md font-semibold text-on-surface">${c.name}</p>
              <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">${c.time} · ${c.trainer}</p>
              <p class="text-body-sm font-body-md text-tertiary" style="font-size:11px">${c.spots} spots left</p>
            </div>
            <button class="px-3 py-1.5 rounded-full text-body-sm font-body-md font-semibold transition-colors active:scale-95 ${c.enrolled ? 'bg-secondary text-on-secondary' : 'bg-primary-container/30 text-primary border border-primary/30 hover:bg-primary-container/50'}">
              ${c.enrolled ? 'Enrolled ✓' : 'Book'}
            </button>
          </div>`).join('')}
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="mx-4 mt-4 mb-2">
      <div class="flex items-center justify-between mb-3">
        <p class="text-headline-sm font-headline-sm text-on-surface">Recent Activity</p>
        <button class="text-body-sm font-body-md text-primary">Full history</button>
      </div>
      <div class="rounded-xl border border-outline-variant/40 overflow-hidden">
        ${[
          { date: 'Today', time: '8:14 AM', duration: '1h 22m', zone: 'Weight Floor + Cardio' },
          { date: 'Yesterday', time: '7:45 AM', duration: '55m', zone: 'Yoga Studio' },
          { date: 'Mon 23', time: '6:30 PM', duration: '1h 10m', zone: 'Pool Deck' },
          { date: 'Sun 22', time: '9:00 AM', duration: '45m', zone: 'Group Classes' },
        ].map((a, i) => `
          <div class="flex items-center gap-3 px-3 py-2.5 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-lowest'} border-t border-outline-variant/30">
            <div class="w-8 h-8 rounded-lg bg-secondary-container/40 flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-secondary" style="font-size:16px;font-variation-settings:'FILL' 1">fitness_center</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-body-sm font-body-md font-semibold text-on-surface">${a.zone}</p>
              <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">${a.date} · ${a.time}</p>
            </div>
            <span class="text-data-tabular font-data-tabular text-on-surface-variant flex-shrink-0" style="font-size:12px">${a.duration}</span>
          </div>`).join('')}
      </div>
    </div>
  </div>
  `;
}
