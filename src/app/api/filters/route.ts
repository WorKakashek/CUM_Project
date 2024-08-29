import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
  const filters = await prisma.filters.findMany();

  return NextResponse.json(filters);
}
