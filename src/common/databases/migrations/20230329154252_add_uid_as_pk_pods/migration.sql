/*
  Warnings:

  - You are about to drop the column `podName` on the `app_metrics_infrastructure` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uid]` on the table `app_pods_infrastructure` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `podUid` to the `app_metrics_infrastructure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `app_pods_infrastructure` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "app_metrics_infrastructure" DROP CONSTRAINT "app_metrics_infrastructure_podName_fkey";

-- DropIndex
DROP INDEX "app_pods_infrastructure_name_key";

-- AlterTable
ALTER TABLE "app_metrics_infrastructure" DROP COLUMN "podName",
ADD COLUMN     "podUid" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "app_pods_infrastructure" ADD COLUMN     "uid" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "app_pods_infrastructure_pkey" PRIMARY KEY ("uid");

-- CreateIndex
CREATE UNIQUE INDEX "app_pods_infrastructure_uid_key" ON "app_pods_infrastructure"("uid");

-- AddForeignKey
ALTER TABLE "app_metrics_infrastructure" ADD CONSTRAINT "app_metrics_infrastructure_podUid_fkey" FOREIGN KEY ("podUid") REFERENCES "app_pods_infrastructure"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
