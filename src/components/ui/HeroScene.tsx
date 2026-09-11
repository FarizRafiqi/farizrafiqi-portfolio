"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/**
 * StructureFlowWave
 * An architectural undulating 3D topographic surface lattice.
 * Vertices undulate with harmonic wave equations and react dynamically
 * with real-time physical ripples under the user's cursor across the whole screen.
 */
function StructureFlowWave({
  isDark,
  reducedMotion,
  isHovered,
  pulse,
  offsetX,
  offsetY,
}: {
  readonly isDark: boolean;
  readonly reducedMotion: boolean;
  readonly isHovered: boolean;
  readonly pulse: number;
  readonly offsetX: number;
  readonly offsetY: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  // Expansive 16x16 plane grid for fluid, seamless edge-to-edge coverage
  const geomRef = useRef<THREE.PlaneGeometry | null>(null);
  const initialPositionsRef = useRef<Float32Array | null>(null);

  if (!geomRef.current) {
    const geo = new THREE.PlaneGeometry(16, 16, 60, 60);
    const pos = geo.attributes.position;
    const initial = new Float32Array(pos.array.length);
    initial.set(pos.array);
    geomRef.current = geo;
    initialPositionsRef.current = initial;
  }

  useEffect(() => {
    return () => {
      geomRef.current?.dispose();
    };
  }, []);

  const pointerTarget = useRef({ x: 0, y: 0 });
  const pointerCurrent = useRef({ x: 0, y: 0 });
  const pulseDecay = useRef(0);

  useEffect(() => {
    if (pulse > 0) pulseDecay.current = 1.0;
  }, [pulse]);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    const geo = geomRef.current;
    const initialPositions = initialPositionsRef.current;
    if (!geo || !initialPositions) return;

    if (pulseDecay.current > 0.01) {
      pulseDecay.current = THREE.MathUtils.lerp(pulseDecay.current, 0, delta * 3.2);
    } else {
      pulseDecay.current = 0;
    }

    // Map screen pointer [-1, 1] to world space relative to the wave mesh
    pointerTarget.current.x = state.pointer.x * 6.5 - offsetX;
    pointerTarget.current.y = state.pointer.y * 5.0 - offsetY;

    pointerCurrent.current.x = THREE.MathUtils.lerp(
      pointerCurrent.current.x,
      pointerTarget.current.x,
      delta * 6
    );
    pointerCurrent.current.y = THREE.MathUtils.lerp(
      pointerCurrent.current.y,
      pointerTarget.current.y,
      delta * 6
    );

    const t = state.clock.getElapsedTime();
    const pos = geo.attributes.position;
    const pX = pointerCurrent.current.x;
    const pY = pointerCurrent.current.y;
    const pIntensity = pulseDecay.current;

    for (let i = 0; i < pos.count; i++) {
      const x = initialPositions[i * 3];
      const y = initialPositions[i * 3 + 1];

      // Harmonic multi-frequency wave equations
      const w1 = Math.sin(x * 0.65 + t * 1.05) * Math.cos(y * 0.55 + t * 0.8) * 0.48;
      const w2 = Math.sin((x + y) * 0.4 - t * 0.6) * 0.28;
      const w3 = Math.cos(Math.hypot(x, y) * 0.7 - t * 1.3) * 0.18;

      // Real-time cursor deformation ripple
      const dx = x - pX;
      const dy = y - pY;
      const distSq = dx * dx + dy * dy;
      const dist = Math.hypot(dx, dy);

      let ripple = 0;
      if (dist < 4.5) {
        const falloff = Math.exp(-distSq / 3.0);
        ripple =
          falloff *
          (0.55 + pIntensity * 1.8 + (isHovered ? 0.25 : 0)) *
          Math.sin(dist * 4.2 - t * 7.5);
      }

      pos.setZ(i, w1 + w2 + w3 + ripple);
    }

    pos.needsUpdate = true;
    geo.computeVertexNormals();
  });

  const wireColor = isDark ? "#ffffff" : "#111111";
  const surfaceColor = isDark ? "#050505" : "#f7f7f7";

  return (
    <group position={[offsetX, offsetY, 0.3]} rotation={[-Math.PI / 2.65, 0, 0]}>
      {geomRef.current && (
        <>
          <mesh ref={meshRef} geometry={geomRef.current}>
            <meshStandardMaterial
              color={surfaceColor}
              roughness={0.88}
              metalness={0.12}
              flatShading={false}
              polygonOffset
              polygonOffsetFactor={1}
              polygonOffsetUnits={1}
            />
          </mesh>

          <mesh ref={wireRef} geometry={geomRef.current}>
            <meshBasicMaterial
              color={wireColor}
              wireframe
              transparent
              opacity={isDark ? 0.22 : 0.16}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

/**
 * QuantumCore
 * Floating kinetic Torus Knot monolith suspended above the topology wave.
 * High-reflectivity metallic surface with precision geodesic edges and parallax gaze.
 */
function QuantumCore({
  isDark,
  reducedMotion,
  isHovered,
  pulse,
  posX,
  posY,
}: {
  readonly isDark: boolean;
  readonly reducedMotion: boolean;
  readonly isHovered: boolean;
  readonly pulse: number;
  readonly posX: number;
  readonly posY: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const knotGeo = useMemo(() => new THREE.TorusKnotGeometry(0.92, 0.24, 128, 24, 2, 3), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(knotGeo, 24), [knotGeo]);
  const ringGeo = useMemo(() => new THREE.TorusGeometry(1.85, 0.012, 16, 100), []);

  const color = isDark ? "#ffffff" : "#111111";
  const chromeColor = isDark ? "#383838" : "#f2f2f2";

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      // Pointer parallax lookAt tilt
      const targetRotX = state.pointer.y * 0.38;
      const targetRotY = (state.pointer.x - (posX > 0 ? 0.3 : 0)) * 0.48;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.07);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.07);

      const speed = isHovered ? 1.8 : 0.75;
      if (coreRef.current) {
        coreRef.current.rotation.x += delta * 0.35 * speed;
        coreRef.current.rotation.y += delta * 0.55 * speed;
      }
      if (wireRef.current && coreRef.current) {
        wireRef.current.rotation.x = coreRef.current.rotation.x;
        wireRef.current.rotation.y = coreRef.current.rotation.y;
      }
      if (ringRef.current) {
        ringRef.current.rotation.z += delta * 0.25 * speed;
        ringRef.current.rotation.x += delta * 0.15 * speed;
      }
    }

    // Pulse & hover scale spring dynamics
    const targetScale = 1 + pulse * 0.24 + (isHovered ? 0.08 : 0);
    const newScale = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.12);
    groupRef.current.scale.set(newScale, newScale, newScale);
  });

  return (
    <group ref={groupRef} position={[posX, posY, 0.8]}>
      {/* Chrome Reflective Knot Core */}
      <mesh ref={coreRef} geometry={knotGeo}>
        <meshStandardMaterial
          color={chromeColor}
          roughness={0.14}
          metalness={0.94}
          transparent
          opacity={isDark ? 0.92 : 0.95}
        />
      </mesh>

      {/* Geodesic Contour Edges */}
      <lineSegments ref={wireRef} geometry={edgesGeo}>
        <lineBasicMaterial color={color} transparent opacity={isDark ? 0.65 : 0.45} />
      </lineSegments>

      {/* Equatorial Orbit Gimbal Ring */}
      <mesh ref={ringRef} geometry={ringGeo}>
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={isDark ? 0.45 : 0.35}
        />
      </mesh>

      {/* Central Singularity Point */}
      <mesh>
        <sphereGeometry args={[0.24, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={isDark ? 0.98 : 0.9} />
      </mesh>
    </group>
  );
}

/**
 * SignalStream
 * High-dimensional orbital particle ribbons weaving across the 3D space.
 */
function SignalStream({
  isDark,
  reducedMotion,
  isHovered,
  centerOriginX,
}: {
  readonly isDark: boolean;
  readonly reducedMotion: boolean;
  readonly isHovered: boolean;
  readonly centerOriginX: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 90;

  const [positions, offsets, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const offs = new Float32Array(count);
    const spds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      offs[i] = (i / count) * Math.PI * 2;
      const pseudo = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1;
      spds[i] = 0.45 + pseudo * 0.55;
    }
    return [pos, offs, spds];
  }, [count]);

  useFrame(({ clock }) => {
    if (!pointsRef.current || reducedMotion) return;
    const time = clock.getElapsedTime();
    const speedMult = isHovered ? 2.0 : 1.0;
    const posAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < count; i++) {
      const t = time * speeds[i] * speedMult + offsets[i];
      // 3D Lissajous ribbon flow across coordinate axes centered on core
      const x = centerOriginX + Math.sin(t) * 3.0 + Math.sin(t * 2) * 0.5;
      const y = Math.cos(t * 0.85) * 1.8 + Math.sin(t * 3) * 0.25;
      const z = Math.sin(t * 1.45) * 2.0 + 0.5;

      posAttr.setXYZ(i, x, y, z);
    }
    posAttr.needsUpdate = true;
  });

  const color = isDark ? "#ffffff" : "#111111";

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.065}
        transparent
        opacity={isDark ? 0.75 : 0.55}
      />
    </points>
  );
}

