/* ═══════════════════════════════════════════════════════════════
   FitCore — Toast Notification Utility
   ═══════════════════════════════════════════════════════════════ */

let _toastTimer: ReturnType<typeof setTimeout> | null = null;

export function showToast(
  message: string,
  type: 'success' | 'error' | 'warning' | 'info' = 'success',
): void {
  // Remove existing toast
  const existing = document.getElementById('fc-toast');
  if (existing) existing.remove();
  if (_toastTimer) clearTimeout(_toastTimer);

  const toast = document.createElement('div');
  toast.id = 'fc-toast';
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  _toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ═══════════════════════════════════════════════════════════════
   HTML Helper — Material Symbol icon
   ═══════════════════════════════════════════════════════════════ */
export function icon(name: string, cls = ''): string {
  return `<span class="material-symbols-rounded ${cls}">${name}</span>`;
}
