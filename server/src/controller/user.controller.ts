import express, { Request, Response } from "express";
import { prisma } from "../../../db/db";

export async function listedMovie(req: Request, res: Response) {
  try {
    const {
      userId,
      movieId,
      movieName,
      moviePoster,
      movieOverview,
      voteAvg,
      voteCount,
    }: {
      userId: number;
      movieId: number;
      movieName: string;
      moviePoster: string;
      movieOverview: string;
      voteAvg: number;
      voteCount: number;
    } = req.body;
    const movieAdded = await prisma.watchlist.create({
      data: {
        userId: userId,
        movieId: movieId,
        movieName: movieName,
        moviePoster: moviePoster,
        movieOverview: movieOverview,
        voteAvg: voteAvg,
        voteCount: voteCount,
      },
    });
    return res.status(201).json({
      success: true,
      msg: "Movie added to the list",
      movieAdded: movieAdded,
    });
  } catch (error) {
    console.error("Error while adding the movie to the list: ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}

export async function likedMovie(req: Request, res: Response) {
  try {
    const {
      userId,
      movieId,
      movieName,
      moviePoster,
      movieOverview,
      voteAvg,
      voteCount,
    }: {
      userId: number;
      movieId: number;
      movieName: string;
      moviePoster: string;
      movieOverview: string;
      voteAvg: number;
      voteCount: number;
    } = req.body;
    const movieAdded = await prisma.likedMovies.create({
      data: {
        userId: userId,
        movieId: movieId,
        movieName: movieName,
        moviePoster: moviePoster,
        movieOverview: movieOverview,
        voteAvg: voteAvg,
        voteCount: voteCount,
      },
    });
    return res.status(201).json({
      success: true,
      msg: "Movie added to the list",
      likedMovie: likedMovie,
    });
  } catch (error) {
    console.error("Error while liking the movie: ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}

export async function bookmarkedMovie(req: Request, res: Response) {
  try {
    const {
      userId,
      movieId,
      movieName,
      moviePoster,
      movieOverview,
      voteAvg,
      voteCount,
    }: {
      userId: number;
      movieId: number;
      movieName: string;
      moviePoster: string;
      movieOverview: string;
      voteAvg: number;
      voteCount: number;
    } = req.body;
    const movieBookmarked = await prisma.bookmarks.create({
      data: {
        userId: userId,
        movieId: movieId,
        movieName: movieName,
        moviePoster: moviePoster,
        movieOverview: movieOverview,
        voteAvg: voteAvg,
        voteCount: voteCount,
      },
    });
    return res.status(201).json({
      success: true,
      msg: "Movie added to the list",
      bookmarked: movieBookmarked,
    });
  } catch (error) {
    console.error("Error while adding the movie to the list: ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}

export async function isAlreadyLiked(req: Request, res: Response) {
  try {
    const { userId, movieId } = req.query;
    const isLiked = await prisma.likedMovies.findUnique({
      where: {
        userId_movieId: {
          userId: Number(userId),
          movieId: Number(movieId),
        },
      },
    });
    if (!isLiked) {
      return res.json({
        success: true,
        isLiked: false,
      });
    }
    return res.json({
      success: true,
      isLiked: true,
    });
  } catch (error) {
    console.error("Error while checking the movie is already liked: ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}

export async function isAlreadyWatchListed(req: Request, res: Response) {
  try {
    const { userId, movieId } = req.query;
    const isWatchlisted = await prisma.watchlist.findUnique({
      where: {
        userId_movieId: {
          userId: Number(userId),
          movieId: Number(movieId),
        },
      },
    });
    if (!isWatchlisted) {
      return res.json({
        success: true,
        isListed: false,
      });
    }
    return res.json({
      success: true,
      isListed: true,
    });
  } catch (error) {
    console.error("Error while checking the movie is already listed: ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}
export async function isAlreadyBookmarked(req: Request, res: Response) {
  try {
    const { userId, movieId } = req.query;
    const isBookmarked = await prisma.bookmarks.findUnique({
      where: {
        userId_movieId: {
          userId: Number(userId),
          movieId: Number(movieId),
        },
      },
    });
    if (!isBookmarked) {
      return res.json({
        success: true,
        isBookmarked: false,
      });
    }
    return res.json({
      success: true,
      isBookmarked: true,
    });
  } catch (error) {
    console.error(
      "Error while checking the movie is already bookmarked: ",
      error
    );
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}

export async function getWatchlist(req: Request, res: Response) {
  try {
    const { userId } = req.query;
    const watchlist = await prisma.watchlist.findMany({
      where: {
        userId: Number(userId),
      },
    });
    if (watchlist.length === 0) {
      return res.status(200).json({
        success: true,
        msg: "No movies in watchlist",
        watchlist: watchlist,
      });
    }
    return res.status(200).json({
      success: true,
      msg: "watchlist retrieved successfully",
      watchlist: watchlist,
    });
  } catch (error) {
    console.error("Error while getting the watchlist: ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}

export async function getFavourites(req: Request, res: Response) {
  try {
    const { userId }= req.query;
    const likedMovies = await prisma.likedMovies.findMany({
      where: {
        userId: Number(userId),
      }
    });
    if (likedMovies.length === 0){
      return res.status(404).json({
        success: false,
        msg: "No movies in favourites"
      });
    };
    return res.status(200).json({
      success: true,
      msg: "Favourites retrieved successfully",
      likedMovies: likedMovies,
    });
  } catch (error) {
    console.error("Error while fetching favourites: ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  };
};

export async function getBookmarks(req: Request, res: Response) {
  try {
    const { userId }= req.query;
    const bookmarkedMovies = await prisma.bookmarks.findMany({
      where: {
        userId: Number(userId),
      }
    });
    if (bookmarkedMovies.length === 0){
      return res.status(404).json({
        success: false,
        msg: "No movies in bookmarks"
      });
    };
    return res.status(200).json({
      success: true,
      msg: "Bookmark movies retrieved successfully",
      bookmarkedMovie: bookmarkedMovies,
    });
  } catch (error) {
    console.error("Error while fetching bookmarks: ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  };
};

export async function getReviewsForMovie(req: Request, res: Response) {
  try {
    const { movieId } = req.query;
    const reviews = await prisma.review.findMany({
      where: {
        movieId: Number(movieId),
        userId: {
          not: Number(req.query.userId)
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      success: true,
      msg: "Reviews retrieved successfully",
      reviews: reviews,
    });
  } catch (error) {
    console.error(
      "Error while fetching reviews for a particular movie: ",
      error
    );
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}

export async function addReview(req: Request, res: Response) {
  try {
    const { userId, movieId } = req.query;
    const { reviewText, rating, username, movieName } = req.body;
    const newReview = await prisma.review.create({
      data: {
        userId: Number(userId),
        movieId: Number(movieId),
        username: String(username),
        movieName: String(movieName),
        reviewText: reviewText,
        rating: Number(rating),
        updatedAt: new Date(Date.now()),
      },
    });
    return res.status(201).json({
      success: true,
      msg: "Review added successfully",
      newReview: newReview,
    });
  } catch (error) {
    console.error("Error while adding review: ", error);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}

export async function userReview(req: Request, res: Response) {
  try {
    const userReview = await prisma.review.findUnique({
      where: {
        userId_movieId: {
          userId: Number(req.query.userId),
          movieId: Number(req.query.movieId),
        },
      },
    });
    if (!userReview) {
      return res.status(404).json({
        success: false,
        msg: "User review not found",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "User review retrieved successfully",
      userReview: userReview,
    });
  } catch (error) {
    console.error(
      "Error while fetching the particular review by the user: ",
      error
    );
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}

export async function allUserReviews(req: Request, res: Response) {
  try {
    const userReview = await prisma.review.findMany({
      where: {
        userId: Number(req.query.userId),
      }
    });
    if (!userReview) {
      return res.status(404).json({
        success: false,
        msg: "User reviews not found",
      });
    }
    return res.status(200).json({
      success: true,
      msg: "User review retrieved successfully",
      userReview: userReview,
    });
  } catch (error) {
    console.error(
      "Error while fetching the particular review by the user: ",
      error
    );
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
}
