/*
  Warnings:

  - You are about to drop the column `appointmentId` on the `Consultation` table. All the data in the column will be lost.
  - Made the column `consultationId` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_appointmentId_fkey";

-- DropIndex
DROP INDEX "Consultation_appointmentId_key";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "consultationId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Consultation" DROP COLUMN "appointmentId";

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
