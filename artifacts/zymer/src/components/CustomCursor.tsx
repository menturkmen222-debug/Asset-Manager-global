import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = !!(
        el.closest('button') ||
        el.closest('a') ||
        el.closest('[role="button"]') ||
        el.closest('input') ||
        el.closest('textarea') ||
        el.dataset.cursor === 'pointer'
      );
      setIsHovering(isInteractive);
    };

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.left = mouseX + 'px';
        dotRef.current.style.top = mouseY + 'px';
      }
      ringX += (mouseX - ringX) * 0.11;
      ringY += (mouseY - ringY) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = ringX + 'px';
        ringRef.current.style.top = ringY + 'px';
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousemove', checkHover);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot — follows instantly */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          top: 0, left: 0,
          transform: 'translate(-50%, -50%)',
          transition: isHovering
            ? 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease, background 0.2s ease'
            : 'opacity 0.3s ease',
          width: isHovering ? '10px' : isClicking ? '5px' : '6px',
          height: isHovering ? '10px' : isClicking ? '5px' : '6px',
          borderRadius: '50%',
          background: isHovering ? 'rgba(108,99,255,1)' : 'rgba(255,255,255,0.9)',
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovering ? '0 0 12px rgba(108,99,255,0.8)' : '0 0 6px rgba(255,255,255,0.4)',
        }}
      />
      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          top: 0, left: 0,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, opacity 0.3s ease',
          width: isHovering ? '42px' : isClicking ? '24px' : '32px',
          height: isHovering ? '42px' : isClicking ? '24px' : '32px',
          borderRadius: '50%',
          border: isHovering ? '1.5px solid rgba(108,99,255,0.7)' : '1px solid rgba(255,255,255,0.25)',
          opacity: isVisible ? 1 : 0,
          background: isHovering ? 'rgba(108,99,255,0.06)' : 'transparent',
        }}
      />
    </>
  );
}
