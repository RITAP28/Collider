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
