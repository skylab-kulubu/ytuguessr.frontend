"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function CylPanorama({ imageUrl }) {
  const tex = useLoader(THREE.TextureLoader, imageUrl);
  tex.wrapS = THREE.ClampToEdgeWrapping;   // sağ-sol uçlar birleşsin
  tex.wrapT = THREE.ClampToEdgeWrapping;   // üst-alt kesilmesin

  return (
    <mesh rotation={[0, Math.PI, 0]}>
      {/* radius, height, radialSegs, heightSegs, openEnded=true  */}
      <cylinderGeometry args={[500, 500, 350, 128, 1, true]} />
      <meshBasicMaterial map={tex} side={THREE.BackSide} />
    </mesh>
  );
}


export default function PanoramaViewer({ imageUrl }) {
  if (!imageUrl) return (<div className="bg-black" />);

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
      <Canvas
        className="!w-full !h-full !block"
        camera={{ fov: 35, position: [0, 0, 0.1] }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <CylPanorama imageUrl={imageUrl} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.1}
          rotateSpeed={-0.3}
          autoRotate={false}
          minPolarAngle={Math.PI / 2 - THREE.MathUtils.degToRad(1.5)}
          maxPolarAngle={Math.PI / 2 + THREE.MathUtils.degToRad(1.5)}
        />
      </Canvas>
    </div>
  );
}
