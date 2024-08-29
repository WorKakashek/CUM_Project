import { ThreeModel } from "@prisma/client";
import { axiosInstance } from "./axios-instanse";
import { ApiRoutes } from "./constants";

export const search = async (query: string) => {
  const { data } = await axiosInstance.get<ThreeModel[]>(
    ApiRoutes.SEARCH_PRODUCTS,
    {
      params: { query },
    }
  );
  return data;
};
