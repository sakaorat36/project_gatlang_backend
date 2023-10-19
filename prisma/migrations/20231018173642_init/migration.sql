/*
  Warnings:

  - You are about to drop the column `productStatus` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `productStatus`,
    ADD COLUMN `orderStatus` ENUM('COOKING', 'COMPLETE') NOT NULL DEFAULT 'COOKING';

-- AlterTable
ALTER TABLE `product` ADD COLUMN `productStatus` ENUM('AVAILABLE', 'NOTAVAILABLE') NOT NULL DEFAULT 'AVAILABLE';
