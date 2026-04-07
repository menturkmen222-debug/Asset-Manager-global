import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  colorR: number;
  colorG: number;
  colorB: number;
  pulse: number;
  pulseSpeed: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colorPalette = [
      [108, 99, 255],
      [0, 196, 240],
      [124, 116, 255],
      [160, 158, 255],
      [80, 60, 220],
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const count = Math.min(70, Math.floor(window.innerWidth / 18));
    particlesRef.current = Array.from({ length: count }, () => {
      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        size: Math.random() * 2.2 + 0.5,
        opacity: Math.random() * 0.55 + 0.12,
        colorR: c[0],
        colorG: c[1],
        colorB: c[2],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.018 + 0.006,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const pulsedOpacity = p.opacity * (0.55 + 0.45 * Math.sin(p.pulse));
        const pulsedSize = p.size * (0.85 + 0.15 * Math.sin(p.pulse * 1.3));

        ctx.beginPath();
        ctx.arc(p.x, p.y, pulsedSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.colorR},${p.colorG},${p.colorB},${pulsedOpacity})`;
        ctx.fill();

        for (let j = i + 1; j < len; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.09;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(108,99,255,${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Animated gradient orbs for dramatic 3D-like depth */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Large violet orb — top right, drifting */}
        <div
          className="absolute rounded-full animate-aurora"
          style={{
            width: '800px',
            height: '800px',
            top: '-200px',
            right: '-200px',
            background: 'radial-gradient(circle, rgba(108,99,255,0.18) 0%, rgba(108,99,255,0.06) 50%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Cyan orb — bottom left */}
        <div
          className="absolute rounded-full animate-aurora"
          style={{
            width: '700px',
            height: '700px',
            bottom: '-150px',
            left: '-150px',
            background: 'radial-gradient(circle, rgba(0,196,240,0.14) 0%, rgba(0,196,240,0.05) 50%, transparent 70%)',
            filter: 'blur(70px)',
            animationDelay: '-8s',
          }}
        />
        {/* Small violet orb — center left */}
        <div
          className="absolute rounded-full animate-float-slow"
          style={{
            width: '400px',
            height: '400px',
            top: '30%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(124,116,255,0.1) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        {/* Tiny cyan accent — top center */}
        <div
          className="absolute rounded-full animate-float"
          style={{
            width: '300px',
            height: '300px',
            top: '15%',
            left: '40%',
            background: 'radial-gradient(circle, rgba(0,196,240,0.09) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animationDelay: '-4s',
          }}
        />
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.75 }}
      />
    </>
  );
}
