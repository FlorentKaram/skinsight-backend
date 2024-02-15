/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Consultation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `object` to the `Consultation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_consultationId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "evolution" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "files" TEXT[],
ADD COLUMN     "object" TEXT NOT NULL;

-- DropTable
DROP TABLE "Document";
