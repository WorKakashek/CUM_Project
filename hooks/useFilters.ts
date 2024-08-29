import { Api } from "@/services/api-clients";
import { Filters } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

type FilterItem = {
  id: number;
  name: string;
};
interface iFilters {
  filters: FilterItem[];
  isLoading: boolean;
}
export const useFilters = (values: string[] = []): iFilters => {
  const [filters, setFilter] = useState<Filters[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      setIsLoading(true);
      Api.filters.getFilters().then((data) => {
        setFilter(data.map((item) => ({ id: item.id, name: item.name })));
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    filters,
    isLoading,
  };
};
