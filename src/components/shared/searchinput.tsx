"use client";
import { cn } from "@/lib/utils";
import { Api } from "@/services/api-clients";
import { ThreeModel } from "@prisma/client";
import { Divide, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";

type Props = {
  className?: string;
};

export function Searchinput({ className }: Props) {
  const [focused, setFocused] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [models, setModels] = useState<ThreeModel[]>([]);

  const ref = useRef(null);
  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    () => {
      Api.products.search(inputQuery).then((items) => setModels(items));
    },
    250,
    [inputQuery]
  ); // выполняется через каждые 250 ms

  const onClickItem = () => {
    setFocused(false);
    setInputQuery("");
    setModels([]);
  };
  return (
    <>
      {focused && (
        <div className=" fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className=" absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className=" rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Search..."
          onFocus={() => setFocused(true)}
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
        />
        <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12"
          )}
        >
          {models.map((model) => (
            <Link
              key={model.id}
              href={`/model/${model.id}`}
              className="flex items-center gap-5 w-full px-3 py-2 hover:bg-primary/10"
              onClick={onClickItem}
            >
              <Image
                className="rounded-sm"
                src={model.imageUrl}
                width={32}
                height={32}
                alt={model.name}
              />
              <span>{model.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
