/*
  Warnings:

  - The primary key for the `app_metrics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `app_metrics` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `app_metrics` table. All the data in the column will be lost.
  - The primary key for the `app_projects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `app_projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `app_metrics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectUuid` to the `app_metrics` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "app_metrics" DROP CONSTRAINT "app_metrics_projectId_fkey";

-- AlterTable
ALTER TABLE "app_metrics" DROP CONSTRAINT "app_metrics_pkey",
DROP COLUMN "id",
DROP COLUMN "projectId",
ADD COLUMN     "projectUuid" TEXT NOT NULL,
ADD CONSTRAINT "app_metrics_pkey" PRIMARY KEY ("uuid");

-- AlterTable
ALTER TABLE "app_projects" DROP CONSTRAINT "app_projects_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "app_projects_pkey" PRIMARY KEY ("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "app_metrics_uuid_key" ON "app_metrics"("uuid");

-- AddForeignKey
ALTER TABLE "app_metrics" ADD CONSTRAINT "app_metrics_projectUuid_fkey" FOREIGN KEY ("projectUuid") REFERENCES "app_projects"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
