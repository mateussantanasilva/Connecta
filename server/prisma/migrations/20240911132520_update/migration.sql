/*
  Warnings:

  - You are about to drop the `Campaign` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Campaign";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "collection_point" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "progress" REAL NOT NULL DEFAULT 0.00,
    "status" TEXT NOT NULL,
    "participants" INTEGER NOT NULL,
    "started_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_grantee" TEXT NOT NULL,
    CONSTRAINT "campaigns_id_grantee_fkey" FOREIGN KEY ("id_grantee") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_campaign_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "id_campaign" TEXT NOT NULL,
    CONSTRAINT "campaign_items_id_campaign_fkey" FOREIGN KEY ("id_campaign") REFERENCES "campaigns" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_campaign_items" ("id", "id_campaign", "name", "quantity") SELECT "id", "id_campaign", "name", "quantity" FROM "campaign_items";
DROP TABLE "campaign_items";
ALTER TABLE "new_campaign_items" RENAME TO "campaign_items";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
