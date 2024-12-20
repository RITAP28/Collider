import express, { Request, Response } from "express";
import { prisma } from "../../../db/db";

export async function listedMovie(req: Request, res: Response): Promise<Response> {
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
