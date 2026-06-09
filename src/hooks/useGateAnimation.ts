import { useState, useCallback } from 'react';

export type GatePhase = 'idle' | 'expand-w' | 'expand-h' | 'slide-up' | 'done';

export interface UseGateAnimationReturn {
  gatePhase: GatePhase;
  keyHovered: boolean;
  handleUnlock: () => void;
  handleKeyMouseEnter: () => void;
  handleKeyMouseLeave: () => void;
}

export const useGateAnimation = (
  appState: 'locked' | 'animating' | 'open',
  setAppState: (state: 'locked' | 'animating' | 'open') => void
): UseGateAnimationReturn => {
  const [gatePhase, setGatePhase] = useState<GatePhase>(() => {
    if (appState === 'open') return 'done';
    return 'idle';
  });
  const [keyHovered, setKeyHovered] = useState(false);

  const handleUnlock = useCallback(() => {
    setKeyHovered(false)
    if (appState !== 'locked') return;
    setAppState('animating');
    setGatePhase('expand-w');
    setTimeout(() => setGatePhase('expand-h'), 400);
    setTimeout(() => setGatePhase('slide-up'), 900);
    setTimeout(() => {
      setGatePhase('done');
      setAppState('open');
      sessionStorage.setItem('entered', 'true');
    }, 1600);
  }, [appState, setAppState]);

  const handleKeyMouseEnter = useCallback(() => {
    setKeyHovered(true);
  }, []);

  const handleKeyMouseLeave = useCallback(() => {
    setKeyHovered(false);
  }, []);

  return {
    gatePhase,
    keyHovered,
    handleUnlock,
    handleKeyMouseEnter,
    handleKeyMouseLeave,
  };
};
