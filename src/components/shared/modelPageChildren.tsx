"use client";
import React from "react";
import { notFound } from "next/navigation";
import { Container, Title } from "@/components/shared";
import { Rendered3dModel } from "@/components/renderedmodel";
import { Button } from "../ui";
import { useCartStore } from "@/store/cart";

type Props = { id: number; name: string; price: number };

export function ModelPageChildren({ id, name, price }: Props) {
  if (!id) return notFound();
  const addCartItem = useCartStore((state) => state.addCartItem);
  const addClick = (id: number): any => {
    addCartItem({
      productItemId: id,
    });
    console.log(name);
  };
  return (
    <>
      <div className="flex flex-1">
        <Rendered3dModel name={name} className="w-2/3" />
        <div className="w-1/3 bg-red-300 p-2 flex flex-col rounded-md">
          <Title text={name} size="md" className=" font-extrabold mb-1" />
          <p className=" text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            ut quaerat mollitia, natus hic quos tempora earum at consectetur
            assumenda, quam deleniti, in neque. Architecto cupiditate aliquam
            fugiat voluptatum dolorem?
          </p>
          <Button
            onClick={() => addClick(id)}
            className=" mt-auto"
            variant={"outline"}
          >
            Add to Cart {price + "$"}
          </Button>
        </div>
      </div>
    </>
  );
}
