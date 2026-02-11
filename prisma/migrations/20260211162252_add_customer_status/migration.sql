-- CreateEnum
CREATE TYPE "CustomerStatus" AS ENUM ('ACTIF', 'BANNED');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "status" "CustomerStatus" NOT NULL DEFAULT 'ACTIF';
