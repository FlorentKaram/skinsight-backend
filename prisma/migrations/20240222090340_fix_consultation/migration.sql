/*
  Warnings:

  - You are about to drop the column `key` on the `Consultation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consultation" DROP COLUMN "key",
ADD COLUMN     "criticality" "Criticality";
