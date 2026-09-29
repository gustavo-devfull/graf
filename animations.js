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

// Hero SVG - Animação de construção
const heroSvg = document.querySelector('.hero svg');
if (heroSvg) {
  const heroTl = gsap.timeline({ delay: 0.5 });

  // Círculo cinza entra com scale
  heroTl.from(heroSvg.querySelector('circle:nth-of-type(1)'), {
    opacity: 0,
    scale: 0,
    duration: 0.6,
    ease: 'back.out(1.5)'
  }, 0);

  // Linha tracejada se desenha
  heroTl.from(heroSvg.querySelector('path:nth-of-type(1)'), {
    strokeDashoffset: 200,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut'
  }, 0.2);

  // Losango se desenha
  const losengoPath = heroSvg.querySelectorAll('g path');
  losengoPath.forEach((path, i) => {
    const length = path.getTotalLength?.() || 0;
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    heroTl.to(path, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, 0.3 + i * 0.1);
  });

  // Círculos aparecem em sequência com scale
  const circles = heroSvg.querySelectorAll('circle');
  circles.forEach((circle, i) => {
    heroTl.from(circle, {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      ease: 'back.out(1.2)'
    }, 0.5 + i * 0.1);
  });

  // Pulso suave nos círculos após animação inicial
  circles.forEach((circle) => {
    gsap.to(circle, {
      r: (index) => {
        const r = parseFloat(circle.getAttribute('r'));
        return r * 1.3;
      },
      duration: 0.5,
      delay: 2,
      repeat: 3,
      yoyo: true,
      ease: 'sine.inOut'
    });
  });
}

