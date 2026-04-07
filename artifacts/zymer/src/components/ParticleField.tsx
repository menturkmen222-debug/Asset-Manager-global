import { useEffect, useRef } from 'react';

interface Asteroid {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  rotSpeed: number;
  vertices: { x: number; y: number }[];
  craters: { cx: number; cy: number; r: number }[];
  shade: number;
  highlighted: boolean;
}

interface Dust {
  x: number; y: number; z: number;
  size: number; alpha: number;
}

const DEPTH = 1800;
const NUM_ASTEROIDS = 55;
const NUM_DUST = 320;
const BASE_SPEED = 1.05;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function makeVertices(r: number, count: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const jitter = randomBetween(0.55, 1.0);
    pts.push({ x: Math.cos(angle) * r * jitter, y: Math.sin(angle) * r * jitter });
  }
  return pts;
}

function makeCraters(r: number): { cx: number; cy: number; r: number }[] {
  const count = Math.floor(randomBetween(2, 6));
  const craters: { cx: number; cy: number; r: number }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = randomBetween(0.1, 0.6) * r;
    craters.push({
      cx: Math.cos(angle) * dist,
      cy: Math.sin(angle) * dist,
      r: randomBetween(0.06, 0.22) * r,
    });
  }
  return craters;
}

function spawnAsteroid(w: number, h: number, z?: number): Asteroid {
  const r = randomBetween(14, 82);
  const fromEdge = Math.random() < 0.3;
  let x: number, y: number;
  if (fromEdge) {
    const side = Math.floor(Math.random() * 4);
    x = side === 0 ? randomBetween(-w, 0) : side === 1 ? randomBetween(w, w * 2) : randomBetween(-w * 0.5, w * 1.5);
    y = side === 2 ? randomBetween(-h, 0) : side === 3 ? randomBetween(h, h * 2) : randomBetween(-h * 0.5, h * 1.5);
  } else {
    x = (Math.random() - 0.5) * w * 3.5;
    y = (Math.random() - 0.5) * h * 3.5;
  }
  const shade = Math.floor(randomBetween(28, 78));
  return {
    x, y,
    z: z ?? randomBetween(80, DEPTH),
    vx: randomBetween(-0.25, 0.25),
    vy: randomBetween(-0.08, 0.08),
    radius: r,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: randomBetween(-0.004, 0.004),
    vertices: makeVertices(r, Math.floor(randomBetween(9, 16))),
    craters: makeCraters(r),
    shade,
    highlighted: Math.random() < 0.18,
  };
}

function spawnDust(w: number, h: number): Dust {
  return {
    x: (Math.random() - 0.5) * w * 4,
    y: (Math.random() - 0.5) * h * 4,
    z: randomBetween(10, DEPTH),
    size: randomBetween(0.4, 2.2),
    alpha: randomBetween(0.15, 0.55),
  };
}

