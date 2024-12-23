import axios from "axios";
import { useEffect, useState } from "react";
import { apiKey, IGenre } from "../../../lib/data.interface";
import EachGenreHeroSection from "./EachGenreHeroSection";
import { config } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";

const GenreSection = () => {
  const [genreLoading, setGenreLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const [allGenres, setAllGenres] = useState<IGenre[]>([]);
  const handleGetGenres = async () => {
    setGenreLoading(true);
    try {
      const getResponse = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`,
        config
      );
      const limitedResponse = getResponse.data.genres.slice(0, 9);
      setAllGenres(limitedResponse);
      setGenreLoading(false);
    } catch (error) {
      console.error("Failed to fetch all genres: ", error);
    }
  };

  useEffect(() => {
    handleGetGenres();
  }, []);

  return (
    <div className="w-full flex flex-col p-4">
      <div className="w-full font-Poppins font-medium pl-2 pb-4 text-[1.5rem]">
        Our Genres
      </div>
      {genreLoading ? (
        "genre loading..."
      ) : (
        <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide pl-2 py-2">
          {allGenres.map((genre, index) => (
            <div
              className="bg-slate-300 rounded-md w-[8rem] shrink-0 py-2 px-2 hover:cursor-pointer hover:scale-105 transition duration-200 ease-in-out"
              key={index}
              onClick={() => {
                navigate(`/landing/genres/specific?genreId=${genre.id}&genreName=${genre.name}`);
              }}
            >
              <EachGenreHeroSection genre={genre} />
            </div>
          ))}
          <div className="w-[10rem] flex justify-center items-center pr-10 pl-6">
            <button
              className="bg-black text-white font-medium font-Poppins text-[0.6rem] p-4 rounded-full hover:scale-110 transition duration-150 ease-in-out"
              onClick={() => {
                navigate(`/landing/genres`);
              }}
            >
              View More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreSection;
