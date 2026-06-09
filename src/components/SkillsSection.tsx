import React from 'react';
import { SkillsShowcase } from '@/components/ui/skills-showcase';

interface SkillsSectionProps {
  isVisible: (id: string) => boolean;
  scrollTo: (id: string) => void;
  setCursorHovered: (hovered: boolean) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  isVisible,
  scrollTo,
  setCursorHovered,
}) => {
  return (
    <div
      id="skills"
      data-reveal
      className="py-10 max-md:py-5 border-t"
      style={{
        gridColumn: '1 / -1',
        opacity: isVisible('skills') ? 1 : 0,
        transform: isVisible('skills') ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className='grid  max-md:flex flex-col' style={{  gridTemplateColumns: 'repeat(12, 1fr)', gap: '2vw' }}>
        <div
          className="text-mono md:sticky top-10 h-[20px]"
          style={{
            gridColumn: '1 / 4',
            alignSelf: 'start',
          }}
        >
          [ CAPABILITIES / STACK ]
        </div>

        <div className='max-md:pt-5' style={{ gridColumn: '4 / -1', position: 'relative' }}>
          <div
            style={{
              opacity: isVisible('skills') ? 1 : 0,
              transform: isVisible('skills') ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s`,
            }}
          >
            <SkillsShowcase setCursorHovered={setCursorHovered} />
          </div>

          <div className="md:mt-10 text-right">
            <button
              onClick={() => scrollTo('experience')}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="text-mono"
              style={{ background: 'none', border: 'none', cursor: 'none' }}
            >
              ↑ TIMELINE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
