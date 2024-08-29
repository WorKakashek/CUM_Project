"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/cart";
type Props = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
};
export function ModelCart({ className, imageUrl, id, name, price }: Props) {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);
  const [fetchCartItems, items] = useCartStore((state) => [
    state.fetchCartItems,
    state.items,
  ]);
  const onAddModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    addCartItem({
      productItemId: id,
    });
    fetchCartItems();
    console.log(imageUrl);
  };
  return (
    <div className={cn("", className)}>
      <Link href={`/model/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="rounded-lg" src={imageUrl} alt={name} />
        </div>
        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
        <p className="text-sm text-gray-300">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut natus
          earum odit minus vitae harum aliquam quisquam, voluptatem assumenda
          vel quibusdam hic quod rerum excepturi qui eos libero sapiente
          necessitatibus.
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            <b>{price}</b>
          </span>
        </div>
      </Link>
      {items.some((item) => item.name === name) ? (
        <Button variant={"outline"} className="text-base font-bold">
          In cart
        </Button>
      ) : (
        <Button
          onClick={onAddModel}
          variant={"outline"}
          className="text-base font-bold"
          loading={loading}
        >
          <Plus size={20} className="mr-1" />
          Add
        </Button>
      )}
    </div>
  );
}
