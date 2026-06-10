import React from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  role: string;
  year: string;
  img: string;
  link: string;
}

interface WorksSectionProps {
  projects: Project[];
  appState: 'locked' | 'animating' | 'open';
  hoveredItem: string | null;
  handleItemMouseEnter: (item: Project) => void;
  handleItemMouseLeave: () => void;
}

const WorksSection: React.FC<WorksSectionProps> = ({ 
  projects, 
  appState, 
  hoveredItem, 
  handleItemMouseEnter, 
  handleItemMouseLeave 
}) => {
  return (
    <div  className='pb-10' id="works" style={{ gridColumn: '1 / -1' }}>
      <div className='grid max-md:flex flex-col' style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '2vw' }}>
        <div
          data-reveal
          className="text-mono md:sticky py-10 top-10 h-[20px] max-md:pb-4 max-md:pt-6"
          style={{
            gridColumn: '1 / 4',
            alignSelf: 'start',
            transform: appState === 'open' ? 'translateY(0)' : 'translateY(20px)',
            opacity: appState === 'open' ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s',
          }}
        >
          [ INDEX / SELECTED WORKS ]
        </div>

        <ul className="max-md:px-0" style={{ gridColumn: '4 / -1', listStyle: 'none', borderTop: '1px solid hsl(var(--border-color))' }}>
          {projects.map((project, index) => (
            <li
              key={project.id}
              onMouseEnter={() => handleItemMouseEnter(project)}
              onMouseLeave={handleItemMouseLeave}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 80px 60px',
                alignItems: 'baseline', padding: '3vw 0',
                borderBottom: '1px solid hsl(var(--border-color))',
                position: 'relative',
                cursor: 'pointer',
                opacity: appState === 'open' ? 1 : 0,
                transform: appState === 'open' ? 'translateY(0)' : 'translateY(20px)',
                transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${1.3 + index * 0.1}s, opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${1.3 + index * 0.1}s`,
              }}
            >
              <Link
                to={`/project/${project.id}`}
                style={{
                  display: 'contents',
                  color: 'inherit', textDecoration: 'none',
                }}
              >
              <span className="text-mono max-md:text-[10px]">{project.id}</span>
              <span style={{
                fontSize: 'clamp(1.2rem, 3vw, 4rem)', fontWeight: 700,
                letterSpacing: '-0.02em', textTransform: 'uppercase',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease',
                fontFamily: "'Inter', -apple-system, sans-serif",
                color: hoveredItem === project.id ? 'hsl(var(--text-muted))' : 'hsl(var(--void))',
                transform: hoveredItem === project.id ? 'translateX(20px)' : 'translateX(0)',
              }}>
                {project.title}
              </span>
              <span className="text-mono max-md:text-[8px]" style={{ textAlign: 'right' }}>{project.role}</span>
              <span className="text-mono max-md:text-[8px]" style={{ textAlign: 'right' }}>{project.year}</span>
            </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorksSection;
