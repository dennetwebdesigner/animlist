-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "User"("email_id") ON DELETE RESTRICT ON UPDATE CASCADE;
