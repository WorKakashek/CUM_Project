import { cn } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Props {
  name: string;
  price: number;
  image: string;
  className?: string;
}

export function Cartinfo({ name, price, image, className }: Props) {
  return (
    <div className={cn("flex  items-center justify-between gap-4", className)}>
      <img
        src={image}
        alt={name}
        width={70}
        height={70}
        className="rounded-full"
      />
      <hr className=" my-3" />
      <div className="flex flex-col">
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
        <p className="text-sm">{price} Eur</p>
      </div>
    </div>
  );
}
