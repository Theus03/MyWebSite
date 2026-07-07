-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "status" SET DEFAULT 'PROSPECCAO';

-- AlterTable
ALTER TABLE "Improvement" ADD COLUMN     "dueDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Idea" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "systemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Idea_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Idea_systemId_idx" ON "Idea"("systemId");

-- AddForeignKey
ALTER TABLE "Idea" ADD CONSTRAINT "Idea_systemId_fkey" FOREIGN KEY ("systemId") REFERENCES "System"("id") ON DELETE CASCADE ON UPDATE CASCADE;
