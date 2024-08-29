"use client";
import React, { useEffect, useState } from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ModelCart } from "./modelcart";
import { useIntersection } from "react-use";
import { useCategoryStore } from "@/store/category";

type Props = {
  title: string;
  models: any[];
  className?: string;
  listClassName?: string;
  categoryId: number;
};
export function ModelsGroupList({
  title,
  models,
  className,
  listClassName,
  categoryId,
}: Props) {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
      console.log(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className=" font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {models.map((model, i) => (
          <ModelCart
            key={model.id}
            id={model.id}
            name={model.name}
            price={model.price}
            imageUrl={model.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
