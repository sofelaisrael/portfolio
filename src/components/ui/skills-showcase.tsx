import React, { useState } from "react"
import { cn } from "@/lib/utils"
import StackIcon from "tech-stack-icons"

import { useCustomCursor } from "@/hooks/useCustomCursor"
import { useTheme } from "@/contexts/ThemeContext"

const skillsData = {
  frontend: [
    {
      id: 'SKL-001',
      name: 'React / Next.js',
      meta: '0.42ms Latency',
      tags: ['SSG', 'Hydration', 'App Router'],
      icon: 'react',
      color: 'hsl(var(--text-main))',
      level: 80
    },
    {
      id: 'SKL-003',
      name: 'Tailwind CSS',
      meta: 'Visual Struct',
      tags: ['Utility', 'Tokens', 'Responsive'],
      icon: 'tailwindcss',
      color: 'hsl(var(--text-main))',
      level: 90
    },
    {
      id: 'SKL-016',
      name: 'Redux',
      meta: 'State Management',
      tags: ['Store', 'Actions', 'Middleware'],
      icon: 'redux',
      color: 'hsl(var(--text-main))',
      level: 75
    },
    {
      id: 'SKL-017',
      name: 'Zustand',
      meta: 'Lightweight State',
      tags: ['Hooks', 'Simple', 'Performant'],
      icon: 'zustand',
      color: 'hsl(var(--text-main))',
      level: 78
    },
    {
      id: 'SKL-018',
      name: 'GSAP',
      meta: 'Animation Engine',
      tags: ['Timeline', 'ScrollTrigger', 'Easing'],
      icon: 'gsap',
      color: 'hsl(var(--text-main))',
      level: 82
    },
    {
      id: 'SKL-019',
      name: 'Framer Motion',
      meta: 'Motion Library',
      tags: ['Layout', 'Gestures', 'Variants'],
      icon: 'framer',
      color: 'hsl(var(--text-main))',
      level: 78
    },
  ],
  backend: [
    {
      id: 'SKL-004',
      name: 'Node.js',
      meta: 'Backend Core',
      tags: ['Runtime', 'API', 'Streams'],
      icon: 'nodejs',
      color: 'hsl(var(--text-main))',
      level: 75
    },
    {
      id: 'SKL-009',
      name: 'Express.js',
      meta: 'Web Framework',
      tags: ['REST', 'Middleware', 'Routing'],
      icon: 'expressjs',
      color: 'hsl(var(--text-main))',
      level: 80
    },
    {
      id: 'SKL-020',
      name: 'Prisma',
      meta: 'ORM Layer',
      tags: ['Schema', 'Migrations', 'Type Safe'],
      icon: 'prisma',
      color: 'hsl(var(--text-main))',
      level: 72
    },
    {
      id: 'SKL-021',
      name: 'Supabase',
      meta: 'BaaS Platform',
      tags: ['Realtime', 'Auth', 'Storage'],
      icon: 'supabase',
      color: 'hsl(var(--text-main))',
      level: 70
    },
    {
      id: 'SKL-022',
      name: 'tRPC',
      meta: 'Type-Safe APIs',
      tags: ['Endpoints', 'Procedures', 'RPC'],
      icon: 'tRPC',
      color: 'hsl(var(--text-main))',
      level: 68
    },
    {
      id: 'SKL-023',
      name: 'Zod',
      meta: 'Schema Validation',
      tags: ['Parse', 'Infer', 'Safety'],
      icon: 'zod',
      color: 'hsl(var(--text-main))',
      level: 74
    },
    {
      id: 'SKL-010',
      name: 'MongoDB',
      meta: 'NoSQL Database',
      tags: ['Document', 'Scalable', 'Flexible'],
      icon: 'mongodb',
      color: 'hsl(var(--text-main))',
      level: 65
    },
    {
      id: 'SKL-011',
      name: 'Clerk',
      meta: 'Auth Platform',
      tags: ['Auth', 'SSO', 'User Mgmt'],
      icon: 'clerk',
      color: 'hsl(var(--text-main))',
      level: 68
    },
    {
      id: 'SKL-030',
      name: 'PostgreSQL',
      meta: 'Relational DB',
      tags: ['SQL', 'Schemas', 'ACID'],
      icon: 'postgresql',
      color: 'hsl(var(--text-main))',
      level: 70
    },
    {
      id: 'SKL-031',
      name: 'Redis',
      meta: 'In-Memory Cache',
      tags: ['Caching', 'Pub/Sub', 'Session'],
      icon: 'redis',
      color: 'hsl(var(--text-main))',
      level: 65
    }
  ],
  languages: [
    {
      id: 'SKL-002',
      name: 'TypeScript',
      meta: 'Strongly Typed',
      tags: ['Generics', 'Interfaces', 'Safety'],
      icon: 'typescript',
      color: 'hsl(var(--text-main))',
      level: 85
    },
    {
      id: 'SKL-007',
      name: 'JavaScript',
      meta: 'Dynamic Language',
      tags: ['ES6+', 'Async', 'Modules'],
      icon: 'js',
      color: 'hsl(var(--text-main))',
      level: 90
    },
    {
      id: 'SKL-024',
      name: 'Go',
      meta: 'Systems Language',
      tags: ['Concurrency', 'Fast', 'Simple'],
      icon: 'go',
      color: 'hsl(var(--text-main))',
      level: 60
    },
    {
      id: 'SKL-025',
      name: 'Python',
      meta: 'General Purpose',
      tags: ['Scripting', 'Data', 'AI/ML'],
      icon: 'python',
      color: 'hsl(var(--text-main))',
      level: 65
    }
  ],
  devops: [
    {
      id: 'SKL-028',
      name: 'Easy Deploy',
      meta: 'One-Click Deploy',
      tags: ['Hosting', 'Automation', 'CI/CD'],
      icon: 'easydeploy',
      color: 'hsl(var(--text-main))',
      level: 75
    },
    {
      id: 'SKL-029',
      name: 'GitHub Actions',
      meta: 'CI/CD Pipeline',
      tags: ['Automation', 'Workflows', 'Testing'],
      icon: 'githubactions',
      color: 'hsl(var(--text-main))',
      level: 70
    },
    {
      id: 'SKL-006',
      name: 'Docker',
      meta: 'Containerization',
      tags: ['DevOps', 'CI/CD', 'Scaling'],
      icon: 'docker',
      color: 'hsl(var(--text-main))',
      level: 65
    },
    {
      id: 'SKL-012',
      name: 'Kubernetes',
      meta: 'Orchestration',
      tags: ['Containers', 'Scaling', 'Auto-healing'],
      icon: 'kubernetes',
      color: 'hsl(var(--text-main))',
      level: 60
    },
    {
      id: 'SKL-013',
      name: 'AWS',
      meta: 'Cloud Platform',
      tags: ['EC2', 'S3', 'Lambda'],
      icon: 'aws',
      color: 'hsl(var(--text-main))',
      level: 68
    },
    {
      id: 'SKL-014',
      name: 'Git',
      meta: 'Version Control',
      tags: ['Collaboration', 'Branching', 'CI/CD'],
      icon: 'git',
      color: 'hsl(var(--text-main))',
      level: 88
    },
    {
      id: 'SKL-015',
      name: 'Vitest',
      meta: 'Unit Testing',
      tags: ['Vite', 'Coverage', 'Fast'],
      icon: 'vitest',
      color: 'hsl(var(--text-main))',
      level: 75
    },
    {
      id: 'SKL-026',
      name: 'Vercel',
      meta: 'Deployment Platform',
      tags: ['Edge', 'Serverless', 'Analytics'],
      icon: 'vercel',
      color: 'hsl(var(--text-main))',
      level: 82
    },
    {
      id: 'SKL-027',
      name: 'Render',
      meta: 'Cloud Hosting',
      tags: ['PaaS', 'Auto Deploy', 'SSL'],
      icon: 'render',
      color: 'hsl(var(--text-main))',
      level: 70
    }
  ]
}

