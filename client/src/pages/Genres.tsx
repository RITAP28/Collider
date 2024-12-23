import { useNavigate } from "react-router-dom";
import { apiKey, IGenre, IMoviesByGenre } from "../lib/data.interface";
import { config } from "../lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

const Genres = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [genre, setGenre] = useState<IGenre[]>([]);

  const [movieLoading, setMovieLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleGetGenre = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`,
          config
        );
        setGenre(response.data.genres);

        setLoading(false);
      } catch (error) {
        console.error("Error while fetching all genres: ", error);
      }
    };

    handleGetGenre();
  }, []);

  return loading ? (
    "loading..."
  ) : (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-center pt-2 pb-4">
        <p className="font-Manrope font-bold text-2xl">Our Genres</p>
      </div>
      <div className="w-full grid grid-cols-4 gap-4 px-2">
        {genre.map((g, index) => (
          <div
            className="w-full bg-gradient-to-r from-slate-400 to-blue-500 flex justify-center items-center px-4 py-8 rounded-lg hover:cursor-pointer hover:scale-105 transition duration-200 ease-in-out hover:text-white font-Manrope font-bold"
            key={index}
            onClick={() => {
              navigate(`/landing/genres/specific?genreId=${g.id}&genreName=${g.name}`);
            }}
          >
            <div className="">{g.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
