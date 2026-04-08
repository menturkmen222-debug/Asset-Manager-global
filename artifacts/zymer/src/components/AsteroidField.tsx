import { useRef, useMemo, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

class WebGLErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

const ASTEROID_COUNT = 11;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
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

function buildRockGeometry(seed: number): THREE.BufferGeometry {
  const rng = (() => {
    let s = seed;
    return () => {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0xffffffff;
    };
  })();

  const detail = seed % 3 === 0 ? 2 : 1;
  const geo = new THREE.IcosahedronGeometry(1, detail);
  const positions = geo.attributes.position;
  const count = positions.count;

  for (let i = 0; i < count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = positions.getZ(i);

    const largeNoise = 0.72 + rng() * 0.56;
    const medNoise = 1 + (rng() - 0.5) * 0.32;
    const smallNoise = 1 + (rng() - 0.5) * 0.14;

    positions.setXYZ(
      i,
      x * largeNoise * medNoise * smallNoise,
      y * largeNoise * (1 + (rng() - 0.5) * 0.4) * smallNoise,
      z * largeNoise * medNoise * (1 + (rng() - 0.5) * 0.18),
    );
  }
  geo.computeVertexNormals();
  return geo;
}

function useAsteroidData(): AsteroidData[] {
  return useMemo(() => {
    const slots: Array<[number, number]> = [
      [-9, 3.5], [8.5, 4], [-7, -4], [9, -3],
      [-11, 0.5], [10.5, 1], [4, 5.5], [-4, -5],
      [-6, 6], [7, -5.5], [0, -6.5],
    ];

    return slots.map(([bx, by], i) => ({
      position: [
        bx + randomBetween(-1.2, 1.2),
        by + randomBetween(-0.8, 0.8),
        randomBetween(-10, -3),
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      rotationSpeed: [
        randomBetween(0.0004, 0.0016),
        randomBetween(0.0003, 0.0018),
        randomBetween(0.0002, 0.001),
      ] as [number, number, number],
      floatSpeed: randomBetween(0.09, 0.22),
      floatAmplitude: randomBetween(0.06, 0.18),
      floatOffset: (i / slots.length) * Math.PI * 2 + randomBetween(-0.4, 0.4),
      scale: randomBetween(0.22, 1.1),
      seed: Math.floor(Math.random() * 9999) + i * 137,
    }));
  }, []);
}

function Asteroid({ data }: { data: AsteroidData }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initPos = useRef<[number, number, number]>(data.position);

  const geometry = useMemo(() => buildRockGeometry(data.seed), [data.seed]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const mesh = meshRef.current;
    mesh.rotation.x += data.rotationSpeed[0];
    mesh.rotation.y += data.rotationSpeed[1];
    mesh.rotation.z += data.rotationSpeed[2];
    mesh.position.y =
      initPos.current[1] +
      Math.sin(t * data.floatSpeed + data.floatOffset) * data.floatAmplitude;
    mesh.position.x =
      initPos.current[0] +
      Math.cos(t * data.floatSpeed * 0.55 + data.floatOffset) * data.floatAmplitude * 0.45;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={data.position}
      rotation={data.rotation}
      scale={data.scale}
    >
      <meshStandardMaterial
        color="#1a1a22"
        roughness={0.96}
        metalness={0.08}
        envMapIntensity={0.2}
      />
    </mesh>
  );
}

function Scene() {
  const asteroids = useAsteroidData();

  return (
    <>
      <ambientLight intensity={0.06} />
      <directionalLight position={[12, 10, 8]} intensity={0.7} color="#9d97f5" />
      <directionalLight position={[-8, -6, 4]} intensity={0.15} color="#00c4f0" />
      {asteroids.map((data, i) => (
        <Asteroid key={i} data={data} />
      ))}
    </>
  );
}

export default function AsteroidField() {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: 'none' }}
      aria-hidden
    >
      <WebGLErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 16], fov: 58, near: 0.1, far: 80 }}
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
