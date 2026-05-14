"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/* ─── Floating Wireframe Shape ─── */
function WireShape({
  position,
  size,
  speed,
  type,
  isDark,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
  type: "box" | "ico" | "octa";
  isDark: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  const edgesGeo = useMemo(() => {
    const base =
      type === "ico"
        ? new THREE.IcosahedronGeometry(0.7, 0)
        : type === "octa"
        ? new THREE.OctahedronGeometry(0.7, 0)
        : new THREE.BoxGeometry(1, 1, 1);
    return new THREE.EdgesGeometry(base);
  }, [type]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += delta * speed * 0.12;
    groupRef.current.rotation.y += delta * speed * 0.08;
    groupRef.current.rotation.z += delta * speed * 0.04;
  });

  const color = isDark ? "#ffffff" : "#000000";

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={groupRef} position={position} scale={size}>
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color={color} transparent opacity={isDark ? 0.18 : 0.1} />
        </lineSegments>
      </group>
    </Float>
  );
}

/* ─── Dot Globe ─── */
function DotGlobe({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Group>(null);

  const shellGeo = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.95, 1)),
    []
  );

  const bufferGeo = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.04;
  });

  const color = isDark ? "#ffffff" : "#000000";

  return (
    <group ref={ref} position={[0, 0, -2]}>
      <lineSegments geometry={shellGeo}>
        <lineBasicMaterial color={color} transparent opacity={isDark ? 0.05 : 0.03} />
      </lineSegments>
      <points geometry={bufferGeo}>
        <pointsMaterial
          size={0.02}
          color={color}
          transparent
          opacity={isDark ? 0.3 : 0.15}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

/* ─── Scene ─── */
function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <WireShape position={[-4.5, 2, 0]} size={0.35} speed={1.2} type="ico" isDark={isDark} />
      <WireShape position={[4.2, 1.8, -1]} size={0.28} speed={0.9} type="octa" isDark={isDark} />
      <WireShape position={[-3, -2.2, -1]} size={0.25} speed={1.4} type="ico" isDark={isDark} />
      <WireShape position={[3.8, -2.3, 0]} size={0.3} speed={1.0} type="octa" isDark={isDark} />
      <WireShape position={[0.5, 3.2, -1.5]} size={0.22} speed={0.7} type="ico" isDark={isDark} />
    </>
  );
}

/* ─── Main export ─── */
export default function HeroScene() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = !mounted ? true : resolvedTheme === "dark";

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={1}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          canvas.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
          });
        }}
      >
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  );
}
