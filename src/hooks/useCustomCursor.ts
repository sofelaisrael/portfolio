import { useState, useEffect, useRef } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const useCustomCursor = () => {
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const render = () => {
      cursorRef.current.x += (mouseRef.current.x - cursorRef.current.x) * 0.2;
      cursorRef.current.y += (mouseRef.current.y - cursorRef.current.y) * 0.2;
      setCursorPos({ x: cursorRef.current.x, y: cursorRef.current.y });
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return {
    cursorHovered,
    setCursorHovered,
    cursorPos,
  };
};
