"use client";
import { Container, Title } from "@/components/shared";
import { Cartdraweritem } from "@/components/shared/cart-drawer-item";
import { ChekoutCart } from "@/components/shared/ChekoutCart";
import React, { useState } from "react";
import { useCart } from "../../../../hooks/useCart";
import { FormInput } from "@/components/shared/form-components/form-input";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckoutFormSchema,
  checkoutFormSchema,
} from "@/components/shared/form-components/shemas/checkout-form-schema";
import { createOrder } from "@/app/actions";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ChekoutPaymentForm } from "@/components/shared/chekout-payment-form";

type Props = {};

export default function Chekout({}: Props) {
  const [submiting, setSubmiting] = useState(false);
  const { items, removeCartItem, totalAmount, loading } = useCart();
  const form = useForm<CheckoutFormSchema>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  const stripePromise = loadStripe(
    "pk_test_51PsMbwL9aGtJbaT6NfFQXq9peAwz91utLrWsMyqdi61Qm5RH56ZfeRmTNYQzGUZfXx3IwjWYczg6F3xpnS6ryw6Y000hcVN8pw"
  );
  const formSubmit: SubmitHandler<CheckoutFormSchema> = async (data) => {
    try {
      setSubmiting(true);
      // const url = await createOrder(data);
      // //@ts-ignore
      // // if (url) {
      // //   location.href = url;
      // // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className=" mt-5">
      <Title text="Checkout" size="xl" className=" font-extrabold mb-8" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)}>
          <div className="flex gap-10">
            <div className=" flex flex-col gap-10 w-[450px]">
              <ChekoutCart title={`1.Cart `}>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <div className="flex flex-col gap-5">
                    {items.map((item) => (
                      <Cartdraweritem
                        disabled={item.disabled}
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        price={item.price}
                        name={item.name}
                        onClickRemoveItem={() => removeCartItem(item.id)}
                      />
                    ))}
                  </div>
                )}
              </ChekoutCart>

              <ChekoutCart title="2.Personal Information">
                <div className="grid grid-cols-2 gap-5">
                  <FormInput
                    name="firstName"
                    className="text-base"
                    placeholder="Name"
                  />
                  <FormInput
                    name="lastName"
                    className="text-base"
                    placeholder="Surname"
                  />
                  <FormInput
                    name="email"
                    className="text-base"
                    placeholder="E-Mail"
                  />
                  <FormInput
                    name="phone"
                    className="text-base"
                    placeholder="phone"
                  />
                </div>
              </ChekoutCart>
            </div>
            <div className="w-[450px]">
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: totalAmount,
                  currency: "eur",
                }}
              >
                <ChekoutPaymentForm
                  submiting={submiting}
                  amount={totalAmount}
                />
              </Elements>
              {/* <ChekoutCart className="p-6 sticky top-4">
                <div className="flex my-4">
                  <span className="flex flex-1 text-lg text-neutral-500">
                    Total price
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
                  </span>
                  <span className="font-bold text-lg">{totalAmount}</span>
                </div>
              </ChekoutCart>
              <Button
                loading={submiting}
                className={" w-full h-14 rounded-2xl mt-6 text-base font-bold"}
                type="submit"
              >
                Payment
                <ArrowRight width={20} height={20} className=" ml-2" />
              </Button> */}
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