const categories = [
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'languages', name: 'Languages' },
  { id: 'devops', name: 'DevOps' }
]

interface SkillsShowcaseProps {
  setCursorHovered: (hovered: boolean) => void;
}

export function SkillsShowcase({ setCursorHovered }: SkillsShowcaseProps) {
  const { theme } = useTheme()
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('frontend')
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({})

  const currentSkills = skillsData[activeCategory as keyof typeof skillsData]

  const handleMouseEnter = () => setCursorHovered(true);
  const handleMouseLeave = () => setCursorHovered(false);

  React.useEffect(() => {
    if (hoveredSkill) {
      const skill = currentSkills.find(s => s.id === hoveredSkill)
      if (skill) {
        setAnimatedValues(prev => ({ ...prev, [hoveredSkill]: 0 }))

        const duration = 500
        const steps = 30
        const increment = skill.level / steps
        let currentStep = 0

        const timer = setInterval(() => {
          currentStep++
          const newValue = Math.min(Math.floor(increment * currentStep), skill.level)
          setAnimatedValues(prev => ({ ...prev, [hoveredSkill]: newValue }))

          if (currentStep >= steps) {
            clearInterval(timer)
          }
        }, duration / steps)

        return () => clearInterval(timer)
      }
    }
  }, [hoveredSkill, currentSkills])

  const getDisplayValue = (skillId: string, actualValue: number) => {
    return animatedValues[skillId] !== undefined ? animatedValues[skillId] : actualValue
  }

  return (
    <section className="content w-full" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(hsl(var(--border)) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        opacity: 0.15,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Scanline */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.03) 2px, hsl(var(--foreground) / 0.03) 4px)',
        pointerEvents: 'none',
        zIndex: 1,
        animation: 'scanline-scroll 8s linear infinite',
      }} />

      <style>{`
        @keyframes scanline-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes crt-flicker {
          0% { opacity: 0.97; }
          5% { opacity: 0.95; }
          10% { opacity: 0.98; }
          15% { opacity: 0.96; }
          20% { opacity: 0.99; }
          100% { opacity: 0.98; }
        }
        @keyframes viz-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .skills-main-grid {
          display: grid;
          grid-template-columns: 1fr 200px;
          gap: 1.5rem;
          align-items: start;
        }
        .skill-row {
          display: grid;
          grid-template-columns: 90px 1fr 100px;
          gap: 1rem;
          align-items: center;
        }
        .skill-row-id {
          display: block;
        }
        .skill-viz-box {
          position: sticky;
          top: 10px;
          width: 200px;
          height: 200px;
        }
        @media (max-width: 768px) {
          .skills-main-grid {
            grid-template-columns: 1fr;
          }
          .skill-row {
            grid-template-columns: 70px 1fr 60px;
            gap: 0.5rem;
          }
          .skill-row-id {
            display: none;
          }
          .skill-viz-box {
            position: static;
            width: 100%;
            height: 160px;
            order: -1;
          }
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Status readout header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          padding: '0.75rem 0',
          borderBottom: '1px solid hsl(var(--border))',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: 'hsl(var(--text-muted))',
            lineHeight: 1.8,
          }}>
            <div>ARCHIVE: SKILL_MATRIX</div>
            <div>SERIE 2 / NO. 096</div>
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            color: 'hsl(var(--text-muted))',
            lineHeight: 1.8,
            textAlign: 'right',
          }}>
            <div>COMPILER_READY: <span style={{ color: 'hsl(var(--foreground))' }}>TRUE</span></div>
            <div>CLOCK_SPEED: <span style={{ color: 'hsl(var(--foreground))' }}>4.2GHZ</span></div>
          </div>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex',
          gap: '0',
          marginBottom: '1.5rem',
          borderBottom: '1px solid hsl(var(--border))',
        }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRight: '1px solid hsl(var(--border))',
                borderRadius: 0,
                cursor: 'none',
                transition: 'all 0.15s ease',
                fontSize: '0.65rem',
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                letterSpacing: '0.1em',
                backgroundColor: activeCategory === category.id ? 'hsl(var(--foreground))' : 'transparent',
                color: activeCategory === category.id ? 'hsl(var(--background))' : 'hsl(var(--text-muted))',
              }}
            >
              {`> ${category.name}`}
            </button>
          ))}
          <div style={{
            padding: '0.5rem 0.75rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: 'hsl(var(--text-muted))',
            display: 'flex',
            alignItems: 'center',
            animation: 'cursor-blink 1s step-end infinite',
          }}>
            _
          </div>
        </div>

        {/* Main content: skill list + viz box */}
        <div className="skills-main-grid">
          {/* Skill list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {currentSkills.map((skill) => (
              <div
                key={skill.id}
                className="skill-row"
                onMouseEnter={() => {
                  setHoveredSkill(skill.id)
                  setCursorHovered(true)
                }}
                onMouseLeave={() => {
                  setHoveredSkill(null)
                  setCursorHovered(false)
                }}
                style={{
                  padding: '0.75rem 0.5rem',
                  borderBottom: '1px solid hsl(var(--border) / 0.3)',
                  cursor: 'none',
                  backgroundColor: hoveredSkill === skill.id ? 'hsl(var(--foreground) / 0.04)' : 'transparent',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <div className="skill-row-id" style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem',
                  color: 'hsl(var(--text-muted))',
                  opacity: 0.6,
                }}>
                  [{skill.id}]
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}>
                  <StackIcon name={skill.icon} variant="grayscale"
                    style={{
                      width: '20px',
                      height: '20px',
                      filter: theme === 'dark' ? 'invert(1)' : 'none',
                    }} />
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'hsl(var(--foreground))',
                    letterSpacing: '0.02em',
                  }}>
                    {skill.name}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    flex: 1,
                    height: '2px',
                    backgroundColor: 'hsl(var(--border))',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      backgroundColor: 'hsl(var(--foreground))',
                      width: `${skill.level}%`,
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: hoveredSkill === skill.id ? '0 0 6px hsl(var(--foreground) / 0.5)' : 'none',
                    }} />
                  </div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.6rem',
                    color: 'hsl(var(--text-muted))',
                    minWidth: '28px',
                    textAlign: 'right',
                  }}>
                    {hoveredSkill === skill.id ? getDisplayValue(skill.id, skill.level) : skill.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Viz box */}
          <div className="skill-viz-box" style={{
            border: '1px solid hsl(var(--border))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            backgroundColor: hoveredSkill ? 'hsl(var(--foreground) / 0.02)' : 'transparent',
          }}>
            {/* Corner markers */}
            <svg style={{ position: 'absolute', top: -1, left: -1, width: 16, height: 16, pointerEvents: 'none' }}>
              <path d="M0 16 L0 0 L16 0" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.5" />
            </svg>
            <svg style={{ position: 'absolute', top: -1, right: -1, width: 16, height: 16, pointerEvents: 'none' }}>
              <path d="M0 0 L16 0 L16 16" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.5" />
            </svg>
            <svg style={{ position: 'absolute', bottom: -1, left: -1, width: 16, height: 16, pointerEvents: 'none' }}>
              <path d="M0 0 L0 16 L16 16" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.5" />
            </svg>
            <svg style={{ position: 'absolute', bottom: -1, right: -1, width: 16, height: 16, pointerEvents: 'none' }}>
              <path d="M16 0 L16 16 L0 16" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.5" />
            </svg>

            {hoveredSkill ? (
              <>
                <StackIcon
                  name={currentSkills.find(s => s.id === hoveredSkill)?.icon || ''}
                  variant="grayscale"
                  style={{
                    width: '48px',
                    height: '48px',
                    filter: theme === 'dark' ? 'invert(1)' : 'none',
                  }}
                />
                <div style={{
                  marginTop: '1rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  color: 'hsl(var(--text-muted))',
                  textAlign: 'center',
                }}>
                  {currentSkills.find(s => s.id === hoveredSkill)?.name.toUpperCase().replace(/\s*\/\s*/g, '_')}
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.5rem',
                  color: 'hsl(var(--text-muted))',
                  opacity: 0.5,
                  marginTop: '0.25rem',
                }}>
                  LEVEL: {getDisplayValue(hoveredSkill, currentSkills.find(s => s.id === hoveredSkill)?.level || 0)}%
                </div>
              </>
            ) : (
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                color: 'hsl(var(--text-muted))',
                opacity: 0.4,
                textAlign: 'center',
                lineHeight: 1.8,
              }}>
                HOVER_TO<br />INSPECT
              </div>
            )}
          </div>
        </div>

        {/* Corner markers for entire section */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: 20, height: 20, pointerEvents: 'none' }}>
          <path d="M0 20 L0 0 L20 0" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.3" />
        </svg>
        <svg style={{ position: 'absolute', top: 0, right: 0, width: 20, height: 20, pointerEvents: 'none' }}>
          <path d="M0 0 L20 0 L20 20" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.3" />
        </svg>
        <svg style={{ position: 'absolute', bottom: 0, left: 0, width: 20, height: 20, pointerEvents: 'none' }}>
          <path d="M0 0 L0 20 L20 20" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.3" />
        </svg>
        <svg style={{ position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, pointerEvents: 'none' }}>
          <path d="M20 0 L20 20 L0 20" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>
    </section>
  )
}