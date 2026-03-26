/* ========================================
   Navbar - Mobile Menu
   ======================================== */

export function initNavbar() {
  const hamburgerBtn = document.querySelector('[data-hamburger]');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  const mobileLinks = document.querySelectorAll('[data-mobile-link]');

  if (!hamburgerBtn || !mobileMenu) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    updateHamburgerIcon();
  }

  function closeMenu() {
    isOpen = false;
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    updateHamburgerIcon();
  }

  function updateHamburgerIcon() {
    const menuIcon = hamburgerBtn.querySelector('.icon-menu');
    const closeIcon = hamburgerBtn.querySelector('.icon-close');
    if (menuIcon && closeIcon) {
      menuIcon.style.display = isOpen ? 'none' : 'block';
      closeIcon.style.display = isOpen ? 'block' : 'none';
    }
  }

  hamburgerBtn.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
  });

  // Close on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (isOpen && !mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
      closeMenu();
    }
  });
}
