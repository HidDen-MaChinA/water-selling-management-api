/*
  Warnings:

  - You are about to drop the column `nextCustomerId` on the `Queue` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Queue" DROP CONSTRAINT "Queue_nextCustomerId_fkey";

-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "nextCustomerId";
