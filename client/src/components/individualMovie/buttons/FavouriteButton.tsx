import axios from "axios";
import { IMovieDetails } from "../../../lib/data.interface";
import { useAppSelector } from "../../../redux/hooks/hook";
import { useEffect, useState } from "react";

const FavouriteButton = ({ movieDetails }: { movieDetails: IMovieDetails }) => {
  const { currentUser, accessToken } = useAppSelector((state) => state.user);
  const [isLiked, setIsLiked] = useState<boolean>(false);

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

  const handleIsAlreadyLiked = async () => {
    try {
      const isLikedResponse = await axios.get(
        `http://localhost:${port}/api/v1/get/check/like/movie?userId=${currentUser?.id}&movieId=${movieDetails.id}`,
        config
      );
      console.log("is liked?: ", isLikedResponse.data);
      setIsLiked(isLikedResponse.data.isLiked);
    } catch (error) {
      console.error(
        "Error while checking whether the movie is already liked: ",
        error
      );
    }
  };

  useEffect(() => {
    handleIsAlreadyLiked();
  }, [movieDetails.id]);

  const handleLikeMovie = async () => {
    try {
      const likedMovie = await axios.post(
        `http://localhost:${port}/api/v1/like/movie/${movieDetails.id}`,
        requestBody,
        config
      );
      if (likedMovie.data.success === true) {
        setIsLiked(true);
      };
      console.log(
        "Movie successfully added to liked movies: ",
        likedMovie.data
      );
    } catch (error) {
      console.error("Error while adding movie to like list: ", error);
    }
  };

  return (
    <div className="pr-2">
      <button
        type="button"
        className="px-3 py-2 bg-slate-400 rounded-lg hover:cursor-pointer transition duration-200 ease-in-out hover:bg-slate-300 flex flex-row"
        onClick={handleLikeMovie}
      >
        <p className="">
          {isLiked ? (
            <img
              src="/like/redheart.png"
              alt=""
              className="w-6 h-6 hover:scale-110 transition duration-150 ease-in-out"
            />
          ) : (
            <img
              src="/like/heart.png"
              alt=""
              className="w-6 h-6 hover:scale-110 transition duration-150 ease-in-out"
            />
          )}
        </p>
        <p className="font-Poppins font-semibold pl-1">
          {isLiked ? "Liked" : "Like"}
        </p>
      </button>
    </div>
  );
};

export default FavouriteButton;
