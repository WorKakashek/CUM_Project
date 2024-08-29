import { cn } from "@/lib/utils";
import React from "react";
import { Cartinfo } from "./cart-components/cart-info";
import { Trash2Icon } from "lucide-react";

type Props = {
  disabled?: boolean;
  id: number;
  imageUrl: string;
  price: number;
  name: string;
  className?: string;
  onClickRemoveItem: () => void;
};

export function Cartdraweritem({
  className,
  name,
  price,
  imageUrl,
  onClickRemoveItem,
  disabled,
}: Props) {
  return (
    <div
      className={cn(
        className,
        " flex rounded-lg bg-red-800 p-5 gap-6 mb-3 items-center",
        {
          " opacity-50 pointer-events-none": disabled,
        }
      )}
    >
      <Cartinfo name={name} price={price} image={imageUrl} />
      <Trash2Icon
        className=" text-gray-400 cursor-pointer hover:text-gray-600 "
        size={16}
        onClick={onClickRemoveItem}
      />
    </div>
  );
}
