-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_emailId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_emailId_fkey";

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
