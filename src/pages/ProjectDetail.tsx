import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { projects } from '@/data';
import projectDetails from '@/data/projectDetails.json';
import CustomCursor from '@/components/CustomCursor';
import { useCustomCursor } from '@/hooks/useCustomCursor';
import { useLenis } from '@/hooks/useLenis';

interface ProjectDetail {
  description: string;
  techStack: string[];
  challenges: string[];
  features: string[];
  github: string;
}

type ProjectDetailsMap = Record<string, ProjectDetail>;

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cursorHovered, setCursorHovered, cursorPos } = useCustomCursor();
  useLenis();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const project = projects.find(p => p.id === id);
  const details = (projectDetails as ProjectDetailsMap)[id ?? ''];

  if (!project || !details) {
    return (
      <div className="px-16 max-md:px-5" style={{ paddingTop: '10vh' }}>
        <CustomCursor cursorPos={cursorPos} cursorHovered={cursorHovered} />
        <p className="text-mono">Project not found.</p>
        <Link to="/" className="text-mono" style={{ textDecoration: 'underline' }}>← Back home</Link>
      </div>
    );
  }

  return (
    <div className="px-16 max-md:px-5" style={{ paddingTop: '5vh' }}>
      <Helmet>
        <title>{project.title} — Ken Sh.in</title>
        <meta name="description" content={details.description.slice(0, 160)} />
        <meta property="og:title" content={`${project.title} — Ken Sh.in`} />
        <meta property="og:description" content={details.description.slice(0, 160)} />
        <meta property="og:type" content="article" />
      </Helmet>
      <CustomCursor cursorPos={cursorPos} cursorHovered={cursorHovered} />

      <div style={{
        maxWidth: 1000, margin: '0 auto',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <button
          onClick={() => navigate('/')}
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className="text-mono"
          style={{
            background: 'none', border: 'none', cursor: 'none',
            display: 'flex', alignItems: 'center', gap: 8, padding: 0,
            marginBottom: '4vw',
          }}
        >
          <ArrowLeft size={16} /> BACK TO WORKS
        </button>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '4vw', marginBottom: '6vw',
          borderBottom: '1px solid hsl(var(--border-color))',
          paddingBottom: '4vw',
        }} className='grid-cols-1'>
          <div>
            <span className="text-mono" style={{ marginBottom: 8, display: 'block' }}>{project.id} / {project.year}</span>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 5rem)',
              fontWeight: 900, letterSpacing: '-0.02em',
              textTransform: 'uppercase', margin: 0,
              fontFamily: "'Inter', -apple-system, sans-serif",
              color: 'hsl(var(--void))',
            }}>
              {project.title}
            </h1>
            <p className="text-mono" style={{ marginTop: 8 }}>{project.role}</p>
          </div>

          <div className='max-md:flex-row' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 12 }}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="interactive-link"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                textDecoration: 'none', color: 'hsl(var(--void))',
                fontSize: '1.1rem',
              }}
            >
              VISIT LIVE SITE <ExternalLink size={16} />
            </a>
            <a
              href={details.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className="interactive-link"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                textDecoration: 'none', color: 'hsl(var(--void))',
                fontSize: '1.1rem',
              }}
            >
              VIEW SOURCE <Github size={16} />
            </a>
          </div>
        </div>


        <section style={{ marginBottom: '6vw' }}>
          <span className="text-mono" style={{ marginBottom: 16, display: 'block' }}>ABOUT</span>
          <p style={{
            fontSize: 'clamp(1.1rem, 1.4vw, 1.4rem)',
            lineHeight: 1.8, color: 'hsl(var(--text-main))',
            maxWidth: 700,
          }}>
            {details.description}
          </p>
        </section>


        <section style={{ marginBottom: '6vw' }}>
          <span className="text-mono" style={{ marginBottom: 16, display: 'block' }}>TECH STACK</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {details.techStack.map(tech => (
              <span key={tech} style={{
                padding: '6px 16px',
                border: '1px solid hsl(var(--border-color))',
                borderRadius: 0,
                fontSize: '0.85rem',
                fontFamily: "'Inter', -apple-system, sans-serif",
                color: 'hsl(var(--text-muted))',
              }}>
                {tech}
              </span>
            ))}
          </div>
        </section>


        <section style={{ marginBottom: '6vw' }}>
          <span className="text-mono" style={{ marginBottom: 16, display: 'block' }}>CHALLENGES</span>
          <ul style={{ padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {details.challenges.map((c, i) => (
              <li key={i} style={{
                padding: '16px 20px',
                border: '1px solid hsl(var(--border-color))',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: 'hsl(var(--text-main))',
              }}>
                {c}
              </li>
            ))}
          </ul>
        </section>


        <section style={{ marginBottom: '6vw' }}>
          <span className="text-mono" style={{ marginBottom: 16, display: 'block' }}>FEATURES</span>
          <div className='grid-cols-1' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {details.features.map((f, i) => (
              <div key={i} style={{
                padding: '16px 20px',
                border: '1px solid hsl(var(--border-color))',
                fontSize: '0.95rem',
                color: 'hsl(var(--text-main))',
              }}>
                {f}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectDetail;
