import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import { useCustomCursor } from '../hooks/useCustomCursor';
import { useLenis } from '../hooks/useLenis';
import '../index.css';
import HeaderSection from '../components/HeaderSection';
import WorksSection from '../components/WorksSection';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSectionNew from '../components/ContactSectionNew';
import FooterSection from '../components/FooterSection';
import GateOverlay from '../components/GateOverlay';
import CustomCursor from '../components/CustomCursor';
import { nameChars, projects } from '@/data';
import experience from '@/data/experience.json';


const Index = () => {
  const [appState, setAppState] = useState<'locked' | 'animating' | 'open'>(() => {
    return sessionStorage.getItem('entered') === 'true' ? 'open' : 'locked';
  });
  const [nameHovered, setNameHovered] = useState(false);
  const [hoverImg, setHoverImg] = useState({ visible: false, src: '', prevSrc: '', crossfade: false, x: 0, y: 0 });
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState('00:00:00');
  const [nameVisible, setNameVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const { cursorHovered, setCursorHovered, cursorPos } = useCustomCursor();

  const { scrollTo: lenisScrollTo } = useLenis();
  const scrollTo = (id: string) => {
    lenisScrollTo(`#${id}`, { offset: 0 });
  };

  
  useEffect(() => {
    const t = setTimeout(() => setNameVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeStr(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    if (appState !== 'open') {
      document.body.classList.add('is-locked');
    } else {
      document.body.classList.remove('is-locked');
    }
  }, [appState]);

  useEffect(() => {
    if (appState !== 'open') return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    const sections = document.querySelectorAll('[data-reveal]');
    sections.forEach((s) => observer.observe(s));

    const lateObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -25% 0px' }
    );
    const lateSections = document.querySelectorAll('[data-reveal-late]');
    lateSections.forEach((s) => lateObserver.observe(s));

    return () => {
      observer.disconnect();
      lateObserver.disconnect();
    };
  }, [appState]);

  const handleItemMouseEnter = useCallback((item: typeof projects[0]) => {
    setCursorHovered(true);
    setHoveredItem(item.id);
    if (window.innerWidth > 768) {
      setHoverImg((prev) => {
        if (prev.visible && prev.src !== item.img) {
          return { ...prev, prevSrc: prev.src, src: item.img, crossfade: false };
        }
        return { ...prev, visible: true, src: item.img };
      });
    }
  }, [setCursorHovered]);

  const handleItemMouseLeave = useCallback(() => {
    setCursorHovered(false);
    setHoveredItem(null);
    setHoverImg((prev) => ({ ...prev, visible: false, prevSrc: '', crossfade: false }));
  }, [setCursorHovered]);

  useEffect(() => {
    if (hoverImg.prevSrc && !hoverImg.crossfade) {
      const frame = requestAnimationFrame(() => {
        setHoverImg((prev) => ({ ...prev, crossfade: true }));
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [hoverImg.prevSrc, hoverImg.crossfade]);

  useEffect(() => {
    if (hoverImg.crossfade) {
      const timer = setTimeout(() => {
        setHoverImg((prev) => ({ ...prev, prevSrc: '', crossfade: false }));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hoverImg.crossfade]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setFormStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setFormStatus('error');
    }

    setTimeout(() => setFormStatus('idle'), 3000);
  }, [formData]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className='px-16 max-md:px-5 mb-5'>
      <Helmet>
        <title>Ken Sh.in — Creative Developer</title>
        <meta name="description" content="Creative developer crafting immersive digital experiences at the intersection of design and engineering." />
        <meta property="og:title" content="Ken Sh.in — Creative Developer" />
        <meta property="og:description" content="Creative developer crafting immersive digital experiences." />
        <meta property="og:type" content="website" />
      </Helmet>
      <CustomCursor cursorPos={cursorPos} cursorHovered={cursorHovered} />

      {typeof window !== 'undefined' && window.innerWidth > 768 && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, width: 350, height: 450,
            pointerEvents: 'none', zIndex: 100, overflow: 'hidden',
            opacity: hoverImg.visible ? 1 : 0,
            transform: `translate(${cursorPos.x + 20}px, ${cursorPos.y - 225}px) scale(${hoverImg.visible ? 1 : 0.95})`,
            transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {hoverImg.prevSrc && (
              <img
                src={hoverImg.prevSrc}
                alt=""
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)',
                  opacity: hoverImg.crossfade ? 0 : 1,
                  transition: 'opacity 0.4s ease',
                }}
              />
            )}
            <img
              src={hoverImg.src}
              alt=""
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', filter: 'grayscale(100%) contrast(1.2)',
                opacity: !hoverImg.prevSrc || hoverImg.crossfade ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
            />
          </div>
        </div>
      )}

      <GateOverlay
        appState={appState}
        nameChars={nameChars}
        nameVisible={nameVisible}
        nameHovered={nameHovered}
        cursorPos={cursorPos}
        setCursorHovered={setCursorHovered}
        setAppState={setAppState}
      />

      <div
        style={{
          position: 'relative', minHeight: '100vh',
          backgroundColor: 'hsl(var(--surface))', padding: '10',
          opacity: appState === 'open' ? 1 : 0,
          visibility: appState === 'open' ? 'visible' : 'hidden',
          transition: 'opacity 0.1s linear',
        }}
      >


        <nav
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          style={{
            position: 'fixed', top: '50%', right: '2vw', transform: 'translateY(-50%)',
            zIndex: 50, display: 'flex', flexDirection: 'column', gap: 0,
            opacity: appState === 'open' ? 1 : 0,
            transition: 'opacity 0.6s ease',
            padding: '8px 0',
          }}
        >
          {[
            { label: 'WORKS', target: 'works' },
            { label: 'ABOUT', target: 'about' },
            { label: 'EXPERIENCE', target: 'experience' },
            { label: 'SKILLS', target: 'skills' },
            { label: 'TESTIMONIALS', target: 'testimonials' },
            { label: 'CONTACT', target: 'contact' },
          ].map((nav) => (
            <button
              key={nav.target}
              onClick={() => scrollTo(nav.target)}
              className="text-mono"
              style={{
                background: 'none', border: 'none', padding: '10px 4px',
                cursor: 'none', textAlign: 'right',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = 'hsl(var(--text-main))')}
              onMouseOut={(e) => (e.currentTarget.style.color = '')}
            >
              {nav.label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2vw', maxWidth: 1800, margin: '0 auto' }}>

          <HeaderSection appState={appState} timeStr={timeStr} setCursorHovered={setCursorHovered} />


          <div
            style={{
              gridColumn: '1 / -1', marginBottom: '15vh',
              transform: appState === 'open' ? 'translateY(0)' : 'translateY(60px)',
              opacity: appState === 'open' ? 1 : 0,
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 1s',
            }}
          >
            <h1 className="text-huge max-md:text-[14vw]">Engineering</h1>
            <h1 className="text-huge max-md:text-[14vw]">Digital Form.</h1>
          </div>

          <WorksSection
            projects={projects}
            appState={appState}
            hoveredItem={hoveredItem}
            handleItemMouseEnter={handleItemMouseEnter}
            handleItemMouseLeave={handleItemMouseLeave}
          />


          <div
            id="about"
            data-reveal
            className="col-span-full py-10 max-md:py-5 border-t border-border"
          >
            <div className="grid max-md:flex flex-col grid-cols-12">
              <div className="text-mono md:sticky top-10 h-[20px] self-start col-span-3 transition-all duration-600 ease-section"
                style={{
                  opacity: isVisible('about') ? 1 : 0,
                  transform: isVisible('about') ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                [ ABOUT / IDENTITY ]
              </div>
              <div className="md:col-span-9">

                <div id="about-titles" data-reveal-late>
                  <div className="overflow-hidden">
                    <div className="text-[clamp(18vw,19vw,20vw)] md:text-[clamp(1vw,10vw,12vw)] font-black tracking-tight leading-none uppercase text-void transition-all duration-1000 ease-section delay-200"
                      style={{
                        fontFamily: "'Inter', -apple-system, sans-serif",
                        opacity: isVisible('about-titles') ? 1 : 0,
                        transform: isVisible('about-titles') ? 'translateX(0)' : 'translateX(-100%)',
                      }}
                    >
                      Israel
                    </div>
                  </div>
                  <div className="overflow-hidden mb-10 max-md:mb-3">
                    <div className="text-[clamp(18vw,19vw,20vw)] md:text-[clamp(1vw,10vw,12vw)] font-black tracking-tight leading-none uppercase text-void text-right transition-all duration-1000 ease-section delay-400"
                      style={{
                        fontFamily: "'Inter', -apple-system, sans-serif",
                        opacity: isVisible('about-titles') ? 1 : 0,
                        transform: isVisible('about-titles') ? 'translateX(0)' : 'translateX(100%)',
                      }}
                    >
                      Sofela
                    </div>
                  </div>
                </div>


                <div className="grid max-md:flex flex-col gap-y-5 grid-cols-2 gap-x-10 border-t border-border pt-10 max-md:pt-5 transition-all duration-800 ease-section delay-600"
                style={{
                  opacity: isVisible('about') ? 1 : 0,
                  transform: isVisible('about') ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                  <p className="text-[clamp(0.9rem,1.2vw,1.1rem)] leading-relaxed text-text-muted">
                    A creative developer focused on crafting immersive digital experiences
                    at the intersection of design and engineering. Specializing in
                    interactive frontends, motion, and spatial interfaces.
                  </p>
                  <p className="text-[clamp(0.9rem,1.2vw,1.1rem)] leading-relaxed text-text-muted">
                    Currently exploring the boundaries of web technologies — from WebGL
                    experiments to generative systems. Every project is an opportunity to
                    push the medium forward.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right max-md:mt-5">
              <button
                onClick={() => scrollTo('works')}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="text-mono bg-transparent border-none cursor-none"
              >
                ↑ WORKS
              </button>
            </div>
          </div>

          <ExperienceSection
            isVisible={isVisible}
            experiences={experience}
            scrollTo={scrollTo}
            setCursorHovered={setCursorHovered}
          />

          <SkillsSection
            isVisible={isVisible}
            scrollTo={scrollTo}
            setCursorHovered={setCursorHovered}
          />

          <TestimonialsSection
            isVisible={isVisible}
            scrollTo={scrollTo}
            setCursorHovered={setCursorHovered}
          />

          <ContactSectionNew
            formData={formData}
            formStatus={formStatus}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isVisible={isVisible}
            setCursorHovered={setCursorHovered}
          />

          <FooterSection scrollTo={scrollTo} setCursorHovered={setCursorHovered} />
        </div>
      </div>
    </div>
  );
};

export default Index;
