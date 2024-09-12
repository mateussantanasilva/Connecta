/*
  Warnings:

  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - Added the required column `measure` to the `campaign_items` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_campaign_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "measure" TEXT NOT NULL,
    "id_campaign" TEXT NOT NULL,
    CONSTRAINT "campaign_items_id_campaign_fkey" FOREIGN KEY ("id_campaign") REFERENCES "campaigns" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_campaign_items" ("id", "id_campaign", "name", "quantity") SELECT "id", "id_campaign", "name", "quantity" FROM "campaign_items";
DROP TABLE "campaign_items";
ALTER TABLE "new_campaign_items" RENAME TO "campaign_items";
CREATE TABLE "new_campaigns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "collection_point" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "observation" TEXT,
    "categories" TEXT NOT NULL,
    "progress" REAL NOT NULL DEFAULT 0.00,
    "status" TEXT NOT NULL,
    "participants" INTEGER NOT NULL,
    "started_at" DATETIME NOT NULL,
    "id_grantee" TEXT NOT NULL,
    CONSTRAINT "campaigns_id_grantee_fkey" FOREIGN KEY ("id_grantee") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_campaigns" ("categories", "collection_point", "description", "id", "id_grantee", "name", "observation", "participants", "progress", "started_at", "status") SELECT "categories", "collection_point", "description", "id", "id_grantee", "name", "observation", "participants", "progress", "started_at", "status" FROM "campaigns";
DROP TABLE "campaigns";
ALTER TABLE "new_campaigns" RENAME TO "campaigns";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT,
    "telephone" TEXT,
    "description" TEXT,
    "user_type" TEXT NOT NULL
);
INSERT INTO "new_users" ("description", "email", "endereco", "full_name", "id", "user_type") SELECT "description", "email", "endereco", "full_name", "id", "user_type" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
