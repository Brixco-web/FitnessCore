/** Member — Feed / Facility Notices & Bulletins screen */
export function renderMemberFeed(): string {
  const notices = [
    {
      type: 'alert',
      icon: 'warning',
      iconColor: 'text-tertiary',
      bg: 'bg-tertiary-container/20 border-tertiary/30',
      tag: 'Maintenance',
      tagBg: 'bg-tertiary-container text-on-tertiary-container',
      title: 'Pool Temporarily Closed',
      body: 'The main pool will be under maintenance from 25–27 Sep. The heated pool remains available. We apologize for the inconvenience.',
      time: '2h ago',
      pin: true,
    },
    {
      type: 'event',
      icon: 'event',
      iconColor: 'text-primary',
      bg: 'bg-primary-container/10 border-primary/20',
      tag: 'Event',
      tagBg: 'bg-primary-container text-on-primary-container',
      title: 'FitCore Annual Sports Day 🏆',
      body: 'Join us on Oct 5th for our Annual Sports Day! Competitions in swimming, track, and team sports. Register before Sep 30 to secure your spot.',
      time: 'Yesterday',
      pin: true,
    },
    {
      type: 'notice',
      icon: 'schedule',
      iconColor: 'text-secondary',
      bg: 'bg-surface-container-low border-outline-variant/40',
      tag: 'Hours',
      tagBg: 'bg-secondary-container text-on-secondary-container',
      title: 'Revised Operating Hours — Oct',
      body: 'From October 1, weekday hours will extend to 10 PM (from 9 PM). Weekend hours remain 6 AM – 8 PM. See full schedule in the app.',
      time: '2 days ago',
      pin: false,
    },
    {
      type: 'achievement',
      icon: 'emoji_events',
      iconColor: 'text-tertiary',
      bg: 'bg-tertiary-container/10 border-tertiary/20',
      tag: 'Achievement',
      tagBg: 'bg-tertiary-container text-on-tertiary-container',
      title: 'You hit a 10-day streak! 🔥',
      body: "Congratulations Arjun! You've visited the gym for 10 consecutive days. Keep it up and unlock the Diamond badge at 30 days!",
      time: '3 days ago',
      pin: false,
    },
    {
      type: 'notice',
      icon: 'info',
      iconColor: 'text-primary',
      bg: 'bg-surface-container-low border-outline-variant/40',
      tag: 'Update',
      tagBg: 'bg-primary-container/30 text-primary',
      title: 'New Group Class: Zumba Gold',
      body: 'We are excited to introduce Zumba Gold — low-impact dance fitness for all ages! Classes every Wed & Fri at 4 PM. Book via the Calendar tab.',
      time: '4 days ago',
      pin: false,
    },
    {
      type: 'offer',
      icon: 'local_offer',
      iconColor: 'text-secondary',
      bg: 'bg-secondary-container/20 border-secondary/20',
      tag: 'Offer',
      tagBg: 'bg-secondary-container text-on-secondary-container',
      title: 'Refer a Friend — Get 1 Month Free',
      body: 'Invite a friend to join FitCore and get a free month when they sign up using your referral code FC-ARJUN-2024. Share via the link below.',
      time: '5 days ago',
      pin: false,
    },
    {
      type: 'notice',
      icon: 'verified',
      iconColor: 'text-secondary',
      bg: 'bg-surface-container-low border-outline-variant/40',
      tag: 'Policy',
      tagBg: 'bg-surface-container-high text-on-surface-variant',
      title: 'Updated Towel & Locker Policy',
      body: 'Effective Oct 1: Personal towels are mandatory on all equipment. Lockers must be emptied by closing time daily. Unclaimed items will be donated after 7 days.',
      time: '1 week ago',
      pin: false,
    },
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
        <button class="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center relative transition-colors">
          <span class="material-symbols-outlined text-on-surface-variant" style="font-size:20px">notifications</span>
          <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-tertiary"></span>
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

    <!-- Filter Chips -->
    <div class="flex overflow-x-auto no-scrollbar gap-2 px-4 mt-3 pb-1">
      ${['All', 'Pinned', 'Alerts', 'Events', 'Achievements', 'Offers'].map((f, i) => `
        <button class="flex-none px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest ${i === 0 ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant border border-outline-variant/40'}">${f}</button>
      `).join('')}
    </div>

    <!-- Notice Cards -->
    <div class="mx-4 mt-3 flex flex-col gap-3 mb-2">
      ${notices.map(n => `
        <div class="rounded-xl border ${n.bg} overflow-hidden">
          <div class="p-4">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-surface/60 flex items-center justify-center flex-shrink-0">
                <span class="material-symbols-outlined ${n.iconColor}" style="font-size:20px;font-variation-settings:'FILL' 1">${n.icon}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-1">
                  <span class="px-2 py-0.5 rounded-full text-label-caps font-label-caps uppercase tracking-widest ${n.tagBg}" style="font-size:10px">${n.tag}</span>
                  ${n.pin ? `<span class="material-symbols-outlined text-on-surface-variant" style="font-size:14px">push_pin</span>` : ''}
                  <span class="text-body-sm font-body-md text-on-surface-variant ml-auto" style="font-size:11px">${n.time}</span>
                </div>
                <p class="text-body-sm font-body-md font-semibold text-on-surface mb-1">${n.title}</p>
                <p class="text-body-sm font-body-md text-on-surface-variant">${n.body}</p>
              </div>
            </div>
            ${n.type === 'event' || n.type === 'offer' ? `
            <div class="mt-3 flex gap-2">
              <button class="flex-1 py-2 rounded-lg bg-primary text-on-primary text-body-sm font-body-md font-semibold hover:bg-primary/90 transition-colors active:scale-95">
                ${n.type === 'event' ? 'Register Now' : 'Get Code'}
              </button>
              <button class="px-4 py-2 rounded-lg bg-surface-container border border-outline-variant/40 text-on-surface-variant text-body-sm font-body-md hover:bg-surface-container-high transition-colors active:scale-95">
                Share
              </button>
            </div>` : ''}
          </div>
        </div>`).join('')}
    </div>
  </div>
  `;
}
