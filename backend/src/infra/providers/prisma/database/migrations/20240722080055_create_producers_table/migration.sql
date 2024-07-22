-- CreateTable
CREATE TABLE "producers" (
    "id" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "producer_name" TEXT NOT NULL,
    "farm_name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "acres" INTEGER NOT NULL,
    "free_name" INTEGER NOT NULL,
    "planted_name" INTEGER NOT NULL,
    "crops" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producers_document_key" ON "producers"("document");
