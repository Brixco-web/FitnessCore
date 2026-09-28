/** Member — Calendar / Attendance Analytics screen */
export function renderMemberCalendar(): string {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // Simulate a month of attendance: 1 = visited, 0 = missed, null = future
  const attendance = [
    1,1,0,1,1,0,0,
    1,1,1,0,1,1,0,
    1,0,1,1,1,0,0,
    1,1,1,1,null,null,null,
    null,null,null,null,null,null,null,
  ];

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
        <button class="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors">
          <span class="material-symbols-outlined text-on-surface-variant" style="font-size:20px">notifications</span>
        </button>
        <button class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center">
          <span class="material-symbols-outlined text-on-primary-container" style="font-size:20px;font-variation-settings:'FILL' 1">person</span>
        </button>
      </div>
    </div>
    <div class="flex items-center px-4 gap-2 pb-2 pt-1">
      <button class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-surface-container text-on-surface-variant" onclick="window.fitcoreSetRole('admin')">Admin</button>
      <button class="flex-1 py-1.5 rounded-full text-body-sm font-body-md font-semibold bg-primary text-on-primary" onclick="window.fitcoreSetRole('user')">Member</button>
    </div>
  </div>

  <!-- ===== SCROLLABLE CONTENT ===== -->
  <div class="overflow-y-auto flex-1" style="padding-top: 96px; padding-bottom: 80px;">

    <!-- Month Nav -->
    <div class="flex items-center justify-between px-4 mt-3 mb-3">
      <button class="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors">
        <span class="material-symbols-outlined text-on-surface-variant" style="font-size:20px">chevron_left</span>
      </button>
      <p class="text-headline-sm font-headline-sm text-on-surface">September 2024</p>
      <button class="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors">
        <span class="material-symbols-outlined text-on-surface-variant" style="font-size:20px">chevron_right</span>
      </button>
    </div>

    <!-- Stats strip -->
    <div class="flex gap-3 mx-4 mb-4">
      <div class="flex-1 p-3 rounded-xl bg-primary-container/10 border border-primary/20 text-center">
        <p class="text-data-metric font-data-metric text-primary" style="font-size:24px">21</p>
        <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">Visits</p>
      </div>
      <div class="flex-1 p-3 rounded-xl bg-secondary-container/20 border border-secondary/20 text-center">
        <p class="text-data-metric font-data-metric text-secondary" style="font-size:24px">12</p>
        <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">Streak 🔥</p>
      </div>
      <div class="flex-1 p-3 rounded-xl bg-surface-container border border-outline-variant/40 text-center">
        <p class="text-data-metric font-data-metric text-on-surface" style="font-size:24px">87%</p>
        <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">Consistency</p>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="mx-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
      <!-- Day labels -->
      <div class="grid grid-cols-7 gap-1 mb-1">
        ${days.map(d => `<div class="text-center text-label-caps font-label-caps text-on-surface-variant uppercase">${d}</div>`).join('')}
      </div>
      <!-- Day cells -->
      <div class="grid grid-cols-7 gap-1">
        ${attendance.map((val, idx) => {
          const dayNum = idx + 1;
          const isToday = dayNum === 24;
          if (val === null) {
            return `<div class="aspect-square rounded-lg flex items-center justify-center">
              <span class="text-body-sm font-body-md text-on-surface-variant/30">${dayNum <= 30 ? dayNum : ''}</span>
            </div>`;
          }
          return `<div class="aspect-square rounded-lg flex items-center justify-center relative cursor-pointer transition-all
            ${isToday ? 'ring-2 ring-primary ring-offset-1' : ''}
            ${val === 1 ? 'bg-secondary' : 'bg-surface-container'}">
            <span class="text-body-sm font-body-md font-semibold ${val === 1 ? 'text-on-secondary' : 'text-on-surface-variant'}">${dayNum}</span>
            ${val === 1 ? `<span class="material-symbols-outlined absolute bottom-0.5 text-on-secondary/60" style="font-size:8px">check</span>` : ''}
          </div>`;
        }).join('')}
      </div>
      <!-- Legend -->
      <div class="flex items-center gap-4 mt-3 justify-center">
        <div class="flex items-center gap-1.5">
          <div class="w-3 h-3 rounded-sm bg-secondary"></div>
          <span class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">Visited</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-3 h-3 rounded-sm bg-surface-container border border-outline-variant/40"></div>
          <span class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">Missed</span>
        </div>
        <div class="flex items-center gap-1.5">
          <div class="w-3 h-3 rounded-sm border-2 border-primary"></div>
          <span class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">Today</span>
        </div>
      </div>
    </div>

    <!-- Weekly Duration Chart -->
    <div class="mx-4 mt-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
      <p class="text-headline-sm font-headline-sm text-on-surface mb-3">Session Duration (This Week)</p>
      <div class="flex items-end gap-2 h-20">
        ${[62, 0, 75, 48, 90, 55, 0].map((min, i) => `
          <div class="flex-1 flex flex-col items-center gap-1">
            ${min > 0 ? `<span class="text-body-sm font-data-tabular text-on-surface-variant" style="font-size:10px">${min}m</span>` : ''}
            <div class="w-full rounded-t-sm ${min > 0 ? 'bg-primary' : 'bg-surface-container-high'}" style="height:${min > 0 ? Math.round((min / 90) * 60) : 4}px"></div>
            <span class="text-label-caps font-label-caps text-on-surface-variant uppercase">${days[i]}</span>
          </div>`).join('')}
      </div>
    </div>

    <!-- Booked Classes -->
    <div class="mx-4 mt-4 mb-2">
      <p class="text-headline-sm font-headline-sm text-on-surface mb-3">Upcoming Bookings</p>
      <div class="flex flex-col gap-2">
        ${[
          { name: 'HIIT Bootcamp', date: 'Today · 5:30 PM', trainer: 'Mohammed Ali', icon: 'fitness_center' },
          { name: 'Yoga Flow', date: 'Tue · 7:00 AM', trainer: 'Anjali Sinha', icon: 'self_improvement' },
          { name: 'Aqua Aerobics', date: 'Thu · 9:00 AM', trainer: 'Deepa Nair', icon: 'pool' },
        ].map(c => `
          <div class="flex items-center gap-3 p-3 rounded-xl bg-surface-container border border-outline-variant/40">
            <div class="w-10 h-10 rounded-xl bg-primary-container/30 flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-primary" style="font-size:20px;font-variation-settings:'FILL' 1">${c.icon}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-body-sm font-body-md font-semibold text-on-surface">${c.name}</p>
              <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">${c.date} · ${c.trainer}</p>
            </div>
            <button class="px-3 py-1 rounded-full bg-error-container/40 text-on-error-container text-body-sm font-body-md hover:bg-error-container transition-colors" style="font-size:11px">
              Cancel
            </button>
          </div>`).join('')}
      </div>
    </div>
  </div>
  `;
}
