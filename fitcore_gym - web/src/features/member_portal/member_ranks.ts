/** Member — Leaderboard / Ranks screen */
export function renderMemberRanks(): string {
  const members = [
    { rank: 1, name: 'Priya Sharma', visits: 156, streak: 34, points: 2480, tier: 'Diamond', avatar: 'P', me: false },
    { rank: 2, name: 'Rahul Verma', visits: 148, streak: 28, points: 2310, tier: 'Diamond', avatar: 'R', me: false },
    { rank: 3, name: 'Neha Singh', visits: 141, streak: 21, points: 2195, tier: 'Platinum', avatar: 'N', me: false },
    { rank: 4, name: 'Arjun Mehta', visits: 134, streak: 12, points: 2080, tier: 'Gold', avatar: 'A', me: true },
    { rank: 5, name: 'Sunita Rao', visits: 128, streak: 19, points: 1940, tier: 'Gold', avatar: 'S', me: false },
    { rank: 6, name: 'Dev Anand', visits: 119, streak: 8, points: 1820, tier: 'Silver', avatar: 'D', me: false },
    { rank: 7, name: 'Meera Joshi', visits: 112, streak: 14, points: 1750, tier: 'Silver', avatar: 'M', me: false },
    { rank: 8, name: 'Arun Kumar', visits: 104, streak: 6, points: 1640, tier: 'Silver', avatar: 'A', me: false },
    { rank: 9, name: 'Pooja Iyer', visits: 98, streak: 11, points: 1580, tier: 'Bronze', avatar: 'P', me: false },
    { rank: 10, name: 'Rohan Das', visits: 91, streak: 5, points: 1490, tier: 'Bronze', avatar: 'R', me: false },
  ];

  const tierColor: Record<string, string> = {
    Diamond: 'text-primary bg-primary-container/30',
    Platinum: 'text-secondary bg-secondary-container/30',
    Gold: 'text-tertiary bg-tertiary-container/30',
    Silver: 'text-on-surface-variant bg-surface-container-high',
    Bronze: 'text-outline bg-surface-container',
  };

  const rankIcon = (r: number) => {
    if (r === 1) return '🥇';
    if (r === 2) return '🥈';
    if (r === 3) return '🥉';
    return `${r}`;
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

    <!-- Title & Period -->
    <div class="flex items-center justify-between px-4 mt-3 mb-3">
      <p class="text-headline-sm font-headline-sm text-on-surface">Leaderboard</p>
      <div class="flex items-center gap-1 bg-surface-container rounded-full p-0.5">
        ${['Week', 'Month', 'All-time'].map((p, i) => `<button class="px-3 py-1 rounded-full text-label-caps font-label-caps uppercase tracking-widest ${i === 1 ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}">${p}</button>`).join('')}
      </div>
    </div>

    <!-- My Rank Banner -->
    <div class="mx-4 mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/10 via-tertiary/10 to-primary/10 border border-primary/20 flex items-center gap-3">
      <span class="text-2xl">4th</span>
      <div class="flex-1">
        <p class="text-body-sm font-body-md font-semibold text-on-surface">Your ranking this month</p>
        <p class="text-body-sm font-body-md text-on-surface-variant" style="font-size:11px">2,080 pts · 3 pts behind #3 — keep going!</p>
      </div>
      <span class="material-symbols-outlined text-primary" style="font-size:20px;font-variation-settings:'FILL' 1">emoji_events</span>
    </div>

    <!-- Top 3 Podium -->
    <div class="mx-4 mb-4 flex items-end justify-center gap-3">
      <!-- 2nd -->
      <div class="flex-1 flex flex-col items-center gap-2">
        <div class="w-12 h-12 rounded-full bg-secondary-container/40 flex items-center justify-center">
          <span class="font-bold text-on-surface">R</span>
        </div>
        <p class="text-body-sm font-body-md font-semibold text-on-surface text-center leading-tight">Rahul V.</p>
        <div class="w-full bg-secondary/60 rounded-t-lg flex items-end justify-center" style="height:56px">
          <span class="text-2xl mb-1">🥈</span>
        </div>
      </div>
      <!-- 1st -->
      <div class="flex-1 flex flex-col items-center gap-2">
        <div class="w-14 h-14 rounded-full bg-primary-container/40 border-2 border-primary flex items-center justify-center">
          <span class="font-bold text-on-surface">P</span>
        </div>
        <p class="text-body-sm font-body-md font-semibold text-on-surface text-center leading-tight">Priya S.</p>
        <div class="w-full bg-primary/70 rounded-t-lg flex items-end justify-center" style="height:72px">
          <span class="text-2xl mb-1">🥇</span>
        </div>
      </div>
      <!-- 3rd -->
      <div class="flex-1 flex flex-col items-center gap-2">
        <div class="w-12 h-12 rounded-full bg-tertiary-container/30 flex items-center justify-center">
          <span class="font-bold text-on-surface">N</span>
        </div>
        <p class="text-body-sm font-body-md font-semibold text-on-surface text-center leading-tight">Neha S.</p>
        <div class="w-full bg-tertiary/50 rounded-t-lg flex items-end justify-center" style="height:44px">
          <span class="text-2xl mb-1">🥉</span>
        </div>
      </div>
    </div>

    <!-- Full List -->
    <div class="mx-4 rounded-xl border border-outline-variant/40 overflow-hidden">
      <div class="grid px-3 py-2 bg-surface-container-high" style="grid-template-columns: 32px 1fr auto auto">
        <span class="text-label-caps font-label-caps text-on-surface-variant uppercase">#</span>
        <span class="text-label-caps font-label-caps text-on-surface-variant uppercase">Member</span>
        <span class="text-label-caps font-label-caps text-on-surface-variant uppercase text-right pr-3">Visits</span>
        <span class="text-label-caps font-label-caps text-on-surface-variant uppercase text-right">Points</span>
      </div>
      ${members.map((m, i) => `
        <div class="grid items-center px-3 py-2.5 gap-2 ${m.me ? 'bg-primary-container/20 border-l-2 border-primary' : i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-lowest'} border-t border-outline-variant/30"
          style="grid-template-columns: 32px 1fr auto auto">
          <span class="text-body-sm font-body-md font-bold text-on-surface text-center">${rankIcon(m.rank)}</span>
          <div class="flex items-center gap-2 min-w-0">
            <div class="w-7 h-7 rounded-full ${m.me ? 'bg-primary' : 'bg-surface-container-high'} flex items-center justify-center flex-shrink-0">
              <span class="text-body-sm font-bold ${m.me ? 'text-on-primary' : 'text-on-surface'}" style="font-size:10px">${m.avatar}</span>
            </div>
            <div class="min-w-0">
              <p class="text-body-sm font-body-md font-semibold text-on-surface truncate ${m.me ? 'text-primary' : ''}">${m.name} ${m.me ? '(You)' : ''}</p>
              <span class="text-label-caps font-label-caps px-1.5 py-0.5 rounded ${tierColor[m.tier]}" style="font-size:9px">${m.tier}</span>
            </div>
          </div>
          <span class="text-data-tabular font-data-tabular text-on-surface-variant text-right pr-3">${m.visits}</span>
          <span class="text-data-tabular font-data-tabular text-on-surface font-semibold text-right">${m.points.toLocaleString()}</span>
        </div>`).join('')}
    </div>
    <div class="h-4"></div>
  </div>
  `;
}
