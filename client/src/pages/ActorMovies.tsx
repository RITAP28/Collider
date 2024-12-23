import { apiKey, IActorDetails, IMoviesByGenre } from "../lib/data.interface";
import { config } from "../lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActorMovies = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMoviesByGenre[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [actorLoading, setActorLoading] = useState<boolean>(false);
  const [actorDetails, setActorDetails] = useState<IActorDetails | null>(null);

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
      <div className="w-full flex flex-row p-2">
        <div className="basis-1/2 flex justify-start pl-2">
          <p className="font-Poppins font-semibold text-lg">
            {actorLoading ? "loading..." : `Movies by ${actorDetails?.name}:`}
          </p>
        </div>
        <div className="basis-1/2">
          <div className="">
            <button
              type="button"
              className=""
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <p className="font-Manrope font-medium text-lg">
              Page {currentPage} of {totalPages}
            </p>
            <button
              type="button"
              className=""
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-2">
        {movies.map((movie, index) => (
          <div className="w-full font-Manrope text-black" key={index}>
            {movie.original_title}
          </div>
        ))}
      </div>
    </>
  );
};

export default ActorMovies;
