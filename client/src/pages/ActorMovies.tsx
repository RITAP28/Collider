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
      <div className="w-full flex flex-row pt-2 px-2 pb-6">
        <div className="basis-1/2 flex justify-start pl-2">
          <p className="font-Poppins font-semibold text-xl">
            {actorLoading ? "loading..." : `Movies by ${actorDetails?.name}:`}
          </p>
        </div>
        <div className="basis-1/2 flex justify-end pr-2">
          <div className="flex flex-row">
            <div className="pr-2">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-black text-white font-Manrope font-medium text-sm hover:bg-white hover:text-black transition duration-200 ease-in-out hover:cursor-pointer"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </div>
            <div className="px-2 flex justify-center items-center">
              <p className="font-Manrope font-medium text-lg">
                Page {currentPage} of {totalPages}
              </p>
            </div>
            <div className="px-2">
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-black text-white font-Manrope font-medium text-sm hover:bg-white hover:text-black transition duration-200 ease-in-out hover:cursor-pointer"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-4 px-2">
        {movies.map((movie, index) => (
          <div
            className="min-w-[5rem] min-h-[2rem] flex flex-col hover:scale-105 transition duration-200 ease-in-out hover:cursor-pointer bg-slate-400 hover:bg-black hover:text-white p-2 rounded-md"
            key={index}
            onClick={() => {
              navigate(`/movie/${movie.id}`);
            }}
          >
            <div className="pt-2">
              <img
                src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                alt={movie.original_title}
                className="rounded-md"
              />
            </div>
            <div className="w-full pl-2 pt-2 font-Poppins font-medium">
              <p className="text-base">{movie.original_title}</p>
            </div>
            <div className="w-full py-1 pl-2 font-Manrope font-medium">
              {handleDateToYear(movie.release_date)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ActorMovies;
