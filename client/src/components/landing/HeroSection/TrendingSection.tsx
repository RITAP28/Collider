import axios from "axios";
import { useEffect, useState } from "react";
import {
  apiKey,
  IMoviesByGenre,
} from "../../../lib/data.interface";
import { useNavigate } from "react-router-dom";
import { config } from "../../../lib/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleApiError } from "../../../lib/error.handling";

const TrendingSection = () => {
  const navigate = useNavigate();
  const [trendingLoading, setTrendingLoading] = useState<boolean>(false);
  const [trendingMovies, setTrendingMovies] = useState<IMoviesByGenre[]>([]);

  useEffect(() => {
    const handleGetTrendingMovies = async () => {
      setTrendingLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${apiKey}`,
          config
        );
        setTrendingMovies(response.data.results);
        toast.success("Fetched Trending Movies successfully", {
          position: "top-right"
        });
      } catch (error) {
        console.error("Error while searching for popular movies: ", error);
        const apiError = handleApiError(error);
        toast.error(apiError.message, {
          position: "top-right"
        });
      } finally {
        setTrendingLoading(false);
      }
    };
    handleGetTrendingMovies();
  }, []);

  return (
    <div className="w-full flex flex-col p-4">
      <div className="w-full font-Poppins font-medium pl-2 pb-4 text-[1.5rem]">
        Trending:
      </div>
      {trendingLoading ? (
        "loading..."
      ) : (
        <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide pl-2 pt-2">
          {trendingMovies.map((movie, index) => (
            <div
              className="flex flex-col rounded-md w-[10rem] shrink-0 hover:scale-105 transition duration-200 ease-in-out hover:cursor-pointer"
              key={index}
              onClick={() => {
                navigate(`/movie/${movie.id}`);
              }}
            >
              <div className="w-full">
                <img
                  src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-15 h-15 rounded-md"
                />
              </div>
              <div className="w-full flex justify-center py-2">
                <p className="font-Manrope font-bold text-sm">
                  {movie.original_title}
                </p>
              </div>
            </div>
          ))}
          <div className="min-w-[10rem] flex justify-center">
            <button type="button" className="font-Manrope font-bold hover:underline transition duration-200 ease-in-out" onClick={() => {
              navigate(`/landing/movies/trending/1`);
            }}>
              View More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingSection;
