import { useRef, useMemo, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

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

function randomBetween(a: number, b: number) { return a + Math.random() * (b - a); }

/* ── seeded LCG random ── */
function makeLcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(s, 1664525) + 1013904223 >>> 0;
    return s / 0x100000000;
  };
}

/* ── smooth 3-D value noise (no deps) ── */
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
  const su = s(u), sv = s(v), sw = s(w);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const c000 = hash3(ix, iy, iz);       const c100 = hash3(ix+1, iy, iz);
  const c010 = hash3(ix, iy+1, iz);     const c110 = hash3(ix+1, iy+1, iz);
  const c001 = hash3(ix, iy, iz+1);     const c101 = hash3(ix+1, iy, iz+1);
  const c011 = hash3(ix, iy+1, iz+1);   const c111 = hash3(ix+1, iy+1, iz+1);
  return lerp(
    lerp(lerp(c000, c100, su), lerp(c010, c110, su), sv),
    lerp(lerp(c001, c101, su), lerp(c011, c111, su), sv),
    sw,
  );
}

/* ── build one asteroid ── */
function buildRockGeometry(seed: number): THREE.BufferGeometry {
  const rng = makeLcg(seed);

  /* random elongation ratios — no more spheres */
  const sx = 1;
  const sy = 0.45 + rng() * 0.55;   // 0.45 – 1.0
  const sz = 0.40 + rng() * 0.55;   // 0.40 – 0.95

  /* noise offsets so each rock is unique */
  const ox = rng() * 47.3;
  const oy = rng() * 31.7;
  const oz = rng() * 19.1;

  const geo = new THREE.IcosahedronGeometry(1, 3);
  const pos = geo.attributes.position as THREE.BufferAttribute;
  const count = pos.count;

  for (let i = 0; i < count; i++) {
    const nx = pos.getX(i);
    const ny = pos.getY(i);
    const nz = pos.getZ(i);

    /* apply base elongation */
    let x = nx * sx, y = ny * sy, z = nz * sz;

    /* coarse large-scale dents  */
    const n1 = smoothNoise(nx + ox, ny + oy, nz + oz, 1.4);
    /* medium secondary detail */
    const n2 = smoothNoise(nx + ox, ny + oy, nz + oz, 3.1) * 0.28;
    /* fine surface texture */
    const n3 = smoothNoise(nx + ox, ny + oy, nz + oz, 6.8) * 0.09;

    const disp = 0.68 + n1 * 0.48 + n2 + n3;

    /* re-normalise displaced position to sphere surface, then scale */
    const len = Math.sqrt(x*x + y*y + z*z) || 1;
    x = (x / len) * disp * sx;
    y = (y / len) * disp * sy;
    z = (z / len) * disp * sz;

    pos.setXYZ(i, x, y, z);
  }
  geo.computeVertexNormals();
  return geo;
}

interface AsteroidData {
  position: [number, number, number];
  rotation: [number, number, number];
  rotationSpeed: [number, number, number];
  floatSpeed: number;
  floatAmplitude: number;
  floatOffset: number;
  scale: number;
  seed: number;
}

function useAsteroidData(): AsteroidData[] {
  return useMemo(() => {
    /* manually placed so they never cluster in the centre */
    const slots: [number, number, number][] = [
      [-9.5, 3.8, -8],
      [9.2,  4.2, -6],
      [-7.5,-4.5, -5],
      [9.8, -3.2, -9],
      [-12,  0.8,-11],
      [11,   1.2, -7],
      [5,    6,   -5],
      [-4.5,-5.5, -6],
      [-6.5, 6.5, -9],
      [7.5, -6,   -7],
    ];

    return slots.map(([bx, by, bz], i) => ({
      position: [
        bx + randomBetween(-0.8, 0.8),
        by + randomBetween(-0.5, 0.5),
        bz + randomBetween(-1, 1),
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      ] as [number, number, number],
      rotationSpeed: [
        randomBetween(0.0003, 0.0014),
        randomBetween(0.0002, 0.0016),
        randomBetween(0.0001, 0.0009),
      ] as [number, number, number],
      floatSpeed:     randomBetween(0.07, 0.18),
      floatAmplitude: randomBetween(0.05, 0.16),
      floatOffset:    (i / slots.length) * Math.PI * 2 + randomBetween(-0.3, 0.3),
      scale:          randomBetween(0.25, 1.05),
      seed:           (i + 1) * 1337 + Math.floor(Math.random() * 500),
    }));
  }, []);
}

function Asteroid({ data }: { data: AsteroidData }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initPos = useRef<[number, number, number]>(data.position);
  const geometry = useMemo(() => buildRockGeometry(data.seed), [data.seed]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const m = meshRef.current;
    m.rotation.x += data.rotationSpeed[0];
    m.rotation.y += data.rotationSpeed[1];
    m.rotation.z += data.rotationSpeed[2];
    m.position.y = initPos.current[1] + Math.sin(t * data.floatSpeed + data.floatOffset) * data.floatAmplitude;
    m.position.x = initPos.current[0] + Math.cos(t * data.floatSpeed * 0.52 + data.floatOffset) * data.floatAmplitude * 0.4;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={data.position} rotation={data.rotation} scale={data.scale}>
      <meshStandardMaterial
        color="#17171f"
        roughness={0.97}
        metalness={0.04}
      />
    </mesh>
  );
}

function Scene() {
  const asteroids = useAsteroidData();
  return (
    <>
      <ambientLight intensity={0.05} />
      {/* Primary: violet from upper-right like a distant sun */}
      <directionalLight position={[14, 12, 6]} intensity={0.65} color="#b8b4ff" />
      {/* Rim: faint cyan from opposite side for edge definition */}
      <directionalLight position={[-10, -5, 3]} intensity={0.12} color="#00c4f0" />
      {asteroids.map((data, i) => <Asteroid key={i} data={data} />)}
    </>
  );
}

export default function AsteroidField() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0, pointerEvents: 'none' }} aria-hidden>
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 16], fov: 56, near: 0.1, far: 90 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
        >
          <Scene />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
