import axios from "axios";
import { useEffect, useState } from "react";
import {
  apiKey,
  bearerToken,
  IMoviesByGenre,
} from "../../../lib/data.interface";

const NowPlayingSection = () => {
  const [nowPlayingLoading, setNowPlayingLoading] = useState<boolean>(false);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<IMoviesByGenre[]>([]);

  const handleGetPopularMovies = async () => {
    setNowPlayingLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      setNowPlayingMovies(response.data.results);
      setNowPlayingLoading(false);
    } catch (error) {
      console.error("Error while searching for popular movies: ", error);
    }
  };

  useEffect(() => {
    handleGetPopularMovies();
  }, []);

  return (
    <div className="w-full flex flex-col p-4">
      <div className="w-full font-Poppins font-medium pl-2 pb-4 text-[1.5rem]">
        Now Playing:
      </div>
      {nowPlayingLoading ? (
        "loading..."
      ) : (
        <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide pl-2 pt-2">
          {nowPlayingMovies.map((movie, index) => (
            <div
              className="flex flex-col rounded-md w-[10rem] shrink-0 hover:scale-105 transition duration-200 ease-in-out hover:cursor-pointer"
              key={index}
            >
              <div className="w-full">
                <img
                  src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-15 h-15 rounded-md"
                />
              </div>
              <div className="w-full flex justify-center py-2">
                <p className="font-Manrope font-bold text-sm">{movie.original_title}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NowPlayingSection;
