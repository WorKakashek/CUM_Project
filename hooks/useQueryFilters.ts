import { useEffect } from "react";
import { FiltersProps, PriceRange } from "./useStateFilter";
import qs from "qs";
import { useRouter } from "next/navigation";

export interface useQueryFilters {
  price: PriceRange;
  selectedFilter: Set<string>;
}

export const useQueryFilters = (filterState: useQueryFilters) => {
  const router = useRouter();
  useEffect(() => {
    const params = {
      ...filterState.price,
      filter: Array.from(filterState.selectedFilter),
    };

    const queryString = qs.stringify(params, {
      arrayFormat: "comma",
    });
    router.push(`?${queryString}`, {
      scroll: false,
    });
  }, [filterState.price, filterState.selectedFilter]);
};
