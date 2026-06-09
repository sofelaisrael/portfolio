import React, { useEffect, useRef } from 'react';
import { BracketBox } from '@/components/ui/bracket-box';

interface ContactSectionNewProps {
  formData: { name: string; email: string; message: string };
  formStatus: 'idle' | 'sending' | 'sent' | 'error';
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isVisible: (id: string) => boolean;
  setCursorHovered: (hovered: boolean) => void;
}

const ContactSectionNew: React.FC<ContactSectionNewProps> = ({
  formData,
  formStatus,
  handleInputChange,
  handleSubmit,
  isVisible,
  setCursorHovered,
}) => {
  const kineticTitleRef = useRef<HTMLHeadingElement>(null);
  const [isBuildHovered, setIsBuildHovered] = React.useState(false);

  useEffect(() => {
    const letters = kineticTitleRef.current?.querySelectorAll('.kinetic-title span');
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!letters) return;
      
      const buildText = kineticTitleRef.current;
      if (!buildText) return;
      
      const rect = buildText.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const xOffset = (e.clientX - centerX) / rect.width * 2;
      const yOffset = (e.clientY - centerY) / rect.height * 2;
      
      letters.forEach((letter, index) => {
        const multiplier = index - 1;
        const translateX = xOffset * multiplier;
        const translateY = yOffset * multiplier;
        const rotate = xOffset * 0.5;

        (letter as HTMLElement).style.transform = `translate3d(${translateX}px, ${translateY}px, 0px) rotate(${rotate}deg)`;
      });
    };

    const handleMouseLeave = () => {
      if (!letters) return;
      letters.forEach((letter) => {
        (letter as HTMLElement).style.transform = `translate3d(0px, 0px, 0px) rotate(0deg)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const renderKineticText = (text: string) => {
    return text.split('').map((char, index) => (
      <span key={index} style={{ display: 'inline-block', transition: 'transform 0.1s ease-out' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };
  return (
    <div
      id="contact"
      data-reveal
      className="col-span-full mt-12vh pt-10 border-t border-border transition-all duration-700 ease-section"
      style={{
        opacity: isVisible('contact') ? 1 : 0,
        transform: isVisible('contact') ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      <div className="grid grid-cols-12 gap-x-2vw max-md:flex max-md:flex-col">
        <div className="text-mono col-span-3 md:sticky top-10 h-[fit-content] self-start">
          [ CONTACT / CONNECT ]
        </div>
        <div className="col-span-9">
          <div
            className="transition-all duration-600 ease-section delay-200"
            style={{
              opacity: isVisible('contact') ? 1 : 0,
              transform: isVisible('contact') ? 'translateY(0)' : 'translateY(20px)',
            }}
          >
            <h2 
              ref={kineticTitleRef}
              className="text-[clamp(2.5rem,6vw,6rem)] font-black tracking-tight leading-none uppercase text-void mb-10 kinetic-title"
              style={{ cursor: 'default' }}
            >
              <div>
                <span style={{
                  transition: 'filter 0.3s ease',
                  filter: isBuildHovered ? 'blur(2px)' : 'blur(0px)',
                }}>
                  Let's
                </span>
                <BracketBox className='max-md:hidden' onHoverChange={setIsBuildHovered}>
                  <span style={{ 
                    fontSize: 'clamp(2.5rem,6vw,6rem)', 
                    fontWeight: 900, 
                    color: 'hsl(var(--void))',
                    cursor: 'pointer',
                    fontFamily: "'Inter', -apple-system, sans-serif",
                  }}>
                    {renderKineticText("BUILD")}
                  </span>
                </BracketBox>
                <BracketBox className='md:hidden' onHoverChange={setIsBuildHovered}>
                  <span style={{ 
                    fontSize: 'clamp(2.5rem,6vw,6rem)', 
                    fontWeight: 900, 
                    color: 'hsl(var(--void))',
                    cursor: 'pointer',
                    fontFamily: "'Inter', -apple-system, sans-serif",
                  }}>
                    BUILD
                  </span>
                </BracketBox>
              </div>
              <span style={{
                  transition: 'filter 0.3s ease',
                  filter: isBuildHovered ? 'blur(2px)' : 'blur(0px)',
                }}>
                  Something.
                </span>
            </h2>
          </div>


          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 border-border pt-2vw transition-all duration-600 ease-section delay-300"
            style={{
              opacity: isVisible('contact') ? 1 : 0,
              transform: isVisible('contact') ? 'translateY(0)' : 'translateY(20px)',
            }}
          >

            <div className="border-b border-border pb-4">
              <label className="text-mono block mb-2">NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                maxLength={100}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  width: '100%', background: 'transparent', border: 'none', outline: 'none',
                    fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 500,
                    color: 'hsl(var(--text-main))', fontFamily: "'Inter', -apple-system, sans-serif",
                    padding: '0.5rem 0',
                }}
                placeholder="Your name"
              />
            </div>


            <div style={{ borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '1rem' }}>
              <label className="text-mono" style={{ display: 'block', marginBottom: '0.5rem' }}>EMAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                maxLength={255}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  width: '100%', background: 'transparent', border: 'none', outline: 'none',
                    fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 500,
                    color: 'hsl(var(--text-main))', fontFamily: "'Inter', -apple-system, sans-serif",
                    padding: '0.5rem 0',
                }}
                placeholder="your@email.com"
              />
            </div>


            <div style={{ borderBottom: '1px solid hsl(var(--border-color))', paddingBottom: '1rem' }}>
              <label className="text-mono" style={{ display: 'block', marginBottom: '0.5rem' }}>MESSAGE</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                maxLength={1000}
                rows={4}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  width: '100%', background: 'transparent', border: 'none', outline: 'none',
                    fontSize: 'clamp(1rem, 2vw, 1.5rem)', fontWeight: 500,
                    color: 'hsl(var(--text-main))', fontFamily: "'Inter', -apple-system, sans-serif",
                    padding: '0.5rem 0', resize: 'vertical', minHeight: '120px',
                }}
                placeholder="Tell me about your project..."
              />
            </div>


            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="interactive-link"
                style={{
                  background: 'none', border: 'none', cursor: 'none',
                  opacity: formStatus === 'sending' ? 0.5 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {formStatus === 'sending' ? 'TRANSMITTING...' : formStatus === 'sent' ? 'MESSAGE SENT ✓' : formStatus === 'error' ? 'FAILED — TRY AGAIN' : 'SEND MESSAGE →'}
              </button>

              <div style={{ display: 'flex', gap: '2rem' }}>
                {[
                  { label: 'GITHUB', href: 'https://github.com/kenshin' },
                  { label: 'TWITTER', href: 'https://twitter.com/ken_sh_in' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    className="text-mono"
                    style={{ textDecoration: 'none', transition: 'color 0.3s ease' }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'hsl(var(--text-main))')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '')}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>

      <div style={{ marginTop: '4vw', textAlign: 'right' }}>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className="text-mono"
          style={{ background: 'none', border: 'none', cursor: 'none' }}
        >
          ↑ BACK TO TOP
        </button>
      </div>
    </div>
  );
};

export default ContactSectionNew;
