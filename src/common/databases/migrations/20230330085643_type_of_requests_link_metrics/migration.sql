/*
  Warnings:

  - You are about to drop the `app_path_dictionnary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `typeOfRequestUuid` to the `app_metrics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_metrics" ADD COLUMN     "typeOfRequestUuid" TEXT NOT NULL;

-- DropTable
DROP TABLE "app_path_dictionnary";

-- CreateTable
CREATE TABLE "app_types_of_request" (
    "uuid" VARCHAR(255) NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_types_of_request_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_types_of_request_uuid_key" ON "app_types_of_request"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "app_types_of_request_path_key" ON "app_types_of_request"("path");

-- AddForeignKey
ALTER TABLE "app_metrics" ADD CONSTRAINT "app_metrics_typeOfRequestUuid_fkey" FOREIGN KEY ("typeOfRequestUuid") REFERENCES "app_types_of_request"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
