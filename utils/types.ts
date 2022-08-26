import { Prisma } from "@prisma/client";
import { prisma } from "db";

export type Bill = Prisma.PromiseReturnType<typeof prisma.bill.create>;
export type BillItem = Prisma.PromiseReturnType<typeof prisma.billItem.create>;
export type Consumable = Prisma.PromiseReturnType<typeof prisma.consumable.create>;
export type InventoryItem = Prisma.PromiseReturnType<
  typeof prisma.inventoryItem.create
>;
export type Recipe = Prisma.PromiseReturnType<typeof prisma.recipe.create>;
export type Recipe_Ingredient = Prisma.PromiseReturnType<
  typeof prisma.recipe_Ingredient.create
>;
export type User = Prisma.PromiseReturnType<typeof prisma.user.create>;