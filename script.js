/* =========================================================
   AHMAD TALLAL DAWOOD — PORTFOLIO
   script.js — vanilla JS only, no external libraries
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initScrollProgress();
  initStickyNav();
  initMobileMenu();
  initSmoothScroll();
  initActiveNavHighlight();
  initThemeToggle();
  initSpotlight();
  initTiltCard();
  initMagneticButtons();
  initTypingCode();
  initHeroWordRotator();
  initRevealOnScroll();
  initAnimatedCounters();
  initProjectFilter();
  initProjectModal();
  initFaqAccordion();
  initTestimonialCarousel();
  initContactForm();
  initRippleEffect();
  initBackToTop();
  initEasterEgg();
  initLazyLoad();
});

/* ---------------------------------------------------------
   Footer year
--------------------------------------------------------- */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   Scroll progress bar
--------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------------------------------------------------------
   Sticky navigation shadow state
--------------------------------------------------------- */
function initStickyNav() {
  const navWrap = document.getElementById('navWrap');
  if (!navWrap) return;

  const update = () => {
    navWrap.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------------------------------------------------------
   Mobile menu toggle
--------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------------------------------------------------
   Smooth scrolling for in-page anchors
--------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById('navWrap')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ---------------------------------------------------------
   Active nav link highlight via IntersectionObserver
--------------------------------------------------------- */
function initActiveNavHighlight() {
  const links = document.querySelectorAll('[data-nav]');
  if (!links.length) return;

  const sections = Array.from(links)
    .map((l) => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === id));
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---------------------------------------------------------
   Theme toggle (dark default, light optional) with persistence
   Note: uses in-memory variable as storage fallback since
   this file may run in environments without persistent storage.
--------------------------------------------------------- */
let currentTheme = 'dark';
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    if (currentTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    btn.setAttribute('aria-pressed', String(currentTheme === 'light'));
  });
}

/* ---------------------------------------------------------
   Mouse spotlight effect
--------------------------------------------------------- */
function initSpotlight() {
  const spot = document.getElementById('spotlight');
  if (!spot || window.matchMedia('(pointer: coarse)').matches) return;

  let active = false;
  window.addEventListener('mousemove', (e) => {
    spot.style.setProperty('--x', e.clientX + 'px');
    spot.style.setProperty('--y', e.clientY + 'px');
    if (!active) {
      spot.classList.add('is-active');
      active = true;
    }
  });
  window.addEventListener('mouseleave', () => spot.classList.remove('is-active'));
}

/* ---------------------------------------------------------
   Hero editor card tilt effect
--------------------------------------------------------- */
function initTiltCard() {
  const card = document.getElementById('tiltCard');
  if (!card || window.matchMedia('(pointer: coarse)').matches) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--tiltY', relX * 14 + 'deg');
    card.style.setProperty('--tiltX', relY * -14 + 'deg');
  });

  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--tiltX', '4deg');
    card.style.setProperty('--tiltY', '-6deg');
  });
}

/* ---------------------------------------------------------
   Magnetic buttons
--------------------------------------------------------- */
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  document.querySelectorAll('.magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
      btn.style.setProperty('--mx', x + 'px');
      btn.style.setProperty('--my', y + 'px');
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.setProperty('--mx', '0px');
      btn.style.setProperty('--my', '0px');
    });
  });
}

/* ---------------------------------------------------------
   Typing animation — hero "editor" code block (built manually)
--------------------------------------------------------- */
function initTypingCode() {
  const el = document.getElementById('typedCode');
  if (!el) return;

  const lines = [
    { text: 'const developer = {', className: '' },
    { text: "  name: 'Ahmad Tallal Dawood',", className: '' },
    { text: "  role: 'Front-End Developer',", className: '' },
    { text: "  base: 'Faisalabad, PK',", className: '' },
    { text: "  stack: ['HTML', 'CSS', 'JS'],", className: '' },
    { text: '  available: true,', className: '' },
    { text: '};', className: '' },
  ];

  const fullText = lines.map((l) => l.text).join('\n');
  let i = 0;
  const speed = 28;

  function type() {
    if (i <= fullText.length) {
      el.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, speed);
    }
  }

  // Only start once the hero is in view, keeps first paint light.
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          type();
          obs.disconnect();
        }
      });
    });
    io.observe(el);
  } else {
    type();
  }
}

/* ---------------------------------------------------------
   Hero rotating word ("fast." / "clean." / "reliable.")
--------------------------------------------------------- */
function initHeroWordRotator() {
  const el = document.getElementById('heroRotator');
  if (!el) return;
  const words = ['fast.', 'clean.', 'reliable.', 'accessible.'];
  let idx = 0;

  setInterval(() => {
    idx = (idx + 1) % words.length;
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = words[idx];
      el.style.opacity = '1';
    }, 250);
  }, 2600);

  el.style.transition = 'opacity 0.25s ease';
}

