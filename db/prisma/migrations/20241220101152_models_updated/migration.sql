/*
  Warnings:

  - A unique constraint covering the columns `[userId,movieId]` on the table `Bookmarks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,movieId]` on the table `LikedMovies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,movieId]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookmarks_userId_movieId_key" ON "Bookmarks"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "LikedMovies_userId_movieId_key" ON "LikedMovies"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_movieId_key" ON "Watchlist"("userId", "movieId");
