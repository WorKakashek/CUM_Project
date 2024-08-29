"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Rendered3dModel } from "@/components/renderedmodel";

const page = (props: any) => {
  return <Rendered3dModel />;
};

export default page;
