-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_category_id_fkey";

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;
