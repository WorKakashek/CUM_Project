"use client";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Cartdrawer } from "./cart-drawer";
import { useCartStore } from "@/store/cart";

type Props = { className?: string };

export function Cartbtn({ className }: Props) {
  const [totalAmount, items] = useCartStore((state) => [
    state.totalAmount,
    state.items,
  ]);
  return (
    <Cartdrawer>
      <Button className={cn(className, "group relative")}>
        <b>{totalAmount}</b>
        <span className=" h-full w-[1px] bg-gray-500 mx-3"></span>
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-1">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 translate-x-2 opacity-0 group-hover:opacity-1 group-hover:translate-x-0"
        />
      </Button>
    </Cartdrawer>
  );
}
