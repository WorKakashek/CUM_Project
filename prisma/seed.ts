import { Prisma, PrismaClient } from "@prisma/client";
import { prisma } from "./prisma-client";
import { categories, filters } from "./constants";

//генерация данных
async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User",
        email: "qeqwqwr@test.com",
        password: "",
        role: "USER",
        verificated: new Date(),
      },
      {
        fullName: "Admin",
        email: "Admin@test.com",
        password: "",
        role: "ADMIN",
        verificated: new Date(),
      },
    ],
  });
  await prisma.threeModelCategory.createMany({
    data: categories,
  });
  await prisma.filters.createMany({
    data: filters,
  });
  await prisma.threeModel.createMany({
    data: [
      {
        name: "Sword",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/d-modelshop.appspot.com/o/ModelImages%2FSword.png?alt=media&token=7cc18166-031c-4001-b34c-4d7e1579e701",
        price: 60,
        Model:
          "https://storage.cloud.google.com/bucket-threedmodelsshop/3dModelsFolder/4Bore.gltf",
        threeModelCategoryId: 2,
        filtersId: 1,
      },

      {
        name: "4Bore",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/d-modelshop.appspot.com/o/ModelImages%2F4Bore.png?alt=media&token=2ff7fc96-adee-468c-a65e-4c9242bf4422",
        price: 20,
        Model: "dermo",
        threeModelCategoryId: 2,
        filtersId: 2,
      },
      {
        name: "Teuthisan",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/d-modelshop.appspot.com/o/ModelImages%2FTeuthisan.png?alt=media&token=d2a813b3-6e52-44d8-93ea-06738b35b509",
        price: 110,
        Model: "dermo",
        threeModelCategoryId: 1,
        filtersId: 4,
      },
      {
        name: "SUV01",
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/d-modelshop.appspot.com/o/ModelImages%2FSUV01.png?alt=media&token=35ab0bc9-8fb8-4f4f-9d4b-424f6fc48526",
        price: 110,
        Model: "dermo",
        threeModelCategoryId: 3,
        filtersId: 4,
      },
    ],
  });
  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "11111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
    ],
  });
  await prisma.cartItem.createMany({
    data: [
      {
        productItemId: 1,
        cartId: 1,
        quantity: 2,
      },

      {
        productItemId: 1,
        cartId: 1,
        quantity: 2,
      },
    ],
  });
}

// удаление данных
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ThreeModel" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ThreeModelCategory" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Filters" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main().then(async () => {
  await prisma.$disconnect().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
});
