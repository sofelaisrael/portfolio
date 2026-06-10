import React, { useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import coffee from '@/assets/icons/coffee-icon.svg'
import ThemeToggle from '@/components/ThemeToggle';
import resume from '@/assets/resume.pdf';

interface FooterSectionProps {
  scrollTo: (id: string) => void;
  setCursorHovered: (hovered: boolean) => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({ scrollTo, setCursorHovered }) => {
  const osmoTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const gsap = await import('gsap');
        const ScrollTrigger = await import('gsap/dist/ScrollTrigger');

        gsap.default.registerPlugin(ScrollTrigger.default);

        const textElement = osmoTextRef.current;
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
            trigger: osmoTextRef.current,
            start: 'top 85%',
            end: 'bottom 110%',
            scrub: 1,
          },
          rotationZ: 0,
          opacity: 1,
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
  }, []);

  return (
    <>
      <footer className='pt-16 max-md:pt-10' style={{
        gridColumn: '1 / -1'
      }}>
        <div className='flex items-start justify-center max-md:hidden font-mono -z-1' style={{
          gridColumn: '1 / -1',
          backgroundColor: 'hsl(var(--surface))',
          position: 'relative',
        }}>
          <h1 className=''
            ref={osmoTextRef}
            style={{
              fontSize: '24vw',
              fontWeight: 900,
              color: 'hsl(var(--void))',
              margin: 0,
              display: 'flex',
              lineHeight: 1,
              letterSpacing: '-0.11em',
              fontFamily: "'monospace', -apple-system, sans-serif",
            }}
          >
          </h1>
        </div>

        <div className="flex max-md:flex-col justify-between">
          <span className="text-mono max-md:text-xs space-y-3">
            <div className="copy max-md:text-[20px]">© 2026</div>
            <div className="gap-2 flex items-center ext-nowrap">
            <span> made with </span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              xmlnsXlink="http://www.w3.org/1999/xlink" 
              fill="hsl(var(--void))" 
              width="16" 
              height="16" 
              viewBox="0 0 32 32" 
              version="1.1" 
              id="coffee" 
              style={{ opacity: 0.7 }}
            >
              <rect x="2" y="27" width="28" height="2"/>
              <rect x="12" y="3" width="2" height="4"/>
              <rect x="16" y="3" width="2" height="4"/>
              <rect x="20" y="3" width="2" height="4"/>
              <path d="M6 25h22V9H6 2v8h4V25zM8 11h18v12H8V11zM4 15v-4h2v4H4z"/>
            </svg>
            <span> by sofelaisrael</span>
            
          </div>
            
          </span>
          <div className="flex items-center max-md:flex-col max-md:items-end gap-4">
            <ThemeToggle setCursorHovered={setCursorHovered} />
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="interactive-link max-md:text-[14px]"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                textDecoration: 'none', color: 'inherit', cursor: 'none',
              }}
            >
              <Download size={14} /> RESUME
            </a>
            <span
              className="interactive-link max-md:text-[28px] max-md:self-end"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              onClick={() => scrollTo('contact')}
              style={{ cursor: 'none' }}
            >
              INITIALIZE CONTACT
            </span>
          </div>
        </div>
        
        
      </footer>


    </>
  );
};

export default FooterSection;
