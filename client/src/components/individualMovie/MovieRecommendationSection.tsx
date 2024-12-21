
import { config } from "../../lib/utils";
import {
  apiKey,
  IMovieDetails,
  IMoviesByGenre,
} from "../../lib/data.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieRecommendationSection = ({
  movieDetails,
}: {
  movieDetails: IMovieDetails;
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<IMoviesByGenre[]>([]);

  const handleMovieRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieDetails.id}/recommendations?language=en-US&page=1&api_key=${apiKey}`,
        config
      );
      setRecommendations(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error while loading movie recommendations: ", error);
    }
  };

  useEffect(() => {
    handleMovieRecommendations();
  }, []);

  return loading
    ? "loading..."
    : recommendations.map((movie, index) => (
        <div
          className="min-w-[10rem] flex flex-col hover:scale-105 hover:cursor-pointer transition duration-200 ease-in-out"
          key={index}
          onClick={() => {
            navigate(`/movie/${movie.id}`);
          }}
        >
          <div className="w-full">
            <img
              src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
              alt={movie.original_title}
              className="w-[13rem] h-[15rem] rounded-lg"
            />
          </div>
          <div className="w-full font-Manrope font-semibold pl-2 text-sm py-2">
            {movie.original_title}
          </div>
        </div>
      ));
};

export default MovieRecommendationSection;
