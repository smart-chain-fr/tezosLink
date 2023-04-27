/*
  Warnings:

  - You are about to drop the column `date_requested` on the `app_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `remote_address` on the `app_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `date_requested` on the `app_metrics_infrastructure` table. All the data in the column will be lost.
  - Added the required column `dateRequested` to the `app_metrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remoteAddress` to the `app_metrics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateRequested` to the `app_metrics_infrastructure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_metrics" DROP COLUMN "date_requested",
DROP COLUMN "remote_address",
ADD COLUMN     "dateRequested" DATE NOT NULL,
ADD COLUMN     "remoteAddress" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "app_metrics_infrastructure" DROP COLUMN "date_requested",
ADD COLUMN     "dateRequested" TIMESTAMP(3) NOT NULL;
