import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";

interface iHeader {
  className?: string;
}

export const Footer = ({ className }: iHeader) => {
  return (
    <footer className={cn("border border-b ", className)}>
      <Container className="flex justify-center bg-black">
        <span className=" text-white">
          This application is created for educational purposes.
        </span>
      </Container>
    </footer>
  );
};
