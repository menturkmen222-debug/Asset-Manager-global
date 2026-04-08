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

const ASTEROID_COUNT = 28;

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
  detail: number;
}

function useAsteroidData(): AsteroidData[] {
  return useMemo(() => {
    return Array.from({ length: ASTEROID_COUNT }, () => {
      const r = randomBetween(6, 22);
      const theta = Math.random() * Math.PI * 2;
      const phi = randomBetween(0.2, Math.PI - 0.2);
      return {
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          randomBetween(-14, -2),
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        rotationSpeed: [
          randomBetween(0.0005, 0.002),
          randomBetween(0.0005, 0.003),
          randomBetween(0.0002, 0.0015),
        ] as [number, number, number],
        floatSpeed: randomBetween(0.12, 0.35),
        floatAmplitude: randomBetween(0.08, 0.22),
        floatOffset: Math.random() * Math.PI * 2,
        scale: randomBetween(0.18, 0.95),
        detail: Math.random() < 0.4 ? 1 : 0,
      };
    });
  }, []);
}

function Asteroid({ data }: { data: AsteroidData }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initPos = useRef<[number, number, number]>(data.position);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, data.detail);
    const positions = geo.attributes.position;
    const count = positions.count;
    for (let i = 0; i < count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      const noise = 1 + (Math.random() - 0.5) * 0.48;
      positions.setXYZ(i, x * noise, y * noise, z * noise);
    }
    geo.computeVertexNormals();
    return geo;
  }, [data.detail]);

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
      Math.cos(t * data.floatSpeed * 0.6 + data.floatOffset) * data.floatAmplitude * 0.5;
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
        color="#111116"
        roughness={0.92}
        metalness={0.18}
        envMapIntensity={0.4}
      />
    </mesh>
  );
}

function Scene() {
  const asteroids = useAsteroidData();

  return (
    <>
      <ambientLight intensity={0.08} />
      <directionalLight
        position={[4, 8, 6]}
        intensity={0.55}
        color="#7c6cf7"
      />
      <directionalLight
        position={[-6, -4, 3]}
        intensity={0.22}
        color="#00c4f0"
      />
      <pointLight position={[0, 0, 4]} intensity={0.18} color="#6c63ff" decay={2} />
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
          camera={{ position: [0, 0, 14], fov: 62, near: 0.1, far: 80 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
        >
          <Scene />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
