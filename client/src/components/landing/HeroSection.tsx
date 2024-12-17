import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IGenre } from "../../lib/data.interface";

const apiKey = import.meta.env.API_KEY;
const bearerToken = import.meta.env.BEARER_TOKEN;

const HeroSection = () => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const handleGetGenres = useCallback(async () => {
    try {
      const getResponse = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      setGenres(getResponse.data.genres);
      console.log(genres);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    handleGetGenres();
  }, [handleGetGenres]);
  return (
    <div className="w-full flex flex-col">
      {/* genres section */}
      <div className="w-full flex flex-col">
        <div className="w-full">Genres</div>
        <div className="w-full"></div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default HeroSection;
