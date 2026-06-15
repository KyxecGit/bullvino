/* ═══════════════════════════════════════════════════════════
   BULLVINO'S — INTERACTIVE ENGINE
   Pure Vanilla JS · GSAP · Canvas
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── MOBILE MENU ──────────────────────────────────────── */
  const burger = document.getElementById('burger');
  const navMenu = document.getElementById('nav-menu');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navMenu.classList.remove('open');
      navMenu.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ── CURSOR ENGINE ────────────────────────────────────── */
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const cursorText = document.getElementById('cursor-text');

  if (window.matchMedia('(pointer: fine)').matches) {
    let mx = -100, my = -100;
    let dx = -100, dy = -100;
    let rx = -100, ry = -100;

    window.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
    }, { passive: true });

    (function cursorLoop() {
      dx += (mx - dx) * 0.25;
      dy += (my - dy) * 0.25;
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;

      dot.style.left = dx + 'px';
      dot.style.top = dy + 'px';
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';

      requestAnimationFrame(cursorLoop);
    })();

    const bindCursorHover = () => {
      document.querySelectorAll('a, button, .tab-btn, select, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
          ring.classList.add('hovered');
          cursorText.textContent = 'GO';
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('hovered');
          cursorText.textContent = '';
        });
      });

      document.querySelectorAll('.vip-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
          ring.classList.add('gold-hovered');
          cursorText.textContent = 'VIP';
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('gold-hovered');
          cursorText.textContent = '';
        });
      });

      document.querySelectorAll('.btn-burgundy, .btn-nav').forEach(el => {
        el.addEventListener('mouseenter', () => {
          ring.classList.add('burgundy-hovered');
          cursorText.textContent = 'CLICK';
        });
        el.addEventListener('mouseleave', () => {
          ring.classList.remove('burgundy-hovered');
          cursorText.textContent = '';
        });
      });
    };

    bindCursorHover();
    window._bindCursorHover = bindCursorHover;
  }

  /* ── CANVAS EMBERS ────────────────────────────────────── */
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');

  let cw = canvas.width = window.innerWidth;
  let ch = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    cw = canvas.width = window.innerWidth;
    ch = canvas.height = window.innerHeight;
  }, { passive: true });

  const embers = [];
  const EMBER_COUNT = Math.min(60, Math.floor(window.innerWidth / 20));

  class Ember {
    constructor() { this.reset(true); }

    reset(init) {
      this.x = Math.random() * cw;
      this.y = init ? Math.random() * ch : ch + Math.random() * 60;
      this.size = Math.random() * 2.5 + 0.8;
      this.vy = -(Math.random() * 1.5 + 0.5);
      this.vx = Math.random() * 0.6 - 0.3;
      this.life = Math.random() * 160 + 80;
      this.maxLife = this.life;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.005;

      const r = Math.random();
      if (r > 0.7) {
        this.color = '229, 193, 88';
      } else if (r > 0.3) {
        this.color = '158, 14, 33';
      } else {
        this.color = '238, 90, 36';
      }
    }

    update() {
      this.y += this.vy;
      this.x += this.vx + Math.sin(this.wobble) * 0.3;
      this.wobble += this.wobbleSpeed;
      this.life--;

      if (this.life <= 0 || this.y < -10) this.reset(false);
    }

    draw() {
      const alpha = (this.life / this.maxLife) * 0.8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < EMBER_COUNT; i++) embers.push(new Ember());

  (function emberLoop() {
    ctx.clearRect(0, 0, cw, ch);
    embers.forEach(e => { e.update(); e.draw(); });
    requestAnimationFrame(emberLoop);
  })();

  /* ── MENU DATA ────────────────────────────────────────── */
  const menuData = {
    'churrascaria': [
      {
        title: 'The Full Gaucho Rodizio',
        price: '$58',
        sub: 'Continuous Tableside Service',
        desc: 'Our hallmark ritual: a non-stop rotation of over 15 distinct cuts of prime roasted beef, pork, chicken, and lamb carved directly onto your plate by our master passadores.',
        img: 'assets/images/chef_experience.png',
        tags: ['Signature', 'Tableside', 'Traditional']
      },
      {
        title: 'Prime Picanha Sequence',
        price: '$46',
        sub: 'Noble Brazilian Cap of Sirloin',
        desc: 'A dedicated progression highlighting the finest Picanha roasts. The classic coarse-salted cut, the garlic-infused crust, and the direct fire-charred center loin.',
        img: 'assets/images/steak_picanha.png',
        tags: ['Popular', 'Rotisserie', 'Bold']
      },
      {
        title: 'Alcatra & Fraldinha',
        price: '$39',
        sub: 'Noble Loin & Bottom Sirloin Duo',
        desc: 'Two heritage southern roasts: the tender, delicately textured Alcatra top sirloin alongside the intensely robust, marble-seared Fraldinha flank steak.',
        img: 'assets/images/steak_contra_file.png',
        tags: ['Southern Heritage', 'Lean', 'Tender']
      }
    ],
    'meat-cuts': [
      {
        title: 'A5 Wagyu Zabuton',
        price: '$135',
        sub: 'Zabuton on Himalayan Salt Block',
        desc: 'The pinnacle of marble score luxury: 8oz of authentic Japanese A5 Wagyu Zabuton, lightly basted and seared tableside over a glowing, mineral-rich pink Himalayan salt slab.',
        img: 'assets/images/steak_wagyu.png',
        tags: ['VIP Choice', 'A5 Wagyu', 'Gourmet'],
        vip: true
      },
      {
        title: 'The Charcoal Tomahawk',
        price: '$95',
        sub: '32oz Long-Bone Dry Aged Ribeye',
        desc: 'A colossal dry-aged long-bone ribeye roasted slowly over natural mesquite embers, finished with brushings of smoked bone marrow butter and fresh sea salt.',
        img: 'assets/images/steak_contra_file.png',
        tags: ['35-Day Dry Aged', 'Fire-Charred', 'Colossal']
      },
      {
        title: 'Noble Garlic Picanha',
        price: '$48',
        sub: 'Premium Brazilian Loin Steak',
        desc: 'Individual premium sirloin steak featuring a perfect crust seared thick fat cap, heavily basted with freshly crushed garlic cloves, sea salt, and wild oregano oil.',
        img: 'assets/images/steak_picanha.png',
        tags: ['Signature Crust', 'Wood-Fired', 'Garlic']
      }
    ],
    'cocktails': [
      {
        title: 'Imperial Caipirinha',
        price: '$18',
        sub: 'Signature Cachaça Alchemy',
        desc: 'The ultimate national cocktail: premium artisanal Velho Barreiro cachaça muddled vigorously with matted organic key limes, pure cane sugar crystals, and crushed ice.',
        img: 'assets/images/cocktail_caipirinha.png',
        tags: ['Traditional', 'Refreshing', 'Lime'],
        glass: true
      },
      {
        title: 'Hearth Smoke Manhattan',
        price: '$21',
        sub: 'Infused Crimson Oak Rye',
        desc: 'Premium wood-aged rye whiskey, sweet Vermouth, and bitters, locked and cold-smoked under glass with char-burnt cherrywood embers, served in a crystal snifter.',
        img: 'assets/images/cocktail_signature.png',
        tags: ['Burnt Cherrywood', 'Intense', 'Aged'],
        glass: true
      },
      {
        title: 'Burgundy Velvet Sangria',
        price: '$16',
        sub: 'Noble Wine & Brandy Muddle',
        desc: 'Deep rich red Cabernet wine mixed with premium brandy, splash of orange liqueur, and macerated fresh forest berries, garnished with burnt rosemary sprigs.',
        img: 'assets/images/cocktail_signature.png',
        tags: ['Smooth Fruit', 'Wine-Base', 'Refreshing'],
        glass: true
      }
    ]
  };

  /* ── MENU RENDERER ────────────────────────────────────── */
  const menuGrid = document.getElementById('menu-grid');
  const tabBtns = document.querySelectorAll('.tab-btn');

  function renderMenu(cat) {
    menuGrid.innerHTML = '';
    const items = menuData[cat] || [];

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-card';
      if (item.vip) card.classList.add('vip-card');
      if (item.glass) card.classList.add('glass-card');

      const tagsHtml = item.tags.map(t => `<span class="card-tag">${t}</span>`).join('');

      card.innerHTML = `
        ${item.vip ? '<span class="vip-badge">A5 WAGYU VIP</span>' : ''}
        <div class="card-img-wrap">
          <img src="${item.img}" alt="${item.title}" class="card-img" loading="lazy">
        </div>
        <div class="card-body">
          <div class="card-top">
            <h3 class="card-title">${item.title}</h3>
            <span class="card-price">${item.price}</span>
          </div>
          <span class="card-sub">${item.sub}</span>
          <p class="card-desc">${item.desc}</p>
          <div class="card-tags">${tagsHtml}</div>
        </div>
      `;

      menuGrid.appendChild(card);
    });

    if (window._bindCursorHover) window._bindCursorHover();
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.cat);
    });
  });

  renderMenu('churrascaria');

  /* ── MODAL SYSTEM ─────────────────────────────────────── */
  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function notify(title, desc, icon) {
    document.getElementById('notify-title').textContent = title;
    document.getElementById('notify-desc').textContent = desc;
    document.getElementById('notify-icon').textContent = icon || '✓';
    openModal('modal-notify');
  }

  document.querySelectorAll('.modal').forEach(modal => {
    modal.querySelector('.modal-backdrop').addEventListener('click', () => closeModal(modal));
    modal.querySelectorAll('[data-close]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(modal));
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(m => closeModal(m));
    }
  });

  /* ── OPENTABLE ────────────────────────────────────────── */
  document.getElementById('opentable-btn').addEventListener('click', () => {
    openModal('modal-opentable');
  });

  /* ── BANQUET FORM ─────────────────────────────────────── */
  document.getElementById('banquet-form').addEventListener('submit', e => {
    e.preventDefault();

    const guests = parseInt(document.getElementById('b-guests').value);

    if (isNaN(guests) || guests < 1) {
      notify('ERROR', 'Please enter a valid number of guests.', '⚠');
      return;
    }

    if (guests >= 5) {
      notify(
        'REQUEST SENT',
        'Your request has been sent! For events and parties of 5+ guests, manager approval is required. Our events team will contact you within 24 hours.',
        '✓'
      );
    } else {
      notify(
        'REQUEST SENT',
        'Your banquet request has been submitted successfully! We will confirm your reservation shortly.',
        '✓'
      );
    }

    e.target.reset();
  });

  /* ── GIFT CARDS ───────────────────────────────────────── */
  document.querySelectorAll('.btn-gift').forEach(btn => {
    btn.addEventListener('click', () => {
      const amount = btn.dataset.amount;
      notify(
        'ADDED TO CART',
        `Bullvino's $${amount} Gift Card has been added to your cart. Proceed to checkout to complete your purchase.`,
        '🎁'
      );
    });
  });

  /* ── GSAP SCROLL ANIMATIONS ───────────────────────────── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.experience-visual', {
      scrollTrigger: { trigger: '.experience', start: 'top 75%' },
      opacity: 0, x: -60, duration: 1.2, ease: 'power3.out'
    });

    gsap.from('.experience-body', {
      scrollTrigger: { trigger: '.experience', start: 'top 75%' },
      opacity: 0, x: 60, duration: 1.2, ease: 'power3.out'
    });

    gsap.to('#exp-img', {
      scrollTrigger: { trigger: '.experience', start: 'top bottom', end: 'bottom top', scrub: true },
      y: -40, ease: 'none'
    });

    gsap.from('.reserve-card', {
      scrollTrigger: { trigger: '.reserve-section', start: 'top 75%' },
      opacity: 0, scale: 0.95, y: 50, duration: 1.2, ease: 'power3.out'
    });
  }

});
