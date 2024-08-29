import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import crypto from "crypto";
import { findOrCreateCart } from "@/lib/find-or-create-cart";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amounf";

export interface CreateCartItemValues {
  productItemId: number;
}
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ items: [], totalAmount: 0 });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [
          {
            token,
          },
        ],
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
    return NextResponse.json(userCart);
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value;
    if (!token) {
      token = crypto.randomUUID();
    }
    const userCart = await findOrCreateCart(token);
    const data = (await req.json()) as CreateCartItemValues;
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
    });
    if (findCartItem) {
      return NextResponse.json("already in cart");
    }
    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        quantity: 1,
      },
    });
    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set("cartToken", token);

    return resp;
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Cart token not found" },
      { status: 404 }
    );
  }
}
