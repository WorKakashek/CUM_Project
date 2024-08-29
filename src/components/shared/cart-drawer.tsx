"use client";
import React, { PropsWithChildren, useEffect } from "react";

type Props = {};

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { ArrowRight } from "lucide-react";
import { Cartdraweritem } from "./cart-drawer-item";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";
import { useCart } from "../../../hooks/useCart";

export function Cartdrawer({ children }: PropsWithChildren) {
  const { items, removeCartItem, totalAmount } = useCart();
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className=" flex flex-col justify-between pb-0 bg-white">
        <SheetHeader>
          <SheetTitle>
            <span className="font-bold">{items.length}</span>&nbsp;In Cart
          </SheetTitle>
        </SheetHeader>
        <div className=" -mx-6 mt-5 overflow-auto flex-1 px-4 ">
          {items.map((item) => (
            <Cartdraweritem
              disabled={item.disabled}
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              price={item.price}
              name={item.name}
              onClickRemoveItem={() => removeCartItem(item.id)}
            />
          ))}
        </div>
        <SheetFooter className=" -mx-6 bg-white p-8">
          <div className=" w-full">
            <div className=" flex mb-4">
              <span className=" flex flex-1 text-lg text-neutral-500">
                Total Amount
                <div className=" flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className=" font-bold text-lg">{totalAmount} $</span>
            </div>
            <Link
              className={cn({
                " opacity-50 pointer-events-none": totalAmount <= 0,
              })}
              href={"/checkout"}
            >
              <Button
                variant={"outline"}
                type="submit"
                className="w-full h-12 text-base"
              >
                Order <ArrowRight className=" w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
