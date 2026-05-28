/* ==========================================================================
   BULLVINO'S BRAZILIAN STEAK HOUSE - PRESTIGE INTERACTIVE APP ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 1. MOBILE MENU DRAWER & NAVBAR SCROLL
  // ==========================================
  const navbar = document.getElementById("navbar");
  const burgerMenu = document.getElementById("burger-menu");
  const navMenu = document.getElementById("nav-menu");

  // Fixed Header Scroll Indicator
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Drawer Toggle
  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("active");
    navMenu.classList.toggle("drawer-active");
  });

  // Close Mobile Drawer on Link Click
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      burgerMenu.classList.remove("active");
      navMenu.classList.remove("drawer-active");
      
      // Active link highlight
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // ==========================================
  // 2. CINEMATIC LERP CURSOR ENGINE
  // ==========================================
  const cursorDot = document.getElementById("cursor-dot");
  const cursorRing = document.getElementById("cursor-ring");
  const cursorText = document.getElementById("cursor-text");

  let mouse = { x: -100, y: -100 }; // mouse positions
  let dotPos = { x: -100, y: -100 }; // dot position with fast lerp
  let ringPos = { x: -100, y: -100 }; // ring position with lazy lerp

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Smooth Lerp Animation Loop
  function updateCursor() {
    // Dot lerp (fast)
    dotPos.x += (mouse.x - dotPos.x) * 0.25;
    dotPos.y += (mouse.y - dotPos.y) * 0.25;

    // Ring lerp (slow for organic lag feel)
    ringPos.x += (mouse.x - ringPos.x) * 0.095;
    ringPos.y += (mouse.y - ringPos.y) * 0.095;

    cursorDot.style.left = `${dotPos.x}px`;
    cursorDot.style.top = `${dotPos.y}px`;

    cursorRing.style.left = `${ringPos.x}px`;
    cursorRing.style.top = `${ringPos.y}px`;

    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  // Set up hover boundaries for interactive elements
  function initCursorHoverEvents() {
    // Regular buttons/links
    const standardHovers = document.querySelectorAll("a, button, .menu-tab-btn, select, input");
    standardHovers.forEach(element => {
      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("hovered");
        cursorText.textContent = "GO";
      });
      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("hovered");
        cursorText.textContent = "";
      });
    });

    // Special item cards (Wagyu)
    const vipHovers = document.querySelectorAll(".vip-card");
    vipHovers.forEach(element => {
      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("gold-hovered");
        cursorText.textContent = "VIP CUT";
      });
      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("gold-hovered");
        cursorText.textContent = "";
      });
    });

    // Wine-red reservations/buttons
    const burgundyHovers = document.querySelectorAll(".btn-reserve, .btn-submit-reserve");
    burgundyHovers.forEach(element => {
      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("burgundy-hovered");
        cursorText.textContent = "HEARTH";
      });
      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("burgundy-hovered");
        cursorText.textContent = "";
      });
    });
  }

  // ==========================================
  // 3. CANVAS FLAME & EMBERS PHYSIC ENGINE
  // ==========================================
  const canvas = document.getElementById("hero-particles");
  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const maxParticles = 65;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      // Spawn at bottom half of hero section
      this.x = Math.random() * width;
      this.y = height + Math.random() * 80;
      this.size = Math.random() * 2.5 + 0.8;
      this.speedY = -(Math.random() * 1.8 + 0.6);
      this.speedX = Math.random() * 0.8 - 0.4;
      this.life = Math.random() * 150 + 100;
      this.maxLife = this.life;
      
      // Warm embers color gradients
      const randomColor = Math.random();
      if (randomColor > 0.8) {
        this.color = `rgba(229, 193, 88, ${Math.random() * 0.7 + 0.3})`; // Gold ember
      } else if (randomColor > 0.3) {
        this.color = `rgba(158, 14, 33, ${Math.random() * 0.6 + 0.4})`; // Burgundy fire spark
      } else {
        this.color = `rgba(238, 90, 36, ${Math.random() * 0.7 + 0.3})`; // Vivid Orange ember
      }
      
      this.wobble = Math.random() * Math.PI;
      this.wobbleSpeed = Math.random() * 0.02 - 0.01;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.wobble) * 0.25;
      this.wobble += this.wobbleSpeed;
      this.life--;

      if (this.life <= 0 || this.y < 0) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      // Fade out near end of life
      const alpha = this.life / this.maxLife;
      ctx.fillStyle = this.color.replace(/[\d\.]+\)$/, `${alpha})`);
      
      // Draw smooth circular sparks
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Populate spark system
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle());
  }

  // Particles Render Loop
  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    // Add custom charcoal smoke simulation
    ctx.fillStyle = 'rgba(6, 6, 6, 0.01)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animateParticles);
  }
  requestAnimationFrame(animateParticles);

  // ==========================================
  // 4. PORTFOLIO TABS DATABASE
  // ==========================================
  const menuData = {
    "churrascaria": [
      {
        title: "The Full Gaucho Rodizio",
        price: "$58",
        subtitle: "Continuous Tableside Service",
        desc: "Our hallmark ritual: a non-stop rotation of over 15 distinct cuts of prime roasted beef, pork, chicken, and lamb carved directly onto your plate by our master passadores.",
        image: "assets/images/chef_experience.png",
        tags: ["Signature", "tableside", "traditional"]
      },
      {
        title: "Prime Picanha Sequence",
        price: "$46",
        subtitle: "Noble Brazilian Cap of Sirloin",
        desc: "A dedicated progression highlighting the finest Picanha roasts. Experience the classic coarse-salted cut, the garlic-infused crust, and the direct fire-charred center loin.",
        image: "assets/images/steak_picanha.png",
        tags: ["popular", "rotisserie", "bold"]
      },
      {
        title: "Alcatra & Fraldinha",
        price: "$39",
        subtitle: "Noble Loin & Bottom Sirloin Duo",
        desc: "Two heritage southern roasts: the tender, delicately textured Alcatra top sirloin alongside the intensely robust, marble-seared Fraldinha flank steak.",
        image: "assets/images/steak_contra_file.png",
        tags: ["Southern heritage", "lean", "tender"]
      }
    ],
    "meat-cuts": [
      {
        title: "A5 Wagyu Zabuton",
        price: "$135",
        subtitle: "Zabuton Cut on Himalayan Salt block",
        desc: "The pinnacle of marble score luxury: 8oz of authentic Japanese A5 Wagyu Zabuton, lightly basted and seared tableside over a glowing, mineral-rich pink Himalayan salt slab.",
        image: "assets/images/steak_wagyu.png",
        tags: ["VIP Choice", "A5 Wagyu", "gourmet"],
        isVip: true
      },
      {
        title: "The Charcoal Tomahawk",
        price: "$95",
        subtitle: "32oz Long-Bone Dry Aged Ribeye",
        desc: "A colossal dry-aged long-bone ribeye roasted slowly over natural mesquite embers, finished with brushings of smoked bone marrow butter and fresh sea salt.",
        image: "assets/images/steak_contra_file.png",
        tags: ["35-day dry aged", "fire-charred", "colossal"]
      },
      {
        title: "Noble Garlic Picanha",
        price: "$48",
        subtitle: "Premium Brazilian Loin Steak",
        desc: "Individual premium sirloin steak featuring a perfect crust seared thick fat cap, heavily basted with freshly crushed garlic cloves, sea salt, and wild oregano oil.",
        image: "assets/images/steak_picanha.png",
        tags: ["Signature crust", "wood-fired", "garlic"]
      }
    ],
    "cocktails": [
      {
        title: "Imperial Caipirinha",
        price: "$18",
        subtitle: "Signature Cachaça Alchemy",
        desc: "The ultimate national cocktail: premium artisanal Velho Barreiro cachaça muddled vigorously with matted organic key limes, pure cane sugar crystals, and crushed ice.",
        image: "assets/images/cocktail_caipirinha.png",
        tags: ["Traditional", "refreshing", "lime juice"],
        isGlass: true
      },
      {
        title: "Hearth Smoke Manhattan",
        price: "$21",
        subtitle: "Infused Crimson Oak Rye",
        desc: "Premium wood-aged rye whiskey, sweet Vermouth, and bitters, locked and cold-smoked under glass with char-burnt cherrywood embers, served in a crystal snifter.",
        image: "assets/images/cocktail_signature.png",
        tags: ["Burnt cherrywood", "intense", "aged"],
        isGlass: true
      },
      {
        title: "Burgundy Velvet Sangria",
        price: "$16",
        subtitle: "Noble Wine & Brandy Muddle",
        desc: "Deep rich red Cabernet wine mixed with premium brandy, splash of orange liqueur, and macerated fresh forest berries, garnished with burnt rosemary sprigs.",
        image: "assets/images/cocktail_signature.png",
        tags: ["Smooth fruit", "wine-base", "refreshing"],
        isGlass: true
      }
    ]
  };

  // Render Category Cards Dynamically
  const menuGrid = document.getElementById("menu-grid");
  const tabButtons = document.querySelectorAll(".menu-tab-btn");

  function loadMenuCategory(category) {
    // Clear previous items
    menuGrid.innerHTML = "";
    
    const items = menuData[category] || [];
    
    items.forEach(item => {
      // Construct card elements
      const card = document.createElement("div");
      card.className = "menu-card";
      
      // Dynamic specialized class injection
      if (item.isVip) {
        card.classList.add("vip-card");
      } else if (item.isGlass) {
        card.classList.add("glass-card");
      }
      
      // Construct inner contents
      let tagHtml = "";
      if (item.tags) {
        tagHtml = item.tags.map(t => `<span class="card-tag">${t}</span>`).join("");
      }
      
      card.innerHTML = `
        ${item.isVip ? '<span class="vip-badge">A5 WAGYU VIP</span>' : ''}
        <div class="card-image-box">
          <img src="${item.image}" alt="${item.title}" class="card-image">
        </div>
        <div class="card-details">
          <div class="card-header-row">
            <h3 class="card-title">${item.title}</h3>
            <span class="card-price">${item.price}</span>
          </div>
          <span class="card-subtitle">${item.subtitle}</span>
          <p class="card-desc">${item.desc}</p>
          <div class="card-tags">
            ${tagHtml}
          </div>
        </div>
      `;
      
      menuGrid.appendChild(card);
    });

    // Re-bind Custom Cursor hover events to these new cards
    initCursorHoverEvents();

    // Stagger items entry gracefully using GSAP
    if (typeof gsap !== 'undefined') {
      gsap.from(".menu-card", {
        opacity: 0,
        y: 40,
        scale: 0.98,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out"
      });
    }
  }

  // Bind Tab Click Handlers
  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active from all tabs
      tabButtons.forEach(btn => btn.classList.remove("active"));
      
      // Add active to current
      button.classList.add("active");
      
      const targetCategory = button.getAttribute("data-category");
      loadMenuCategory(targetCategory);
    });
  });

  // Initial Menu Load (Churrascaria)
  loadMenuCategory("churrascaria");

  // ==========================================
  // 5. GSAP SCROLLTRIGGER INTERFACE REVEALS
  // ==========================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade reveal main titles
    gsap.from(".hero-title", {
      opacity: 0,
      y: 40,
      duration: 1.4,
      ease: "power3.out"
    });

    gsap.from(".hero-subtitle", {
      opacity: 0,
      y: 20,
      duration: 1.4,
      delay: 0.3,
      ease: "power3.out"
    });

    gsap.from("#explore-menu-btn", {
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      delay: 0.6,
      ease: "power3.out"
    });

    // Experience Section Scroll reveals
    gsap.from("#exp-img-container", {
      scrollTrigger: {
        trigger: "#experience",
        start: "top 75%",
      },
      opacity: 0,
      x: -60,
      duration: 1.2,
      ease: "power3.out"
    });

    gsap.from("#exp-text-container", {
      scrollTrigger: {
        trigger: "#experience",
        start: "top 70%",
      },
      opacity: 0,
      x: 60,
      duration: 1.2,
      ease: "power3.out"
    });

    // Experience Image parallax translations
    gsap.to("#exp-chef-img", {
      scrollTrigger: {
        trigger: "#experience",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      },
      y: -50,
      ease: "none"
    });

    // Reservations Box Entrance
    gsap.from("#reserve-box", {
      scrollTrigger: {
        trigger: "#reserve",
        start: "top 75%",
      },
      opacity: 0,
      scale: 0.95,
      y: 50,
      duration: 1.2,
      ease: "power3.out"
    });
  }

});