// GSAP Animations for graf.ia.br
gsap.registerPlugin(ScrollTrigger);

// Timeline para animações iniciais
const tl = gsap.timeline();

// Animar header
tl.from('header', {
  opacity: 0,
  y: -20,
  duration: 0.8,
  ease: 'power2.out'
}, 0);

// Animar hero content
tl.from('.hero-content > *', {
  opacity: 0,
  y: 20,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power2.out'
}, 0.2);

// Animar SVG do hero
tl.from('.hero svg', {
  opacity: 0,
  scale: 0.8,
  duration: 0.8,
  ease: 'back.out(1.2)'
}, 0.4);

// Animar stats com contador
gsap.utils.toArray('.stat').forEach((stat, index) => {
  gsap.from(stat, {
    scrollTrigger: {
      trigger: stat,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: index * 0.1,
    ease: 'power2.out'
  });
});

// Animar números com progressão
const stats = document.querySelectorAll('.stat-value');
stats.forEach((stat, index) => {
  if (stat.textContent.match(/^\d+$/)) {
    const target = parseInt(stat.textContent);
    gsap.to(
      { value: 0 },
      {
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        value: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate() {
          stat.textContent = Math.floor(this.targets()[0].value);
        }
      }
    );
  }
});

// Animar section headers
gsap.utils.toArray('.section-header').forEach((header) => {
  gsap.from(header, {
    scrollTrigger: {
      trigger: header,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power2.out'
  });
});

// Animar argumentos com alternância
gsap.utils.toArray('.argument').forEach((arg, index) => {
  gsap.from(arg, {
    scrollTrigger: {
      trigger: arg,
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    x: index % 2 === 0 ? -40 : 40,
    duration: 0.8,
    ease: 'power2.out'
  });
});

// Animar cards com efeito parallax subtle
gsap.utils.toArray('.card').forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: 'power2.out'
  });

  // Hover effect melhorado
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      duration: 0.3,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      ease: 'power2.out'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      duration: 0.3,
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
      ease: 'power2.out'
    });
  });
});

// Animar steps do processo
gsap.utils.toArray('.step').forEach((step, index) => {
  gsap.from(step, {
    scrollTrigger: {
      trigger: step,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -30,
    duration: 0.6,
    delay: index * 0.15,
    ease: 'power2.out'
  });
});

// CTA Section com animação de entrada
const ctaSection = document.querySelector('.cta-section');
if (ctaSection) {
  gsap.from(ctaSection, {
    scrollTrigger: {
      trigger: ctaSection,
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power2.out'
  });
}

// Animar SVG da CTA section com rotação lenta
const ctaSvg = document.querySelector('.cta-section svg');
if (ctaSvg) {
  // Remove a animação CSS floaty
  ctaSvg.style.animation = 'none';

  // Cria animação GSAP
  gsap.to(ctaSvg, {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none'
  });

  // Flutuação vertical
  gsap.to(ctaSvg, {
    y: -20,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

// Animar footer
gsap.from('footer', {
  scrollTrigger: {
    trigger: 'footer',
    start: 'top 90%',
    toggleActions: 'play none none none'
  },
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: 'power2.out'
});

// Interatividade em botões
gsap.utils.toArray('a[class*="btn"]').forEach((btn) => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, {
      duration: 0.2,
      scale: 1.05,
      ease: 'power2.out'
    });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      duration: 0.2,
      scale: 1,
      ease: 'power2.out'
    });
  });
});

// Smooth scroll para links de âncora
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: href,
          offsetY: 80
        },
        ease: 'power2.inOut'
      });
    }
  });
});

// Parallax effect para SVGs nos arguments
gsap.utils.toArray('.argument svg').forEach((svg) => {
  gsap.to(svg, {
    scrollTrigger: {
      trigger: svg.closest('.argument'),
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      markers: false
    },
    y: (index) => {
      return gsap.utils.unitize(index * -30, 'px');
    }
  });
});
