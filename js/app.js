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
        title: 'The Full Gaucho Rodizio',
        price: '$58',
        sub: 'Continuous Tableside Service',
        desc: 'Our hallmark ritual: a non-stop rotation of over 15 distinct cuts of prime roasted beef, pork, chicken, and lamb carved directly onto your plate by our master passadores.',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
        tags: ['Signature', 'Tableside', 'All-You-Can-Eat']
      },
      {
        title: 'Prime Picanha',
        price: '$46',
        sub: 'Noble Brazilian Cap of Sirloin',
        desc: 'The classic coarse-salted cut, garlic-infused crust, and direct fire-charred center loin. The crown jewel of Brazilian churrasco.',
        img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80',
        tags: ['Popular', 'Rotisserie', 'Bold']
      },
      {
        title: 'A5 Wagyu Zabuton',
        price: '$135',
        sub: 'Zabuton on Himalayan Salt Block',
        desc: 'The pinnacle of marble score luxury: 8oz of authentic Japanese A5 Wagyu Zabuton, lightly basted and seared tableside over a glowing, mineral-rich pink Himalayan salt slab.',
        img: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=80',
        tags: ['VIP Choice', 'A5 Wagyu', 'Gourmet'],
        vip: true
      },
      {
        title: 'The Charcoal Tomahawk',
        price: '$95',
        sub: '32oz Long-Bone Dry Aged Ribeye',
        desc: 'A colossal dry-aged long-bone ribeye roasted slowly over natural mesquite embers, finished with brushings of smoked bone marrow butter and fresh sea salt.',
        img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80',
        tags: ['35-Day Dry Aged', 'Fire-Charred', 'Colossal']
      },
      {
        title: 'Alcatra & Fraldinha',
        price: '$39',
        sub: 'Noble Loin & Bottom Sirloin Duo',
        desc: 'Two heritage southern roasts: the tender, delicately textured Alcatra top sirloin alongside the intensely robust, marble-seared Fraldinha flank steak.',
        img: 'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=600&q=80',
        tags: ['Southern Heritage', 'Lean', 'Tender']
      },
      {
        title: 'Noble Garlic Picanha',
        price: '$48',
        sub: 'Premium Brazilian Loin Steak',
        desc: 'Individual premium sirloin steak featuring a perfect crust seared thick fat cap, heavily basted with freshly crushed garlic cloves, sea salt, and wild oregano oil.',
        img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
        tags: ['Signature Crust', 'Wood-Fired', 'Garlic']
      }
    ],
    'salads': [
      {
        title: 'Gaucho Garden Salad',
        price: '$14',
        sub: 'Fresh Seasonal Greens',
        desc: 'Crisp romaine, arugula, and radicchio tossed with heirloom tomatoes, shaved red onion, and a housemade chimichurri vinaigrette.',
        img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
        tags: ['Fresh', 'Vegetarian', 'Chimichurri'],
        glass: true
      },
      {
        title: 'Brazilian Hearts of Palm',
        price: '$16',
        sub: 'Tropical Palm & Avocado',
        desc: 'Tender hearts of palm layered with sliced avocado, mango, and toasted cashews, drizzled with a lime-cilantro dressing.',
        img: 'https://images.unsplash.com/photo-1540420773430-2c918764a9a3?w=600&q=80',
        tags: ['Tropical', 'Vegetarian', 'Light'],
        glass: true
      },
      {
        title: 'Fire-Roasted Beet Salad',
        price: '$15',
        sub: 'Charred Beets & Goat Cheese',
        desc: 'Slow-roasted golden and red beets over open flame, served with whipped goat cheese, candied walnuts, and a honey-balsamic glaze.',
        img: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600&q=80',
        tags: ['Fire-Roasted', 'Vegetarian', 'Sweet & Savory'],
        glass: true
      },
      {
        title: 'Caesar de Churrasco',
        price: '$17',
        sub: 'Grilled Steak & Romaine',
        desc: 'Grilled picanha strips over crisp romaine, house Caesar dressing, shaved parmesan, and fire-toasted croutons.',
        img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&q=80',
        tags: ['With Steak', 'Hearty', 'Classic']
      },
      {
        title: 'Watermelon & Feta',
        price: '$13',
        sub: 'Summer Refreshment',
        desc: 'Chilled watermelon cubes with crumbled feta, fresh mint, and a sprinkle of smoked sea salt.',
        img: 'https://images.unsplash.com/photo-1465083960061-506b06d6f3d0?w=600&q=80',
        tags: ['Refreshing', 'Vegetarian', 'Seasonal'],
        glass: true
      },
      {
        title: 'South American Quinoa',
        price: '$15',
        sub: 'Protein-Packed Superfood',
        desc: 'Tri-color quinoa with black beans, corn, avocado, cherry tomatoes, and a zesty lime dressing. Topped with grilled chicken optional.',
        img: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=600&q=80',
        tags: ['Healthy', 'Gluten-Free', 'Protein'],
        glass: true
      }
    ],
    'desserts': [
      {
        title: 'Brazilian Brigadeiro',
        price: '$9',
        sub: 'Classic Chocolate Truffles',
        desc: 'Rich condensed milk and cocoa truffles rolled in chocolate sprinkles. A beloved Brazilian birthday tradition.',
        img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80',
        tags: ['Traditional', 'Chocolate', 'Sweet'],
        glass: true
      },
      {
        title: 'Quindim',
        price: '$10',
        sub: 'Coconut Custard Gold',
        desc: 'A glistening golden baked custard made with egg yolks, sugar, and shredded coconut. A jewel of Brazilian dessert heritage.',
        img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80',
        tags: ['Traditional', 'Coconut', 'Baked'],
        glass: true
      },
      {
        title: 'Flame-Roasted Pineapple',
        price: '$12',
        sub: 'Cinnamon-Sugar Crust',
        desc: 'Whole pineapple slow-roasted over open flame with a caramelized cinnamon-sugar crust. Carved tableside. Our signature closer.',
        img: 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=600&q=80',
        tags: ['Signature', 'Fire-Roasted', 'Tableside']
      },
      {
        title: 'Mousse de Maracujá',
        price: '$9',
        sub: 'Passion Fruit Mousse',
        desc: 'Silky passion fruit mousse with a tangy tropical glaze. Light, refreshing, and perfectly balanced.',
        img: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80',
        tags: ['Tropical', 'Light', 'Refreshing'],
        glass: true
      },
      {
        title: 'Tres Leches Cake',
        price: '$11',
        sub: 'Three Milk Soaked Sponge',
        desc: 'Vanilla sponge cake soaked in three milks, topped with whipped cream and a caramel drizzle.',
        img: 'https://images.unsplash.com/photo-1535131199008-57e52fc681fe?w=600&q=80',
        tags: ['Classic', 'Creamy', 'Indulgent'],
        glass: true
      },
      {
        title: 'Brûléed Papaya Cream',
        price: '$10',
        sub: 'Brazilian Creamy Papaya',
        desc: 'Blended papaya and cream topped with a torched sugar crust, served with a black currant liqueur drizzle.',
        img: 'https://images.unsplash.com/photo-1488900128323-21503983a078?w=600&q=80',
        tags: ['Tropical', 'Torched', 'Elegant'],
        glass: true
      }
    ],
    'drinks': [
      {
        title: 'Imperial Caipirinha',
        price: '$18',
        sub: 'Signature Cachaça Alchemy',
        desc: 'Premium artisanal Velho Barreiro cachaça muddled with organic key limes, pure cane sugar crystals, and crushed ice.',
        img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
        tags: ['Traditional', 'Refreshing', 'Lime'],
        glass: true
      },
      {
        title: 'Hearth Smoke Manhattan',
        price: '$21',
        sub: 'Infused Crimson Oak Rye',
        desc: 'Wood-aged rye whiskey, sweet vermouth, and bitters, cold-smoked under glass with char-burnt cherrywood embers.',
        img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4d7d27?w=600&q=80',
        tags: ['Burnt Cherrywood', 'Intense', 'Aged'],
        glass: true
      },
      {
        title: 'Burgundy Velvet Sangria',
        price: '$16',
        sub: 'Noble Wine & Brandy Muddle',
        desc: 'Deep red Cabernet wine mixed with premium brandy, orange liqueur, and macerated fresh forest berries.',
        img: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=600&q=80',
        tags: ['Smooth Fruit', 'Wine-Base', 'Refreshing'],
        glass: true
      },
      {
        title: 'Brazilian Lemonade',
        price: '$8',
        sub: 'Lime & Condensed Milk',
        desc: 'Blended limes with condensed milk and ice — a creamy, tangy Brazilian classic. Non-alcoholic.',
        img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600&q=80',
        tags: ['Non-Alcoholic', 'Creamy', 'Classic'],
        glass: true
      },
      {
        title: 'Guaraná Antarctica',
        price: '$5',
        sub: 'Brazilian Soda',
        desc: 'The iconic Brazilian soft drink made from guaraná fruit. Crisp, lightly sweet, and naturally caffeinated.',
        img: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=600&q=80',
        tags: ['Non-Alcoholic', 'Imported', 'Sparkling'],
        glass: true
      },
      {
        title: 'Malbec de Mendoza',
        price: '$14',
        sub: 'Argentine Red Wine Glass',
        desc: 'A bold, full-bodied Argentine Malbec with notes of dark plum, blackberry, and a hint of toasted oak.',
        img: 'https://images.unsplash.com/photo-1510812431401-41d2bd482abf?w=600&q=80',
        tags: ['Red Wine', 'Bold', 'Argentine'],
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
