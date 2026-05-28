/* ═══════════════════════════════════════════════════
   BULLVINO'S — JAVASCRIPT
   All interactivity & animations
═══════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ─── LOADER ─────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    initReveal();
    initStats();
  }, 1800);
});
document.body.style.overflow = 'hidden';

/* ─── CUSTOM CURSOR ──────────────────────────────── */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: 'power2.out' });
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  gsap.set(ring, { x: ringX, y: ringY });
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, input, select, textarea, .meat-card, .cocktail-card, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

/* ─── HEADER SCROLL ──────────────────────────────── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

/* ─── BURGER MENU ────────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

burger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ─── SMOOTH SCROLL ──────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    gsap.to(window, {
      scrollTo: { y: target, offsetY: 80 },
      duration: 1.2,
      ease: 'power3.inOut'
    });
  });
});

/* ─── REVEAL ANIMATIONS ──────────────────────────── */
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = [...el.parentElement.querySelectorAll('.reveal-up, .reveal-right')];
        const idx = siblings.indexOf(el);
        setTimeout(() => el.classList.add('revealed'), idx * 80);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ─── COUNTER STATS ──────────────────────────────── */
function initStats() {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = target > 1000 ? 2.5 : 1.5;
        gsap.to({ val: 0 }, {
          val: target,
          duration,
          ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].val).toLocaleString();
          }
        });
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
}

/* ─── PARALLAX ───────────────────────────────────── */
gsap.to('.experience-img', {
  yPercent: 12,
  ease: 'none',
  scrollTrigger: {
    trigger: '.experience',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});

/* ─── HERO PARALLAX ──────────────────────────────── */
gsap.to('.hero-img', {
  yPercent: 20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

/* ─── EMBER CANVAS ───────────────────────────────── */
class EmberEffect {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.spawn();
    this.loop();
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
  }

  spawn() {
    const count = Math.floor(this.w / 10);
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle(true));
    }
    setInterval(() => {
      if (this.particles.length < count * 1.5) {
        this.particles.push(this.createParticle(false));
      }
    }, 120);
  }

  createParticle(random = false) {
    const isGold = Math.random() > 0.4;
    return {
      x: Math.random() * this.w,
      y: random ? Math.random() * this.h : this.h + 10,
      vx: (Math.random() - 0.5) * 0.6,
      vy: -(Math.random() * 1.2 + 0.4),
      r: Math.random() * 2.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      color: isGold ? `rgba(212,175,55,` : `rgba(200,80,20,`,
      life: 0,
      maxLife: Math.random() * 200 + 100
    };
  }

  loop() {
    this.ctx.clearRect(0, 0, this.w, this.h);
    this.particles = this.particles.filter(p => {
      p.x += p.vx + Math.sin(p.life * 0.04) * 0.3;
      p.y += p.vy;
      p.life++;
      const progress = p.life / p.maxLife;
      const a = p.alpha * (1 - progress) * (progress < 0.2 ? progress * 5 : 1);
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r * (1 - progress * 0.5), 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color}${a.toFixed(3)})`;
      this.ctx.fill();
      return p.life < p.maxLife && p.y > -10;
    });
    requestAnimationFrame(() => this.loop());
  }
}

new EmberEffect('emberCanvas');

/* ─── COCKTAIL TABS ──────────────────────────────── */
document.querySelectorAll('.ctab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ctab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.ctab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const target = document.getElementById(btn.dataset.ctab);
    if (target) {
      target.classList.add('active');
      // Re-trigger reveals for newly shown items
      target.querySelectorAll('.reveal-up, .reveal-right').forEach(el => {
        if (!el.classList.contains('revealed')) {
          setTimeout(() => el.classList.add('revealed'), 100);
        }
      });
    }
  });
});

/* ─── CARD TILT ──────────────────────────────────── */
document.querySelectorAll('.meat-card, .cocktail-card, .pricing-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateX: -y * 6,
      rotateY: x * 6,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out'
    });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)'
    });
  });
});

/* ─── MAGNETIC BUTTONS ───────────────────────────── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
});

/* ─── MARQUEE PAUSE ON HOVER ─────────────────────── */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

/* ─── GSAP SECTION TITLE ANIMATIONS ─────────────── */
document.querySelectorAll('.section-title').forEach(title => {
  gsap.from(title, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: title,
      start: 'top 85%',
      once: true
    }
  });
});

/* ─── PRICING CARD STAGGER ───────────────────────── */
gsap.from('.pricing-card', {
  opacity: 0,
  y: 60,
  stagger: 0.1,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.pricing-grid',
    start: 'top 80%',
    once: true
  }
});