/* ---------------------------------------------------------
   Reveal-on-scroll using IntersectionObserver
--------------------------------------------------------- */
function initRevealOnScroll() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((i) => i.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-reveal-delay');
          if (delay) entry.target.style.setProperty('--reveal-delay', delay + 'ms');
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((i) => io.observe(i));

  // Safety net: force-reveal anything still hidden after 1.5s
  // (guards against elements the observer never catches).
  setTimeout(() => {
    items.forEach((i) => i.classList.add('is-visible'));
  }, 1500);
}

/* ---------------------------------------------------------
   Animated counters (hero stats + stats section + skill bars)
--------------------------------------------------------- */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const bars = document.querySelectorAll('[data-fill]');
  if (!counters.length && !bars.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const animateBar = (el) => {
    const fill = el.getAttribute('data-fill') + '%';
    requestAnimationFrame(() => { el.style.width = fill; });
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    bars.forEach(animateBar);
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target.hasAttribute('data-count')) animateCounter(entry.target);
        if (entry.target.hasAttribute('data-fill')) animateBar(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((c) => io.observe(c));
  bars.forEach((b) => io.observe(b));
}

/* ---------------------------------------------------------
   Project category filtering
--------------------------------------------------------- */
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');
      cards.forEach((card) => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
}

/* ---------------------------------------------------------
   Project details modal
--------------------------------------------------------- */
function initProjectModal() {
  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  const closeBtn = document.getElementById('modalClose');
  if (!overlay || !content || !closeBtn) return;

  let lastFocused = null;

  const openModal = (templateId) => {
    const template = document.getElementById(templateId);
    if (!template) return;
    content.innerHTML = '';
    content.appendChild(template.content.cloneNode(true));
    overlay.classList.add('is-open');
    document.body.classList.add('no-scroll');
    lastFocused = document.activeElement;
    closeBtn.focus();
  };

  const closeModal = () => {
    overlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    if (lastFocused) lastFocused.focus();
  };

  document.querySelectorAll('[data-modal-target]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.getAttribute('data-modal-target')));
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeModal();
  });
}

/* ---------------------------------------------------------
   FAQ accordion
--------------------------------------------------------- */
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ---------------------------------------------------------
   Simple testimonial carousel
--------------------------------------------------------- */
function initTestimonialCarousel() {
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  if (!track || !dotsWrap) return;

  const slides = track.children.length;
  let index = 0;

  for (let i = 0; i < slides; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  }

  function goTo(i) {
    index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
    [...dotsWrap.children].forEach((d, di) => d.classList.toggle('is-active', di === index));
  }

  let autoplay = setInterval(() => goTo((index + 1) % slides), 5500);

  track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
  track.parentElement.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo((index + 1) % slides), 5500);
  });
}

/* ---------------------------------------------------------
   Contact form validation (client-side only, no backend)
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  const validators = {
    name: (v) => v.trim().length >= 2 || 'Please enter your name.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address.',
    message: (v) => v.trim().length >= 10 || 'Message should be at least 10 characters.',
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    Object.keys(validators).forEach((field) => {
      const input = form.elements[field];
      const errorEl = form.querySelector(`[data-error-for="cf-${field}"]`);
      const result = validators[field](input.value);
      const row = input.closest('.form-row');

      if (result === true) {
        row.classList.remove('has-error');
        if (errorEl) errorEl.textContent = '';
      } else {
        isValid = false;
        row.classList.add('has-error');
        if (errorEl) errorEl.textContent = result;
      }
    });

    if (isValid) {
      status.textContent = 'Thanks — your message has been noted. This is a front-end demo form with no backend connected yet.';
      form.reset();
    } else {
      status.textContent = 'Please fix the highlighted fields.';
    }
  });
}

/* ---------------------------------------------------------
   Button ripple effect
--------------------------------------------------------- */
function initRippleEffect() {
  document.querySelectorAll('.ripple-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

/* ---------------------------------------------------------
   Back-to-top button
--------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   Hidden easter egg — Konami code
--------------------------------------------------------- */
function initEasterEgg() {
  const egg = document.getElementById('easterEgg');
  const closeBtn = document.getElementById('easterClose');
  if (!egg || !closeBtn) return;

  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let progress = 0;

  document.addEventListener('keydown', (e) => {
    progress = e.key === code[progress] ? progress + 1 : 0;
    if (progress === code.length) {
      egg.classList.add('is-open');
      progress = 0;
    }
  });

  closeBtn.addEventListener('click', () => egg.classList.remove('is-open'));
  egg.addEventListener('click', (e) => {
    if (e.target === egg) egg.classList.remove('is-open');
  });
}

/* ---------------------------------------------------------
   Lazy loading for images marked with data-lazy-img
--------------------------------------------------------- */
function initLazyLoad() {
  const images = document.querySelectorAll('img[data-lazy-img]');
  if (!images.length) return;

  if (!('IntersectionObserver' in window)) {
    images.forEach((img) => {
      img.src = img.getAttribute('data-lazy-img');
      img.classList.add('is-loaded');
    });
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.getAttribute('data-lazy-img');
      img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });
      obs.unobserve(img);
    });
  });

  images.forEach((img) => io.observe(img));
}