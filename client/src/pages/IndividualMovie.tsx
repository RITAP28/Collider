import MovieCastSection from "../components/individualMovie/MovieCastSection";
import MovieDetailsHeader from "../components/individualMovie/MovieDetailsHeader";
import { apiKey, bearerToken, IMovieDetails } from "../lib/data.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IndividualMovie = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<IMovieDetails | null>(null);

  const handleGetMovieDetailsById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
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
            <MovieCastSection movieDetails={movieDetails} />
          </div>
        </>
      ) : (
        "movie details is null"
      )}
    </div>
  );
};

export default IndividualMovie;
