CREATE TABLE "User" (
    "id" SERIAL UNIQUE PRIMARY KEY,
    "session_id" uuid UNIQUE,
    "email" TEXT UNIQUE,
    "password" uuid
);

CREATE TABLE "Files" (
    "id" SERIAL UNIQUE PRIMARY KEY,
    "user_id" INTEGER UNIQUE,
    "location" TEXT,
    "bug_name" TEXT,
    "file_name" TEXT,
    FOREIGN KEY ("user_id") REFERENCES "User"("id")a
);

CREATE TABLE "Species" (
    "id" SERIAL UNIQUE PRIMARY KEY,
    "name" TEXT,
    "description" TEXT,
    "remove" BOOLEAN
);
