/*
  Warnings:

  - You are about to drop the column `files` on the `Consultation` table. All the data in the column will be lost.
  - Added the required column `file` to the `Consultation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consultation" DROP COLUMN "files",
ADD COLUMN     "file" TEXT NOT NULL;
