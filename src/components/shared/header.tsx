import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "../ui";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Searchinput } from "./searchinput";
import { Cartbtn } from "./cart-btn";

interface iHeader {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

export const Header = ({
  className,
  hasSearch = true,
  hasCart = true,
}: iHeader) => {
  return (
    <header className={cn("border-b ", className)}>
      <Container className="flex justify-center bg-black">
        <span className=" text-white">
          This application is created for educational purposes.
        </span>
      </Container>
      <Container className="flex items-center justify-between py-8">
        {/* Left Side */}
        <Link href={"/"}>
          <div className="flex items-center gap-4">
            <Image src={"/logo.png"} alt="Logo" width={32} height={32} />
            <div>
              <h1 className="text-2xl uppercase font-black">CUM</h1>
              <p className=" text-sm text-gray-500 leading-3">
                Create Uor Mind
              </p>
            </div>
          </div>
        </Link>
        {/* Middle Side */}
        {hasSearch && (
          <div className="mx-10 flex-1">
            <Searchinput />
          </div>
        )}
        {/* Right Side */}
        <div className=" flex items-center gap-3">
          <Button variant={"outline"}>Sign In</Button>
          {hasCart && <Cartbtn />}
        </div>
      </Container>
    </header>
  );
};
