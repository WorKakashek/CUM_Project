"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckBox } from "./filerchecbox";
import { Input, Skeleton } from "../ui";

type Item = FilterChecboxProps;

type Props = {
  className?: string;
  title: string;
  name?: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  seacrhInputPlaceholder?: string;
  onClickChekBox?: (id: string) => void;
  defaultValue?: string[];
  isLoading?: boolean;
  selectedFilter?: Set<string>;
};

export function CheckBoxFiltersGroup({
  className,
  title,
  items,
  defaultValue,
  defaultItems,
  limit = 5,
  onClickChekBox,
  seacrhInputPlaceholder = "Search...",
  isLoading,
  selectedFilter,
  name,
}: Props) {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems?.slice(0, limit);
  const onChangeSearchInput = (value: any) => {
    setSearchValue(value);
  };

  if (isLoading) {
    return (
      <div className={cn("", className)}>
        <p className=" font-bold mb-3">{title}</p>
        {...Array(limit)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-5 rounded-md" />
          ))}
      </div>
    );
  }
  return (
    <div className={cn("", className)}>
      <p className=" font-bold mb-3">{title}</p>
      {showAll && (
        <div className=" mb-5">
          <Input
            onChange={(e) => onChangeSearchInput(e.target.value)}
            placeholder={seacrhInputPlaceholder}
            className="bg-gray-400 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckBox
            onCheckedChange={() => onClickChekBox?.(item.value)}
            checked={selectedFilter?.has(item.value)}
            key={String(item.value)}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            name={name}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-200 mt-4" : ""}>
          <button
            className=" text-primary mt-3"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Hide" : "Show All"}
          </button>
        </div>
      )}
    </div>
  );
}
