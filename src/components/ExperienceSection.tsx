import React from 'react';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

interface ExperienceSectionProps {
  isVisible: (id: string) => boolean;
  experiences: Experience[];
  scrollTo: (id: string) => void;
  setCursorHovered: (v: boolean) => void;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ isVisible, experiences, scrollTo, setCursorHovered }) => {
  return (
    <div
      id="experience"
      data-reveal
      className="col-span-full py-10 max-md:py-5 border-t border-border"
    >
      <div className="grid max-md:flex flex-col grid-cols-12">
        <div
          className="text-mono md:sticky top-10 self-start col-span-3 max-md:mb-6 transition-all duration-600 ease-section"
          style={{
            opacity: isVisible('experience') ? 1 : 0,
            transform: isVisible('experience') ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          [ EXPERIENCE / TIMELINE ]
        </div>

        <div className="md:col-span-9 max-md:pl-4">
          {experiences.map((exp, index) => (
            <div
              key={index}
              style={{
                borderLeft: '1px solid hsl(var(--border-color))',
                paddingLeft: 'clamp(1rem, 2vw, 2rem)',
                paddingBottom: index < experiences.length - 1 ? 'clamp(1.5rem, 3vw, 3rem)' : 0,
                position: 'relative',
                opacity: isVisible('experience') ? 1 : 0,
                transform: isVisible('experience') ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`,
              }}
            >
              <div style={{
                width: 10, height: 10,
                borderRadius: '50%',
                backgroundColor: 'hsl(var(--void))',
                position: 'absolute', left: -5, top: 4,
              }} />
              <span className="text-mono" style={{ fontSize: '0.85rem' }}>{exp.period}</span>
              <h3 style={{
                fontSize: 'clamp(1.2rem, 1.8vw, 2rem)',
                fontWeight: 700, margin: '4px 0 2px',
                fontFamily: "'Inter', -apple-system, sans-serif",
                color: 'hsl(var(--void))',
              }}>
                {exp.role}
              </h3>
              <p className="text-mono" style={{ margin: '0 0 8px', fontSize: '0.9rem' }}>
                {exp.company}
              </p>
              <p style={{
                fontSize: '0.95rem', lineHeight: 1.7,
                color: 'hsl(var(--text-main))', maxWidth: 600,
                margin: '0 0 12px',
              }}>
                {exp.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {exp.technologies.map(tech => (
                  <span key={tech} style={{
                    padding: '3px 10px',
                    border: '1px solid hsl(var(--border-color))',
                    fontSize: '0.75rem',
                    color: 'hsl(var(--text-muted))',
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
          </div>
        </div>

        <div className="text-right max-md:mt-5">
          <button
            onClick={() => scrollTo('about')}
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            className="text-mono"
            style={{ background: 'none', border: 'none', cursor: 'none' }}
          >
            ↑ ABOUT
          </button>
      </div>
    </div>
  );
};

export default ExperienceSection;
