import { apiKey, ICastDetails, IMovieDetails } from "../../lib/data.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieCastSection = ({
  movieDetails,
}: {
  movieDetails: IMovieDetails;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [castDetails, setCastDetails] = useState<ICastDetails[]>([]);

  const navigate = useNavigate();

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
  }, [movieDetails.id]);

  return loading ? (
    "loading..."
  ) : (
    <div className="w-full flex flex-row gap-2 pl-4 overflow-x-auto scrollbar-hide pb-4 pt-4">
      {castDetails.slice(0, 8).map((cast, index) => (
        <div
          className="bg-slate-300 min-w-[10rem] rounded-lg hover:scale-105 transition duration-200 ease-in-out"
          key={index}
          onClick={() => {
            navigate(`/person/${cast.id}`);
          }}
        >
          <div className="w-full">
            <img
              src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${cast.profile_path}`}
              alt=""
              className="w-[12rem] h-[15rem] rounded-t-lg"
            />
          </div>
          <div className="w-full font-semibold font-Poppins px-1 py-2">
            {cast.name}
          </div>
          <div className="w-full font-Manrope pl-2 pr-1 pb-2">
            {cast.character}
          </div>
        </div>
      ))}
      <div className="w-[10rem] pl-4 pr-8 flex justify-center items-center">
        <button
          type="button"
          className="bg-black text-white font-Poppins font-semibold text-sm rounded-full p-4 hover:cursor-pointer hover:scale-105 transition duration-200 ease-in-out"
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default MovieCastSection;
