"use client";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import React from "react";

type Props = {
  className?: string;
};

const category = [
  { id: 1, name: "Humanoid" },
  { id: 2, name: "Weapon" },
  { id: 3, name: "Weachels" },
  { id: 4, name: "Monsters" },
];
export const Categories = ({ className }: Props) => {
  const categoryActiveID = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn(" inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {category.map(({ id, name }, index) => (
        <a
          key={index}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveID === id &&
              "bg-white shadow-md shadow-gray-500 text-primary"
          )}
          href={`/#${name}`}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
