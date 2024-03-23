/*
  Warnings:

  - You are about to drop the column `userId` on the `SMSToken` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `SMSToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `SMSToken` DROP FOREIGN KEY `SMSToken_userId_fkey`;

-- AlterTable
ALTER TABLE `SMSToken` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SMSToken` ADD CONSTRAINT `SMSToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
