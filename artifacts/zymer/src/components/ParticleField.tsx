import { useEffect, useRef } from 'react';

interface Asteroid {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  radius: number;
  elongX: number;
  elongY: number;
  rotation: number;
  rotSpeed: number;
  vertices: { x: number; y: number }[];
  craters: { cx: number; cy: number; r: number }[];
  shade: number;
  lightAngle: number;
}

const DEPTH = 1800;
const NUM_ASTEROIDS = 48;
const BASE_SPEED = 1.05;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

/* ─── Organic rock outline using sinusoidal bumps ─── */
function makeVertices(
  r: number,
  count: number,
  elongX: number,
  elongY: number,
): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];

  // unique phase offsets so every rock looks different
  const p1 = Math.random() * Math.PI * 2;
  const p2 = Math.random() * Math.PI * 2;
  const p3 = Math.random() * Math.PI * 2;
  const p4 = Math.random() * Math.PI * 2;

  for (let i = 0; i < count; i++) {
    const t = i / count;
    const angle = t * Math.PI * 2;

    // layered sinusoidal bumps — coarse + fine detail
    const b1 = Math.sin(t * Math.PI * 2 * 2 + p1) * 0.13;
    const b2 = Math.sin(t * Math.PI * 2 * 4 + p2) * 0.08;
    const b3 = Math.sin(t * Math.PI * 2 * 7 + p3) * 0.045;
    const b4 = Math.sin(t * Math.PI * 2 * 13 + p4) * 0.022;
    const noise = (Math.random() - 0.5) * 0.04;

    const rad = r * (0.82 + b1 + b2 + b3 + b4 + noise);
    pts.push({
      x: Math.cos(angle) * rad * elongX,
      y: Math.sin(angle) * rad * elongY,
    });
  }
  return pts;
}

function makeCraters(r: number): { cx: number; cy: number; r: number }[] {
  const count = Math.floor(randomBetween(2, 7));
  const craters: { cx: number; cy: number; r: number }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = randomBetween(0.05, 0.52) * r;
    craters.push({
      cx: Math.cos(angle) * dist,
      cy: Math.sin(angle) * dist,
      r: randomBetween(0.07, 0.20) * r,
    });
  }
  return craters;
}

function spawnAsteroid(w: number, h: number, z?: number): Asteroid {
  const r = randomBetween(16, 88);
  const elongX = randomBetween(0.62, 1.0);
  const elongY = randomBetween(0.55, 0.92);
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
  return {
    x, y,
    z: z ?? randomBetween(80, DEPTH),
    vx: randomBetween(-0.25, 0.25),
    vy: randomBetween(-0.06, 0.06),
    radius: r,
    elongX,
    elongY,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: randomBetween(-0.003, 0.003),
    vertices: makeVertices(r, 28, elongX, elongY),
    craters: makeCraters(r),
    shade: Math.floor(randomBetween(32, 82)),
    lightAngle: randomBetween(-Math.PI * 0.6, -Math.PI * 0.1),
  };
}

