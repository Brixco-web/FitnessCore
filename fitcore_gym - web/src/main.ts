/* ═══════════════════════════════════════════════════════════════
   FitCore — Web Application Entry Point (TypeScript)
   Features the 2 roles: User and Admin
   ═══════════════════════════════════════════════════════════════ */

import './style.css';
import { FitCoreState } from './core/state';
import { UserRole } from './core/models';
import { renderNavbar, bindNavbarEvents } from './features/navigation/navbar';
import { renderUserPortal, bindUserPortalEvents } from './features/user_portal/user_portal';
import { renderAdminConsole, bindAdminConsoleEvents } from './features/admin_console/admin_console';

// Instantiate reactive state
const state = new FitCoreState();

function renderApp(): void {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  const currentRole = state.currentRole;

  appContainer.innerHTML = `
    <div class="fitcore-app-wrapper">
      <!-- Global Navigation with 2-Role Switcher -->
      ${renderNavbar(state)}

      <!-- Main Dynamic Content Container -->
      <main class="main-content-area container">
        ${
          currentRole === UserRole.User
            ? renderUserPortal(state)
            : renderAdminConsole(state)
        }
      </main>

      <!-- App Toast Container -->
      <div id="toast-container" class="toast-container" aria-live="polite"></div>
    </div>
  `;

  // Bind active DOM event handlers
  bindNavbarEvents(state);

  if (currentRole === UserRole.User) {
    bindUserPortalEvents(state);
  } else {
    bindAdminConsoleEvents(state);
  }
}

// Subscribe to state mutations for seamless reactivity
state.addListener(renderApp);

// Initial application render
renderApp();
