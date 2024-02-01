/*
  Warnings:

  - Added the required column `key` to the `Consultation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "approved" SET DEFAULT true;
