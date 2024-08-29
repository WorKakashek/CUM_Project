"use client";
import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF } from "@react-three/drei";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from "@firebase/app";
import { firebaseConfig } from "@/app/firebaseConfig";

interface ThreeModelProps {
  name?: string;
  className?: string;
}
initializeApp(firebaseConfig);

const ModelLoader = ({ modelUrl }: { modelUrl: string }) => {
  const { scene } = useGLTF(modelUrl);

  return <primitive object={scene} />;
};

export const Rendered3dModel = ({ name, className }: ThreeModelProps) => {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModelUrl = async () => {
      try {
        const storage = getStorage();
        const url = await getDownloadURL(ref(storage, `models/${name}.glb`));
        setModelUrl(url);
      } catch (err) {
        console.error("Error fetching model URL: ", err);
        setError("Failed to load model");
      }
    };

    if (name) {
      fetchModelUrl();
    }
  }, [name]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!modelUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className={className}>
      <Canvas shadows camera={{ position: [2, 2, 10], fov: 20 }}>
        <ambientLight intensity={5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Center>
          <ModelLoader modelUrl={modelUrl} />
        </Center>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.2}
          enablePan={false}
          enableZoom={true}
          minPolarAngle={Math.PI / 2.1}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Canvas>
    </div>
  );
};
