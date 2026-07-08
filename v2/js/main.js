// Extra Dimensions — "The Hidden Meter" narrative page
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth scroll for nav / CTA buttons
  document.querySelectorAll('[data-scroll]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = el.dataset.scroll;
      const target = targetId === 'top' ? document.body : document.getElementById(targetId);
      if (!target) return;
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      closeMobileNav();
    });
  });

  // Nav background on scroll
  const nav = document.getElementById('siteNav');
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const mobilePanel = document.getElementById('mobileNavPanel');
  function closeMobileNav() {
    mobilePanel.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  navToggle.addEventListener('click', () => {
    const isOpen = mobilePanel.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobilePanel.classList.contains('open')) {
      closeMobileNav();
      navToggle.focus();
    }
  });

  // The Live Meter — ticking estimate (paused/static under reduced motion,
  // paused while the tab is hidden, and capped so it never runs forever)
  const waterEl = document.getElementById('waterDigitsValue');
  const powerEl = document.getElementById('powerDigitsValue');
  const lossEl = document.getElementById('lossDigits');
  if (waterEl && powerEl && lossEl) {
    const WATER_PER_SEC = 0.9;    // litres/sec illustrative leak rate
    const POWER_PER_SEC = 0.012;  // kWh/sec illustrative wastage rate
    const WATER_COST_PER_L = 0.03;  // R/L illustrative
    const POWER_COST_PER_KWH = 2.8; // R/kWh illustrative
    const CAP_SECONDS = 180; // freeze the illustrative estimate after 3 minutes

    function render(elapsedSec) {
      const water = elapsedSec * WATER_PER_SEC;
      const power = elapsedSec * POWER_PER_SEC;
      const cost = water * WATER_COST_PER_L + power * POWER_COST_PER_KWH;
      waterEl.textContent = water.toFixed(1);
      powerEl.textContent = power.toFixed(2);
      lossEl.textContent = 'R' + cost.toFixed(2);
    }

    if (prefersReducedMotion) {
      render(42.3); // representative static snapshot
    } else {
      let elapsedBeforePause = 0;
      let runningStart = performance.now();
      let rafId = null;

      function tick(now) {
        const elapsedSec = elapsedBeforePause + (now - runningStart) / 1000;
        if (elapsedSec >= CAP_SECONDS) { render(CAP_SECONDS); rafId = null; return; }
        render(elapsedSec);
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);

      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
          elapsedBeforePause += (performance.now() - runningStart) / 1000;
        } else if (elapsedBeforePause < CAP_SECONDS) {
          runningStart = performance.now();
          rafId = requestAnimationFrame(tick);
        }
      });
    }
  }

  // Scroll reveal (single + staggered groups). Visible by default in CSS,
  // so a JS failure never hides content.
  function activateReveal(el) { el.classList.add('in'); el.classList.remove('pre'); }
  const revealEls = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if (revealEls.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateReveal(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top >= window.innerHeight * 0.9) el.classList.add('pre');
      io.observe(el);
    });
  }

  // FAQ accordion — keyboard accessible, tracks the open item directly
  let openFaqItem = document.querySelector('.faq-item.open');
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    function toggle() {
      const isOpen = item === openFaqItem;
      if (openFaqItem) {
        openFaqItem.classList.remove('open');
        openFaqItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      }
      if (!isOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
        openFaqItem = item;
      } else {
        openFaqItem = null;
      }
    }
    q.addEventListener('click', toggle);
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  // Hide the mobile sticky CTA once the climax section (which has its own
  // full-size form and submit button) is in view, so they don't overlap.
  const climaxSection = document.getElementById('climax');
  const stickyCta = document.querySelector('.mobile-sticky-cta');
  if (climaxSection && stickyCta && 'IntersectionObserver' in window) {
    const climaxIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => stickyCta.classList.toggle('is-hidden', entry.isIntersecting));
    }, { threshold: 0.15 });
    climaxIo.observe(climaxSection);
  }

  // Lead form — progressive-enhancement AJAX submit
  document.querySelectorAll('form[data-ajax]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

      const data = new FormData(form);
      const body = new URLSearchParams(data).toString();

      fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
        .then(() => showSuccess(form))
        .catch(() => showSuccess(form))
        .finally(() => { if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; } });
    });
  });
  function showSuccess(form) {
    const wrapper = form.closest('[data-form-wrapper]') || form.parentElement;
    const success = wrapper.querySelector('.form-success');
    form.style.display = 'none';
    if (success) success.classList.add('show');
    form.reset();
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
