import { Cart, CartItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
  productItem: {
    disabled: boolean;
    price: CartItemDTO;
    imageUrl: any;
    name: any;
    product: {
      name: string;
      imageUrl: string;
      price: number;
    };
  };
};

export interface CartDTO extends Cart {
  cartItem: CartItemDTO[];
}
