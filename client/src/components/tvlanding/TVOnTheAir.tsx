import axios from "axios";
import { useEffect, useState } from "react";
import {
  apiKey,
  bearerToken,
  ITVShowByGenre,
} from "../../lib/data.interface";

const TVOnTheAir = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [onTheAirTVShows, setOnTheAirTVShows] = useState<ITVShowByGenre[]>([]);

  const handleGetOnTheAirTvShows = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=${apiKey}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      setOnTheAirTVShows(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error while searching for popular movies: ", error);
    }
  };

  useEffect(() => {
    handleGetOnTheAirTvShows();
  }, []);

  return (
    <div className="w-full flex flex-col p-4">
      <div className="w-full font-Poppins font-medium pl-2 pb-4 text-[1.5rem]">
        Now Playing:
      </div>
      {loading ? (
        "loading..."
      ) : (
        <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide pl-2 pt-2">
          {onTheAirTVShows.map((show, index) => (
            <div
              className="flex flex-col rounded-md w-[10rem] shrink-0 hover:scale-105 transition duration-200 ease-in-out hover:cursor-pointer"
              key={index}
            >
              <div className="w-full">
                <img
                  src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${show.poster_path}`}
                  alt={show.original_name}
                  className="w-15 h-15 rounded-md"
                />
              </div>
              <div className="w-full flex justify-center py-2">
                <p className="font-Manrope font-bold text-sm">{show.original_name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TVOnTheAir;
