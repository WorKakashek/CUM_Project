import { Filters } from "@prisma/client";
import { axiosInstance } from "./axios-instanse";
import { ApiRoutes } from "./constants";

export const getFilters = async () => {
  const { data } = await axiosInstance.get<Filters[]>(ApiRoutes.FILTERS);
  return data;
};
