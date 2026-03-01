"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

function latitudeRings() {
  const rings: THREE.Vector3[][] = [];
  const latitudes = [
    -Math.PI / 3,
    -Math.PI / 6,
    0,
    Math.PI / 6,
    Math.PI / 3,
  ];

  latitudes.forEach((theta) => {
    const radius = Math.cos(theta);
    const y = Math.sin(theta);
    const points: THREE.Vector3[] = [];

    for (let index = 0; index <= 100; index += 1) {
      const phi = (index / 100) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(phi) * radius, y, Math.sin(phi) * radius));
    }

    rings.push(points);
  });

  return rings;
}

function longitudeRings() {
  const rings: THREE.Vector3[][] = [];

  for (let ringIndex = 0; ringIndex < 6; ringIndex += 1) {
    const phase = (ringIndex / 6) * Math.PI * 2;
    const points: THREE.Vector3[] = [];

    for (let index = 0; index <= 100; index += 1) {
      const theta = (index / 100) * Math.PI;
      const x = Math.sin(theta) * Math.cos(phase);
      const y = Math.cos(theta);
      const z = Math.sin(theta) * Math.sin(phase);
      points.push(new THREE.Vector3(x, y, z));
    }

    rings.push(points);
  }

  return rings;
}

function SphereTopology() {
  const latRings = useMemo(() => latitudeRings(), []);
  const lonRings = useMemo(() => longitudeRings(), []);

  return (
    <group>
      <Sphere args={[1.04, 56, 56]}>
        <meshBasicMaterial color="#f4ff33" wireframe transparent opacity={0.72} />
      </Sphere>

      {latRings.map((points, index) => (
        <Line key={`lat-${index}`} points={points} color="#f4ff33" lineWidth={1} transparent opacity={0.72} />
      ))}

      {lonRings.map((points, index) => (
        <Line key={`lon-${index}`} points={points} color="#f4ff33" lineWidth={1} transparent opacity={0.72} />
      ))}
    </group>
  );
}

export default function TopologySphere() {
  return (
    <motion.div
      className="relative h-[140px] w-full overflow-hidden border border-zzz-yellow/45 bg-black/92"
      initial={{ opacity: 0, y: 22, rotate: -1.2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      style={{
        clipPath:
          "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
      }}
      aria-label="Signal Core topology"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,transparent_0%,rgba(244,255,51,0.08)_46%,transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(244,246,248,0.05)_0_1px,transparent_1px_10px)]" />

      <div className="h-full w-full">
        <Canvas camera={{ position: [0, 0, 3], fov: 48 }}>
          <ambientLight intensity={0.35} />
          <SphereTopology />
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.85}
            rotateSpeed={0.8}
            dampingFactor={0.12}
          />
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-0 border border-unbeatable-white/12" />
    </motion.div>
  );
}
