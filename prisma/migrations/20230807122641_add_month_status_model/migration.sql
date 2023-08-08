-- CreateTable
CREATE TABLE "monthStatus" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "monthStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "monthStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "monthStatus" ADD CONSTRAINT "monthStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
