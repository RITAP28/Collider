import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  bookmarkedMovie,
  isAlreadyBookmarked,
  isAlreadyLiked,
  isAlreadyWatchListed,
  likedMovie,
  listedMovie,
} from "../controller/user.controller";
import { asyncHandler } from "../middlewares/async.handler";

export default (router: express.Router) => {
  router.post(
    "/list/movie/:id",
    isAuthenticated as express.RequestHandler,
    asyncHandler(listedMovie)
  );
  router.post(
    "/like/movie/:id",
    isAuthenticated as express.RequestHandler,
    asyncHandler(likedMovie)
  );
  router.post(
    "/bookmark/movie/:id",
    isAuthenticated as express.RequestHandler,
    asyncHandler(bookmarkedMovie)
  );

  router.get(
    "/get/like/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(isAlreadyLiked)
  );
  router.get(
    "/get/bookmark/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(isAlreadyBookmarked)
  );
  router.get(
    "/get/watchlist/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(isAlreadyWatchListed)
  );
};
