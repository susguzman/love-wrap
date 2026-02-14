/* ============================================================
   LOVE WRAPPED – INTERACTIVE SCRIPT
   Floating hearts, scroll reveals, parallax, compatibility
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initWaveBackground();
  initFloatingHearts();
  initScrollReveals();
  initParallax();
  initStartButton();
  initStatBars();
  initCompatibilityAnalysis();
  initFallingPetals();
  initShowLionButton();
  initCarousel();
  initStars();
  initDaysCounter();
  initScrollArrow();
});

/* ---------- 0a. Fixed Scroll Arrow ---------- */
function initScrollArrow() {
  const arrow = document.getElementById('scrollArrow');
  if (!arrow) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const atBottom = scrollY + winHeight >= docHeight - 80;

    if (atBottom) {
      arrow.classList.add('hidden');
    } else {
      arrow.classList.remove('hidden');
    }
  });
}

/* ---------- 0. Animated Wave Background ---------- */
function initWaveBackground() {
  const canvas = document.getElementById('waveBg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let scrollY = 0;
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  const waves = [
    { amplitude: 40, frequency: 0.008, speed: 0.015, yOffset: 0.2, color: 'rgba(139, 42, 42, 0.08)' },
    { amplitude: 55, frequency: 0.006, speed: -0.01, yOffset: 0.4, color: 'rgba(201, 168, 76, 0.04)' },
    { amplitude: 35, frequency: 0.01, speed: 0.02, yOffset: 0.6, color: 'rgba(139, 42, 42, 0.06)' },
    { amplitude: 50, frequency: 0.007, speed: -0.018, yOffset: 0.8, color: 'rgba(201, 168, 76, 0.035)' },
  ];

  let time = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scrollOffset = scrollY * 0.3;

    waves.forEach((wave) => {
      ctx.beginPath();
      const baseY = canvas.height * wave.yOffset + scrollOffset * (wave.speed > 0 ? 0.15 : -0.1);

      for (let x = 0; x <= canvas.width; x += 2) {
        const y = baseY
          + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude
          + Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.3) * (wave.amplitude * 0.4);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.fill();
    });

    time += 1;
    animFrame = requestAnimationFrame(draw);
  }

  draw();
}

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

/* ---------- 8. Show Lion Button ---------- */
function initShowLionButton() {
  const btn = document.getElementById('showLionBtn');
  const lion = document.getElementById('lionClosing');
  if (!btn || !lion) return;

  btn.addEventListener('click', () => {
    // Hide button with fade
    btn.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0.8)';

    setTimeout(() => {
      btn.style.display = 'none';

      // Show lion with pop-in animation
      lion.style.display = '';
      lion.classList.add('lion-visible');

      // Scroll lion into view
      lion.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Create burst of red hearts
      createHeartBurst(lion);
    }, 400);
  });
}

function createHeartBurst(container) {
  const hearts = ['❤️', '💕', '💗', '❤️‍🔥', '❣️'];
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement('span');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.cssText = `
      position: absolute;
      font-size: ${0.8 + Math.random() * 1.2}rem;
      left: 50%;
      top: 50%;
      pointer-events: none;
      z-index: 10;
      opacity: 1;
      transition: all ${0.8 + Math.random() * 0.8}s cubic-bezier(0.22, 1, 0.36, 1);
    `;
    container.appendChild(heart);

    // Animate outward
    requestAnimationFrame(() => {
      const angle = (Math.PI * 2 * i) / 15;
      const distance = 80 + Math.random() * 80;
      heart.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.3)`;
      heart.style.opacity = '0';
    });

    // Remove after animation
    setTimeout(() => heart.remove(), 1800);
  }
}

/* ---------- 9. Photo Carousel ---------- */
function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

  const slides = track.querySelectorAll('.carousel-slide');
  const dots = dotsContainer.querySelectorAll('.carousel-dot');
  const total = slides.length;
  let current = 0;
  let autoTimer;

  function goTo(index) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      resetAuto();
    });
  });

  // Swipe support
  let startX = 0, isDragging = false;
  const viewport = document.getElementById('carouselViewport');

  viewport.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  viewport.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetAuto();
    }
  });

  // Auto-play
  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }
  startAuto();
}

/* ---------- 10. Starry Background ---------- */
function initStars() {
  const container = document.getElementById('starsBg');
  if (!container) return;

  const starCount = 60; // Adjust for density

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Random position
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    // Random size
    const size = Math.random() * 2.5 + 1; // 1px to 3.5px

    // Random animation props
    const duration = Math.random() * 3 + 2; // 2s to 5s
    const delay = Math.random() * 5;
    const maxOpacity = Math.random() * 0.5 + 0.4; // 0.4 to 0.9

    star.style.left = `${left}%`;
    star.style.top = `${top}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--delay', `${delay}s`);
    star.style.setProperty('--max-opacity', maxOpacity);

    container.appendChild(star);
  }
}


/* ---------- 11. Days Counter ---------- */
function initDaysCounter() {
  const el = document.getElementById('daysCount');
  if (!el) return;

  const startDate = new Date('2025-09-20T00:00:00');
  const now = new Date();
  const diffTime = Math.abs(now - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Animate number
  let start = 0;
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out quart
    const ease = 1 - Math.pow(1 - progress, 4);

    const currentVal = Math.floor(ease * diffDays);
    el.textContent = currentVal;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = diffDays;
    }
  }

  requestAnimationFrame(update);
}