// Animar stats com contador
gsap.utils.toArray('.stat').forEach((stat, index) => {
  // Animar card container
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

  // Animar números com progressão
  const statValue = stat.querySelector('.stat-value');
  if (statValue && statValue.textContent.match(/^\d+$/)) {
    const target = parseInt(statValue.textContent);
    gsap.to(
      { value: 0 },
      {
        scrollTrigger: {
          trigger: stat,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        value: target,
        duration: 2.5,
        ease: 'power2.out',
        delay: 0.3 + index * 0.1,
        onUpdate() {
          statValue.textContent = Math.floor(this.targets()[0].value);
        }
      }
    );
  }

  // Animar label
  gsap.from(stat.querySelector('.stat-label'), {
    scrollTrigger: {
      trigger: stat,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 10,
    duration: 0.4,
    delay: 0.5 + index * 0.1,
    ease: 'power2.out'
  });

  // Animar descrição
  gsap.from(stat.querySelector('.stat-desc'), {
    scrollTrigger: {
      trigger: stat,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 10,
    duration: 0.4,
    delay: 0.7 + index * 0.1,
    ease: 'power2.out'
  });
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
gsap.utils.toArray('.card').forEach((card, cardIndex) => {
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

  // Animar último card (Escrita e revisão) - SVG com Aa
  if (cardIndex === 2) {
    const cardSvg = card.querySelector('svg');
    if (cardSvg) {
      const tlCard = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      // Animar texto "Aa"
      const aaText = cardSvg.querySelector('text:nth-of-type(1)');
      if (aaText) {
        tlCard.from(aaText, {
          opacity: 0,
          scale: 0,
          y: -20,
          duration: 0.5,
          ease: 'back.out(1.2)'
        }, 0);

        // Animação contínua no hover
        card.addEventListener('mouseenter', () => {
          gsap.timeline()
            .to(aaText, {
              rotation: 10,
              duration: 0.3,
              ease: 'power2.inOut'
            }, 0)
            .to(aaText, {
              rotation: -10,
              duration: 0.3,
              ease: 'power2.inOut'
            }, 0.3)
            .to(aaText, {
              rotation: 0,
              duration: 0.3,
              ease: 'power2.inOut'
            }, 0.6);
        });
      }

      // Animar underline (path)
      const underline = cardSvg.querySelector('path');
      if (underline) {
        const length = underline.getTotalLength?.() || 0;
        gsap.set(underline, { strokeDasharray: length, strokeDashoffset: length });

        tlCard.to(underline, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.inOut'
        }, 0.2);

        // Pulso no underline
        gsap.timeline({ delay: 1.5 }).to(underline, {
          strokeWidth: 4,
          duration: 0.3,
          repeat: 2,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Animar label "GRAFIA"
      const label = cardSvg.querySelector('text:nth-of-type(2)');
      if (label) {
        tlCard.from(label, {
          opacity: 0,
          y: 10,
          duration: 0.3
        }, 0.35);

        // Efeito de typing no label
        card.addEventListener('mouseenter', () => {
          gsap.to(label, {
            letterSpacing: '2px',
            duration: 0.4,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(label, {
            letterSpacing: '0px',
            duration: 0.4,
            ease: 'power2.out'
          });
        });
      }
    }
  }
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

// Animar SVG da CTA section - construção com animação final
const ctaSvg = document.querySelector('.cta-section svg');
if (ctaSvg) {
  const tlCta = gsap.timeline({
    scrollTrigger: {
      trigger: ctaSvg.closest('.cta-section'),
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });

  // Animar círculos tracejado
  const dashedCircle = ctaSvg.querySelector('circle:nth-of-type(1)');
  if (dashedCircle) {
    const length = dashedCircle.getTotalLength?.() || 0;
    gsap.set(dashedCircle, { strokeDasharray: length, strokeDashoffset: length });
    tlCta.to(dashedCircle, {
      strokeDashoffset: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.inOut'
    }, 0);
  }

  // Animar círculo preenchido (azul)
  const filledCircle = ctaSvg.querySelector('circle:nth-of-type(2)');
  if (filledCircle) {
    tlCta.from(filledCircle, {
      opacity: 0,
      scale: 0,
      duration: 0.6,
      ease: 'back.out(1.2)'
    }, 0.2);
  }

  // Animar rect branco (caixa com texto)
  const whiteRect = ctaSvg.querySelector('rect');
  if (whiteRect) {
    tlCta.from(whiteRect, {
      opacity: 0,
      scale: 0.8,
      y: -20,
      duration: 0.5,
      ease: 'back.out(1.2)'
    }, 0.3);
  }

  // Animar texto graf.ia.br
  const mainText = ctaSvg.querySelector('text:nth-of-type(1)');
  if (mainText) {
    tlCta.from(mainText, {
      opacity: 0,
      scale: 0.5,
      duration: 0.4
    }, 0.5);
  }

  // Animar círculos de dados (amarelo, vermelho, azul)
  const dataCircles = ctaSvg.querySelectorAll('circle:nth-of-type(n+3)');
  dataCircles.forEach((circle, i) => {
    tlCta.from(circle, {
      opacity: 0,
      scale: 0,
      duration: 0.3,
      ease: 'back.out(1.2)'
    }, 0.6 + i * 0.1);
  });

  // Animar linhas conectoras
  const lines = ctaSvg.querySelectorAll('path');
  lines.forEach((path, i) => {
    if (i > 0) { // Skip o círculo tracejado (primeira path)
      const length = path.getTotalLength?.() || 0;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      tlCta.to(path, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      }, 0.7 + i * 0.1);
    }
  });

  // Após construção: pulse suave + flutuação contínua
  gsap.to(ctaSvg, {
    scale: 1.08,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 2.5
  });

  gsap.to(ctaSvg, {
    y: -20,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 2.5
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

// SVG Animação do Processo - Transferência simples
const processSvg = document.querySelector('.process svg');
if (processSvg) {
  const tlProcess = gsap.timeline({
    scrollTrigger: {
      trigger: processSvg.closest('.process'),
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  // Animar primeiro rect (você)
  tlProcess.from(processSvg.querySelector('rect:nth-of-type(1)'), {
    opacity: 0,
    scale: 0.8,
    x: -30,
    duration: 0.4,
    ease: 'back.out(1.2)'
  }, 0);

  // Animar texto "você"
  tlProcess.from(processSvg.querySelector('text:nth-of-type(1)'), {
    opacity: 0,
    y: 10,
    duration: 0.3
  }, 0.15);

  // Animar linha tracejada
  const dashedLine = processSvg.querySelector('path[stroke-dasharray]');
  if (dashedLine) {
    const length = dashedLine.getTotalLength?.() || 0;
    gsap.set(dashedLine, { strokeDasharray: length, strokeDashoffset: length });
    tlProcess.to(dashedLine, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: 'power2.inOut'
    }, 0.35);
  }

  // Animar círculo com check
  tlProcess.from(processSvg.querySelector('circle:nth-of-type(1)'), {
    opacity: 0,
    scale: 0,
    duration: 0.4,
    ease: 'back.out(1.2)'
  }, 0.6);

  // Animar check mark
  tlProcess.from(processSvg.querySelector('path:last-of-type'), {
    opacity: 0,
    strokeDashoffset: 20,
    duration: 0.3
  }, 0.75);

  // Animar segundo rect (CNPJ)
  tlProcess.from(processSvg.querySelector('rect:nth-of-type(2)'), {
    opacity: 0,
    scale: 0.8,
    x: 30,
    duration: 0.4,
    ease: 'back.out(1.2)'
  }, 0.5);

  // Animar texto "CNPJ"
  tlProcess.from(processSvg.querySelector('text:nth-of-type(2)'), {
    opacity: 0,
    y: 10,
    duration: 0.3
  }, 0.65);

  // Pulso no check após animação
  gsap.to(processSvg.querySelector('circle:nth-of-type(1)'), {
    r: (index) => {
      const circle = processSvg.querySelector('circle:nth-of-type(1)');
      return parseFloat(circle.getAttribute('r')) * 1.4;
    },
    duration: 0.3,
    delay: 1.5,
    repeat: 1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

// SVG Animations nos Arguments
gsap.utils.toArray('.argument svg').forEach((svg, svgIndex) => {
  const trigger = svg.closest('.argument');

  // Animar SVGs ao entrar na viewport
  gsap.from(svg, {
    scrollTrigger: {
      trigger,
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: 'back.out(1.2)'
  });

  // Argument 1: Domain hack - animar rects e texto
  if (svgIndex === 0) {
    const rects = svg.querySelectorAll('rect');
    const texts = svg.querySelectorAll('text');

    gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    })
    .from(rects[0], { opacity: 0, scale: 0, duration: 0.4, ease: 'back.out(1.2)' }, 0)
    .from(texts[0], { opacity: 0, y: 10, duration: 0.3 }, 0.2)
    .from(svg.querySelector('text:nth-of-type(2)'), { opacity: 0, duration: 0.2 }, 0.35)
    .from(rects[1], { opacity: 0, scale: 0, duration: 0.4, ease: 'back.out(1.2)' }, 0.4)
    .from(texts[1], { opacity: 0, y: 10, duration: 0.3 }, 0.55)
    .from(svg.querySelector('path'), { opacity: 0, strokeDashoffset: 30, duration: 0.4, ease: 'power2.inOut' }, 0.6)
    .from(rects[2], { opacity: 0, scale: 0, duration: 0.4, ease: 'back.out(1.2)' }, 0.7)
    .from(texts[2], { opacity: 0, y: 10, duration: 0.3 }, 0.85);
  }

  // Argument 2: Domínio posiciona - animar barras
  if (svgIndex === 1) {
    const rects = svg.querySelectorAll('rect');
    const tlArg2 = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    rects.forEach((rect, i) => {
      tlArg2.from(rect, {
        opacity: 0,
        x: -30,
        duration: 0.4,
        ease: 'power2.out'
      }, i * 0.15);
    });

    // Animar círculo destacado
    const circle = svg.querySelector('circle');
    if (circle) {
      tlArg2.from(circle, {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        ease: 'back.out(1.2)'
      }, 0.2);

      // Pulso na selecção
      gsap.to(circle, {
        r: () => parseFloat(circle.getAttribute('r')) * 1.5,
        duration: 0.4,
        delay: 1.5,
        repeat: 2,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }

  // Argument 3: Gráficos - animar bars
  if (svgIndex === 2) {
    const barRects = svg.querySelectorAll('rect');
    const tlArg3 = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    barRects.forEach((rect, i) => {
      const y = parseFloat(rect.getAttribute('y'));
      tlArg3.from(rect, {
        opacity: 0,
        y: y + 30,
        duration: 0.5,
        ease: 'back.out(1.2)'
      }, i * 0.1);
    });

    // Animar linhas dos eixos
    const axisLines = svg.querySelectorAll('g path');
    axisLines.forEach((line, i) => {
      tlArg3.from(line, {
        opacity: 0,
        duration: 0.3
      }, 0.1);
    });
  }

  // Argument 4: Email/Marca - animar elementos
  if (svgIndex === 3) {
    const tlArg4 = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    const mainRect = svg.querySelector('rect:nth-of-type(1)');
    tlArg4.from(mainRect, { opacity: 0, scale: 0.8, duration: 0.4, ease: 'back.out(1.2)' }, 0);

    svg.querySelectorAll('rect:not(:nth-of-type(1))').forEach((rect, i) => {
      tlArg4.from(rect, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: 'back.out(1.2)'
      }, 0.2 + i * 0.1);
    });

    // Animar linhas
    svg.querySelectorAll('g[stroke="EA4335"] path').forEach((path, i) => {
      const length = path.getTotalLength?.() || 0;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      tlArg4.to(path, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      }, 0.5 + i * 0.1);
    });

    // Animar círculo destacado
    const circle = svg.querySelector('circle');
    if (circle) {
      tlArg4.from(circle, {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        ease: 'back.out(1.2)'
      }, 0.7);
    }
  }

  // Argument 5: Preço/Gráfico - animar gráfico em área
  if (svgIndex === 4) {
    const tlArg5 = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    // Animar eixos
    svg.querySelectorAll('path').forEach((path, i) => {
      const length = path.getTotalLength?.() || 0;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      tlArg5.to(path, {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      }, i === 0 ? 0 : 0.3);
    });

    // Animar círculos de dados
    svg.querySelectorAll('circle').forEach((circle, i) => {
      tlArg5.from(circle, {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        ease: 'back.out(1.2)'
      }, 0.4 + i * 0.15);
    });

    // Animar área preenchida
    const fillPath = svg.querySelector('path[opacity="0.08"]');
    if (fillPath) {
      const length = fillPath.getTotalLength?.() || 0;
      gsap.set(fillPath, { strokeDasharray: length, strokeDashoffset: length });
      tlArg5.to(fillPath, {
        strokeDashoffset: 0,
        opacity: 0.08,
        duration: 0.8,
        ease: 'power2.inOut'
      }, 0.2);
    }
  }
});
