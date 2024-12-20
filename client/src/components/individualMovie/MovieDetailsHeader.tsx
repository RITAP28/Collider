import { IMovieDetails } from "../../lib/data.interface";
import WatchListButton from "./buttons/WatchListButton";
import FavouriteButton from "./buttons/FavouriteButton";
import BookmarkButton from "./buttons/BookmarkButton";

const MovieDetailsHeader = ({
  movieDetails,
}: {
  movieDetails: IMovieDetails;
}) => {
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
            {movieDetails.origin_country.map((movie, index) => (
              <div className="" key={index}>{movie},</div>
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
          <FavouriteButton movieDetails={movieDetails} />
          <WatchListButton movieDetails={movieDetails} />
          <BookmarkButton movieDetails={movieDetails} />
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
