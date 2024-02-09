/*
  Warnings:

  - The primary key for the `UserLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserLike` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `UserLike` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserLike" DROP CONSTRAINT "UserLike_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "UserLike_userId_postId_key" ON "UserLike"("userId", "postId");
