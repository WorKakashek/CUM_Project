import { NextRequest, NextResponse } from "next/server";
import React from "react";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.log(err);
  }
}
