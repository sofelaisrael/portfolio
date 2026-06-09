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
    <section className="content w-full">
      <div className="md:mb-[2rem] " style={{
        display: 'flex',
        gap: '0.5rem',
        justifyContent: 'flex-end',
        flexWrap: 'wrap'
      }}>
        {categories.map((category) => (
          <button className="interactive-link text-extrabold"
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            onMouseEnter={() => setCursorHovered(true)}
            onMouseLeave={() => setCursorHovered(false)}
            style={{
              padding: '0.25rem 0.75rem',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'none',
              transition: 'all 0.2s ease',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              fontWeight: 900,
              opacity: activeCategory === category.id ? 1 : 0.4
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="skill-matrix" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        padding: '2rem 0'
      }}>
        {currentSkills.map((skill, index) => (
          <div
            key={skill.id}
            className="skill-item"
            onMouseEnter={() => {
              setHoveredSkill(skill.id)
              setCursorHovered(true)
            }}
            onMouseLeave={() => {
              setHoveredSkill(null)
              setCursorHovered(false)
            }}
            style={{
              opacity: 1,
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              padding: '1rem',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
              backgroundColor: hoveredSkill === skill.id ? 'hsl(var(--surface)/0.05)' : 'transparent',
              cursor: 'none',
              position: 'relative',
              height: '140px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{
              position: 'relative',
              height: '100%',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                transform: hoveredSkill === skill.id ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div className="skill-meta" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  opacity: 0.7
                }}>
                  <span>[{skill.id}]</span>
                  <span>{skill.meta}</span>
                </div>

                <h3 className="skill-name" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontSize: '20px',
                  fontWeight: 600,
                  margin: '0 0 1rem 0',
                  color: 'hsl(var(--foreground))'
                }}>
                  <StackIcon name={skill.icon} variant="grayscale"
                    style={{
                      width: '30px',
                      filter: theme === 'dark' ? 'invert(1)' : 'none',
                    }} />
                  {skill.name}
                </h3>

                <div className="skill-tags" style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  {skill.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="tag"
                      style={{
                        padding: '0.2rem 0.4rem',
                        backgroundColor: hoveredSkill === skill.id ? 'hsl(var(--accent))' : 'hsl(var(--muted))',
                        color: hoveredSkill === skill.id ? 'hsl(var(--accent-foreground))' : 'hsl(var(--muted-foreground))',
                        borderRadius: '0.25rem',
                        fontSize: '0.65rem',
                        fontFamily: 'monospace',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                transform: hoveredSkill === skill.id ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem'
              }}>
                <div style={{
                  fontSize: '2rem',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'hsl(var(--foreground))',
                  marginBottom: '1rem'
                }}>
                  {getDisplayValue(skill.id, skill.level)}%
                </div>

                <div className="flx items-center gap-1 w-full">
                  <div
                    className="skill-line"
                    style={{
                      height: '2px',
                      background: 'hsl(var(--border))',
                      borderRadius: '1px',
                      overflow: 'hidden',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        zIndex: 1000,
                        background: `hsl(var(--void))`,
                        borderRadius: '1px',
                        width: hoveredSkill === skill.id ? `${skill.level}%` : '0%',
                        transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                          transform: hoveredSkill === skill.id ? 'translateX(100%)' : 'translateX(-100%)',
                          transition: 'transform 0.6s ease-out',
                          transitionDelay: hoveredSkill === skill.id ? '0.3s' : '0s'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{
                  fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  color: 'hsl(var(--muted-foreground))',
                  marginTop: '0.5rem',
                  textAlign: 'center'
                }}>
                  Proficiency Level
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  )
}