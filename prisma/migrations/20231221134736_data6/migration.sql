/*
  Warnings:

  - You are about to drop the column `categoryId` on the `products_table` table. All the data in the column will be lost.
  - You are about to drop the `categories_table` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `products_table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products_table" DROP CONSTRAINT "products_table_categoryId_fkey";

-- AlterTable
ALTER TABLE "products_table" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "categories_table";
