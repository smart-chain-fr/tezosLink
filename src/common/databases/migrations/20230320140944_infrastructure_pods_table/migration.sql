/*
  Warnings:

  - You are about to drop the column `pod` on the `app_metrics_infrastructure` table. All the data in the column will be lost.
  - Added the required column `pod_name` to the `app_metrics_infrastructure` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_metrics_infrastructure" DROP COLUMN "pod",
ADD COLUMN     "pod_name" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "app_pods_infrastructure" (
    "name" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "app_pods_infrastructure_name_key" ON "app_pods_infrastructure"("name");

-- AddForeignKey
ALTER TABLE "app_metrics_infrastructure" ADD CONSTRAINT "app_metrics_infrastructure_pod_name_fkey" FOREIGN KEY ("pod_name") REFERENCES "app_pods_infrastructure"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
