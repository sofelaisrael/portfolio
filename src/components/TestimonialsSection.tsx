import React, { useEffect, useRef } from 'react';

interface TestimonialsSectionProps {
  isVisible: (id: string) => boolean;
  scrollTo: (id: string) => void;
  setCursorHovered: (v: boolean) => void;
}

const cards = [
  {
    quote: 'Radical<br />Transformation<br />Of Spirit.',
    author: 'PETER EFE \u2014 DESIGN DIRECTOR',
    gridCol: '2 / 8',
    marginTop: 0,
    topoW: '70%',
    topoH: '70%',
    svg: (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="stipple">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
          <feColorMatrix in="noise" type="saturate" values="0" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
        <g fill="none" stroke="hsl(var(--void))" strokeWidth="0.5" filter="url(#stipple)">
          <circle cx="100" cy="100" r="20" />
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="60" />
          <circle cx="100" cy="100" r="80" />
          <path d="M100,20 Q120,50 100,100 T100,180" opacity="0.5" />
        </g>
      </svg>
    ),
  },
  {
    quote: 'The Clarity<br />I Never<br />Found Elsewhere.',
    author: 'JOSHUA \u2014 ARCHITECT',
    gridCol: '7 / 12',
    marginTop: 40,
    topoW: '100%',
    topoH: '70%',
    svg: (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="hsl(var(--void))" strokeWidth="1">
          <ellipse cx="100" cy="100" rx="90" ry="40" transform="rotate(45 100 100)" />
          <ellipse cx="100" cy="100" rx="70" ry="30" transform="rotate(45 100 100)" />
          <ellipse cx="100" cy="100" rx="50" ry="20" transform="rotate(45 100 100)" />
        </g>
      </svg>
    ),
  },
  {
    quote: 'Deeply<br />Human<br />Systems.',
    author: 'ADIS \u2014 CO-FOUNDER',
    gridCol: '1 / 6',
    marginTop: -70,
    topoW: '100%',
    topoH: '230%',
    svg: (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M20,100 C20,40 180,40 180,100 S20,160 20,100" fill="none" stroke="hsl(var(--void))" strokeWidth="0.5" />
        <path d="M40,100 C40,60 160,60 160,100 S40,140 40,100" fill="none" stroke="hsl(var(--void))" strokeWidth="0.5" />
        <path d="M60,100 C60,80 140,80 140,100 S60,120 60,100" fill="none" stroke="hsl(var(--void))" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    quote: "Don't Get Lost<br />In The Old<br />Noise.",
    author: 'DAMILOLA \u2014 FOUNDER',
    gridCol: '6 / 13',
    marginTop: 28,
    topoW: '100%',
    topoH: '150%',
    svg: (
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="10" fill="hsl(var(--void))" opacity="0.12" />
        <g fill="none" stroke="hsl(var(--void))" strokeWidth="0.3">
          <path d="M0,100 Q50,0 100,100 T200,100" />
          <path d="M0,110 Q50,10 100,110 T200,110" />
          <path d="M0,120 Q50,20 100,120 T200,120" />
        </g>
      </svg>
    ),
  },
];

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ isVisible, scrollTo, setCursorHovered }) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const topoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ctx: any;

    const initGsap = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      const ScrollTrigger = (await import('gsap/dist/ScrollTrigger')).default;
      const SplitText = (await import('gsap/dist/SplitText')).default;

      gsap.registerPlugin(ScrollTrigger, SplitText);

      const quoteEls = document.querySelectorAll('.quote-text');
      if (!quoteEls.length) return;

      ctx = gsap.context(() => {
        quoteEls.forEach((el) => {
          const split = new SplitText(el as HTMLElement, {
            type: 'lines',
            linesClass: 'quote-line quote-line-bg',
          });

          gsap.set(split.lines, {
            backgroundPositionX: '100%',
            opacity: 0.3,
          });

          gsap.to(split.lines, {
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 30%',
              scrub: true,
            },
            backgroundPositionX: '0%',
            opacity: 1,
            stagger: { amount: 0.8 },
          });
        });
      }, document.getElementById('testimonials')!);
    };

    initGsap();

    return () => {
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      topoRefs.current.forEach((bg) => {
        if (bg) {
          bg.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.1)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div
      id="testimonials"
      data-reveal
      className="col-span-full py-7 max-md:py-4 border-t border-border"
    >
      <div className="grid max-md:flex max-md:flex-col grid-cols-12">
        <div
          className="text-mono md:sticky top-10 h-[20px] self-start col-span-3 transition-all duration-600 ease-section"
          style={{
            opacity: isVisible('testimonials') ? 1 : 0,
            transform: isVisible('testimonials') ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          [ TESTIMONIALS / PRAISE ]
        </div>

        <div className={"relative col-span-9 max-md:mt-10 " + (isVisible('testimonials') ? 'section-visible' : '')} style={{ width: '100%' }}>
          <svg
            className="max-md:hidden"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: 'calc(100% + 60px)',
              transform: 'translateY(-30px)',
              zIndex: 1, pointerEvents: 'none',
            }}
            viewBox="0 0 1400 1200"
            preserveAspectRatio="none"
          >
            <path
              className="connector-line"
              d="M300,100 Q500,300 800,300 T1200,600 T600,900 T200,1100"
              fill="none"
              stroke="hsl(var(--void))"
              strokeWidth="2"
              opacity="0.35"
              strokeDasharray="1000"
              strokeDashoffset="1000"
            />
          </svg>

          <svg
            className="max-md:hidden sparkle-svg"
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: 'calc(100% + 60px)',
              transform: 'translateY(-30px)',
              zIndex: 1, pointerEvents: 'none',
            }}
            viewBox="0 0 1400 1200"
            preserveAspectRatio="none"
          >
            <path className="sparkle" d="M15,0 L18,12 L30,15 L18,18 L15,30 L12,18 L0,15 L12,12 Z" transform="translate(1180, 580) scale(1.3)" fill="transparent" stroke="hsl(var(--void))" strokeWidth="2.5" />
            <path className="sparkle" d="M10,0 L12,8 L20,10 L12,12 L10,20 L8,12 L0,10 L8,8 Z" transform="translate(580, 880) scale(1.5)" fill="transparent" stroke="hsl(var(--void))" strokeWidth="2.5" />
          </svg>

          <div className="grid grid-cols-12 gap-5 max-md:flex max-md:flex-col max-md:gap-20" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
            {cards.map((card, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="testimonial-card"
                style={{
                  gridColumn: card.gridCol,
                  marginTop: card.marginTop,
                  opacity: 0,
                  ...(i === 0
                    ? { transition: 'opacity 0.3s ease' }
                    : {
                        transform: 'translateY(50px) scale(0.95)',
                        transition: 'opacity 0.6s ease, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                      }),
                }}
              >
                <div
                  ref={(el) => { topoRefs.current[i] = el; }}
                  className="topo-bg"
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: card.topoW, height: card.topoH,
                    transform: 'translate(-50%, -50%)',
                    zIndex: -1, opacity: 0,
                    transition: 'opacity 0.6s ease',
                    pointerEvents: 'none',
                  }}
                >
                  {card.svg}
                </div>
                <h2
                  className="quote-text"
                  dangerouslySetInnerHTML={{ __html: card.quote }}
                  style={{
                    fontSize: 'clamp(28px, 4.5vw, 60px)',
                    fontWeight: 900,
                    lineHeight: 0.9,
                    letterSpacing: '-0.04em',
                    textTransform: 'uppercase',
                    color: 'transparent',
                    position: 'relative',
                    display: 'inline-block',
                  }}
                />
                <div
                  className="author-tag"
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '3px 12px',
                    border: '1.5px solid hsl(var(--border-color))',
                    borderRadius: 100, fontSize: 12, fontWeight: 700,
                    marginTop: 16, background: 'transparent',
                    color: 'hsl(var(--void))',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {card.author}
                </div>
              </div>
            ))}
          </div>

          <style>{`
            .testimonial-card:hover .topo-bg {
              opacity: 0.45 !important;
            }
            .testimonial-card:hover .author-tag {
              background: hsl(var(--void)) !important;
              color: hsl(var(--background)) !important;
              transform: scale(1.05) rotate(-2deg) !important;
            }
            .quote-line-bg {
              background-image: linear-gradient(to right, hsl(var(--void)) 50%, transparent 50%) !important;
              background-size: 200% 100% !important;
              background-clip: text !important;
              -webkit-background-clip: text !important;
              white-space: pre-wrap !important;
            }
            @keyframes drawLine {
              to { stroke-dashoffset: 0; }
            }
            .connector-line {
              stroke-dasharray: 1000;
              stroke-dashoffset: 1000;
            }
            .section-visible .connector-line {
              animation: drawLine 3s forwards ease-in-out;
            }
            .sparkle-svg {
              opacity: 0;
              transition: opacity 1s ease;
            }
            .section-visible .sparkle-svg {
              opacity: 1;
            }
            @media (max-width: 768px) {
              .testimonial-card {
                margin: 0 !important;
              }
            }
          `}</style>

          <div className="mt-10 text-right">
            <button
              onClick={() => scrollTo('skills')}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="text-mono"
              style={{ background: 'none', border: 'none', cursor: 'none' }}
            >
              ↑ STACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
