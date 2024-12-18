import axios from "axios";
import { useEffect, useState } from "react";
import { IGenre } from "../../../lib/data.interface";
import EachGenreHeroSection from "./EachGenreHeroSection";

const GenreSection = () => {
  const [genreLoading, setGenreLoading] = useState<boolean>(false);

  const [allGenres, setAllGenres] = useState<IGenre[]>([]);

  const apiKey = "f316a137d4d837a8377f9a0aad0792af";

  const handleGetGenres = async () => {
    setGenreLoading(true);
    try {
      const getResponse = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${import.meta.env.VITE_API_KEY}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
          },
        }
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
      <div className="w-full font-Poppins font-medium pl-2 pb-4 text-[1.5rem]">Our Genres</div>
      {genreLoading ? (
        "genre loading..."
      ) : (
        <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide pl-2">
          {allGenres.map((genre, index) => (
            <div
              className="bg-slate-300 rounded-md w-[8rem] shrink-0 py-2 px-2"
              key={index}
            >
              <EachGenreHeroSection genre={genre} />
            </div>
          ))}
          <div className="w-[10rem] flex justify-center items-center pr-10 pl-6">
            <button className="bg-black text-white font-medium font-Poppins text-[0.6rem] p-4 rounded-full hover:scale-110 transition duration-150 ease-in-out">
              View More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenreSection;
