import { useEffect, useState } from "react";
import {
  apiKey,
  bearerToken,
  IMoviesByGenre,
} from "../../../lib/data.interface";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopRatedSection = () => {
  const navigate = useNavigate();
  const [sectionLoading, setSectionLoading] = useState<boolean>(false);
  const [topRatedMovies, setTopRatedMovies] = useState<IMoviesByGenre[]>([]);

  const handleGetTopRatedMovies = async () => {
    setSectionLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      setTopRatedMovies(response.data.results);
      setSectionLoading(false);
    } catch (error) {
      console.error("Error while searching for top rated movies: ", error);
    }
  };

  useEffect(() => {
    handleGetTopRatedMovies();
  }, []);

  return (
    <div className="w-full flex flex-col p-4">
      <div className="w-full font-Poppins font-medium pl-2 pb-4 text-[1.5rem]">
        Top Rated Movies:
      </div>
      {sectionLoading ? (
        "loading..."
      ) : (
        <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide pl-2 pt-2">
          {topRatedMovies.map((movie, index) => (
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
            <button type="button" className="font-Manrope font-semibold text-lg hover:underline transition duration-200 ease-in-out hover:cursor-pointer" onClick={() => {
              navigate(`/landing/movies/top/rated`);
            }}>
              View More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopRatedSection;
