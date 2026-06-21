/* =====================================================================
   enhance.js — premium interactions for the e-portfolio
   No-build, vanilla JS. Safe to load on every page (feature-detected).
   Deps (optional, loaded via CDN before this file):
     - THREE + VANTA.NET  -> hero 3D network background
     - VanillaTilt        -> 3D parallax tilt on [data-tilt] cards
   All motion is gated by prefers-reduced-motion and pointer/device checks.
   ===================================================================== */
(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isSmall = window.matchMedia('(max-width: 1023px)').matches;
  const onReady = (fn) =>
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', fn)
      : fn();

  /* ---------- 1. Scroll progress bar ---------- */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    const root = document.documentElement;
    const update = () => {
      const max = root.scrollHeight - root.clientHeight;
      const ratio = max > 0 ? root.scrollTop / max : 0;
      bar.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- 2. Custom cursor glow (desktop only) ---------- */
  function initCursorGlow() {
    if (!finePointer || prefersReduced) return;
    const glow = document.createElement('div');
    glow.className = 'cursor_glow';
    document.body.appendChild(glow);
    let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y;
    window.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    (function loop() {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      glow.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
    const grow = 'cursor_glow--active';
    document.querySelectorAll('a, button, .int_card, .edu_card, .skill_tile, [data-tilt]').forEach((el) => {
      el.addEventListener('mouseenter', () => glow.classList.add(grow));
      el.addEventListener('mouseleave', () => glow.classList.remove(grow));
    });
  }

  /* ---------- 3. Reveal-on-scroll (lightweight, complements ScrollReveal) ---------- */
  function initReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (entry.target.dataset.revealDelay || '0') + 'ms';
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- 4. Animated number counters ---------- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      if (prefersReduced) { el.textContent = target + suffix; return; }
      const dur = 1400, start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!('IntersectionObserver' in window)) { counters.forEach(run); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => io.observe(el));
  }

  /* ---------- 5. Skill meter fill on view ---------- */
  function initMeters() {
    const meters = document.querySelectorAll('[data-meter]');
    if (!meters.length) return;
    const fill = (el) => {
      const val = el.dataset.meter;
      const bar = el.querySelector('.meter_fill');
      if (bar) bar.style.width = prefersReduced ? val + '%' : val + '%';
    };
    if (!('IntersectionObserver' in window)) { meters.forEach(fill); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { fill(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    meters.forEach((el) => io.observe(el));
  }

  /* ---------- 6. Typewriter rotating roles ---------- */
  function initTyping() {
    const el = document.querySelector('[data-typing]');
    if (!el) return;
    let words;
    try { words = JSON.parse(el.getAttribute('data-typing')); } catch (e) { return; }
    if (!Array.isArray(words) || !words.length) return;
    if (prefersReduced) { el.textContent = words[0]; return; }
    let w = 0, c = 0, deleting = false;
    const step = () => {
      const word = words[w];
      el.textContent = word.slice(0, c);
      if (!deleting && c < word.length) { c++; setTimeout(step, 70); }
      else if (!deleting && c === word.length) { deleting = true; setTimeout(step, 1500); }
      else if (deleting && c > 0) { c--; setTimeout(step, 35); }
      else { deleting = false; w = (w + 1) % words.length; setTimeout(step, 350); }
    };
    step();
  }

  /* ---------- 7. Magnetic buttons (desktop only) ---------- */
  function initMagnetic() {
    if (!finePointer || prefersReduced) return;
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + mx * 0.18 + 'px,' + my * 0.28 + 'px)';
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- 8. Vanilla-Tilt on cards ---------- */
  function initTilt() {
    if (!window.VanillaTilt || !finePointer || prefersReduced) return;
    const els = document.querySelectorAll('[data-tilt]');
    if (!els.length) return;
    window.VanillaTilt.init(els, {
      max: 7,
      speed: 600,
      glare: true,
      'max-glare': 0.16,
      scale: 1.015,
      perspective: 1200,
      gyroscope: false
    });
  }

  /* ---------- 9. Vanta 3D network background (desktop only) ---------- */
  function initVanta() {
    const el = document.getElementById('vanta-hero');
    if (!el || isSmall || prefersReduced || !window.VANTA || !window.VANTA.NET || !window.THREE) return;
    try {
      el._vanta = window.VANTA.NET({
        el: el,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x21e6ff,
        backgroundColor: 0x070b14,
        backgroundAlpha: 0.0,
        points: 11.0,
        maxDistance: 22.0,
        spacing: 17.0,
        showDots: true
      });
    } catch (e) { /* graceful: keep CSS gradient backdrop */ }
  }

  /* ---------- 10. Project slider: arrow-key navigation ---------- */
  function initSliderKeys() {
    const slider = document.querySelector('[data-project-slider]');
    if (!slider) return;
    const prev = document.querySelector('.project_nav--prev');
    const next = document.querySelector('.project_nav--next');
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' && next) { e.preventDefault(); next.click(); }
      if (e.key === 'ArrowLeft' && prev) { e.preventDefault(); prev.click(); }
    });
  }

  /* ---------- 11. Precise active nav link + index scroll-spy ---------- */
  function initActiveNav() {
    const links = Array.from(document.querySelectorAll('.nav_link'));
    if (!links.length) return;
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const fileOf = (l) => {
      const u = new URL(l.getAttribute('href'), location.href);
      return { file: (u.pathname.split('/').pop() || 'index.html').toLowerCase(), hash: u.hash };
    };
    const clearAll = () => links.forEach((l) => l.classList.remove('active'));

    // default: exact filename match with no hash (so "Contact" doesn't double-light "Home")
    clearAll();
    const main = links.find((l) => { const f = fileOf(l); return f.file === current && !f.hash; });
    if (main) main.classList.add('active');

    // index page: toggle Home <-> Contact as the contact section enters view
    const contactSection = document.getElementById('contact');
    if (current === 'index.html' && contactSection && 'IntersectionObserver' in window) {
      const homeLink = links.find((l) => { const f = fileOf(l); return f.file === 'index.html' && !f.hash; });
      const contactLink = links.find((l) => (l.getAttribute('href') || '').includes('#contact'));
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          clearAll();
          if (entry.isIntersecting) { if (contactLink) contactLink.classList.add('active'); }
          else if (homeLink) homeLink.classList.add('active');
        });
      }, { threshold: 0.35 });
      io.observe(contactSection);
    }
  }

  /* ---------- 12. Year auto-update in footer ---------- */
  function initYear() {
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = new Date().getFullYear();
    });
  }

  onReady(function () {
    initScrollProgress();
    initCursorGlow();
    initReveal();
    initCounters();
    initMeters();
    initTyping();
    initMagnetic();
    initTilt();
    initVanta();
    initSliderKeys();
    initActiveNav();
    initYear();
  });
})();
