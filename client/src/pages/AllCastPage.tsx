import CastDetailsSection from "../components/castDetails/CastDetailsSection";
import {
  apiKey,
  ICastDetails,
  ICrewDetails,
  IMovieDetails,
} from "../lib/data.interface";
import { config } from "../lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CrewDetailsSection from "../components/castDetails/CrewDetailsSection";

const AllCastPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [castDetails, setCastDetails] = useState<ICastDetails[]>([]);
  const [crewDetails, setCrewDetails] = useState<ICrewDetails[]>([]);

  const [movieDetailsLoading, setMovieDetailsLoading] =
    useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<IMovieDetails>();

  useEffect(() => {
    const cachedKey = `movie-cast-crew-${id}`;
    const cachedData = localStorage.getItem(cachedKey);

    // if cached data is present in the local storage, then the states will be updated from the if block below
    // and it will return, meaning no further functions wll be executed
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      setCastDetails(parsedData.castDetails);
      setCrewDetails(parsedData.crewDetails);
      return;
    }

    // function to retrieve cast and crew details from the available movie id
    const handleGetCastDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`,
          config
        );

        // in the absence of cache data, the data will be set in the localstorage
        localStorage.setItem(
          cachedKey,
          JSON.stringify({
            castDetails: response.data.cast,
            crewDetails: response.data.crew,
          })
        );

        setCastDetails(response.data.cast);
        setCrewDetails(response.data.crew);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching cast details: ", error);
      }
    };

    // function to retrieve the movie details from the id
    const handleGetMovieDetailsById = async () => {
      try {
        setMovieDetailsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`,
          config
        );
        console.log("movie details: ", response.data);
        setMovieDetails(response.data);
        setMovieDetailsLoading(false);
      } catch (error) {
        console.error("Error while searching for movies by id: ", error);
      }
    };

    handleGetCastDetails();
    handleGetMovieDetailsById();
  }, [id]);
  
  return loading ? (
    "loading..."
  ) : (
    <div className="w-full">
      {/* Movie Title Section */}
      {movieDetailsLoading ? (
        "loading name of the movie..."
      ) : (
        <div className="w-full flex justify-center items-center p-4">
          <p className="font-Manrope font-bold text-xl md:text-2xl text-white text-center">
            {movieDetails?.original_title}
          </p>
        </div>
      )}

      {/* Cast and Crew Container */}
      <div className="w-full flex flex-col md:flex-row pb-[3rem] px-4 md:px-0 gap-6 md:gap-0">
        {/* Cast Details Section */}
        <CastDetailsSection castDetails={castDetails} />

        {/* Crew Details Section */}
        <CrewDetailsSection crewDetails={crewDetails} />
      </div>
    </div>
  );
};

export default AllCastPage;
