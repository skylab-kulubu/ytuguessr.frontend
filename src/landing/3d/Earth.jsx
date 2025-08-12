import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Vector3 } from "three";

// Preload the GLTF model
useGLTF.preload("/3d/planet/scene.gltf");

// Kamera kontrolü için component
const CameraController = ({ scrollProgress = 0 }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    // Güvenlik kontrolü
    if (typeof scrollProgress !== 'number' || isNaN(scrollProgress) || !isFinite(scrollProgress)) {
      return;
    }
    
    // Scroll progress'i 0-1 arasında sınırla
    const safeProgress = Math.max(0, Math.min(1, scrollProgress));
    
    try {
      // Başlangıç pozisyonu: Sol alt köşede dünyayı görmek için
      const startPosition = new Vector3(4, 2, 5); // Sol alt köşede dünya görünsün
      // Bitiş pozisyonu: Dünyanın ortasına doğru
      const endPosition = new Vector3(-6.5, -8, -1); // Dünyanın ortasına yakın
      
      // Scroll progress'e göre interpolasyon
      const currentPosition = startPosition.clone().lerp(endPosition, safeProgress);
      
      // LookAt hedefi de değişsin - dünyanın merkezine doğru
      const startLookAt = new Vector3(-2, -1, 0); // Başlangıçta dünyanın bulunduğu pozisyon
      const endLookAt = new Vector3(-2, -1, 0); // Dünyanın merkezi
      const currentLookAt = startLookAt.clone().lerp(endLookAt, safeProgress);
      
      // NaN kontrolü - daha güvenli
      if (isNaN(currentPosition.x) || isNaN(currentPosition.y) || isNaN(currentPosition.z) ||
          isNaN(currentLookAt.x) || isNaN(currentLookAt.y) || isNaN(currentLookAt.z)) {
         return;
      }
      
      camera.position.copy(currentPosition);
      camera.lookAt(currentLookAt); // Dünyanın merkezine bak
      camera.updateProjectionMatrix();
    } catch (error) {
      // Sessiz hata yakalama
    }
  }, [camera, scrollProgress]);
  
  return null;
};

const Earth = () => {
  const meshRef = useRef();
  
  // GLTF model'ini yükle
  const gltf = useGLTF("/3d/planet/scene.gltf");
  
  // Model yüklendikten sonra geometri kontrolü
  useEffect(() => {
    if (gltf?.scene && meshRef.current) {
      // Tüm mesh'leri kontrol et ve geometriyi düzelt
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.geometry) {
          try {
            // Geometry attributes'ları kontrol et
            if (child.geometry.attributes.position) {
              const positionArray = child.geometry.attributes.position.array;
              let hasInvalidValues = false;
              
              // NaN veya Infinity değerlerini kontrol et
              for (let i = 0; i < positionArray.length; i++) {
                if (!isFinite(positionArray[i])) {
                  positionArray[i] = 0;
                  hasInvalidValues = true;
                }
              }
              
              if (hasInvalidValues) {
                child.geometry.attributes.position.needsUpdate = true;
              }
              
              // Bounding sphere'i güvenli şekilde hesapla
              child.geometry.computeBoundingSphere();
              child.geometry.computeBoundingBox();
            }
          } catch (error) {
            // Sessiz hata yakalama
          }
        }
      });
    }
  }, [gltf]);

  useFrame((state, delta) => {
    if (meshRef.current && typeof delta === 'number' && !isNaN(delta) && isFinite(delta) && delta > 0) {
      const rotationSpeed = 0.15 * delta;
      if (typeof rotationSpeed === 'number' && !isNaN(rotationSpeed) && isFinite(rotationSpeed)) {
        meshRef.current.rotation.y += rotationSpeed;
        
        // Geometri bozulma kontrolü
        if (meshRef.current.geometry && meshRef.current.geometry.attributes) {
          const position = meshRef.current.geometry.attributes.position;
          if (position && position.array) {
            // NaN değerler varsa geometriyi yeniden hesapla
            const hasNaN = position.array.some(val => isNaN(val));
            if (hasNaN) {
              try {
                meshRef.current.geometry.computeBoundingSphere();
              } catch (e) {
                // Sessiz hata yakalama
              }
            }
          }
        }
      }
    }
  });

  // Model kontrolü
  if (!gltf?.scene) {
    return null;
  }

  // NaN pozisyon ve geometri sorununu çöz
  const fixNaNValues = (obj) => {
    if (obj.position) {
      obj.position.x = isNaN(obj.position.x) ? 0 : obj.position.x;
      obj.position.y = isNaN(obj.position.y) ? 0 : obj.position.y;
      obj.position.z = isNaN(obj.position.z) ? 0 : obj.position.z;
    }
    if (obj.rotation) {
      obj.rotation.x = isNaN(obj.rotation.x) ? 0 : obj.rotation.x;
      obj.rotation.y = isNaN(obj.rotation.y) ? 0 : obj.rotation.y;
      obj.rotation.z = isNaN(obj.rotation.z) ? 0 : obj.rotation.z;
    }
    if (obj.scale) {
      obj.scale.x = isNaN(obj.scale.x) ? 1 : obj.scale.x;
      obj.scale.y = isNaN(obj.scale.y) ? 1 : obj.scale.y;
      obj.scale.z = isNaN(obj.scale.z) ? 1 : obj.scale.z;
    }
    
    // Geometry kontrolü ve düzeltmesi
    if (obj.geometry && obj.geometry.attributes && obj.geometry.attributes.position) {
      const positions = obj.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i++) {
        if (isNaN(positions[i])) {
          positions[i] = 0;
        }
      }
      obj.geometry.attributes.position.needsUpdate = true;
      
      // Bounding sphere'i yeniden hesapla
      try {
        obj.geometry.computeBoundingSphere();
      } catch (error) {
        // Sessiz hata yakalama
      }
    }
    
    if (obj.children) {
      obj.children.forEach(child => fixNaNValues(child));
    }
  };

  // Model yüklendikten sonra NaN değerleri düzelt
  React.useEffect(() => {
    if (gltf.scene) {
      try {
        fixNaNValues(gltf.scene);
      } catch (error) {
        // Sessiz hata yakalama
      }
    }
  }, [gltf.scene]);

  return (
    <group ref={meshRef} position={[-0.5, -2, 1]}> {/* Dünyayı sol alt bölgeye kaydır */}
      <primitive 
        object={gltf.scene} 
        scale={1.8} 
        position={[0, 0, 0]} 
      />
    </group>
  );
};

const FixedEarthCanvas = ({ scrollProgress = 0 }) => {
  // ScrollProgress güvenlik kontrolü
  const safeScrollProgress = typeof scrollProgress === 'number' && !isNaN(scrollProgress) && isFinite(scrollProgress) 
    ? Math.max(0, Math.min(1, scrollProgress)) 
    : 0;

  // Canvas hata yakalama
  const handleCanvasError = (error) => {
    // Sessiz hata yakalama
  };

  return (
    <Canvas
      onError={handleCanvasError}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false
      }}
      camera={{
        fov: 55,
        near: 0.1,
        far: 200,
        position: [4, -3, 5],
      }}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <Suspense fallback={null}>
        <CameraController scrollProgress={safeScrollProgress} />
        <OrbitControls
          autoRotate={false}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
        <Earth />
        <ambientLight intensity={0.5} />
        <directionalLight position={[6, 6, 4]} intensity={0.8} />
        <directionalLight position={[-3, -3, -2]} intensity={0.4} />
        <pointLight position={[0, 0, 5]} intensity={0.3} />
      </Suspense>
    </Canvas>
  );
};

export default FixedEarthCanvas;
