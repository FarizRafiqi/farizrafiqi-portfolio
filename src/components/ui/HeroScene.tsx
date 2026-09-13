"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";
import styles from "./HeroScene.module.css";

const ROUTES = [
  [[-2.4, 1.8], [-1.2, 1.8], [-1.2, 0], [0, 0]],
  [[0, 0], [1.2, 0], [1.2, -1.8], [2.4, -1.8]],
  [[-2.4, -1.8], [0, -1.8], [0, 0]],
  [[0, 0], [0, 1.8], [2.4, 1.8]],
] as const;

const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (notify: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};
const getMotionSnapshot = () => window.matchMedia(motionQuery).matches;
const getServerMotionSnapshot = () => false;

/** An original procedural scene. React owns only its lifetime; Three.js owns rendering. */
export default function HeroScene({ reducedMotion = false }: { readonly reducedMotion?: boolean }) {
  const systemReducedMotion = useSyncExternalStore(subscribeMotion, getMotionSnapshot, getServerMotionSnapshot);
  const motionDisabled = reducedMotion || systemReducedMotion;
  const hostRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const dark = resolvedTheme !== "light";
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      host.dataset.unavailable = "true";
      return;
    }
    host.dataset.unavailable = "false";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 60);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0.3, 0);
    const world = new THREE.Group();
    scene.add(world);
    scene.add(new THREE.HemisphereLight(0xffffff, dark ? 0x444444 : 0xaaaaaa, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(-3, 9, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 1.6);
    rim.position.set(5, 3, -4);
    scene.add(rim);

    // Shared resources are disposed once, including those used by instanced meshes.
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    const geo = <T extends THREE.BufferGeometry>(g: T) => { geometries.add(g); return g; };
    const mat = <T extends THREE.Material>(m: T) => { materials.add(m); return m; };
    const porcelain = mat(new THREE.MeshStandardMaterial({ color: dark ? 0xaaaaaa : 0xf5f5f5, roughness: 0.48, metalness: 0.25 }));
    const graphite = mat(new THREE.MeshStandardMaterial({ color: dark ? 0x202020 : 0x555555, roughness: 0.5, metalness: 0.3 }));
    const substrate = mat(new THREE.MeshStandardMaterial({ color: dark ? 0x111111 : 0xdddddd, roughness: 0.8 }));
    const ink = dark ? 0xffffff : 0x222222;
    const lineMat = mat(new THREE.LineBasicMaterial({ color: ink, transparent: true, opacity: dark ? 0.22 : 0.17 }));
    const signalMat = mat(new THREE.MeshBasicMaterial({ color: ink }));
    const unitBox = geo(new THREE.BoxGeometry(1, 1, 1));
    const edges = geo(new THREE.EdgesGeometry(unitBox));
    function box(parent: THREE.Object3D, x: number, y: number, z: number, w: number, h: number, d: number, material: THREE.Material, outline = false) {
      const mesh = new THREE.Mesh(unitBox, material);
      mesh.position.set(x, y, z);
      mesh.scale.set(w, h, d);
      parent.add(mesh);
      if (outline) mesh.add(new THREE.LineSegments(edges, lineMat));
      return mesh;
    }
    box(world, 0, -0.25, 0, 6.5, 0.13, 6.5, substrate, true);
    box(world, 0, -0.13, 0, 6.2, 0.08, 6.2, graphite, true);

    // 121 individually animated tiles, submitted in a single draw call.
    const tiles = new THREE.InstancedMesh(unitBox, porcelain, 121);
    tiles.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    world.add(tiles);
    const dummy = new THREE.Object3D();
    const tileData: { x: number; z: number; radius: number }[] = [];
    for (let x = -5; x <= 5; x++) for (let z = -5; z <= 5; z++) {
      tileData.push({ x: x * 0.56, z: z * 0.56, radius: Math.hypot(x, z) * 0.56 });
    }
    // Raised orthogonal traces sit above the motion field.
    const routeMaterial = mat(new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.65 }));
    const routes = ROUTES.map(points => {
      const vertices = points.map(([x, z]) => new THREE.Vector3(x, 0.26, z));
      const path = new THREE.CurvePath<THREE.Vector3>();
      vertices.slice(1).forEach((v, i) => path.add(new THREE.LineCurve3(vertices[i], v)));
      world.add(new THREE.Line(geo(new THREE.BufferGeometry().setFromPoints(vertices)), routeMaterial));
      return path;
    });
    const packets = new THREE.InstancedMesh(unitBox, signalMat, 20);
    world.add(packets);
    const packetPoint = new THREE.Vector3();

    // Central compute module: stacked plates, socket pins and a suspended die.
    const core = new THREE.Group();
    world.add(core);
    box(core, 0, 0.30, 0, 1.52, 0.18, 1.52, graphite, true);
    const plates: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) plates.push(box(core, 0, 0.52 + i * 0.18, 0, 1.2, 0.10, 1.2, i % 2 ? graphite : porcelain, true));
    const cap = box(core, 0, 1.20, 0, 0.7, 0.12, 0.7, graphite, true);
    const die = box(core, 0, 1.27, 0, 0.42, 0.025, 0.42, signalMat);
    for (let i = -3; i <= 3; i++) {
      for (const side of [-1, 1]) {
        box(core, i * 0.17, 0.33, side * 0.85, 0.055, 0.06, 0.18, porcelain);
        box(core, side * 0.85, 0.33, i * 0.17, 0.18, 0.06, 0.055, porcelain);
      }
    }
    // Four readable architectural families, each with a distinct silhouette.
    for (let n = 0; n < 4; n++) {
      const x = n % 2 ? 2.4 : -2.4;
      const z = n < 2 ? -1.8 : 1.8;
      box(world, x, 0.28, z, 0.86, 0.13, 0.86, graphite, true);
      if (n === 0) {
        for (let i = 0; i < 3; i++) {
          box(world, x + (i - 1) * 0.24, 0.64, z, 0.17, 0.62, 0.56, porcelain, true);
          box(world, x + (i - 1) * 0.24, 0.8, z + 0.29, 0.07, 0.03, 0.012, signalMat);
        }
      } else if (n === 1) {
        for (let i = 0; i < 4; i++) {
          const disk = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.32, 0.32, 0.12, 32)), i % 2 ? graphite : porcelain);
          disk.position.set(x, 0.42 + i * 0.17, z);
          world.add(disk);
        }
      } else if (n === 2) {
        box(world, x - 0.25, 0.64, z, 0.13, 0.62, 0.45, porcelain, true);
        box(world, x + 0.25, 0.64, z, 0.13, 0.62, 0.45, porcelain, true);
        box(world, x, 0.91, z, 0.63, 0.13, 0.45, porcelain, true);
      } else {
        for (let i = 0; i < 3; i++) box(world, x, 0.42 + i * 0.21, z, 0.65, 0.13, 0.65, porcelain, true);
      }
    }
    // Fine registration marks around the perimeter, like a technical drawing.
    const ticks: number[] = [];
    for (let i = -6; i <= 6; i++) {
      for (const side of [-1, 1]) {
        ticks.push(i * 0.5, -0.14, side * 3.4, i * 0.5, -0.14, side * (3.4 + (i % 2 === 0 ? 0.13 : 0.06)));
        ticks.push(side * 3.4, -0.14, i * 0.5, side * (3.4 + (i % 2 === 0 ? 0.13 : 0.06)), -0.14, i * 0.5);
      }
    }
    world.add(new THREE.LineSegments(geo(new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(ticks, 3))), lineMat));

    let time = 0;
    let last = 0;
    let frame = 0;
    let lost = false;
    let disposed = false;
    const pointer = new THREE.Vector2();
    function draw(dt: number) {
      if (!motionDisabled) time += dt;
      tileData.forEach(({ x, z, radius }, i) => {
        const wave = motionDisabled ? 0 : Math.sin(radius * 2.3 - time * 1.3) * 0.035;
        const h = 0.10 + (radius > 1.2 ? wave : 0);
        dummy.position.set(x, h / 2, z);
        dummy.scale.set(0.52, h, 0.52);
        dummy.updateMatrix();
        tiles.setMatrixAt(i, dummy.matrix);
      });
      tiles.instanceMatrix.needsUpdate = true;
      for (let i = 0; i < 20; i++) {
        routes[i % routes.length].getPoint((i / 20 + time * 0.12) % 1, packetPoint);
        dummy.position.copy(packetPoint);
        dummy.scale.set(0.075, 0.045, 0.075);
        dummy.updateMatrix();
        packets.setMatrixAt(i, dummy.matrix);
      }
      packets.instanceMatrix.needsUpdate = true;
      plates.forEach((plate, i) => { plate.position.y = 0.52 + i * 0.18; });
      cap.position.y = 1.20;
      die.position.y = 1.27;
      const ease = 1 - Math.exp(-dt * 5);
      world.rotation.y += ((motionDisabled ? 0 : pointer.x * 0.12) - world.rotation.y) * ease;
      world.rotation.x += ((motionDisabled ? 0 : pointer.y * 0.045) - world.rotation.x) * ease;
      renderer.render(scene, camera);
    }
    function loop(now: number) {
      frame = 0;
      if (disposed || lost || document.hidden) return;
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      draw(dt);
      if (!motionDisabled) frame = requestAnimationFrame(loop);
    }
    function schedule() {
      if (!frame && !disposed && !lost && !document.hidden) {
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    }
    function resize() {
      if (!host) return;
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height);
      const aspect = width / height;
      const half = Math.max(3.8, 5.0 / aspect);
      camera.left = -half * aspect;
      camera.right = half * aspect;
      camera.top = half;
      camera.bottom = -half;
      camera.updateProjectionMatrix();
      schedule();
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const move = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointer.set((event.clientX - bounds.left) / bounds.width * 2 - 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
    };
    const leave = () => pointer.set(0, 0);
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; last = 0; }
      else schedule();
    };
    const contextLost = (event: Event) => {
      event.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0;
      host.dataset.unavailable = "true";
    };
    const restored = () => { lost = false; host.dataset.unavailable = "false"; schedule(); };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", visibility);
    renderer.domElement.addEventListener("webglcontextlost", contextLost);
    renderer.domElement.addEventListener("webglcontextrestored", restored);
    resize();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
      tiles.dispose(); packets.dispose(); renderer.dispose();
      renderer.domElement.remove();
    };
  }, [resolvedTheme, motionDisabled]);

  return (
    <div className={styles.scene}>
      <div ref={hostRef} className={styles.viewport} role="img" aria-label="Animated isometric system: a layered processor connects a gateway, compute cluster, database and storage across a monochrome motion grid.">
        <div className={styles.fallback} aria-hidden="true"><span>◇</span> SYSTEMS ARCHITECTURE</div>
      </div>
    </div>
  );
}
