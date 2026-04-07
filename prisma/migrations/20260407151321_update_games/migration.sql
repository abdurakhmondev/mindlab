/*
  Warnings:

  - Added the required column `image_url` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `games` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `games` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "game_type" AS ENUM ('MATH', 'GEOGRAPHY', 'PAZL', 'LANGUAGE', 'GALAXY', 'ATTENTION', 'TIMING', 'SPEED', 'REACTION', 'CONCENTRATION', 'RACING', 'MEMORY');

-- AlterTable
ALTER TABLE "games" ADD COLUMN     "image_url" TEXT NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL,
ADD COLUMN     "type" "game_type" NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
