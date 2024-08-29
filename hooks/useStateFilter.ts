import { useRouter, useSearchParams } from "next/navigation";
import { useFilters } from "./useFilters";
import { useSet } from "react-use";
import { useState } from "react";
import { useQueryFilters } from "./useQueryFilters";

export interface PriceRange {
  min?: number;
  max?: number;
}

export interface FiltersProps extends PriceRange {
  filters: string;
}

interface returnProps extends useQueryFilters {
  setPrice: (name: keyof PriceRange, value: number) => void;
  selectedFilters: (key: string) => void;
}

export const useStateFilters = (): returnProps => {
  const searcParams = useSearchParams();
  const [selectedFilter, { toggle }] = useSet(
    new Set<string>(searcParams.get("filters")?.split(","))
  );

  const [price, setPrice] = useState<PriceRange>({
    min: Number(searcParams.get("min")) || undefined,
    max: Number(searcParams.get("max")) || undefined,
  });

  const priceUpdate = (name: keyof PriceRange, value: number) => {
    setPrice((prev) => ({ ...prev, [name]: value }));
  };

  return {
    selectedFilter,
    price,
    setPrice: priceUpdate,
    selectedFilters: toggle,
  };
};
