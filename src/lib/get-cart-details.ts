import { CartDTO } from "@/services/dto/cart.dto";
import { ICartItem } from "@/store/cart";
import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount";

interface ReturnProps {
  items: ICartItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.cartItem.map((item) => ({
    id: item.id,
    name: item.productItem.name,
    quantity: item.quantity,
    price: calcCartItemTotalAmount(item),
    imageUrl: item.productItem.imageUrl,
    disabled: false,
  }));

  return { items, totalAmount: data.totalAmount };
};
