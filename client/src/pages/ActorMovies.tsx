import { apiKey, IActorDetails, IMoviesByGenre } from "../lib/data.interface";
import { config } from "../lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ActorMovies = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMoviesByGenre[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [actorLoading, setActorLoading] = useState<boolean>(false);
  const [actorDetails, setActorDetails] = useState<IActorDetails | null>(null);

  const handleDateToYear = (date: string) => {
    const inputDate = new Date(date);
    if (Number.isNaN(inputDate.getFullYear())){
        return "Not released yet"
    } else {
        return inputDate.getFullYear();
    }
  };

  useEffect(() => {
    const cacheKey = `movie-${id}-${currentPage}`;
    const cachedData = localStorage.getItem(cacheKey);

    // if data is cached already in the local storage
    // then the code below will run and fill up the states
    // and return
    if (cachedData){
        const parsedData = JSON.parse(cachedData);
        setMovies(parsedData.movies);
        setCurrentPage(parsedData.currentPage);
        setTotalPages(parsedData.totalPages);
        return;
    }

    // if no cached data is available, then the following function will be executed
    const handleGetMoviesBasedOnActorId = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_cast=${id}&api_key=${apiKey}&page=${currentPage}`,
          config
        );
        setMovies(response.data.results);
        setCurrentPage(response.data.page);
        setTotalPages(response.data.total_pages);

        // setting the data in the local storage for cache for fast retrieval
        localStorage.setItem(
            cacheKey,
            JSON.stringify({
                movies: response.data.results,
                currentPage: response.data.page,
                totalPages: response.data.total_pages,
            })
        )

        setLoading(false);
      } catch (error) {
        console.error("Error while getting movies based on actor id: ", error);
      }
    };

    const handleGetDetails = async () => {
      setActorLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`,
          config
        );
        setActorDetails(response.data);

        setActorLoading(false);
      } catch (error) {
        console.error("Error while getting actor details: ", error);
      }
    };

    handleGetMoviesBasedOnActorId();
    handleGetDetails();
  }, [id, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return loading ? (
    "loading..."
  ) : (
    <>
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row pt-2 px-4 pb-4 md:pb-6">
        <div className="w-full md:basis-1/2 flex justify-center md:justify-start">
          <p className="font-Poppins font-semibold text-lg md:text-xl text-center md:text-left">
            {actorLoading ? "loading..." : `Movies by ${actorDetails?.name}:`}
          </p>
        </div>
        
        {/* Pagination Controls */}
        <div className="w-full md:basis-1/2 flex justify-center md:justify-end mt-4 md:mt-0">
          <div className="flex flex-row items-center gap-2">
            <button
              type="button"
              className="px-3 md:px-4 py-2 rounded-lg bg-black text-white font-Manrope font-medium text-sm hover:bg-white hover:text-black transition duration-200 ease-in-out hover:cursor-pointer"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <div className="px-2 md:px-3 flex justify-center items-center">
              <p className="font-Manrope font-medium text-base md:text-lg">
                Page {currentPage} of {totalPages}
              </p>
            </div>
            <button
              type="button"
              className="px-3 md:px-4 py-2 rounded-lg bg-black text-white font-Manrope font-medium text-sm hover:bg-white hover:text-black transition duration-200 ease-in-out hover:cursor-pointer"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
  
      {/* Movies Grid */}
      <div className="w-full grid grid-cols-2 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {movies.map((movie, index) => (
          <div
            className="flex flex-col hover:scale-105 transition duration-200 ease-in-out hover:cursor-pointer bg-slate-400 hover:bg-black hover:text-white p-2 rounded-md"
            key={index}
            onClick={() => {
              navigate(`/movie/${movie.id}`);
            }}
          >
            <div className="pt-2 flex justify-center">
              <img
                src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                alt={movie.original_title}
                className="w-[80%] md:w-full rounded-md"
              />
            </div>
            <div className="w-full px-2 md:px-4 pt-2 font-Poppins font-medium">
              <p className="text-base text-center md:text-left line-clamp-2">
                {movie.original_title}
              </p>
            </div>
            <div className="w-full py-1 px-2 md:px-4 font-Manrope font-medium text-center md:text-left">
              {handleDateToYear(movie.release_date)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ActorMovies;
