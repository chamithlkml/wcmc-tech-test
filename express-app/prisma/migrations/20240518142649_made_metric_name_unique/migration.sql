/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `metrics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `metrics_name_key` ON `metrics`(`name`);
