"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export const Vortex = ({
  children,
  className,
  containerClassName,
  particleCount = 700,
  rangeY = 100,
  baseHue = 220,
  baseSpeed = 0.0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  backgroundColor = "transparent",
}: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      radius: number; hue: number; alpha: number;
    };

    const particles: Particle[] = [];
    const TAU = Math.PI * 2;
    const rand = (n: number) => Math.random() * n;

    const initParticle = (): Particle => ({
      x: rand(canvas.width),
      y: rand(canvas.height),
      vx: 0,
      vy: 0,
      radius: baseRadius + rand(rangeRadius),
      hue: baseHue + rand(60),
      alpha: 0,
    });

    for (let i = 0; i < particleCount; i++) particles.push(initParticle());

    let tick = 0;
    const loop = () => {
      animationId.current = requestAnimationFrame(loop);
      tick++;
      ctx.fillStyle = backgroundColor === "transparent" ? "rgba(0,0,0,0)" : backgroundColor;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const angle = ((Math.sin(p.x / 200) * TAU) + (Math.sin(p.y / 200) * TAU)) * 0.5;
        p.vx += Math.cos(angle + TAU / 4) * (baseSpeed + rand(rangeSpeed));
        p.vy += Math.sin(angle + TAU / 4) * (baseSpeed + rand(rangeSpeed));
        p.x += p.vx * 0.5;
        p.y += p.vy * 0.5;
        p.vx *= 0.96;
        p.vy *= 0.96;
        if (p.alpha < 1) p.alpha += 0.02;

        if (p.x < 0 || p.x > canvas.width || p.y < -rangeY || p.y > canvas.height + rangeY) {
          Object.assign(p, initParticle(), { alpha: 0, x: rand(canvas.width), y: rand(canvas.height) });
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, TAU);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.alpha * 0.3})`;
        ctx.fill();
      });
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId.current) cancelAnimationFrame(animationId.current);
    };
  }, [particleCount, rangeY, baseHue, baseSpeed, rangeSpeed, baseRadius, rangeRadius, backgroundColor]);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full", containerClassName)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ background: backgroundColor }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
