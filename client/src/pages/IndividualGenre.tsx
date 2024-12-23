import axios from "axios";
import { apiKey, IMoviesByGenre } from "../lib/data.interface";
import { useEffect, useState } from "react";
import { config } from "../lib/utils";

const IndividualGenre = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const genreId = urlParams.get("genreId");
  const genreName = urlParams.get("genreName");
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMoviesByGenre[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  // retrieving all the movies from one genre with the id in the params
  // while rendering the page, using useEffect depending upon id
  useEffect(() => {
    const handleGetMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?page=${currentPage}&with_genres=${genreId}&api_key=${apiKey}`,
          config
        );
        setMovies(response.data.results);
        setCurrentPage(response.data.page);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching movies based on genre id: ", error);
      }
    };

    handleGetMovies();
  }, [genreId, currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleDateToYear = (date: string) => {
    const inputDate = new Date(date);
    if (Number.isNaN(inputDate.getFullYear())) {
        return "Not released yet";
    } else {
        return inputDate.getFullYear();
    }
  };

  return loading ? (
    "loading..."
  ) : (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row">
        <div className="basis-1/2 flex justify-start pl-2 font-Manrope font-bold text-2xl">
          <p className="pl-6">Movies in {genreName}:</p>
        </div>
        <div className="basis-1/2 flex justify-end pr-2">
          <div className="">
            <button
              type="button"
              className="bg-black text-white font-Manrope font-semibold hover:bg-white hover:text-black transition duration-200 ease-in-out hover:cursor-pointer rounded-md px-4 py-1"
              onClick={handlePrev}
            >
              Prev
            </button>
          </div>
          <div className="px-3 flex justify-center items-center font-Manrope font-light">
            Page {currentPage} of {totalPages}
          </div>
          <div className="">
            <button
              type="button"
              className="bg-black text-white font-Manrope font-semibold hover:bg-white hover:text-black transition duration-200 ease-in-out hover:cursor-pointer rounded-md px-4 py-1"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-4 px-2 pt-4 pb-4">
        {movies.map((movie, index) => (
          <div className="w-full rounded-md flex flex-col hover:text-white transition duration-200 ease-in-out hover:cursor-pointer hover:scale-105" key={index}>
            <div className="w-full flex justify-center pt-2">
              <img
                src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                alt={movie.original_title}
                className="w-[14rem] h-[18rem] rounded-md"
              />
            </div>
            <div className="w-full pl-6 pt-2 pb-4">
                <p className="font-Manrope font-bold text-xl">
                    {movie.original_title} ({handleDateToYear(movie.release_date)})
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndividualGenre;
