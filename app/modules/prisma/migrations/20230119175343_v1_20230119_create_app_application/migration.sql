-- CreateTable
CREATE TABLE "app_projects" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "uuid" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "network" VARCHAR(255) NOT NULL,

    CONSTRAINT "app_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_metrics" (
    "id" SERIAL NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "uuid" VARCHAR(255) NOT NULL,
    "remote_address" VARCHAR(255) NOT NULL,
    "date_requested" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_projects_uuid_key" ON "app_projects"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "app_metrics_uuid_key" ON "app_metrics"("uuid");

-- AddForeignKey
ALTER TABLE "app_metrics" ADD CONSTRAINT "app_metrics_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "app_projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
