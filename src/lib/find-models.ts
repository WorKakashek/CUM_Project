import { prisma } from "../../prisma/prisma-client";

export interface GetSearchParams {
  min?: number;
  max?: number;
  name?: string;
  sortBy?: string;
  filter?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000;

export const findModels = async (searchParams: GetSearchParams) => {
  const filters = searchParams.filter?.split(",").map(Number);

  const minPrice = Number(searchParams.min) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(searchParams.max) || DEFAULT_MAX_PRICE;

  const categories = await prisma.threeModelCategory.findMany({
    include: {
      threemodel: {
        orderBy: {
          id: "desc",
        },
        where: {
          filtersId: { in: filters },
          price: { gte: minPrice, lte: maxPrice },
        },
        include: {
          Filters: true,
        },
      },
    },
  });
  return categories;
};
