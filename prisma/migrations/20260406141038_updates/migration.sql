/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_info" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "phone_number" TEXT,
    "score" INTEGER NOT NULL DEFAULT 0,
    "activity" INTEGER NOT NULL DEFAULT 0,
    "won_count" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT,
    "age" INTEGER,

    CONSTRAINT "user_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boosts" (
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "boosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_boosts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "boost_id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "activated_at" TIMESTAMP(3),
    "last_usage" TIMESTAMP(3),

    CONSTRAINT "user_boosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_notifications" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "notification_id" INTEGER NOT NULL,

    CONSTRAINT "user_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_skils" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "thinking_speed" INTEGER NOT NULL DEFAULT 0,
    "attantion" INTEGER NOT NULL DEFAULT 0,
    "consentrance" INTEGER NOT NULL DEFAULT 0,
    "logic" INTEGER NOT NULL DEFAULT 0,
    "memory" INTEGER NOT NULL DEFAULT 0,
    "iq" INTEGER NOT NULL DEFAULT 0,
    "iq_differance" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "user_skils_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "title" TEXT,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ratings" (
    "id" SERIAL NOT NULL,
    "game_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "score" INTEGER,

    CONSTRAINT "ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reaclams" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "link" TEXT,

    CONSTRAINT "reaclams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_plans" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "test_count" INTEGER NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_plan_games" (
    "id" SERIAL NOT NULL,
    "test_plan_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "test_plan_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_subscriptions" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "test_plan_id" INTEGER NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenges" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "prize_pool" INTEGER,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_days" (
    "id" SERIAL NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "day_number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "task_type" TEXT NOT NULL,
    "question_count" INTEGER,
    "duration_minutes" INTEGER,

    CONSTRAINT "challenge_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_day_games" (
    "id" SERIAL NOT NULL,
    "challenge_day_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "challenge_day_games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_participants" (
    "id" SERIAL NOT NULL,
    "challenge_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challenge_participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_day_results" (
    "id" SERIAL NOT NULL,
    "challenge_day_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "completed_at" TIMESTAMP(3),

    CONSTRAINT "challenge_day_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_info_user_id_key" ON "user_info"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_skils_user_id_key" ON "user_skils"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_participants_challenge_id_user_id_key" ON "challenge_participants"("challenge_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "challenge_day_results_challenge_day_id_user_id_key" ON "challenge_day_results"("challenge_day_id", "user_id");

-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_boosts" ADD CONSTRAINT "user_boosts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_boosts" ADD CONSTRAINT "user_boosts_boost_id_fkey" FOREIGN KEY ("boost_id") REFERENCES "boosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_notification_id_fkey" FOREIGN KEY ("notification_id") REFERENCES "notifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skils" ADD CONSTRAINT "user_skils_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_plan_games" ADD CONSTRAINT "test_plan_games_test_plan_id_fkey" FOREIGN KEY ("test_plan_id") REFERENCES "test_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_plan_games" ADD CONSTRAINT "test_plan_games_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_subscriptions" ADD CONSTRAINT "user_subscriptions_test_plan_id_fkey" FOREIGN KEY ("test_plan_id") REFERENCES "test_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_days" ADD CONSTRAINT "challenge_days_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_day_games" ADD CONSTRAINT "challenge_day_games_challenge_day_id_fkey" FOREIGN KEY ("challenge_day_id") REFERENCES "challenge_days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_day_games" ADD CONSTRAINT "challenge_day_games_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_participants" ADD CONSTRAINT "challenge_participants_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_participants" ADD CONSTRAINT "challenge_participants_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_day_results" ADD CONSTRAINT "challenge_day_results_challenge_day_id_fkey" FOREIGN KEY ("challenge_day_id") REFERENCES "challenge_days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_day_results" ADD CONSTRAINT "challenge_day_results_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