/* ─── Draw path via quadratic bezier through midpoints ─── */
function tracePath(
  ctx: CanvasRenderingContext2D,
  verts: { x: number; y: number }[],
  scale: number,
) {
  const n = verts.length;
  const sx = (verts[n - 1].x + verts[0].x) / 2 * scale;
  const sy = (verts[n - 1].y + verts[0].y) / 2 * scale;
  ctx.moveTo(sx, sy);
  for (let i = 0; i < n; i++) {
    const v = verts[i];
    const nv = verts[(i + 1) % n];
    ctx.quadraticCurveTo(
      v.x * scale, v.y * scale,
      (v.x + nv.x) / 2 * scale, (v.y + nv.y) / 2 * scale,
    );
  }
  ctx.closePath();
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
  if (r < 1.5) return;

  ctx.save();
  ctx.translate(sx, sy);
  ctx.rotate(ast.rotation);
  ctx.globalAlpha = Math.min(1, alpha);

  const b = ast.shade;
  const lx = Math.cos(ast.lightAngle) * r * 0.38;
  const ly = Math.sin(ast.lightAngle) * r * 0.38;

  /* ── 1. Base rock body ── */
  const bodyGrad = ctx.createRadialGradient(lx, ly, 0, lx * 0.2, ly * 0.2, r * 1.35);
  bodyGrad.addColorStop(0,    `rgb(${Math.min(255,b+62)},${Math.min(255,b+55)},${Math.min(255,b+44)})`);
  bodyGrad.addColorStop(0.25, `rgb(${Math.min(255,b+28)},${Math.min(255,b+22)},${Math.min(255,b+14)})`);
  bodyGrad.addColorStop(0.55, `rgb(${b},${Math.max(0,b-6)},${Math.max(0,b-12)})`);
  bodyGrad.addColorStop(0.82, `rgb(${Math.max(0,b-20)},${Math.max(0,b-24)},${Math.max(0,b-28)})`);
  bodyGrad.addColorStop(1,    `rgb(${Math.max(0,b-32)},${Math.max(0,b-36)},${Math.max(0,b-40)})`);

  ctx.beginPath();
  tracePath(ctx, ast.vertices, scale);
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  /* ── 2. Rim shadow (ambient occlusion) ── */
  if (r > 4) {
    const rimGrad = ctx.createRadialGradient(lx * 0.25, ly * 0.25, r * 0.42, 0, 0, r * 1.18);
    rimGrad.addColorStop(0,   'rgba(0,0,0,0)');
    rimGrad.addColorStop(0.6, 'rgba(0,0,0,0)');
    rimGrad.addColorStop(1,   `rgba(0,0,0,${0.72 * alpha})`);
    ctx.beginPath();
    tracePath(ctx, ast.vertices, scale);
    ctx.fillStyle = rimGrad;
    ctx.fill();
  }

  /* ── 3. Craters ── */
  if (r > 7) {
    for (const cr of ast.craters) {
      const cx = cr.cx * scale;
      const cy = cr.cy * scale;
      const cr2 = cr.r * scale;
      if (cr2 < 1.2) continue;
      // skip craters too close to edge
      if (Math.sqrt(cx * cx + cy * cy) + cr2 > r * 0.88) continue;

      // dark bowl
      const bowl = ctx.createRadialGradient(
        cx - cr2 * 0.28, cy - cr2 * 0.28, 0,
        cx, cy, cr2 * 1.05,
      );
      bowl.addColorStop(0,    `rgba(${Math.max(0,b-38)},${Math.max(0,b-40)},${Math.max(0,b-44)},${alpha * 0.9})`);
      bowl.addColorStop(0.55, `rgba(${Math.max(0,b-22)},${Math.max(0,b-24)},${Math.max(0,b-28)},${alpha * 0.6})`);
      bowl.addColorStop(0.82, `rgba(${Math.min(255,b+22)},${Math.min(255,b+18)},${Math.min(255,b+12)},${alpha * 0.18})`);
      bowl.addColorStop(1,    'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, cr2 * 1.05, 0, Math.PI * 2);
      ctx.fillStyle = bowl;
      ctx.fill();
    }
  }

  /* ── 4. Specular sheen on lit side ── */
  if (r > 10) {
    const sheenX = lx * 0.55;
    const sheenY = ly * 0.55;
    const sheen = ctx.createRadialGradient(sheenX, sheenY, 0, sheenX, sheenY, r * 0.45);
    sheen.addColorStop(0,   `rgba(255,252,240,${alpha * 0.10})`);
    sheen.addColorStop(0.5, `rgba(255,252,240,${alpha * 0.04})`);
    sheen.addColorStop(1,   'rgba(255,252,240,0)');
    ctx.beginPath();
    tracePath(ctx, ast.vertices, scale);
    ctx.fillStyle = sheen;
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
    let w = 0, h = 0;

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
    }

    function init() {
      resize();
      asteroids = Array.from({ length: NUM_ASTEROIDS }, () => spawnAsteroid(w, h));
    }

    function projectObj(x: number, y: number, z: number) {
      const fov = DEPTH * 0.58;
      return {
        sx: (x / z) * fov + w / 2,
        sy: (y / z) * fov + h / 2,
        scale: fov / z,
      };
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      const sorted = [...asteroids].sort((a, b) => b.z - a.z);

      for (const ast of sorted) {
        ast.z -= BASE_SPEED;
        ast.rotation += ast.rotSpeed;
        ast.x += ast.vx;
        ast.y += ast.vy;

        if (ast.z <= 2) { Object.assign(ast, spawnAsteroid(w, h, DEPTH)); continue; }

        const { sx, sy, scale } = projectObj(ast.x, ast.y, ast.z);
        const screenR = ast.radius * scale;

        if (sx < -screenR * 3 || sx > w + screenR * 3 || sy < -screenR * 3 || sy > h + screenR * 3) {
          Object.assign(ast, spawnAsteroid(w, h, DEPTH)); continue;
        }

        const depth = 1 - ast.z / DEPTH;
        const alpha = Math.pow(depth, 0.55) * 0.94 + 0.04;

        // subtle halo to suggest space dust around larger rocks
        if (screenR > 8 && depth > 0.18) {
          const haloR = screenR * 2.1;
          const halo = ctx!.createRadialGradient(sx, sy, screenR * 0.6, sx, sy, haloR);
          halo.addColorStop(0, `rgba(70,65,90,${(alpha * 0.09).toFixed(3)})`);
          halo.addColorStop(1, 'rgba(0,0,0,0)');
          ctx!.beginPath();
          ctx!.arc(sx, sy, haloR, 0, Math.PI * 2);
          ctx!.fillStyle = halo;
          ctx!.fill();
        }

        drawAsteroid(ctx!, ast, sx, sy, scale, alpha);
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const onResize = () => {
      resize();
      asteroids = Array.from({ length: NUM_ASTEROIDS }, () => spawnAsteroid(w, h));
    };

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

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
