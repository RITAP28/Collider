import { useAppSelector } from "../../redux/hooks/hook";
import { IWatchlist, port } from "../../lib/data.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const { currentUser, accessToken } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [watchlist, setWatchlist] = useState<IWatchlist[]>([]);

  const handleDateConversion = (date: string) => {
    const inputDate = new Date(date);
    const formattedDate = inputDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
    return formattedDate;
  };

  useEffect(() => {
    const handleGetWatchlist = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:${port}/api/v1/get/watchlist/movie?userId=${currentUser?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("response: ", response.data);
        setWatchlist(response.data.watchlist);
        setLoading(false);
      } catch (error) {
        console.error("Error while retrieving watchlist from the db: ", error);
      }
    };

    handleGetWatchlist();
  }, [currentUser?.id, accessToken]);

  return loading ? (
    "loading..."
  ) : (
    <div className="w-full flex flex-col p-4 min-h-screen">
      <div className="w-full font-Poppins font-semibold text-3xl">
        Your Watchlist:
      </div>
      <div className="w-full md:grid md:grid-cols-3 flex flex-col gap-1 overflow-x-auto scrollbar-hide pt-4">
        {watchlist.map((movie, index) => (
          <div
            className="flex flex-row bg-slate-400 transition duration-200 ease-in-out hover:cursor-pointer p-2 hover:bg-black hover:text-white rounded-md"
            key={index}
            onClick={() => {
              // navigate to movie details page
              navigate(`/movie/${movie.movieId}`);
            }}
          >
            {/* movie details */}
            <div className="w-full basis-1/3">
              <img
                src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.moviePoster}`}
                alt={movie.movieName}
                className="rounded-md w-26 shadow-lg"
              />
            </div>
            <div className="basis-2/3 w-full flex flex-col">
              <div className="w-full font-Poppins font-semibold text-3xl pl-4">
                {movie.movieName}
              </div>
              <div className="w-full font-Manrope font-medium text-base">
                <p className="pl-4">Overview:</p>
              </div>
              <div className="w-full pr-2 pl-4 text-sm font-Manrope">
                {movie.movieOverview.slice(0,80)}...
              </div>
              <div className="w-full flex flex-row">
                <p className="pl-4 font-Manrope font-medium text-sm underline">Vote Average:</p>
                <p className="pl-1 text-sm flex items-end font-semibold">
                    {movie.voteAvg}
                </p>
              </div>
              <div className="w-full font-Manrope font-medium text-base pt-2 pl-4">
                Watchlisted on {handleDateConversion(movie.addedAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
