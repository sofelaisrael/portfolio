import React, { useEffect, useRef } from 'react';

interface OsmosmoAnimationProps {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
}

const OsmosmoAnimation: React.FC<OsmosmoAnimationProps> = ({ 
  text = 'OSMOSMO', 
  className = '', 
  style = {} 
}) => {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const gsap = await import('gsap');
        const ScrollTrigger = await import('gsap/dist/ScrollTrigger');
        
        gsap.default.registerPlugin(ScrollTrigger.default);

        const textElement = textRef.current;
        if (!textElement) return;

        textElement.innerHTML = '';


        text.split('').forEach(char => {
          const span = document.createElement('span');
          span.innerText = char;
          span.style.display = 'inline-block';
          span.style.transformOrigin = 'center bottom';
          span.style.willChange = 'transform, opacity';
          textElement.appendChild(span);
        });

        const chars = textElement.querySelectorAll('span');
        const middleIndex = Math.floor(chars.length / 2);


        gsap.default.set(chars, {
          y: (index) => {
            const distFromCenter = Math.abs(index - middleIndex);
            return distFromCenter * distFromCenter * 50;
          },
          rotationZ: (index) => {
            const distFromCenter = index - middleIndex;
            return distFromCenter * 18;
          },
          opacity: 0,
          scale: 0.6
        });


        gsap.default.to(chars, {
          scrollTrigger: {
            trigger: textElement,
            start: 'top 85%',
            end: 'center center',
            scrub: 1,
          },
          y: 0,
          rotationZ: 0,
          opacity: 1,
          scale: 1,
          ease: 'none',
          stagger: {
            amount: 0.8,
            from: 'center'
          }
        });


        return () => {
          ScrollTrigger.default.getAll().forEach(trigger => trigger.kill());
        };
      } catch (error) {
        console.warn('GSAP not available, animation disabled');
      }
    };

    loadGSAP();
  }, [text]);

  return (
    <h1
      ref={textRef}
      className={className}
      style={{
        fontSize: '13vw',
        fontWeight: 900,
        color: 'hsl(var(--void))',
        margin: 0,
        display: 'flex',
        lineHeight: 1,
        letterSpacing: '-0.02em',
        fontFamily: "'Inter', -apple-system, sans-serif",
        ...style
      }}
    >
      {text}
    </h1>
  );
};

export default OsmosmoAnimation;
