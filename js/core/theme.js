/* ========================================
   Theme Toggle (Dark / Light Mode)
   ======================================== */

export function initTheme() {
  const html = document.documentElement;
  const stored = localStorage.getItem('theme');

  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }

  // Update all toggle button icons
  updateThemeIcons();
}

export function toggleTheme() {
  const html = document.documentElement;
  html.classList.toggle('dark');

  const isDark = html.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const buttons = document.querySelectorAll('[data-theme-toggle]');

  buttons.forEach(btn => {
    const sunIcon = btn.querySelector('.icon-sun');
    const moonIcon = btn.querySelector('.icon-moon');

    if (sunIcon && moonIcon) {
      sunIcon.style.display = isDark ? 'block' : 'none';
      moonIcon.style.display = isDark ? 'none' : 'block';
    }
  });
}
