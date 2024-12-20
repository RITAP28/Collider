import { IMovieDetails } from "@/lib/data.interface";
import { useAppSelector } from "../../../redux/hooks/hook";
import axios from "axios";
import { useEffect, useState } from "react";

const BookmarkButton = ({ movieDetails }: { movieDetails: IMovieDetails }) => {
  const { currentUser, accessToken } = useAppSelector((state) => state.user);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const port = import.meta.env.VITE_SERVER_PORT;
  const requestBody = {
    userId: currentUser?.id,
    movieId: movieDetails.id,
    movieName: movieDetails.original_title,
    moviePoster: movieDetails.poster_path,
    movieOverview: movieDetails.overview,
    voteAvg: movieDetails.vote_average,
    voteCount: movieDetails.vote_count,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleIsAlreadyBookmarked = async () => {
    try {
      const isBookmarkedResponse = await axios.get(
        `http://localhost:${port}/get/check/bookmark/movie?userId=${currentUser?.id}&movieId=${movieDetails.id}`,
        config
      );
      console.log("is bookmarked?: ", isBookmarkedResponse.data);
      setIsBookmarked(isBookmarkedResponse.data.isBookmarked);
    } catch (error) {
      console.error(
        "Error while checking whether the movie is already bookmarked: ",
        error
      );
    }
  };

  useEffect(() => {
    handleIsAlreadyBookmarked();
  }, [movieDetails.id]);

  const handleBookmarkMovie = async () => {
    try {
      const bookmarkedMovie = await axios.post(
        `http://localhost:${port}/bookmark/movie/${movieDetails.id}`,
        requestBody,
        config
      );
      if(bookmarkedMovie.data.success){
        setIsBookmarked(true);
      }
      console.log("Movie successfully bookmarked: ", bookmarkedMovie.data);
    } catch (error) {
      console.error("Error while bookmarking the movie: ", error);
    }
  };

  return (
    <div className="px-2">
      <button
        type="button"
        className="px-3 py-2 bg-slate-400 rounded-lg hover:cursor-pointer transition duration-200 ease-in-out hover:bg-slate-300 flex flex-row"
        onClick={handleBookmarkMovie}
      >
        <p className="">
          {isBookmarked ? (
            <img
              src="/like/bookbarkBlack.png"
              alt=""
              className="w-6 h-6 hover:scale-110 transition duration-150 ease-in-out"
            />
          ) : (
            <img
              src="/like/bookmark.png"
              alt=""
              className="w-6 h-6 hover:scale-110 transition duration-150 ease-in-out"
            />
          )}
        </p>
        <p className="font-Poppins font-semibold pl-1">
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </p>
      </button>
    </div>
  );
};

export default BookmarkButton;
