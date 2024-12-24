import axios from "axios";
import { IMovieDetails } from "../../../lib/data.interface";
import { useAppSelector } from "../../../redux/hooks/hook";
import { useEffect, useMemo, useState } from "react";

const WatchListButton = ({ movieDetails }: { movieDetails: IMovieDetails }) => {
  const { currentUser, accessToken } = useAppSelector((state) => state.user);
  const [isListed, setIsListed] = useState<boolean>(false);

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
  const config = useMemo(() => ({
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }), [accessToken]);

  useEffect(() => {
    const handleIsAlreadyListed = async () => {
      try {
        const isListedResponse = await axios.get(
          `http://localhost:${port}/api/v1/get/check/watchlist/movie?userId=${currentUser?.id}&movieId=${movieDetails.id}`,
          config
        );
        console.log("is watchlisted?: ", isListedResponse.data);
        setIsListed(isListedResponse.data.isListed);
      } catch (error) {
        console.error(
          "Error while checking whether the movie is already listed: ",
          error
        );
      }
    };

    handleIsAlreadyListed();
  }, [movieDetails.id, config, currentUser?.id, port]);

  const handleWatchlistMovie = async () => {
    try {
      const watchlistedMovie = await axios.post(
        `http://localhost:${port}/api/v1/list/movie/${movieDetails.id}`,
        requestBody,
        config
      );
      if(watchlistedMovie.data.success){
        setIsListed(true);
      };
      console.log("Movie successfully watchlisted: ", watchlistedMovie.data);
    } catch (error) {
      console.error("Error while adding the movie to the watchlist: ", error);
    }
  };

  return (
    <div className="px-2">
      <button
        type="button"
        className="px-3 py-2 bg-slate-400 rounded-lg hover:cursor-pointer transition duration-200 ease-in-out hover:bg-slate-300 flex flex-row"
        onClick={handleWatchlistMovie}
      >
        <p className="">
          {isListed ? (
            <img
              src="/like/listed.png"
              alt=""
              className="w-6 h-6 hover:scale-110 transition duration-150 ease-in-out"
            />
          ) : (
            <img
              src="/like/list.png"
              alt=""
              className="w-6 h-6 hover:scale-110 transition duration-150 ease-in-out"
            />
          )}
        </p>
        <p className="font-Poppins font-semibold pl-1">
          {isListed ? "Added to Watchlist" : "Add to Watchlist"}
        </p>
      </button>
    </div>
  );
};

export default WatchListButton;
