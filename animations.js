/* ============================================================
   ARANN TECH — GSAP ANIMATIONS
   animations.js: All ScrollTrigger scenes for the homepage
   ============================================================ */

(function () {
  'use strict';

  // ─── Wait for GSAP to load ────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof gsap === 'undefined') {
      console.warn('GSAP not loaded — falling back to CSS animations');
      initCSSFallback();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    initHeroAnimations();
    initScrollReveal();
    initStatsCounter();
    initProcessSteps();
    initServiceCardTilt();
  });

  // ─── HERO animations ─────────────────────────────────────────
  function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl
      .from('#hero .hero-badge', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        delay: 0.3
      })
      .from('#hero .hero-headline', {
        opacity: 0,
        y: 40,
        duration: 0.9
      }, '-=0.3')
      .from('#hero .hero-subtext', {
        opacity: 0,
        y: 30,
        duration: 0.7
      }, '-=0.5')
      .from('#hero .hero-ctas', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, '-=0.4')
      .from('#hero .hero-stats', {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, '-=0.3')
      .from('#hero .hero-visual', {
        opacity: 0,
        x: 60,
        duration: 1.0,
        ease: 'power2.out'
      }, '-=0.8');
  }

  // ─── SCROLL REVEAL: generic elements ─────────────────────────
  function initScrollReveal() {
    // Section labels
    gsap.utils.toArray('.section-label').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: 'power2.out'
      });
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out'
      });
    });

    // Service cards — staggered batch
    const serviceCards = gsap.utils.toArray('.service-card');
    if (serviceCards.length) {
      gsap.from(serviceCards, {
        scrollTrigger: {
          trigger: serviceCards[0].parentElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    // Case study cards
    const caseCards = gsap.utils.toArray('.case-card');
    if (caseCards.length) {
      gsap.from(caseCards, {
        scrollTrigger: {
          trigger: caseCards[0].parentElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out'
      });
    }

    // Why pillars — staggered
    const pillars = gsap.utils.toArray('.why-pillar');
    if (pillars.length) {
      gsap.from(pillars, {
        scrollTrigger: {
          trigger: '#why-section',
          start: 'top 78%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -30,
        stagger: 0.12,
        duration: 0.65,
        ease: 'power2.out'
      });
    }

    // Image card reveal
    const imgCard = document.querySelector('.img-card');
    if (imgCard) {
      gsap.from(imgCard, {
        scrollTrigger: { trigger: imgCard, start: 'top 82%', toggleActions: 'play none none none' },
        opacity: 0,
        x: 50,
        duration: 0.9,
        ease: 'power2.out'
      });
    }

    // CTA card
    const ctaCard = document.querySelector('.cta-card');
    if (ctaCard) {
      gsap.from(ctaCard, {
        scrollTrigger: { trigger: ctaCard, start: 'top 85%', toggleActions: 'play none none none' },
        opacity: 0,
        scale: 0.96,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      });
    }

    // Trust bar
    const ticker = document.querySelector('#trust-ticker');
    if (ticker) {
      gsap.from(ticker, {
        scrollTrigger: { trigger: ticker, start: 'top 95%', toggleActions: 'play none none none' },
        opacity: 0,
        duration: 0.5
      });
    }
  }

  // ─── STATS COUNTER ───────────────────────────────────────────
  function initStatsCounter() {
    const statValues = document.querySelectorAll('.stat-value[data-count]');
    if (!statValues.length) return;

    statValues.forEach(el => {
      const target   = parseFloat(el.getAttribute('data-count'));
      const suffix   = el.getAttribute('data-suffix') || '';
      const prefix   = el.getAttribute('data-prefix') || '';
      const decimals = (el.getAttribute('data-decimals') || '0') * 1;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = prefix + this.targets()[0].val.toFixed(decimals) + suffix;
            }
          });
        }
      });
    });
  }

  // ─── PROCESS STEPS ───────────────────────────────────────────
  function initProcessSteps() {
    const steps = gsap.utils.toArray('.process-step');
    if (!steps.length) return;

    gsap.from(steps, {
      scrollTrigger: {
        trigger: '#how-we-work',
        start: 'top 75%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power2.out'
    });

    // Animate the connecting line
    const line = document.querySelector('.process-line');
    if (line) {
      gsap.from(line, {
        scrollTrigger: { trigger: '#how-we-work', start: 'top 70%' },
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.2,
        ease: 'power2.out'
      });
    }
  }

  // ─── SERVICE CARD 3D TILT ─────────────────────────────────────
  function initServiceCardTilt() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        gsap.to(card, {
          rotateX,
          rotateY,
          scale: 1.02,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
          transformOrigin: 'center center'
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out'
        });
      });
    });
  }

  // ─── CSS FALLBACK (if GSAP fails to load) ────────────────────
  function initCSSFallback() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          entry.target.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .case-card, .process-step, .section-header, .why-pillar').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      observer.observe(el);
    });
  }

})();
