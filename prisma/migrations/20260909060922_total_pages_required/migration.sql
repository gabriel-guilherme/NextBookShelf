/*
  Warnings:

  - Made the column `totalPages` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "totalPages" SET NOT NULL,
ALTER COLUMN "totalPages" SET DEFAULT 1;
