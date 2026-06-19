import { useEffect, useRef } from 'react';

export function useFooterReveal() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const gsap = await import('gsap');
        const ScrollTrigger = await import('gsap/dist/ScrollTrigger');

        gsap.default.registerPlugin(ScrollTrigger.default);

        const textElement = textRef.current;
        if (!textElement) return;

        const text = 'KENSHIN';
        textElement.innerHTML = '';

        text.split('').forEach(char => {
          const span = document.createElement('span');
          span.innerText = char;
          span.style.display = 'inline-block';
          span.style.transformOrigin = 'center 5000px';
          span.style.willChange = 'transform';
          textElement.appendChild(span);
        });

        const chars = textElement.querySelectorAll('span');
        const middleIndex = Math.floor(chars.length / 2);

        gsap.default.set(chars, {
          rotationZ: (index) => {
            const distFromCenter = index - middleIndex;
            return distFromCenter * 1;
          },
        });

        gsap.default.to(chars, {
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            end: 'bottom 110%',
            scrub: 1,
          },
          rotationZ: 0,
          opacity: 1,
          ease: 'none',
          stagger: {
            amount: 0.8,
            from: 'center',
          },
        });

        cleanupRef.current = () => {
          ScrollTrigger.default.getAll().forEach(trigger => trigger.kill());
        };
      } catch {
        console.warn('GSAP not available, animation disabled');
      }
    };

    loadGSAP();

    return () => {
      cleanupRef.current?.();
    };
  }, []);

  return textRef;
}
