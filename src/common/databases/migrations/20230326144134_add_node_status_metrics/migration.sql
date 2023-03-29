/*
  Warnings:

  - Added the required column `node` to the `app_metrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `app_metrics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_metrics" ADD COLUMN     "node" VARCHAR(255) NOT NULL,
ADD COLUMN     "status" VARCHAR(255) NOT NULL;
