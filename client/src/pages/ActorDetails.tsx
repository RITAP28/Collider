import { config } from "../lib/utils";
import { apiKey, IActorDetails, IMoviesByGenre } from "../lib/data.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ActorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [actorDetails, setActorDetails] = useState<IActorDetails | null>(null);
  const [movies, setMovies] = useState<IMoviesByGenre[]>([]);
  const handleGetDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`,
        config
      );
      setActorDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error while getting actor details: ", error);
    }
  };

  const handleGetMoviesBasedOnActor = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_cast=${id}&api_key=${apiKey}`,
        config
      );
      console.log("movies based on actor: ", response.data.results);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error while getting movies based on actor: ", error);
    }
  };

  useEffect(() => {
    handleGetDetails();
    handleGetMoviesBasedOnActor();
  }, [id]);

  const handleDateToYear = (date: string) => {
    const inputDate = new Date(date);
    return inputDate.getFullYear();
  };

  return loading ? (
    "loading..."
  ) : (
    <>
      <div className={`w-full flex flex-row`}>
        <div className="basis-1/4 w-full flex justify-center items-center">
          <img
            src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${actorDetails?.profile_path}`}
            alt={actorDetails?.name}
            className="h-[90%] rounded-lg shadow-lg"
          />
        </div>
        <div className="basis-3/4 w-full">
          <div className="w-full font-Poppins font-bold text-4xl text-white pt-4 pl-2">
            {actorDetails?.name}
          </div>
          <div className="w-full pl-2 py-3">
            <div className="w-full pb-2 font-Manrope font-medium">
              Personal Details:
            </div>
            <div className="w-full flex flex-row gap-2 flex-wrap">
              <button
                type="button"
                className="flex flex-row bg-slate-400 text-black font-Poppins text-base font-medium p-2 rounded-lg transition duration-200 ease-in-out hover:bg-black hover:text-white hover:scale-105"
              >
                <p className="pr-2 underline">known for:</p>
                <p className="">{actorDetails?.known_for_department}</p>
              </button>
              <button
                type="button"
                className="flex flex-row bg-slate-400 text-black font-Poppins text-base font-medium p-2 rounded-lg transition duration-200 ease-in-out hover:bg-black hover:text-white hover:scale-105"
              >
                <p className="pr-2 underline">place of birth:</p>
                <p className="">{actorDetails?.place_of_birth}</p>
              </button>
              <button
                type="button"
                className="flex flex-row bg-slate-400 text-black font-Poppins text-base font-medium p-2 rounded-lg transition duration-200 ease-in-out hover:bg-black hover:text-white hover:scale-105"
              >
                <p className="pr-2 underline">birthday:</p>
                <p className="">{actorDetails?.birthday}</p>
              </button>
              <button
                type="button"
                className="flex flex-row bg-slate-400 text-black font-Poppins text-base font-medium p-2 rounded-lg transition duration-200 ease-in-out hover:bg-black hover:text-white hover:scale-105"
              >
                <p className="underline pr-2">popularity:</p>
                <p className="">{actorDetails?.popularity}</p>
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col px-2">
            <div className="w-full font-Manrope font-medium text-base">
              Biography:
            </div>
            <div className="w-full font-Poppins font-medium">
              {actorDetails?.biography.slice(0,400)}...
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col pt-2">
        <div className="w-full pl-6 font-Poppins font-medium text-lg">
          Movies {actorDetails?.name} is a part of:
        </div>
        <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide pl-6 pb-4 pt-2">
          {movies.map((movie, index) => (
            <div
              className="min-w-[10rem] flex flex-col hover:scale-105 transition duration-200 ease-in-out hover:cursor-pointer bg-slate-400 p-2 rounded-md"
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
          <div className="min-w-[10rem] flex justify-center items-center font-Manrope font-semibold">
            <button
              type="button"
              className="hover:underline transition duration-200 ease-in-out"
              onClick={() => {
                navigate(`/movie/person/${actorDetails?.id}`);
              }}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActorDetails;
