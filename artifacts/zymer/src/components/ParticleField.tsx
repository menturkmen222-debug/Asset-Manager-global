import { useEffect, useRef } from 'react';

const NUM_STARS = 900;
const SPEED = 2.2;
const DEPTH = 1200;

interface Star {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  size: number;
  color: string;
}

const STAR_COLORS = [
  'rgba(255,255,255,ALPHA)',
  'rgba(200,220,255,ALPHA)',
  'rgba(180,200,255,ALPHA)',
  'rgba(255,240,220,ALPHA)',
  'rgba(160,200,255,ALPHA)',
  'rgba(108,99,255,ALPHA)',
  'rgba(0,196,240,ALPHA)',
];

function createStar(w: number, h: number): Star {
  const z = Math.random() * DEPTH;
  return {
    x: (Math.random() - 0.5) * w * 2.5,
    y: (Math.random() - 0.5) * h * 2.5,
    z,
    px: 0,
    py: 0,
    size: Math.random() * 1.8 + 0.3,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
  };
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let stars: Star[] = [];
    let w = 0, h = 0;

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    }

    function init() {
      resize();
      stars = Array.from({ length: NUM_STARS }, () => createStar(w, h));
    }

    function project(star: Star): { sx: number; sy: number; sr: number } {
      const fov = DEPTH * 0.65;
      const sx = (star.x / star.z) * fov + w / 2;
      const sy = (star.y / star.z) * fov + h / 2;
      const sr = ((1 - star.z / DEPTH) * star.size * 2.8) + 0.15;
      return { sx, sy, sr };
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      ctx!.fillStyle = '#00000000';
      ctx!.fillRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        const prev = project(star);
        star.px = prev.sx;
        star.py = prev.sy;

        star.z -= SPEED;
        if (star.z <= 1) {
          stars[i] = createStar(w, h);
          stars[i].z = DEPTH;
          continue;
        }

        const { sx, sy, sr } = project(star);

        if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) {
          stars[i] = createStar(w, h);
          stars[i].z = DEPTH;
          continue;
        }

        const alpha = Math.pow(1 - star.z / DEPTH, 1.1) * 0.92 + 0.08;
        const colorWithAlpha = star.color.replace('ALPHA', alpha.toFixed(3));

        const tailLength = Math.max(0.5, (1 - star.z / DEPTH) * 14);
        const dx = sx - star.px;
        const dy = sy - star.py;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0.5 && sr > 0.5) {
          const grad = ctx!.createLinearGradient(star.px, star.py, sx, sy);
          grad.addColorStop(0, star.color.replace('ALPHA', '0'));
          grad.addColorStop(1, colorWithAlpha);
          ctx!.strokeStyle = grad;
          ctx!.lineWidth = sr * 0.85;
          ctx!.beginPath();
          ctx!.moveTo(star.px, star.py);
          ctx!.lineTo(sx, sy);
          ctx!.stroke();
        }

        if (sr > 0.4) {
          const glow = ctx!.createRadialGradient(sx, sy, 0, sx, sy, sr * 3.5);
          glow.addColorStop(0, colorWithAlpha);
          glow.addColorStop(0.4, star.color.replace('ALPHA', (alpha * 0.35).toFixed(3)));
          glow.addColorStop(1, star.color.replace('ALPHA', '0'));
          ctx!.fillStyle = glow;
          ctx!.beginPath();
          ctx!.arc(sx, sy, sr * 3.5, 0, Math.PI * 2);
          ctx!.fill();
        }

        ctx!.fillStyle = colorWithAlpha;
        ctx!.beginPath();
        ctx!.arc(sx, sy, Math.max(0.3, sr), 0, Math.PI * 2);
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const onResize = () => {
      resize();
      stars = Array.from({ length: NUM_STARS }, () => createStar(w, h));
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 1 }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 120% 60% at 50% 0%, rgba(108,99,255,0.18) 0%, transparent 60%), ' +
            'radial-gradient(ellipse 70% 50% at 80% 100%, rgba(0,196,240,0.12) 0%, transparent 55%), ' +
            'radial-gradient(ellipse 80% 70% at 20% 60%, rgba(60,40,120,0.15) 0%, transparent 60%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 30% 25%, rgba(0,196,240,0.06) 0%, transparent 70%), ' +
            'radial-gradient(ellipse 60% 50% at 70% 70%, rgba(108,99,255,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
        }}
      />
    </div>
  );
}
