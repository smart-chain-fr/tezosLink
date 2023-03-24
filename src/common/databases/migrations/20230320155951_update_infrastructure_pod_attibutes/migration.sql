/*
  Warnings:

  - You are about to drop the column `pod_name` on the `app_metrics_infrastructure` table. All the data in the column will be lost.
  - Added the required column `podName` to the `app_metrics_infrastructure` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "app_metrics_infrastructure" DROP CONSTRAINT "app_metrics_infrastructure_pod_name_fkey";

-- AlterTable
ALTER TABLE "app_metrics_infrastructure" DROP COLUMN "pod_name",
ADD COLUMN     "podName" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "app_metrics_infrastructure" ADD CONSTRAINT "app_metrics_infrastructure_podName_fkey" FOREIGN KEY ("podName") REFERENCES "app_pods_infrastructure"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
