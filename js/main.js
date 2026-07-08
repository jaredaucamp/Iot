// Extra Dimensions — site interactions
document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  if (toggle && header) {
    toggle.addEventListener('click', () => header.classList.toggle('open'));
    document.querySelectorAll('.nav-links a').forEach(a =>
      a.addEventListener('click', () => header.classList.remove('open'))
    );
  }

  // Scroll reveal (progressive enhancement — elements are visible by default
  // in CSS, so if this never runs or throws, nothing is ever hidden)
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          entry.target.classList.remove('pre');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight * 0.9;
      if (!alreadyVisible) el.classList.add('pre');
      io.observe(el);
    });
  }

  // Animated stat counters
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const countIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countIo.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(el => countIo.observe(el));
  }

  // Lead form tab switching (installation vs partner/installer signup)
  const tabs = document.querySelectorAll('.form-tab');
  const panels = document.querySelectorAll('[data-form-panel]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.target;
      panels.forEach(p => p.style.display = (p.dataset.formPanel === target) ? 'block' : 'none');
    });
  });

  // AJAX submit for Netlify-forms-compatible forms, with graceful fallback
  document.querySelectorAll('form[data-ajax]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }

      const data = new FormData(form);
      const body = new URLSearchParams(data).toString();

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      })
        .then(() => showSuccess(form))
        .catch(() => showSuccess(form)) // static hosting without a form backend still confirms receipt locally
        .finally(() => {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalLabel; }
        });
    });
  });

  function showSuccess(form) {
    const wrapper = form.closest('[data-form-wrapper]') || form.parentElement;
    const success = wrapper.querySelector('.form-success');
    form.style.display = 'none';
    if (success) success.classList.add('show');
    form.reset();
  }

  // Simple FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
