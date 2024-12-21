import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  addReview,
  allUserReviews,
  bookmarkedMovie,
  getBookmarks,
  getFavourites,
  getReviewsForMovie,
  getWatchlist,
  isAlreadyBookmarked,
  isAlreadyLiked,
  isAlreadyWatchListed,
  likedMovie,
  listedMovie,
  userReview,
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
    "/get/check/like/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(isAlreadyLiked)
  );
  router.get(
    "/get/check/bookmark/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(isAlreadyBookmarked)
  );
  router.get(
    "/get/check/watchlist/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(isAlreadyWatchListed)
  );

  router.get(
    "/get/watchlist/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(getWatchlist)
  );

  router.get(
    "/get/movie/reviews",
    isAuthenticated as express.RequestHandler,
    asyncHandler(getReviewsForMovie)
  );

  router.post(
    "/add/movie/review",
    isAuthenticated as express.RequestHandler,
    asyncHandler(addReview)
  );

  router.get(
    "/get/review/movie/user",
    isAuthenticated as express.RequestHandler,
    asyncHandler(userReview)
  );
  router.get(
    "/get/favourite/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(getFavourites)
  );
  router.get(
    "/get/bookmark/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(getBookmarks)
  );
  router.get(
    "/get/user/reviews",
    isAuthenticated as express.RequestHandler,
    asyncHandler(allUserReviews)
  );
};
