-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_emailId_fkey";

-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_emailId_fkey";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "User"("email_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "User"("email_id") ON DELETE CASCADE ON UPDATE CASCADE;
