/* ========================================
   Scroll Spy & Scroll Effects
   ======================================== */

export function initScrollSpy() {
  const navLinks = document.querySelectorAll('[data-nav-link]');
  const mobileLinks = document.querySelectorAll('[data-mobile-link]');
  const navbar = document.querySelector('.navbar__inner');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveSection() {
    // Navbar shrink on scroll
    if (navbar) {
      if (window.scrollY > 20) {
        navbar.classList.add('navbar__inner--scrolled');
      } else {
        navbar.classList.remove('navbar__inner--scrolled');
      }
    }

    // Determine active section
    let currentId = 'inicio';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.35) {
        currentId = section.id;
      }
    });

    // Update desktop nav
    navLinks.forEach(link => {
      const href = link.getAttribute('href')?.substring(1);
      const bg = link.querySelector('.navbar__link-bg');

      if (href === currentId) {
        link.classList.add('navbar__link--active');
        if (bg) bg.style.display = 'block';
      } else {
        link.classList.remove('navbar__link--active');
        if (bg) bg.style.display = 'none';
      }
    });

    // Update mobile nav
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href')?.substring(1);
      if (href === currentId) {
        link.classList.add('navbar__mobile-link--active');
      } else {
        link.classList.remove('navbar__mobile-link--active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();
}

export function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}
