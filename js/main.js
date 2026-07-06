/* ============================================
   Relive Landing Page — Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
  initParallaxOrbs();
});

/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---------- Nav Background on Scroll ---------- */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ---------- Mobile Menu Toggle ---------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const nav = document.querySelector('.nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('nav--mobile-open');
    const isOpen = nav.classList.contains('nav--mobile-open');
    hamburger.setAttribute('aria-expanded', isOpen);

    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close on link click
  document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav--mobile-open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Smooth Scroll for Anchor Links ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/* ---------- Parallax Background Orbs ---------- */
function initParallaxOrbs() {
  const orbs = document.querySelectorAll('.bg-orb');
  if (orbs.length === 0) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        orbs.forEach((orb, i) => {
          const speed = 0.02 + i * 0.015;
          orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
}
