-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'VIP', 'BARTENDER', 'USER');

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alcoholPercentage" DOUBLE PRECISION NOT NULL,
    "allergens" TEXT[],
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "unitsAvailable" INTEGER NOT NULL,
    "isOnMenu" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consumable" (
    "id" SERIAL NOT NULL,
    "inventoryItemId" INTEGER,
    "recipeId" INTEGER,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Consumable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alcoholPercentage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillItem" (
    "id" SERIAL NOT NULL,
    "billId" TEXT NOT NULL,
    "consumableId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "extras" TEXT[],

    CONSTRAINT "BillItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "balance" INTEGER NOT NULL,
    "paymentid" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe_Ingredient" (
    "id" SERIAL NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "inventoryItemId" INTEGER NOT NULL,

    CONSTRAINT "Recipe_Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Consumable_inventoryItemId_key" ON "Consumable"("inventoryItemId");

-- CreateIndex
CREATE UNIQUE INDEX "Consumable_recipeId_key" ON "Consumable"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Bill_userId_key" ON "Bill"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BillItem_billId_key" ON "BillItem"("billId");

-- CreateIndex
CREATE UNIQUE INDEX "BillItem_consumableId_key" ON "BillItem"("consumableId");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_Ingredient_recipeId_key" ON "Recipe_Ingredient"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_Ingredient_inventoryItemId_key" ON "Recipe_Ingredient"("inventoryItemId");

-- AddForeignKey
ALTER TABLE "Consumable" ADD CONSTRAINT "Consumable_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consumable" ADD CONSTRAINT "Consumable_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillItem" ADD CONSTRAINT "BillItem_billId_fkey" FOREIGN KEY ("billId") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillItem" ADD CONSTRAINT "BillItem_consumableId_fkey" FOREIGN KEY ("consumableId") REFERENCES "Consumable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Ingredient" ADD CONSTRAINT "Recipe_Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe_Ingredient" ADD CONSTRAINT "Recipe_Ingredient_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
