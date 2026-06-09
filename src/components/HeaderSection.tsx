import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import { useGithubStats } from '@/hooks/useGithubStats';
import resume from '@/assets/resume.pdf';

interface HeaderSectionProps {
  appState: 'locked' | 'animating' | 'open';
  timeStr: string;
  setCursorHovered: (hovered: boolean) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ appState, timeStr, setCursorHovered }) => {
  const { data: githubStats, isLoading } = useGithubStats();

  const targetValues = {
    projects: githubStats?.projectCount ?? 0,
    experience: githubStats?.yearsExperience ?? 0,
    contributions: githubStats?.totalContributions ?? 0,
  };

  const [animatedValues, setAnimatedValues] = useState({
    projects: 0,
    experience: 0,
    contributions: 0,
  });

  const statsReady = appState === 'open' && !!githubStats && !isLoading;
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (statsReady && !hasAnimated.current) {
      hasAnimated.current = true;

      setTimeout(() => {
        const duration = 2000;
        const startTime = Date.now();
        const startValues = { projects: 0, experience: 0, contributions: 0 };

        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);

          setAnimatedValues({
            projects: Math.floor(startValues.projects + (targetValues.projects - startValues.projects) * easeOutQuart),
            experience: Math.floor(startValues.experience + (targetValues.experience - startValues.experience) * easeOutQuart),
            contributions: Math.floor(startValues.contributions + (targetValues.contributions - startValues.contributions) * easeOutQuart),
          });

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }, 1000);
    }
  }, [statsReady]);

  const stats = [
    { label: 'Projects Done', key: 'projects' },
    { label: 'Commits', key: 'contributions' },
    { label: 'Years Experience', key: 'experience' },
  ];

  if (!statsReady) {
    animatedValues;
  }

  return (
    <>
      <header className='pt-10'
        style={{
          gridColumn: '1 / -1', marginBottom: '8vh',
          borderBottom: '1px solid hsl(var(--border-color))',
          paddingBottom: '2vw', display: 'flex',
          justifyContent: 'space-between', alignItems: 'flex-end',
          transform: appState === 'open' ? 'translateY(0)' : 'translateY(40px)',
          opacity: appState === 'open' ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
        }}
      >
        <div>
          <p className="text-mono">Creative Developer</p>
          <p className="text-mono">Based in coordinates undefined</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'right', alignItems: 'end' }}>
          <ThemeToggle setCursorHovered={setCursorHovered} />
          <span className="text-mono">SYS.STATUS: ONLINE</span>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href={resume} download className="text-mono text-nowrap" style={{ textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
            >RESUME: ↓PDF</a>
            <span className="text-mono">{timeStr}</span>
          </div>
        </div>
      </header>

      <section
        style={{
          gridColumn: '1 / -1', marginBottom: '12vh',
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2rem',
          transform: appState === 'open' ? 'translateY(0)' : 'translateY(40px)',
          opacity: appState === 'open' ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s',
          minHeight: isLoading ? '80px' : 'auto',
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            style={{
              gridColumn: index === 0 ? '1 / 5' : index === 1 ? '5 / 9' : '9 / -1',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(2rem, 3vw, 5vw)',
                fontWeight: 900,
                color: 'hsl(var(--void))',
                margin: 0,
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontFamily: "'Inter', -apple-system, sans-serif",
              }}
            >
              {isLoading
                ? '--'
                : `${animatedValues[stat.key as keyof typeof animatedValues]}+`}
            </h2>
            <p className="text-mono" style={{ margin: 0 }}>
              {stat.label}
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default HeaderSection;
