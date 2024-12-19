import MovieCommentsSection from "../components/individualMovie/MovieCommentsSection";
import MovieCastSection from "../components/individualMovie/MovieCastSection";
import MovieDetailsHeader from "../components/individualMovie/MovieDetailsHeader";
import { apiKey, IMovieDetails } from "../lib/data.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieRecommendationSection from "../components/individualMovie/MovieRecommendationSection";
import { config } from "../lib/utils";

const IndividualMovie = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null);

  const handleGetMovieDetailsById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`, config);
      console.log("movie details: ", response.data);
      setMovieDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error while searching for movies by id: ", error);
    }
  };

  useEffect(() => {
    handleGetMovieDetailsById();
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        "loading..."
      ) : movieDetails ? (
        <>
          <MovieDetailsHeader movieDetails={movieDetails} />
          <div className="w-full">
            <div className="w-full font-Poppins font-medium text-2xl p-4">
              Meet the Cast:
            </div>
            <MovieCastSection movieDetails={movieDetails} />
          </div>
          <div className="w-full p-4">
            <MovieCommentsSection />
          </div>
          <div className="w-full">
            <div className="w-full pl-4 font-Poppins font-semibold text-xl">
                Recommended for you:
            </div>
            <div className="w-full p-4 flex flex-row gap-2 overflow-x-auto scrollbar-hide">
              <MovieRecommendationSection movieDetails={movieDetails} />
            </div>
          </div>
        </>
      ) : (
        "movie details is null"
      )}
    </div>
  );
};

export default IndividualMovie;
