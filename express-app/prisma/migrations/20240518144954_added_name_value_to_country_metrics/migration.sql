/*
  Warnings:

  - Added the required column `name` to the `country_metrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `country_metrics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `country_metrics` ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `value` VARCHAR(191) NOT NULL;
