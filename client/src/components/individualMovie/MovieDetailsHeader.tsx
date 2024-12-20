import axios from "axios";
import { IMovieDetails } from "../../lib/data.interface";
import { useAppSelector } from "@/redux/hooks/hook";

const MovieDetailsHeader = ({
  movieDetails,
}: {
  movieDetails: IMovieDetails;
}) => {
  const { currentUser, accessToken } = useAppSelector((state) => state.user);
  const port = import.meta.env.VITE_SERVER_PORT;
  const requestBody = {
    userId: currentUser?.id,
    movieId: movieDetails.id,
    movieName: movieDetails.original_title,
    moviePoster: movieDetails.poster_path,
    movieOverview: movieDetails.overview,
    voteAvg: movieDetails.vote_average,
    voteCount: movieDetails.vote_count,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };


  const handleDateConversion = (date: string) => {
    const inputDate = date;
    const [year, month, day] = inputDate.split("-");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const handleDurationConversion = (duration: number) => {
    if (duration < 60) {
      return duration;
    } else {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours}h ${minutes}m`;
    }
  };

  const handleLikeMovie = async () => {
    try {
      const likedMovie = await axios.post(
        `http://localhost:${port}/like/movie/${movieDetails.id}`,
        requestBody,
        config
      );
      console.log("Movie successfully added to liked movies: ", likedMovie.data);
    } catch (error) {
      console.error("Error while adding movie to like list: ", error);
    }
  };

  const handleWatchlistMovie = async () => {
    try {
      const watchlistedMovie = await axios.post(`http://localhost:${port}/list/movie/${movieDetails.id}`, requestBody, config);
      console.log("Movie successfully watchlisted: ", watchlistedMovie.data);
    } catch (error) {
      console.error("Error while adding the movie to the watchlist: ", error);
    };
  };

  return (
    <div className="w-full flex flex-row p-4">
      <div className="w-[30%]">
        <img
          src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="w-[20rem] h-[30rem] rounded-xl shadow-xl"
        />
      </div>
      <div className="w-[70%]">
        <div className="w-full pt-4">
          <h1 className="font-Poppins font-semibold text-[2.5rem] text-white">
            {movieDetails.title}
          </h1>
        </div>
        <div className="w-full flex flex-row">
          <div className="flex items-center pr-2">
            {movieDetails.adult ? (
              <img src="/adult.png" alt="" className="w-2 h-2" />
            ) : (
              <img src="/pgTwo.png" alt="" className="w-8 h-8" />
            )}
          </div>
          <span className="font-Poppins font-semibold px-1 flex items-center">
            |
          </span>
          <div className="font-Poppins font-semibold px-2 flex items-center">
            {handleDateConversion(movieDetails.release_date)}
          </div>
          <span className="font-Poppins font-semibold px-1 flex items-center">
            |
          </span>
          <div className="px-2 flex items-center font-Poppins font-semibold">
            <p className="">{`(`}</p>
            {movieDetails.origin_country.map((movie) => (
              <div className="">{movie},</div>
            ))}
            <p className="">{`)`}</p>
          </div>
          <span className="font-Poppins font-semibold px-1 flex items-center">
            |
          </span>
          <div className="px-2 flex items-center font-Poppins font-semibold">
            {movieDetails.genres.map((genre, index) => (
              <div className="" key={index}>
                {genre.name},
              </div>
            ))}
          </div>
          <span className="font-Poppins font-semibold px-1 flex items-center">
            |
          </span>
          <div className="pl-2 flex items-center font-Poppins font-semibold">
            {movieDetails.runtime === 0
              ? ""
              : handleDurationConversion(movieDetails.runtime)}
          </div>
        </div>
        <div className="w-full flex flex-row py-2">
          <div className="pr-2">
            <button
              type="button"
              className="px-3 py-2 bg-slate-400 rounded-lg hover:cursor-pointer transition duration-200 ease-in-out hover:bg-slate-300 flex flex-row"
              onClick={handleWatchlistMovie}
            >
              <p className="">
                <img
                  src="/like/list.png"
                  alt=""
                  className="w-6 h-6 hover:scale-110 transition duration-150 ease-in-out"
                />
              </p>
              <p className="font-Poppins font-semibold pl-1">Add to List</p>
            </button>
          </div>
          <div className="px-2">
            <button
              type="button"
              className="px-3 py-2 bg-slate-400 rounded-lg hover:cursor-pointer transition duration-200 ease-in-out hover:bg-slate-300 flex flex-row"
              onClick={handleLikeMovie}
            >
              <p className="">
                <img
                  src="/like/heart.png"
                  alt=""
                  className="w-6 h-6 hover:scale-110 transition duration-150 ease-in-out"
                />
              </p>
              <p className="font-Poppins font-semibold pl-1">Like</p>
            </button>
          </div>
          <div className="px-2">
            <button
              type="button"
              className="px-3 py-2 bg-slate-400 rounded-lg hover:cursor-pointer transition duration-200 ease-in-out hover:bg-slate-300 flex flex-row"
            >
              <p className="">
                <img
                  src="/like/bookmark.png"
                  alt=""
                  className="w-6 h-6 hover:scale-110 transition duration-150 ease-in-out"
                />
              </p>
              <p className="font-Poppins font-semibold pl-1">Bookmark</p>
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full">
            <p className="font-Poppins text-lg font-semibold underline">
              Overview:
            </p>
          </div>
          <div className="w-full py-2">
            <p className="font-Poppins font-medium">{movieDetails.overview}</p>
          </div>
        </div>
        <div className="w-full">
          <button
            type="button"
            className="flex flex-row p-3 bg-slate-400 rounded-lg hover:bg-slate-300 transition duration-200 ease-in-out"
          >
            <p className="">
              <img
                src="/like/playBtn.png"
                alt=""
                className="w-6 h-6 hover:scale-110 transition duration-150 ease-in-out"
              />
            </p>
            <p className="pl-2 font-Poppins font-semibold">Play Trailer</p>
          </button>
        </div>
        <div className="w-full flex flex-col pt-4">
          <div className="w-full font-Manrope text-lg">Details:</div>
          <div className="w-full flex flex-row pt-2 gap-2">
            <button
              type="button"
              className="flex flex-row bg-slate-400 p-2 rounded-lg font-Poppins hover:scale-105 transition duration-200 ease-in-out hover:bg-black hover:text-white"
            >
              <p className="px-2 font-semibold">Ratings</p>
              <p className="pr-2">{movieDetails.vote_average}</p>
            </button>
            <button
              type="button"
              className="flex flex-row bg-slate-400 p-2 rounded-lg font-Poppins hover:scale-105 transition duration-200 ease-in-out hover:bg-black hover:text-white"
            >
              <p className="px-2 font-semibold">Status:</p>
              <p className="pr-2">{movieDetails.status}</p>
            </button>
            <button
              type="button"
              className="flex flex-row bg-slate-400 p-2 rounded-lg font-Poppins hover:scale-105 transition duration-200 ease-in-out hover:bg-black hover:text-white"
            >
              <p className="px-2 font-semibold">Budget:</p>
              <p className="pr-2">
                ${movieDetails.budget.toLocaleString("en-US")}
              </p>
            </button>
            <button
              type="button"
              className="flex flex-row bg-slate-400 p-2 rounded-lg font-Poppins hover:scale-105 transition duration-200 ease-in-out hover:bg-black hover:text-white"
            >
              <p className="px-2 font-semibold">Revenue:</p>
              <p className="pr-2">
                ${movieDetails.revenue.toLocaleString("en-US")}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsHeader;
