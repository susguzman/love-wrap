/* ============================================================
   LOVE WRAPPED – INTERACTIVE SCRIPT
   Floating hearts, scroll reveals, parallax, compatibility
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initFloatingHearts();
  initScrollReveals();
  initParallax();
  initStartButton();
  initStatBars();
  initCompatibilityAnalysis();
  initFallingPetals();
});

/* ---------- 1. Floating Hearts Background ---------- */
function initFloatingHearts() {
  const container = document.getElementById('heartsBg');
  if (!container) return;

  const heartEmojis = ['💕', '💗', '💖', '💞', '🩷', '❤️', '🤍'];
  const heartCount = 20;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.setProperty('--duration', `${10 + Math.random() * 14}s`);
    heart.style.setProperty('--delay', `${Math.random() * 12}s`);
    heart.style.setProperty('--rotation', `${-30 + Math.random() * 60}deg`);
    heart.style.setProperty('--max-opacity', `${0.15 + Math.random() * 0.25}`);
    heart.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
    container.appendChild(heart);
  }
}

/* ---------- 2. Scroll Reveal (IntersectionObserver) ---------- */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Don't unobserve — keeps re-triggering if user scrolls back
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* ---------- 3. Parallax ---------- */
function initParallax() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const bg = document.getElementById('heartsBg');
        if (bg) {
          bg.style.transform = `translateY(${scrollY * 0.15}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ---------- 4. Start Button ---------- */
function initStartButton() {
  const btn = document.getElementById('startBtn');
  const target = document.getElementById('story');
  if (btn && target) {
    btn.addEventListener('click', () => {
      target.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ---------- 5. Stat Bars Animation ---------- */
function initStatBars() {
  const bars = document.querySelectorAll('.stat-bar-fill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percent = bar.getAttribute('data-percent') || 100;
          bar.style.setProperty('--fill-percent', `${percent}%`);
          bar.classList.add('animate');
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ---------- 6. Compatibility Analysis Animation ---------- */
function initCompatibilityAnalysis() {
  const scanner = document.getElementById('compatScanner');
  if (!scanner) return;

  let hasRun = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          runCompatibilityAnimation();
          observer.unobserve(scanner);
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(scanner);
}

function runCompatibilityAnimation() {
  const fill = document.getElementById('compatBarFill');
  const percentEl = document.getElementById('compatPercent');
  const statusEl = document.getElementById('compatStatus');
  const resultsEl = document.getElementById('compatResults');

  const phases = [
    { label: 'Analizando emociones…', duration: 800 },
    { label: 'Midiendo la química…', duration: 800 },
    { label: 'Calculando risas…', duration: 700 },
    { label: 'Consultando al destino…', duration: 900 },
    { label: 'Resultado listo 💕', duration: 400 },
  ];

  let currentPercent = 0;
  const targetPercent = 99.9;
  const totalDuration = phases.reduce((sum, p) => sum + p.duration, 0);
  const startTime = performance.now();

  // Animate the counter
  function updateCounter(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / totalDuration, 1);
    // Ease-out
    const eased = 1 - Math.pow(1 - progress, 3);
    currentPercent = eased * targetPercent;

    percentEl.textContent = `${currentPercent.toFixed(1)}%`;
    fill.style.width = `${(currentPercent / 100) * 100}%`;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      percentEl.textContent = '99.9%';
      fill.style.width = '99.9%';
      showResults();
    }
  }

  // Cycle through status labels
  let accum = 0;
  phases.forEach((phase) => {
    setTimeout(() => {
      statusEl.textContent = phase.label;
    }, accum);
    accum += phase.duration;
  });

  requestAnimationFrame(updateCounter);

  function showResults() {
    if (!resultsEl) return;
    // Reveal each result child with stagger
    const items = resultsEl.querySelectorAll('.reveal');
    items.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, 200 + i * 250);
    });
  }
}

/* ---------- 7. Falling Petals (Details Section) ---------- */
function initFallingPetals() {
  const container = document.getElementById('petalsContainer');
  if (!container) return;

  const petals = ['🌸', '🌺', '🩷', '✿'];
  const petalCount = 12;

  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('span');
    petal.classList.add('falling-petal');
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty('--duration', `${6 + Math.random() * 8}s`);
    petal.style.setProperty('--delay', `${Math.random() * 8}s`);
    petal.style.setProperty('--rotation', `${90 + Math.random() * 180}deg`);
    petal.style.fontSize = `${0.7 + Math.random() * 0.6}rem`;
    container.appendChild(petal);
  }
}
