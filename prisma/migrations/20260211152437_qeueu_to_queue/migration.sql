/*
  Warnings:

  - You are about to drop the `Qeueu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Qeueu" DROP CONSTRAINT "Qeueu_customerId_fkey";

-- DropTable
DROP TABLE "Qeueu";

-- CreateTable
CREATE TABLE "Queue" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "bidonNumber" INTEGER NOT NULL,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
