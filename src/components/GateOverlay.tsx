import React from 'react';
import { useGateAnimation } from '../hooks/useGateAnimation';

interface GateOverlayProps {
  appState: 'locked' | 'animating' | 'open';
  nameChars: string[];
  nameVisible: boolean;
  nameHovered: boolean;
  cursorPos: { x: number; y: number };
  setCursorHovered: (hovered: boolean) => void;
  setAppState: (state: 'locked' | 'animating' | 'open') => void;
}

const GateOverlay: React.FC<GateOverlayProps> = ({
  appState,
  nameChars,
  nameVisible,
  nameHovered,
  cursorPos,
  setCursorHovered,
  setAppState,
}) => {
  const { gatePhase, keyHovered, handleUnlock, handleKeyMouseEnter, handleKeyMouseLeave } = useGateAnimation(appState, setAppState);

  return (
    <>
      {gatePhase !== 'done' && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'hsl(var(--surface))',
          pointerEvents: appState === 'locked' ? 'auto' : 'none',
        }}>

          <div
            style={{
              display: 'flex', gap: 2, cursor: 'none',
              opacity: gatePhase === 'idle' ? 1 : 0,
              transition: 'opacity 0.25s ease',
              pointerEvents: gatePhase === 'idle' ? 'auto' : 'none',
            }}
            onMouseEnter={() => { handleKeyMouseEnter(); setCursorHovered(true); }}
            onMouseLeave={() => { handleKeyMouseLeave(); setCursorHovered(false); }}
            onClick={() => {
              setCursorHovered(false)
              handleUnlock()
            }}
          >
            {nameChars.map((char, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
                  fontWeight: 700,
                  color: 'hsl(var(--void))',
                  letterSpacing: '0.05em',
                  textTransform: 'lowercase',
                  display: 'inline-block',
                  opacity: nameVisible ? 1 : 0,
                  transform: nameVisible
                    ? (nameHovered ? 'translateY(-4px)' : 'translateY(0)')
                    : 'translateY(20px)',
                  transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + i * 0.06}s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${nameHovered ? i * 0.03 : 0.6 + i * 0.06}s`,
                }}
              >
                {char}
              </span>
            ))}
          </div>


          <div
            style={{ cursor: 'none' }}
            onClick={() => {
              setCursorHovered(false)
              handleUnlock()
            }}
            onMouseEnter={() => { handleKeyMouseEnter(); setCursorHovered(true); }}
            onMouseLeave={() => { handleKeyMouseLeave(); setCursorHovered(false); }}
          >
            <div
              style={{
                width: gatePhase !== 'idle' ? '100vw' : (keyHovered ? 160 : 140),
                height: (gatePhase === 'expand-h' || gatePhase === 'slide-up') ? '110vh' : 16,
                backgroundColor: 'hsl(var(--void))',
                position: 'fixed',
                top: 'auto',
                left: 'auto',
                transform: gatePhase === 'slide-up' ? 'translate(-50%, -50%) translateY(-110vh)' : 'translate(-50%, -50%)',
                transformOrigin: gatePhase !== 'idle' ? 'center center' : 'center',
                transition: gatePhase === 'expand-w'
                  ? 'width 0.4s cubic-bezier(0.65, 0, 0.35, 1), height 0.1s ease, transform 0.01s ease'
                  : gatePhase === 'expand-h'
                  ? 'height 0.5s cubic-bezier(0.65, 0, 0.35, 1)'
                  : gatePhase === 'slide-up'
                  ? 'transform 0.7s cubic-bezier(0.85, 0, 0.15, 1)'
                  : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: gatePhase !== 'idle' ? 1002 : 'auto',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GateOverlay;
