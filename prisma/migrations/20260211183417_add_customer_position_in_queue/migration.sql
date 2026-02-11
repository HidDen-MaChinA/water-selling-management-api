/*
  Warnings:

  - You are about to drop the column `customerId` on the `Queue` table. All the data in the column will be lost.
  - Added the required column `currentCustomerId` to the `Queue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextCustomerId` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Queue" DROP CONSTRAINT "Queue_customerId_fkey";

-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "customerId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currentCustomerId" TEXT NOT NULL,
ADD COLUMN     "nextCustomerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_currentCustomerId_fkey" FOREIGN KEY ("currentCustomerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_nextCustomerId_fkey" FOREIGN KEY ("nextCustomerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
