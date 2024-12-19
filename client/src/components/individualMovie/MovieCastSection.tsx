import { apiKey, ICastDetails, IMovieDetails } from "../../lib/data.interface";
import axios from "axios";
import { useEffect, useState } from "react";

const MovieCastSection = ({
  movieDetails,
}: {
  movieDetails: IMovieDetails;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [castDetails, setCastDetails] = useState<ICastDetails[]>([]);

  const handleGetCastDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieDetails.id}/credits?api_key=${apiKey}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      setCastDetails(response.data.cast);
      setLoading(false);
    } catch (error) {
      console.error("Error while getting cast details: ", error);
    }
  };

  useEffect(() => {
    handleGetCastDetails();
  }, []);

  return loading ? (
    "loading..."
  ) : (
    <div className="w-full flex flex-row gap-2 pl-4 overflow-x-scroll">
      {castDetails.slice(0, 8).map((cast, index) => (
        <div className="bg-slate-300" key={index}>
          <div className="w-full">
            <img
              src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${cast.profile_path}`}
              alt=""
              className="w-45 h-35"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCastSection;