function drawAsteroid(
  ctx: CanvasRenderingContext2D,
  ast: Asteroid,
  sx: number,
  sy: number,
  scale: number,
  alpha: number,
) {
  const r = ast.radius * scale;
  if (r < 1.2) return;

  ctx.save();
  ctx.translate(sx, sy);
  ctx.rotate(ast.rotation);
  ctx.globalAlpha = Math.min(1, alpha);

  const base = ast.shade;
  const highlight = Math.min(255, base + 38);
  const shadow = Math.max(0, base - 18);

  const grad = ctx.createRadialGradient(-r * 0.28, -r * 0.28, r * 0.05, 0, 0, r * 1.1);
  grad.addColorStop(0, `rgb(${highlight},${highlight},${Math.max(0, highlight - 10)})`);
  grad.addColorStop(0.45, `rgb(${base},${base},${Math.max(0, base - 8)})`);
  grad.addColorStop(1, `rgb(${shadow},${shadow},${Math.max(0, shadow - 6)})`);

  ctx.beginPath();
  const verts = ast.vertices;
  ctx.moveTo(verts[0].x * scale, verts[0].y * scale);
  for (let i = 1; i < verts.length; i++) {
    ctx.lineTo(verts[i].x * scale, verts[i].y * scale);
  }
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  if (ast.highlighted && r > 5) {
    ctx.strokeStyle = `rgba(180,180,200,${alpha * 0.22})`;
    ctx.lineWidth = Math.max(0.4, r * 0.045);
    ctx.stroke();
  }

  if (r > 5) {
    for (const cr of ast.craters) {
      const cx = cr.cx * scale;
      const cy = cr.cy * scale;
      const cr2 = cr.r * scale;
      if (cr2 < 0.8) continue;
      const cg = ctx.createRadialGradient(cx - cr2 * 0.3, cy - cr2 * 0.3, 0, cx, cy, cr2);
      cg.addColorStop(0, `rgba(${shadow - 10},${shadow - 10},${shadow - 14},${alpha * 0.55})`);
      cg.addColorStop(0.7, `rgba(${shadow},${shadow},${shadow},${alpha * 0.3})`);
      cg.addColorStop(1, `rgba(${base + 20},${base + 20},${base + 20},0)`);
      ctx.beginPath();
      ctx.arc(cx, cy, cr2, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();
    }
  }

  if (r > 8) {
    const rimGrad = ctx.createRadialGradient(0, 0, r * 0.7, 0, 0, r * 1.05);
    rimGrad.addColorStop(0, 'rgba(0,0,0,0)');
    rimGrad.addColorStop(1, `rgba(0,0,0,${alpha * 0.45})`);
    ctx.beginPath();
    const verts2 = ast.vertices;
    ctx.moveTo(verts2[0].x * scale, verts2[0].y * scale);
    for (let i = 1; i < verts2.length; i++) ctx.lineTo(verts2[i].x * scale, verts2[i].y * scale);
    ctx.closePath();
    ctx.fillStyle = rimGrad;
    ctx.fill();
  }

  ctx.restore();
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let asteroids: Asteroid[] = [];
    let dust: Dust[] = [];
    let w = 0, h = 0;

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    }

    function init() {
      resize();
      asteroids = Array.from({ length: NUM_ASTEROIDS }, () => spawnAsteroid(w, h));
      dust = Array.from({ length: NUM_DUST }, () => spawnDust(w, h));
    }

    function projectObj(x: number, y: number, z: number) {
      const fov = DEPTH * 0.58;
      const sx = (x / z) * fov + w / 2;
      const sy = (y / z) * fov + h / 2;
      const scale = fov / z;
      return { sx, sy, scale };
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      const sortedAst = [...asteroids].sort((a, b) => b.z - a.z);

      for (const d of dust) {
        d.z -= BASE_SPEED * 0.6;
        if (d.z <= 2) { Object.assign(d, spawnDust(w, h)); d.z = DEPTH; continue; }
        const { sx, sy, scale } = projectObj(d.x, d.y, d.z);
        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) {
          Object.assign(d, spawnDust(w, h)); d.z = DEPTH; continue;
        }
        const alpha = d.alpha * (1 - d.z / DEPTH) * 0.8;
        const r = d.size * scale * 18;
        if (r < 0.3) continue;
        ctx!.beginPath();
        ctx!.arc(sx, sy, Math.max(0.3, r), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(160,160,180,${alpha.toFixed(3)})`;
        ctx!.fill();
      }

      for (const ast of sortedAst) {
        ast.z -= BASE_SPEED;
        ast.rotation += ast.rotSpeed;
        ast.x += ast.vx;
        ast.y += ast.vy;

        if (ast.z <= 2) {
          Object.assign(ast, spawnAsteroid(w, h, DEPTH));
          continue;
        }

        const { sx, sy, scale } = projectObj(ast.x, ast.y, ast.z);
        const screenR = ast.radius * scale;

        if (sx < -screenR * 3 || sx > w + screenR * 3 || sy < -screenR * 3 || sy > h + screenR * 3) {
          Object.assign(ast, spawnAsteroid(w, h, DEPTH));
          continue;
        }

        const depth = 1 - ast.z / DEPTH;
        const alpha = Math.pow(depth, 0.6) * 0.96 + 0.04;

        if (screenR > 5 && depth > 0.15) {
          const glowR = screenR * 1.9;
          const glow = ctx!.createRadialGradient(sx, sy, screenR * 0.5, sx, sy, glowR);
          glow.addColorStop(0, `rgba(90,85,100,${(alpha * 0.12).toFixed(3)})`);
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx!.beginPath();
          ctx!.arc(sx, sy, glowR, 0, Math.PI * 2);
          ctx!.fillStyle = glow;
          ctx!.fill();
        }

        drawAsteroid(ctx!, ast, sx, sy, scale, alpha);
      }

      for (let i = 0; i < asteroids.length; i++) {
        if ((asteroids[i] as Asteroid).z <= 2) {
          asteroids[i] = spawnAsteroid(w, h, DEPTH);
        }
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const onResize = () => {
      resize();
      asteroids = Array.from({ length: NUM_ASTEROIDS }, () => spawnAsteroid(w, h));
      dust = Array.from({ length: NUM_DUST }, () => spawnDust(w, h));
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
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 55% at 50% 0%, rgba(80,60,140,0.22) 0%, transparent 65%),' +
            'radial-gradient(ellipse 70% 45% at 85% 95%, rgba(0,140,180,0.13) 0%, transparent 55%),' +
            'radial-gradient(ellipse 60% 50% at 10% 80%, rgba(50,30,100,0.16) 0%, transparent 60%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 35% at 25% 20%, rgba(0,180,220,0.055) 0%, transparent 70%),' +
            'radial-gradient(ellipse 55% 40% at 72% 65%, rgba(108,99,255,0.065) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.016]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
}
