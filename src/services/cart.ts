import { Cart } from "@prisma/client";
import { axiosInstance } from "./axios-instanse";
import { CartDTO } from "./dto/cart.dto";
import { CreateCartItemValues } from "@/app/api/cart/route";

export const fetchCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>("api/cart");
  return data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>("api/cart" + `/${id}`);
  return data;
};

export const addCartItem = async (
  item: CreateCartItemValues
): Promise<CartDTO> => {
  const { data } = await axiosInstance.post<CartDTO>("api/cart", item);
  return data;
};
