/*
  Warnings:

  - You are about to drop the column `productstatus` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `productstatus`,
    ADD COLUMN `productStatus` ENUM('COOKING', 'COMPLETE') NOT NULL DEFAULT 'COOKING';
