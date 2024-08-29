"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Title } from "./title";
import { FilterCheckBox } from "./filerchecbox";
import { Input, Slider } from "../ui";
import { RangeSlider } from "./rangeslider";
import { CheckBoxFiltersGroup } from "./check-box-filters-group";
import { useFilters } from "../../../hooks/useFilters";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";
import { useStateFilters } from "../../../hooks/useStateFilter";
import { useQueryFilters } from "../../../hooks/useQueryFilters";

type Props = { className?: string };

export function Filters({ className }: Props) {
  const { filters, isLoading } = useFilters();
  const filterState = useStateFilters();
  useQueryFilters(filterState);

  const filtersArr = filters.map((item) => ({
    text: item.name,
    value: String(item.id),
  }));

  return (
    <div className={cn("", className)}>
      <Title text="Filters" size="sm" className=" mb-5 font-bold" />
      <div className=" flex flex-col gap-4">
        <FilterCheckBox name="to" text="Evaleble" value="1" />
        <FilterCheckBox name="do" text="New" value="2" />
      </div>
      {/* price filter */}
      <div className=" mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className=" font-bold mb-3">Prise</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={30000}
            defaultValue={0}
            value={String(filterState.price.min || "0")}
            onChange={(e) =>
              filterState.setPrice("min", Number(e.target.value))
            }
          />
          <Input
            type="number"
            placeholder="1000"
            min={100}
            max={1000}
            value={String(filterState.price.max || "1000")}
            onChange={(e) =>
              filterState.setPrice("max", Number(e.target.value))
            }
            defaultValue={1000}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filterState.price.min || 0, filterState.price.max || 1000]}
          onValueChange={(prices: number[]) => {
            filterState.setPrice("min", prices[0]);
            filterState.setPrice("max", prices[1]);
          }}
        />
      </div>
      <CheckBoxFiltersGroup
        className="mt-5"
        title={"Filters"}
        items={filtersArr}
        limit={3}
        defaultItems={filtersArr}
        isLoading={isLoading}
        onClickChekBox={filterState.selectedFilters}
        selectedFilter={filterState.selectedFilter}
        name="Filters"
      />
    </div>
  );
}
