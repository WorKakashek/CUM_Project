import { CartItemDTO } from "@/services/dto/cart.dto";

export const calcCartItemTotalAmount = (item: CartItemDTO): number => {
  //@ts-ignore
  return item.productItem.price * item.quantity;
};
