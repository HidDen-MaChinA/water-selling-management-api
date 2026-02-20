/*
  Warnings:

  - You are about to drop the column `currentCustomerId` on the `Queue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Queue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerId` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Queue" DROP CONSTRAINT "Queue_currentCustomerId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "currentCustomerId",
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "processedForAnalytics" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Analytic" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,
    "totalBidonNumber" INTEGER NOT NULL,

    CONSTRAINT "Analytic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerAnalyticData" (
    "id" TEXT NOT NULL,
    "analyticId" TEXT NOT NULL,
    "dateRangeStart" TIMESTAMP(3) NOT NULL,
    "dateRangeEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bidonNumber" INTEGER NOT NULL,
    "customerVisiteForDateRange" INTEGER NOT NULL,

    CONSTRAINT "CustomerAnalyticData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analytic_id_key" ON "Analytic"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Analytic_customerId_key" ON "Analytic"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerAnalyticData_id_key" ON "CustomerAnalyticData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Queue_id_key" ON "Queue"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analytic" ADD CONSTRAINT "Analytic_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerAnalyticData" ADD CONSTRAINT "CustomerAnalyticData_analyticId_fkey" FOREIGN KEY ("analyticId") REFERENCES "Analytic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
