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
  ); // done
  router.post(
    "/like/movie/:id",
    isAuthenticated as express.RequestHandler,
    asyncHandler(likedMovie)
  ); // done
  router.post(
    "/bookmark/movie/:id",
    isAuthenticated as express.RequestHandler,
    asyncHandler(bookmarkedMovie)
  ); // done

  router.get(
    "/get/check/like/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(isAlreadyLiked)
  ); // done
  router.get(
    "/get/check/bookmark/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(isAlreadyBookmarked)
  ); // done
  router.get(
    "/get/check/watchlist/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(isAlreadyWatchListed)
  ); // done

  router.get(
    "/get/watchlist/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(getWatchlist)
  ); //done

  router.get(
    "/get/movie/reviews",
    isAuthenticated as express.RequestHandler,
    asyncHandler(getReviewsForMovie)
  ); // done

  router.post(
    "/add/movie/review",
    isAuthenticated as express.RequestHandler,
    asyncHandler(addReview)
  ); //done

  router.get(
    "/get/review/movie/user",
    isAuthenticated as express.RequestHandler,
    asyncHandler(userReview)
  ); // done
  router.get(
    "/get/favourite/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(getFavourites)
  );// done
  router.get(
    "/get/bookmark/movie",
    isAuthenticated as express.RequestHandler,
    asyncHandler(getBookmarks)
  ); //done
  router.get(
    "/get/user/reviews",
    isAuthenticated as express.RequestHandler,
    asyncHandler(allUserReviews)
  ); //done
};
