-- CreateTable
CREATE TABLE "app_path_dictionnary" (
    "path" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "app_path_dictionnary_path_key" ON "app_path_dictionnary"("path");