/**
 * CursorPointLight
 * Tracks the mouse in 3D space to cast dynamic specular glints directly under the cursor.
 */
function CursorPointLight({ isDark }: { readonly isDark: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    lightRef.current.position.x = THREE.MathUtils.lerp(
      lightRef.current.position.x,
      state.pointer.x * 6.5,
      0.1
    );
    lightRef.current.position.y = THREE.MathUtils.lerp(
      lightRef.current.position.y,
      state.pointer.y * 4.5,
      0.1
    );
    lightRef.current.position.z = 1.8;
  });

  return (
    <pointLight
      ref={lightRef}
      intensity={isDark ? 2.0 : 1.4}
      distance={8}
      decay={2}
      color={isDark ? "#ffffff" : "#333333"}
    />
  );
}

function Scene({
  isDark,
  reducedMotion,
  isHovered,
  pulse,
}: {
  readonly isDark: boolean;
  readonly reducedMotion: boolean;
  readonly isHovered: boolean;
  readonly pulse: number;
}) {
  const { viewport } = useThree();
  const isDesktop = viewport.width > 7.5;

  // Responsive spatial anchor coordinates
  const coreX = isDesktop ? Math.min(viewport.width * 0.24, 2.6) : 0;
  const coreY = isDesktop ? 0.4 : 0.8;
  const waveX = isDesktop ? 1.2 : 0;
  const waveY = isDesktop ? -1.25 : -1.35;

  return (
    <>
      <ambientLight intensity={isDark ? 0.5 : 0.8} />
      <directionalLight position={[6, 8, 6]} intensity={isDark ? 1.8 : 1.3} />
      <directionalLight position={[-6, -4, -2]} intensity={isDark ? 0.9 : 0.6} />
      <pointLight position={[coreX + 1.2, coreY + 1.6, 2.8]} intensity={isDark ? 2.8 : 2.0} distance={10} color={isDark ? "#ffffff" : "#333333"} />
      <CursorPointLight isDark={isDark} />

      {/* Atmospheric distance fog dissolving grid into the infinite background */}
      <fogExp2 attach="fog" args={[isDark ? "#000000" : "#ffffff", 0.075]} />

      <Sparkles
        count={isDark ? 45 : 30}
        scale={10}
        size={isDark ? 1.6 : 1.2}
        speed={reducedMotion ? 0 : 0.35}
        opacity={isDark ? 0.35 : 0.25}
        color={isDark ? "#ffffff" : "#222222"}
      />

      <Float
        speed={reducedMotion ? 0 : 1.2}
        rotationIntensity={reducedMotion ? 0 : 0.15}
        floatIntensity={reducedMotion ? 0 : 0.25}
      >
        <QuantumCore
          isDark={isDark}
          reducedMotion={reducedMotion}
          isHovered={isHovered}
          pulse={pulse}
          posX={coreX}
          posY={coreY}
        />
      </Float>

      <SignalStream
        isDark={isDark}
        reducedMotion={reducedMotion}
        isHovered={isHovered}
        centerOriginX={coreX}
      />

      <StructureFlowWave
        isDark={isDark}
        reducedMotion={reducedMotion}
        isHovered={isHovered}
        pulse={pulse}
        offsetX={waveX}
        offsetY={waveY}
      />
    </>
  );
}

export default function HeroScene({ reducedMotion = false }: { readonly reducedMotion?: boolean }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const [isHovered, setIsHovered] = useState(false);
  const [pulse, setPulse] = useState(0);

  const handlePointerDown = () => {
    setPulse((prev) => (prev > 0 ? 0 : 1));
    setTimeout(() => setPulse(0), 400);
  };

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={handlePointerDown}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Spatial Topology"
    >
      <Canvas
        camera={{ position: [0, 0.4, 7.2], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => event.preventDefault());
        }}
      >
        <Scene
          isDark={isDark}
          reducedMotion={reducedMotion}
          isHovered={isHovered}
          pulse={pulse}
        />
      </Canvas>
    </section>
  );
}
