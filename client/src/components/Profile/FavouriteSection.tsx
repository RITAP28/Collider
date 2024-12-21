import { ILikeAndBookmark, port } from "../../lib/data.interface";
import { useAppSelector } from "../../redux/hooks/hook";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FavouriteSection = () => {
  const { currentUser, accessToken } = useAppSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const [likeMoviesLoading, setLikeMoviesLoading] = useState<boolean>(false);
  const [likeMovies, setLikeMovies] = useState<ILikeAndBookmark[]>([]);

  const handleGetFavourites = async () => {
    setLikeMoviesLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:${port}/get/favourite/movie?userId=${currentUser?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setLikeMovies(response.data.likedMovies);
      setLikeMoviesLoading(false);
    } catch (error) {
      console.error("Error while fetching favorites: ", error);
    }
  };

  useEffect(() => {
    handleGetFavourites();
  }, [currentUser?.id]);

  const handleDateConversion = (date: string) => {
    const inputDate = new Date(date);
    const formattedDate = inputDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };
  return (
    <div className="w-full flex flex-col pb-4">
      <div className="w-full">
        <p className="font-Manrope font-semibold text-xl p-2">Your Favourites:</p>
      </div>
      {likeMoviesLoading ? (
        "loading..."
      ) : (
        <div className="w-full grid grid-cols-3 gap-2 px-2">
          {likeMovies.map((movie, index) => (
            <div
              className="min-w-[10rem] flex flex-row bg-slate-400 transition duration-200 ease-in-out hover:cursor-pointer p-2 hover:bg-black hover:text-white rounded-md"
              key={index}
              onClick={() => {
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
                  {movie.movieOverview.slice(0, 80)}...
                </div>
                <div className="w-full flex flex-row">
                  <p className="pl-4 font-Manrope font-medium text-sm underline">
                    Vote Average:
                  </p>
                  <p className="pl-1 text-sm flex items-end font-semibold">
                    {movie.voteAvg}
                  </p>
                </div>
                <div className="w-full font-Manrope font-medium text-base pt-2 pl-4">
                  Liked on {handleDateConversion(movie.likedAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteSection;
