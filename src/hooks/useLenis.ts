import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });


    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);


    return () => {
      lenisRef.current?.destroy();
    };
  }, []);


  const scrollTo = (target: string | HTMLElement, options?: { offset?: number }) => {
    if (!lenisRef.current) return;

    let element: HTMLElement | null = null;
    
    if (typeof target === 'string') {
      element = document.querySelector(target);
    } else {
      element = target;
    }

    if (element) {
      lenisRef.current.scrollTo(element, {
        offset: options?.offset || 0,
      });
    }
  };


  const scrollToTop = () => {
    if (!lenisRef.current) return;
    
    lenisRef.current.scrollTo(0);
  };

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
  };
};
