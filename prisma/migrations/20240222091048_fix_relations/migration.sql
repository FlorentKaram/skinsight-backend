/*
  Warnings:

  - You are about to drop the column `patientId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `professionalId` on the `Conversation` table. All the data in the column will be lost.
  - Added the required column `dermatologistId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `generalistId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_professionalId_fkey";

-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "dermatologistId" TEXT,
ADD COLUMN     "generalistId" TEXT;

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "patientId",
DROP COLUMN "professionalId",
ADD COLUMN     "dermatologistId" TEXT NOT NULL,
ADD COLUMN     "generalistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_dermatologistId_fkey" FOREIGN KEY ("dermatologistId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_generalistId_fkey" FOREIGN KEY ("generalistId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_generalistId_fkey" FOREIGN KEY ("generalistId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_dermatologistId_fkey" FOREIGN KEY ("dermatologistId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
