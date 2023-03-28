/*
  Warnings:

  - You are about to drop the column `phase` on the `app_pods_infrastructure` table. All the data in the column will be lost.
  - Added the required column `namespace` to the `app_pods_infrastructure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_pods_infrastructure" DROP COLUMN "phase",
ADD COLUMN     "namespace" VARCHAR(255) NOT NULL;
