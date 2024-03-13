/*
  Warnings:

  - You are about to drop the column `file` on the `Consultation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consultation" DROP COLUMN "file",
ADD COLUMN     "files" TEXT[];
