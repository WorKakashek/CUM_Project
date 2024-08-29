import React from "react";

import { notFound } from "next/navigation";
import { Container, Title } from "@/components/shared";
import { ModelPageChildren } from "@/components/shared/modelPageChildren";
import { useCartStore } from "@/store/cart";
import { prisma } from "../../../../../prisma/prisma-client";

type Props = {};

export default async function ModelPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const model = await prisma.threeModel.findFirst({
    where: { id: Number(id) },
  });
  if (!model) return notFound();
  return (
    <Container className=" flex flex-col my-4 h-96">
      <ModelPageChildren id={model.id} name={model.name} price={model.price} />
    </Container>
  );
}
