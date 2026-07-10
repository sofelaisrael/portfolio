import React, { useState } from "react";

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

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  isVisible,
  experiences,
  scrollTo,
  setCursorHovered,
}) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div
      id="experience"
      data-reveal
      className="col-span-full border-border"
      style={{ position: "relative", padding: "clamp(2rem, 4vw, 4rem) 0" }}
    >
      <style>{`
        .exp-manifest-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3vw, 3rem);
        }
        @media (max-width: 768px) {
          .exp-manifest-grid {
            grid-template-columns: 1fr;
          }
        }
        @keyframes bar-noise {
          0% { transform: translateX(0); }
          10% { transform: translateX(-2px) translateY(1px); }
          20% { transform: translateX(3px); }
          30% { transform: translateX(-1px) translateY(-1px); }
          40% { transform: translateX(2px); }
          50% { transform: translateX(-3px) translateY(1px); }
          60% { transform: translateX(1px); }
          70% { transform: translateX(-2px) translateY(-1px); }
          80% { transform: translateX(3px) translateY(1px); }
          90% { transform: translateX(-1px); }
          100% { transform: translateX(0); }
        }
        @keyframes bar-noise-alt {
          0% { transform: translateX(0); }
          10% { transform: translateX(2px) translateY(-1px); }
          20% { transform: translateX(-3px); }
          30% { transform: translateX(1px) translateY(1px); }
          40% { transform: translateX(-2px); }
          50% { transform: translateX(3px) translateY(-1px); }
          60% { transform: translateX(-1px); }
          70% { transform: translateX(2px) translateY(1px); }
          80% { transform: translateX(-3px) translateY(-1px); }
          90% { transform: translateX(1px); }
          100% { transform: translateX(0); }
        }
      `}</style>
      {/* Corner markers */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          pointerEvents: "none",
        }}
      >
        <path
          d="M0 20 L0 0 L20 0"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
      <svg
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 20,
          height: 20,
          pointerEvents: "none",
        }}
      >
        <path
          d="M0 0 L20 0 L20 20"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 20,
          height: 20,
          pointerEvents: "none",
        }}
      >
        <path
          d="M0 0 L0 20 L20 20"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 20,
          height: 20,
          pointerEvents: "none",
        }}
      >
        <path
          d="M20 0 L20 20 L0 20"
          fill="none"
          stroke="hsl(var(--foreground))"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>

      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "clamp(1.5rem, 3vw, 3rem)",
          paddingBottom: "1rem",
          borderBottom: "1px solid hsl(var(--border))",
          opacity: isVisible("experience") ? 1 : 0,
          transform: isVisible("experience")
            ? "translateY(0)"
            : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "hsl(var(--text-muted))",
              marginBottom: "0.5rem",
            }}
          >
            DEV_KERNEL
          </div>
          <h2
            style={{
              fontFamily: "'Inter', -apple-system, sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            <span style={{ color: "hsl(var(--foreground))" }}>Profile</span>
            <span style={{ color: "hsl(var(--foreground))" }}>Logic</span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.5em",
                verticalAlign: "super",
                color: "hsl(var(--text-muted))",
                marginLeft: "0.25em",
              }}
            >
              01
            </span>
          </h2>
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            color: "hsl(var(--text-muted))",
            lineHeight: 1.8,
            textAlign: "right",
          }}
        >
          <div>Sector: Full-Stack</div>
          <div>Class: Senior Engineer</div>
          <div>Ref: 0101-0X-F92</div>
          <div>Compiled: 2024.Q3</div>
        </div>
      </header>

      <div
        className="grid max-md:flex flex-col"
        style={{ gridTemplateColumns: "repeat(12, 1fr)", gap: "2vw" }}
      >
        {/* Side label */}
        <div
          className="text-mono md:sticky top-10 h-[fit-content]"
          style={{
            gridColumn: "1 / 4",
            alignSelf: "start",
            opacity: isVisible("experience") ? 1 : 0,
            transform: isVisible("experience")
              ? "translateY(0)"
              : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          [ EXPERIENCE / CAPABILITIES ]
        </div>

        {/* Main content */}
        <div
          style={{
            gridColumn: "4 / -1",
            opacity: isVisible("experience") ? 1 : 0,
            transform: isVisible("experience")
              ? "translateY(0)"
              : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          {/* Main grid */}
          <div className="exp-manifest-grid">
            {/* Left: Project History */}
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "hsl(var(--text-muted))",
                  marginBottom: "1.5rem",
                  textTransform: "uppercase",
                }}
              >
                Project History &amp; Progression
              </div>

              {experiences.map((exp, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setCursorHovered(true)}
                  onMouseLeave={() => setCursorHovered(false)}
                  style={{
                    marginBottom: index < experiences.length - 1 ? "1.5rem" : 0,
                    paddingBottom:
                      index < experiences.length - 1 ? "1.5rem" : 0,
                    borderBottom:
                      index < experiences.length - 1
                        ? "1px solid hsl(var(--border) / 0.3)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "hsl(var(--foreground))",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {exp.role}
                    </span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        color: "hsl(var(--text-muted))",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: 1.7,
                      color: "hsl(var(--text-muted))",
                      margin: "0 0 0.75rem",
                      maxWidth: 500,
                    }}
                  >
                    {exp.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "2px 8px",
                          border: "1px solid hsl(var(--border))",
                          fontSize: "0.6rem",
                          fontFamily: "'JetBrains Mono', monospace",
                          color: "hsl(var(--text-muted))",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Logic Proficiency (barcode-style) */}
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "hsl(var(--text-muted))",
                  marginBottom: "1.5rem",
                  textTransform: "uppercase",
                }}
              >
                Logic Proficiency
              </div>

              {experiences
                .flatMap((exp) => exp.technologies)
                .filter((tech, i, arr) => arr.indexOf(tech) === i)
                .slice(0, 6)
                .map((tech, index) => {
                  const barPattern = [
                    [
                      "wide",
                      "thin",
                      "med",
                      "thin",
                      "wide",
                      "med",
                      "thin",
                      "wide",
                    ],
                    [
                      "med",
                      "med",
                      "thin",
                      "thin",
                      "wide",
                      "thin",
                      "thin",
                      "med",
                    ],
                    [
                      "thin",
                      "wide",
                      "med",
                      "wide",
                      "thin",
                      "med",
                      "wide",
                      "thin",
                    ],
                    [
                      "wide",
                      "med",
                      "thin",
                      "med",
                      "wide",
                      "thin",
                      "med",
                      "wide",
                    ],
                    [
                      "med",
                      "thin",
                      "wide",
                      "thin",
                      "med",
                      "wide",
                      "thin",
                      "med",
                    ],
                    [
                      "thin",
                      "med",
                      "wide",
                      "med",
                      "thin",
                      "med",
                      "wide",
                      "thin",
                    ],
                  ][index % 6];

                  return (
                    <div
                      key={tech}
                      style={{ marginBottom: "1.25rem", cursor: "pointer" }}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6rem",
                          letterSpacing: "0.1em",
                          color: "hsl(var(--foreground))",
                          marginBottom: "0.4rem",
                          fontWeight: 600,
                          animation:
                            hoveredTech === tech
                              ? "bar-noise 0.2s steps(3) infinite"
                              : "none",
                          display: "inline-block",
                        }}
                      >
                        {tech.toUpperCase().replace(/\s+/g, "_")}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "2px",
                          height: "12px",
                          overflow: "visible",
                        }}
                      >
                        {barPattern.map((width, i) => (
                          <div
                            key={i}
                            style={{
                              flex:
                                width === "wide" ? 3 : width === "med" ? 2 : 1,
                              backgroundColor: "hsl(var(--foreground))",
                              opacity: 0.7 + (i % 3) * 0.1,
                              animation:
                                hoveredTech === tech
                                  ? `${i % 2 === 0 ? "bar-noise" : "bar-noise-alt"} 0.15s steps(2) infinite`
                                  : "none",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}

              {/* Caution box */}
              <div
                style={{
                  marginTop: "1.5rem",
                  padding: "1rem",
                  border: "1px solid hsl(var(--border))",
                  display: "flex",
                  gap: "0.75rem",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.8rem",
                    color: "hsl(var(--foreground))",
                    lineHeight: 1,
                  }}
                >
                  ▲
                </span>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.05em",
                    color: "hsl(var(--text-muted))",
                    lineHeight: 1.6,
                  }}
                >
                  Attention: Performance
                  <br />
                  Optimized for low-level
                  <br />
                  memory safety.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Standard Compliance + Validation Status */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginTop: "clamp(1.5rem, 3vw, 3rem)",
          paddingTop: "1.5rem",
          borderTop: "1px solid hsl(var(--border))",
          opacity: isVisible("experience") ? 1 : 0,
          transform: isVisible("experience")
            ? "translateY(0)"
            : "translateY(20px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "hsl(var(--text-muted))",
              marginBottom: "0.75rem",
              textTransform: "uppercase",
            }}
          >
            Standard Compliance
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {["ISO", "W3C", "N", "API"].map((label) => (
              <div
                key={label}
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid hsl(var(--border))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  color: "hsl(var(--foreground))",
                  letterSpacing: "0.05em",
                }}
              >
                {label}
              </div>
            ))}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem",
                fontWeight: 700,
                color: "hsl(var(--text-muted))",
                lineHeight: 1.6,
                marginLeft: "0.5rem",
              }}
            >
              Environment: Windows / Linux
              <br />
              Terminal: Powershell / WSL
              <br />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.8 }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M8 8h8v2H8zM8 14h6v2H8z" />
                </svg>
                Editor: Zed
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              color: "hsl(var(--text-muted))",
              marginBottom: "0.5rem",
              textTransform: "uppercase",
            }}
          >
            Validation Status
          </div>
          <div
            style={{
              fontFamily: "'Inter', -apple-system, sans-serif",
              fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
            }}
          >
            CERTIFIED_
          </div>
        </div>
      </div>

      {/* Nav back */}
      <div className="text-right" style={{ marginTop: "1.5rem" }}>
        <button
          onClick={() => scrollTo("about")}
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className="text-mono"
          style={{ background: "none", border: "none", cursor: "none" }}
        >
          ↑ ABOUT
        </button>
      </div>
    </div>
  );
};

export default ExperienceSection;
