/* ============================================================
   ARANN TECH — MAIN JS
   main.js: Nav behavior, cursor glow, mobile menu, scroll
   ============================================================ */

(function () {
  'use strict';

  // ─── DOM Ready ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initCursorGlow();
    initMobileMenu();
    initSmoothScroll();
  });

  // ─── NAVBAR: scroll class + sticky behavior ────────────────────
  function initNav() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function updateNav() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });

    // Set active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ─── CURSOR GLOW ──────────────────────────────────────────────
  function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let raf;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animateGlow() {
      // Smooth lag follow
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = glowX + 'px';
      glow.style.top  = glowY + 'px';
      raf = requestAnimationFrame(animateGlow);
    }

    animateGlow();

    // Fade out glow when mouse leaves window
    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      glow.style.opacity = '1';
    });
  }

  // ─── MOBILE MENU ──────────────────────────────────────────────
  function initMobileMenu() {
    const hamburger = document.getElementById('nav-hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!hamburger || !mobileMenu) return;

    let isOpen = false;

    hamburger.addEventListener('click', toggleMenu);

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (isOpen && !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMenu();
      }
    });

    function toggleMenu() {
      isOpen ? closeMenu() : openMenu();
    }

    function openMenu() {
      isOpen = true;
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      isOpen = false;
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  // ─── SMOOTH SCROLL for anchor links ─────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

})();
