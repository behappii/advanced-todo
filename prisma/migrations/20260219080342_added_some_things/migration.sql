/*
  Warnings:

  - You are about to drop the column `timefrom` on the `todo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[text]` on the table `tag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "timefrom",
ADD COLUMN     "timeFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "wholeDay" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "tag_text_key" ON "tag"("text");
