/*
  Warnings:

  - You are about to drop the column `active` on the `app_pods_infrastructure` table. All the data in the column will be lost.
  - Added the required column `phase` to the `app_pods_infrastructure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `app_pods_infrastructure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_pods_infrastructure" DROP COLUMN "active",
ADD COLUMN     "phase" VARCHAR(255) NOT NULL,
ADD COLUMN     "type" VARCHAR(255) NOT NULL;
