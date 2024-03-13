/*
  Warnings:

  - The values [IN_PROGRESS,TERMINATED,CANCELED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'ANALYZED', 'APPOINTMENT');
ALTER TABLE "Consultation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Consultation" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Consultation" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "date" DROP NOT NULL;
