//server actions
"use server";

import { CheckoutFormSchema } from "@/components/shared/form-components/shemas/checkout-form-schema";
import { prisma } from "../../prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/send-email";
import { PayOrderTemplate } from "@/components/shared/email-template/prepare-order";

export async function createOrder(data: CheckoutFormSchema) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;
    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItem: true,
      },
      where: {
        token: cartToken,
      },
    });
    if (!userCart) {
      throw new Error("Cart not found");
    }
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        items: JSON.stringify(userCart.cartItem),
        status: OrderStatus.PENDING,
        totalAmount: userCart.totalAmount,
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    await sendEmail(
      data.email,
      "CUM / Order Payment /#" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentLink: "https://www.google.com",
      })
    );
  } catch (error) {
    console.log("createOrder server error", error);
  }
}
