-- CreateTable
CREATE TABLE "app_metrics_infrastructure" (
    "uuid" VARCHAR(255) NOT NULL,
    "pod" VARCHAR(255) NOT NULL,
    "label" VARCHAR(255) NOT NULL,
    "value" VARCHAR(255) NOT NULL,
    "date_requested" TIMESTAMP(3) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_metrics_infrastructure_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_metrics_infrastructure_uuid_key" ON "app_metrics_infrastructure"("uuid");
