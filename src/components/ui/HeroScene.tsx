"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function WireShape({
  position,
  size,
  speed,
  type,
  isDark,
  reducedMotion,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
  type: "ico" | "octa";
  isDark: boolean;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const edgesGeo = useMemo(() => {
    const base = type === "ico"
      ? new THREE.IcosahedronGeometry(0.72, 0)
      : new THREE.OctahedronGeometry(0.72, 0);
    const edges = new THREE.EdgesGeometry(base);
    base.dispose();
    return edges;
  }, [type]);

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.x += delta * speed * 0.12;
    groupRef.current.rotation.y += delta * speed * 0.08;
    groupRef.current.rotation.z += delta * speed * 0.04;
  });

  const color = isDark ? "#ffffff" : "#111111";

  return (
    <Float speed={speed * 0.65} rotationIntensity={reducedMotion ? 0 : 0.22} floatIntensity={reducedMotion ? 0 : 0.3}>
      <group ref={groupRef} position={position} scale={size}>
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color={color} transparent opacity={isDark ? 0.18 : 0.22} />
        </lineSegments>
      </group>
    </Float>
  );
}

function OrbitalRing({
  radius,
  rotation,
  speed,
  isDark,
  reducedMotion,
}: {
  radius: number;
  rotation: [number, number, number];
  speed: number;
  isDark: boolean;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const color = isDark ? "#ffffff" : "#111111";

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, 0.012, 8, 96]} />
      <meshBasicMaterial color={color} transparent opacity={isDark ? 0.20 : 0.22} />
    </mesh>
  );
}

function DotGlobe({ isDark, reducedMotion }: { isDark: boolean; reducedMotion: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const shellGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.68, 1)), []);
  const bufferGeo = useMemo(() => {
    const count = 260;
    const pos = new Float32Array(count * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i += 1) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const offset = i * 3;
      pos[offset] = 1.72 * Math.cos(theta) * radius;
      pos[offset + 1] = 1.72 * y;
      pos[offset + 2] = 1.72 * Math.sin(theta) * radius;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.16;
    ref.current.rotation.x += delta * 0.025;
  });

  const color = isDark ? "#ffffff" : "#111111";

  return (
    <group ref={ref} position={[0, 0, -0.5]}>
      <mesh>
        <sphereGeometry args={[1.72, 32, 32]} />
        <meshBasicMaterial color={isDark ? "#141414" : "#f0f0f0"} transparent opacity={isDark ? 0.25 : 0.45} />
      </mesh>
      <lineSegments geometry={shellGeo}>
        <lineBasicMaterial color={color} transparent opacity={isDark ? 0.12 : 0.18} />
      </lineSegments>
      <points geometry={bufferGeo}>
        <pointsMaterial size={0.025} color={color} transparent opacity={isDark ? 0.65 : 0.55} sizeAttenuation />
      </points>
      <OrbitalRing radius={2.05} rotation={[0.8, 0.2, 0.2]} speed={0.22} isDark={isDark} reducedMotion={reducedMotion} />
      <OrbitalRing radius={2.18} rotation={[0.15, 0.95, 0.6]} speed={-0.16} isDark={isDark} reducedMotion={reducedMotion} />
      <mesh>
        <sphereGeometry args={[0.26, 24, 24]} />
        <meshBasicMaterial color={isDark ? "#ffffff" : "#111111"} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function Scene({ isDark, reducedMotion }: { isDark: boolean; reducedMotion: boolean }) {
  return (
    <>
      <DotGlobe isDark={isDark} reducedMotion={reducedMotion} />
      <WireShape position={[-2.65, 1.4, 0.4]} size={0.48} speed={1.2} type="ico" isDark={isDark} reducedMotion={reducedMotion} />
      <WireShape position={[2.7, 1.7, -0.4]} size={0.38} speed={0.9} type="octa" isDark={isDark} reducedMotion={reducedMotion} />
      <WireShape position={[-2.4, -1.65, -0.3]} size={0.32} speed={1.4} type="ico" isDark={isDark} reducedMotion={reducedMotion} />
      <WireShape position={[2.45, -1.55, 0.5]} size={0.42} speed={1.0} type="octa" isDark={isDark} reducedMotion={reducedMotion} />
      <WireShape position={[0.3, 2.5, -1.4]} size={0.27} speed={0.7} type="ico" isDark={isDark} reducedMotion={reducedMotion} />
    </>
  );
}

export default function HeroScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => event.preventDefault());
        }}
      >
        <Scene isDark={isDark} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
