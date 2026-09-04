/* ============================================================
   ARANN TECH — COMPONENTS JS
   components.js: Typewriter, ticker, counters, accordion
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initTypewriter();
    initTicker();
    initAccordion();
  });

  // ─── TYPEWRITER EFFECT ────────────────────────────────────────
  function initTypewriter() {
    const el = document.getElementById('typewriter-text');
    if (!el) return;

    const phrases = el.getAttribute('data-phrases')
      ? JSON.parse(el.getAttribute('data-phrases'))
      : ['Built for Where You\'re Headed.', 'Built for What\'s Next.', 'Built to Protect What Matters.'];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    // Minimum height so layout doesn't jump
    const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 48;
    el.style.minHeight = lineHeight + 'px';

    function type() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
      } else {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
      }

      let delay = isDeleting ? 40 : 70;

      if (!isDeleting && charIndex === current.length) {
        // Pause at full phrase
        delay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      timeout = setTimeout(type, delay);
    }

    // Small initial delay before starting
    timeout = setTimeout(type, 800);
  }

  // ─── TRUST TICKER (duplicates for seamless loop) ──────────────
  function initTicker() {
    const track = document.querySelector('.ticker-track');
    if (!track) return;

    // Clone children for seamless loop
    const items = Array.from(track.children);
    items.forEach(item => {
      track.appendChild(item.cloneNode(true));
    });
  }

  // ─── ACCORDION (for FAQ or expandable sections) ───────────────
  function initAccordion() {
    const accordions = document.querySelectorAll('[data-accordion]');
    accordions.forEach(acc => {
      const trigger  = acc.querySelector('[data-accordion-trigger]');
      const content  = acc.querySelector('[data-accordion-content]');
      if (!trigger || !content) return;

      // Set initial state
      content.style.overflow = 'hidden';
      content.style.maxHeight = acc.classList.contains('open') ? content.scrollHeight + 'px' : '0';
      content.style.transition = 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease';
      content.style.opacity   = acc.classList.contains('open') ? '1' : '0';

      trigger.addEventListener('click', () => {
        const isOpen = acc.classList.toggle('open');
        content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0';
        content.style.opacity   = isOpen ? '1' : '0';

        // Rotate arrow icon if present
        const arrow = trigger.querySelector('.accordion-arrow');
        if (arrow) arrow.style.transform = isOpen ? 'rotate(180deg)' : '';
      });
    });
  }

})();
