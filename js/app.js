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
    'meats': [
      {
        title: 'Picanha',
        price: '$46',
        sub: 'Prime Part of the Top Sirloin',
        desc: 'The classic coarse-salted cut, garlic-infused crust, and direct fire-charred center loin. The crown jewel of Brazilian churrasco.',
        img: 'Media/меню/мясо/пиканья_стейк_1.jpg',
        tags: ['Signature', 'Rotisserie', 'Bold']
      },
      {
        title: 'Contra Filé',
        price: '$48',
        sub: 'Ribeye',
        desc: 'A tender, rich and flavorful cut roasted slowly over natural mesquite embers, finished with brushings of garlic butter.',
        img: 'Media/меню/мясо/стейк_рибай_1.jpg',
        tags: ['Popular', 'Fire-Charred', 'Juicy']
      },
      {
        title: 'Filet Mignon',
        price: '$52',
        sub: 'Tenderloin',
        desc: 'Delicate, ultra-tender beef tenderloin medallions roasted over open fire, seasoned with rock salt and fresh herbs.',
        img: 'Media/меню/мясо/филе_миньон_1.jpg',
        tags: ['Lean', 'Tender', 'Premium']
      },
      {
        title: 'Fraldinha',
        price: '$39',
        sub: 'Bottom Sirloin',
        desc: 'An intensely robust and flavorful marbled cut from the bottom sirloin, roasted over hot mesquite coals.',
        img: 'Media/меню/мясо/фральдинья_стейк.jpg',
        tags: ['Southern Heritage', 'Bold Flavor', 'Chef Select']
      },
      {
        title: 'Cordeiro',
        price: '$49',
        sub: 'Lamb Steak & Chops',
        desc: 'Delicious flame-roasted tender lamb chops and steak marinated with white wine, fresh mint, and lemon.',
        img: 'Media/меню/мясо/каре_ягненка_1.jpg',
        tags: ['Herb-Marinated', 'Wood-Fired', 'Tender']
      },
      {
        title: 'Costela Bovina',
        price: '$45',
        sub: 'Beef Ribs',
        desc: 'Colossal beef ribs roasted slowly for hours over natural embers, yielding tender, fall-off-the-bone texture.',
        img: 'Media/меню/мясо/говяжьи_ребрышки.jpg',
        tags: ['Slow-Roasted', 'Bone-in', 'Classic']
      }
    ],
    'drinks': [
      {
        title: 'Traditional Caipirinha',
        price: '$15',
        sub: 'Original Brazilian Caipirinha',
        desc: 'The national cocktail of Brazil: Leblon Cachaça, fresh muddled key lime, and pure cane sugar, shaken with ice.',
        img: 'Media/меню/напитки/коктейль_кайпиринья_1.jpg',
        tags: ['Traditional', 'Refreshing', 'Lime'],
        glass: true
      },
      {
        title: 'Infused Caipirinha',
        price: '$16',
        sub: 'Artisanal Fruit Flavors',
        desc: 'Our signature Caipirinha infused with your choice of premium fresh fruits: Pineapple Mint, Berry, Guava, or Passion Fruit.',
        img: 'Media/меню/напитки/коктейли_кайпиринья_пара.jpg',
        tags: ['Fruit-Infused', 'Customizable', 'Vibrant'],
        glass: true
      },
      {
        title: 'Bullvino\'s Old Fashioned',
        price: '$18',
        sub: 'Maker\'s Mark & Maple',
        desc: 'A premium twist on the classic: Maker\'s Mark Bourbon, pure organic maple syrup, and Angostura bitters, served over a crystal sphere.',
        img: 'Media/меню/напитки/виски_коктейль.jpg',
        tags: ['Bourbon', 'Smooth', 'Smoked'],
        glass: true
      }
    ]
  };

  /* ── MENU RENDERER ────────────────────────────────────── */
  const menuGrid = document.getElementById('menu-grid');
  const tabBtns = document.querySelectorAll('.tab-btn');

  function renderMenu(cat) {
    menuGrid.innerHTML = '';
    menuGrid.className = 'menu-grid';

    if (cat === 'salads') {
      menuGrid.classList.add('salads-special-layout');
      menuGrid.innerHTML = `
        <div class="salads-special-container">
          <div class="salads-special-visual">
            <div class="salads-special-image-wrap">
              <img src="Media/меню/салат-бар_и_гарниры/салат_бар_вертикальный_1.jpg" alt="Salad Bar & Sides" class="salads-special-img" loading="lazy">
            </div>
            <div class="salads-special-frame"></div>
          </div>
          <div class="salads-special-content">
            <span class="card-sub">Gourmet Market Table</span>
            <h3 class="salads-special-title">THE HARVEST TABLE &amp; SIDES</h3>
            <p class="salads-special-desc">Complement your rodizio experience with our fresh salad bar and warm, traditional Brazilian side dishes brought directly to your table.</p>
            <ul class="salads-items-list">
              <li>
                <div class="salads-item-header">
                  <span class="salads-item-name">Pão de Queijo</span>
                  <span class="salads-item-badge">Warm Side</span>
                </div>
                <p class="salads-item-desc">Traditional gluten-free cheese bread, soft on the inside with a golden parmesan crust.</p>
              </li>
              <li>
                <div class="salads-item-header">
                  <span class="salads-item-name">Crispy Polenta</span>
                  <span class="salads-item-badge">Warm Side</span>
                </div>
                <p class="salads-item-desc">Golden, crispy-fried polenta blocks dusted with fresh grated parmesan cheese.</p>
              </li>
              <li>
                <div class="salads-item-header">
                  <span class="salads-item-name">Mashed Potatoes</span>
                  <span class="salads-item-badge">Warm Side</span>
                </div>
                <p class="salads-item-desc">Rich and velvety garlic-whipped potatoes cooked to a smooth texture.</p>
              </li>
              <li>
                <div class="salads-item-header">
                  <span class="salads-item-name">Caramelized Bananas</span>
                  <span class="salads-item-badge">Warm Side</span>
                </div>
                <p class="salads-item-desc">Sweet, flame-caramelized bananas dusted with ground cinnamon.</p>
              </li>
              <li>
                <div class="salads-item-header">
                  <span class="salads-item-name">Feijoada Bar</span>
                  <span class="salads-item-badge">Market Table</span>
                </div>
                <p class="salads-item-desc">Traditional Brazilian black bean stew simmered with smoked pork, beef, sausages, and spices.</p>
              </li>
            </ul>
          </div>
        </div>
      `;
      if (window._bindCursorHover) window._bindCursorHover();
      return;
    }

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

  renderMenu('meats');

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
