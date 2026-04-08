import { useRef, useMemo, Component, type ReactNode, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────────────────────────────────────
   Detect WebGL support before attempting
   canvas creation (avoids dev overlay noise
   and silent failures on headless/old devices)
───────────────────────────────────────── */
function detectWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/* ─────────────────────────────────────────
   Error boundary – silently falls back if
   WebGL is unavailable (old device / iOS)
───────────────────────────────────────── */
class WebGLErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

/* ─────────────────────────────────────────
   Seeded LCG random – deterministic shapes
───────────────────────────────────────── */
function makeLcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

/* ─────────────────────────────────────────
   3-D smooth value noise (no deps)
───────────────────────────────────────── */
function hash3(x: number, y: number, z: number): number {
  let h = Math.imul(x | 0, 1610612741) ^ Math.imul(y | 0, 805306457) ^ Math.imul(z | 0, 402653189);
  h ^= h >>> 16; h = Math.imul(h, 0x45d9f3b); h ^= h >>> 16;
  return ((h >>> 0) / 0x100000000) * 2 - 1;
}
function smoothNoise(x: number, y: number, z: number, freq: number): number {
  const fx = x * freq, fy = y * freq, fz = z * freq;
  const ix = Math.floor(fx), iy = Math.floor(fy), iz = Math.floor(fz);
  const u = fx - ix, v = fy - iy, w = fz - iz;
  const s = (t: number) => t * t * (3 - 2 * t);
  const [su, sv, sw] = [s(u), s(v), s(w)];
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const c000 = hash3(ix,   iy,   iz  ); const c100 = hash3(ix+1, iy,   iz  );
  const c010 = hash3(ix,   iy+1, iz  ); const c110 = hash3(ix+1, iy+1, iz  );
  const c001 = hash3(ix,   iy,   iz+1); const c101 = hash3(ix+1, iy,   iz+1);
  const c011 = hash3(ix,   iy+1, iz+1); const c111 = hash3(ix+1, iy+1, iz+1);
  return lerp(
    lerp(lerp(c000, c100, su), lerp(c010, c110, su), sv),
    lerp(lerp(c001, c101, su), lerp(c011, c111, su), sv),
    sw,
  );
}

/* ─────────────────────────────────────────
   Procedural rock geometry
   Each asteroid is uniquely shaped:
   – random elongation ratios
   – 3 octaves of displacement noise
   – craters / gouges via negative noise
───────────────────────────────────────── */
function buildRockGeometry(seed: number): THREE.BufferGeometry {
  const rng = makeLcg(seed);

  const sy = 0.42 + rng() * 0.56;
  const sz = 0.38 + rng() * 0.56;
  const ox = rng() * 53.7;
  const oy = rng() * 37.3;
  const oz = rng() * 21.9;

  const geo = new THREE.IcosahedronGeometry(1, 4);
  const pos = geo.attributes.position as THREE.BufferAttribute;

  for (let i = 0; i < pos.count; i++) {
    const nx = pos.getX(i);
    const ny = pos.getY(i);
    const nz = pos.getZ(i);

    let x = nx,  y = ny * sy,  z = nz * sz;

    const n1 = smoothNoise(nx + ox, ny + oy, nz + oz, 1.3);   // large bumps
    const n2 = smoothNoise(nx + ox, ny + oy, nz + oz, 3.2) * 0.30; // medium
    const n3 = smoothNoise(nx + ox, ny + oy, nz + oz, 7.5) * 0.10; // fine detail
    const n4 = smoothNoise(nx + ox, ny + oy, nz + oz, 14)  * 0.04; // micro

    // subtle craters: a sharp negative dent where noise is especially low
    const crater = n1 < -0.38 ? (n1 + 0.38) * 0.55 : 0;

    const disp = 0.70 + n1 * 0.46 + n2 + n3 + n4 + crater;

    const len = Math.sqrt(x*x + y*y + z*z) || 1;
    x = (x / len) * disp;
    y = (y / len) * disp * sy;
    z = (z / len) * disp * sz;

    pos.setXYZ(i, x, y, z);
  }
  geo.computeVertexNormals();
  return geo;
}

/* ─────────────────────────────────────────
   Flight configs – 5 asteroids, each on a
   unique trajectory across the scene.
   Camera is at z = 16 looking at origin.
   World bounds: x ∈ [-24, 24], y ∈ [-15, 15]
───────────────────────────────────────── */
interface FlightConfig {
  initPos:  [number, number, number];
  vel:      [number, number, number];   // units/frame (60 fps)
  rotSpd:   [number, number, number];
  scale:    number;
  seed:     number;
  color:    string;
  emissive: string;
}

const FLIGHT_CONFIGS: FlightConfig[] = [
  {
    // Large drifter – left → right, very slow, deep
    initPos:  [-24,  2.5, -10],
    vel:      [ 0.008, -0.001, 0.0],
    rotSpd:   [ 0.0006, 0.0011, 0.0004],
    scale:    3.8,
    seed:     8001,
    color:    '#1a1828',
    emissive: '#1a0f30',
  },
  {
    // Fast small rock – right → left, slight rise
    initPos:  [ 24, -1.2, -3.5],
    vel:      [-0.016,  0.002, 0.0],
    rotSpd:   [ 0.0014, 0.0009, 0.0012],
    scale:    1.4,
    seed:     8002,
    color:    '#201e2c',
    emissive: '#0a1520',
  },
  {
    // Massive slow rock – top-left diagonal down-right, far
    initPos:  [-18,  13, -14],
    vel:      [ 0.006, -0.009,  0.0],
    rotSpd:   [ 0.0004, 0.0006, 0.0013],
    scale:    5.0,
    seed:     8003,
    color:    '#181620',
    emissive: '#100820',
  },
  {
    // Medium – bottom → top, slight rightward drift
    initPos:  [ 6, -14, -5.5],
    vel:      [-0.002,  0.010, 0.0],
    rotSpd:   [ 0.0011, 0.0005, 0.0010],
    scale:    2.2,
    seed:     8004,
    color:    '#1c1a26',
    emissive: '#08101a',
  },
  {
    // Approaching + drifting – starts far, comes closer, moves left
    initPos:  [ 19,  3.5, -17],
    vel:      [-0.007, -0.002,  0.008],
    rotSpd:   [ 0.0009, 0.0012, 0.0007],
    scale:    2.6,
    seed:     8005,
    color:    '#1e1c28',
    emissive: '#120830',
  },
];

/* ─────────────────────────────────────────
   Flying asteroid component
───────────────────────────────────────── */
function FlyingAsteroid({ cfg }: { cfg: FlightConfig }) {
  const meshRef   = useRef<THREE.Mesh>(null!);
  const posRef    = useRef(new THREE.Vector3(...cfg.initPos));
  const velRef    = useRef(new THREE.Vector3(...cfg.vel));
  const geometry  = useMemo(() => buildRockGeometry(cfg.seed), [cfg.seed]);
  const { viewport } = useThree();

  const halfW = viewport.width  / 2 + 8;   // generous off-screen buffer
  const halfH = viewport.height / 2 + 8;

  useFrame(() => {
    const m   = meshRef.current;
    const pos = posRef.current;
    const vel = velRef.current;

    // rotate as it tumbles through space
    m.rotation.x += cfg.rotSpd[0];
    m.rotation.y += cfg.rotSpd[1];
    m.rotation.z += cfg.rotSpd[2];

    // advance position
    pos.add(vel);
    m.position.copy(pos);

    // wrap: when asteroid exits viewport bounds, teleport to opposite edge
    if (vel.x > 0 && pos.x >  halfW + cfg.scale * 2) { pos.x = -halfW - cfg.scale * 2; pos.y = cfg.initPos[1] + (Math.random() - 0.5) * 4; }
    if (vel.x < 0 && pos.x < -halfW - cfg.scale * 2) { pos.x =  halfW + cfg.scale * 2; pos.y = cfg.initPos[1] + (Math.random() - 0.5) * 4; }
    if (vel.y > 0 && pos.y >  halfH + cfg.scale * 2) { pos.y = -halfH - cfg.scale * 2; pos.x = cfg.initPos[0] + (Math.random() - 0.5) * 6; }
    if (vel.y < 0 && pos.y < -halfH - cfg.scale * 2) { pos.y =  halfH + cfg.scale * 2; pos.x = cfg.initPos[0] + (Math.random() - 0.5) * 6; }
    if (vel.z > 0 && pos.z >  4)                      { pos.set(...cfg.initPos); }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={cfg.initPos}
      scale={cfg.scale}
    >
      <meshStandardMaterial
        color={cfg.color}
        emissive={cfg.emissive}
        emissiveIntensity={0.35}
        roughness={0.96}
        metalness={0.06}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   Starfield – 220 tiny points
───────────────────────────────────────── */
function Stars() {
  const { positions, sizes } = useMemo(() => {
    const n = 220;
    const pos   = new Float32Array(n * 3);
    const sizes = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i*3]   = (Math.random() - 0.5) * 60;
      pos[i*3+1] = (Math.random() - 0.5) * 40;
      pos[i*3+2] = (Math.random() - 0.5) * 20 - 12;
      sizes[i]   = Math.random() * 0.045 + 0.008;
    }
    return { positions: pos, sizes };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [positions, sizes]);

  return (
    <points geometry={geo}>
      <pointsMaterial
        color="#c8c0ff"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

/* ─────────────────────────────────────────
   Scene – lights + all asteroids + stars
───────────────────────────────────────── */
function Scene() {
  return (
    <>
      {/* Deep space ambient — almost nothing */}
      <ambientLight intensity={0.04} color="#9090cc" />

      {/* Main: violet sun from upper-right */}
      <directionalLight
        position={[16, 14, 8]}
        intensity={1.1}
        color="#c0b8ff"
      />
      {/* Rim: faint cyan kicker from lower-left */}
      <directionalLight
        position={[-12, -8, 4]}
        intensity={0.18}
        color="#00d4ff"
      />
      {/* Subtle fill so dark faces aren't pure black */}
      <directionalLight
        position={[0, 0, 20]}
        intensity={0.08}
        color="#8080aa"
      />

      <Stars />

      {FLIGHT_CONFIGS.map((cfg, i) => (
        <FlyingAsteroid key={i} cfg={cfg} />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   Root export — fixed full-screen backdrop
───────────────────────────────────────── */
export default function AsteroidField() {
  const [webGL, setWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    setWebGL(detectWebGL());
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>

      {/* Three.js canvas — only mount when WebGL is confirmed available */}
      {webGL === true && (
        <WebGLErrorBoundary>
          <Canvas
            camera={{ position: [0, 0, 16], fov: 56, near: 0.1, far: 120 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'transparent' }}
            dpr={[1, 1.5]}
          >
            <Scene />
          </Canvas>
        </WebGLErrorBoundary>
      )}

      {/* Space nebula atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 110% 55% at 50% 0%,  rgba(80,55,150,0.24) 0%, transparent 65%),' +
            'radial-gradient(ellipse 70%  45% at 88% 95%, rgba(0,140,190,0.14) 0%, transparent 55%),' +
            'radial-gradient(ellipse 60%  50% at 8%  80%, rgba(50,28,110,0.18) 0%, transparent 60%)',
        }}
      />

      {/* Soft colour blooms */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 45% 35% at 22% 18%, rgba(0,185,230,0.06) 0%, transparent 70%),' +
            'radial-gradient(ellipse 55% 40% at 75% 68%, rgba(108,99,255,0.07) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
      />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
}
