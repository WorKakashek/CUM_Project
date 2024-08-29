import { prisma } from "../../prisma/prisma-client";
import { calcCartItemTotalAmount } from "./calc-cart-item-total-amount";

export const updateCartTotalAmount = async (token: string) => {
  const userCart = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      cartItem: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productItem: true,
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  const totalAmount = userCart.cartItem.reduce((acc, item) => {
    //@ts-ignore
    return acc + calcCartItemTotalAmount(item);
  }, 0);

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
    },
    include: {
      cartItem: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          productItem: true,
        },
      },
    },
  });
};
