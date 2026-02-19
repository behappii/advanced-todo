/*
  Warnings:

  - You are about to drop the column `color` on the `tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tag" DROP COLUMN "color";

-- AlterTable
ALTER TABLE "todo" ALTER COLUMN "wholeDay" DROP DEFAULT;
