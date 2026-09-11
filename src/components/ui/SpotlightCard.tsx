"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
  HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  enableTilt?: boolean;
  tiltMaxAngle?: number;
}

export function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.12)",
  spotlightSize = 500,
  enableTilt = true,
  tiltMaxAngle = 4,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor tracking
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Spring tilt values
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const smoothTiltX = useSpring(tiltX, { damping: 25, stiffness: 200 });
  const smoothTiltY = useSpring(tiltY, { damping: 25, stiffness: 200 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);

      if (enableTilt && !shouldReduceMotion) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateXVal = ((y - centerY) / centerY) * -tiltMaxAngle;
        const rotateYVal = ((x - centerX) / centerX) * tiltMaxAngle;
        tiltX.set(rotateXVal);
        tiltY.set(rotateYVal);
      }
    },
    [mouseX, mouseY, tiltX, tiltY, enableTilt, tiltMaxAngle, shouldReduceMotion]
  );

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  const spotlightBg = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${smoothX}px ${smoothY}px, ${spotlightColor}, transparent 80%)`;
  const borderSpotlight = useMotionTemplate`radial-gradient(${spotlightSize * 0.75}px circle at ${smoothX}px ${smoothY}px, rgba(255, 255, 255, 0.28), transparent 70%)`;

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX: enableTilt && !shouldReduceMotion ? smoothTiltX : 0,
        rotateY: enableTilt && !shouldReduceMotion ? smoothTiltY : 0,
      }}
      className={cn(
        "relative rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md overflow-hidden transition-shadow duration-300 shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-neutral-900/50",
        className
      )}
      {...props}
    >
      {/* Interactive border glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 z-10"
        style={{
          background: borderSpotlight,
          opacity: isHovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Interactive interior spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: spotlightBg,
          opacity: isHovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 h-full w-full">{children}</div>
    </motion.div>
  );
}
