import { Canvas } from "@react-three/fiber";
import { OrbitControls, Edges } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

function Building() {
  const buildingArgs: [number, number, number] = useMemo(() => [4, 2, 3], []);

  return (
    <group>
      {/* Main Building Body */}
      <mesh>
        <boxGeometry args={buildingArgs} />
        <meshBasicMaterial
          color="#2D4A3E"
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
        <Edges
          scale={1}
          threshold={15} // Display edges only when the angle between faces exceeds this value
          color="#4A6F5F"
        />
      </mesh>

      {/* Grid Pattern Effect (simulated with another mesh or texture, here omitted for simplicity/performance in wireframe style) */}

      {/* Interior Glow (Fake) */}
      <mesh scale={[0.95, 0.95, 0.95]}>
        <boxGeometry args={buildingArgs} />
        <meshBasicMaterial color="#5A8A70" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export function Building3D() {
  return (
    <div className="h-full w-full min-h-[200px]">
      <Canvas camera={{ position: [5, 5, 5], fov: 45 }}>
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Building />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
