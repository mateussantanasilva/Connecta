-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "description" TEXT,
    "password" TEXT NOT NULL,
    "user_type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "collection_point" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "observation" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "participants" INTEGER NOT NULL,
    "started_at" DATETIME NOT NULL,
    "id_grantee" TEXT NOT NULL,
    CONSTRAINT "Campaign_id_grantee_fkey" FOREIGN KEY ("id_grantee") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "campaign_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "id_campaign" TEXT NOT NULL,
    CONSTRAINT "campaign_items_id_campaign_fkey" FOREIGN KEY ("id_campaign") REFERENCES "Campaign" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
