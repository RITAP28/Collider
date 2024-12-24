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
    <div className="w-full flex flex-col md:flex-row p-4">
      <div className="w-full md:w-[30%] flex justify-center md:block">
        <img
          src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movieDetails.poster_path}`}
          alt={movieDetails.title}
          className="w-[15rem] md:w-[20rem] h-[22rem] md:h-[30rem] rounded-xl shadow-xl"
        />
      </div>
      <div className="w-full md:w-[70%] mt-4 md:mt-0">
        <div className="w-full pt-4">
          <h1 className="font-Poppins font-semibold text-[1.8rem] md:text-[2.5rem] text-white text-center md:text-left">
            {movieDetails.title}
          </h1>
        </div>
        <div className="w-full flex flex-row flex-wrap justify-center md:justify-start gap-2 md:gap-0">
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
            <p>{`(`}</p>
            {movieDetails.origin_country.map((movie, index) => (
              <div key={index}>{movie},</div>
            ))}
            <p>{`)`}</p>
          </div>
          <span className="font-Poppins font-semibold px-1 flex items-center">
            |
          </span>
          <div className="px-2 flex items-center font-Poppins font-semibold flex-wrap justify-center">
            {movieDetails.genres.map((genre, index) => (
              <div key={index} className="mx-1">
                {genre.name}
                {index < movieDetails.genres.length - 1 ? "," : ""}
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
        <div className="w-full flex flex-row justify-center md:justify-start py-2">
          <FavouriteButton movieDetails={movieDetails} />
          <WatchListButton movieDetails={movieDetails} />
          <BookmarkButton movieDetails={movieDetails} />
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full">
            <p className="font-Poppins text-lg font-semibold underline text-center md:text-left">
              Overview:
            </p>
          </div>
          <div className="w-full py-2">
            <p className="font-Poppins font-medium text-center md:text-left">
              {movieDetails.overview}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center md:justify-start">
          <button
            type="button"
            className="flex flex-row p-3 bg-slate-400 rounded-lg hover:bg-slate-300 transition duration-200 ease-in-out"
          >
            <p>
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
          <div className="w-full font-Manrope text-lg text-center md:text-left">Details:</div>
          <div className="w-full flex flex-row flex-wrap justify-center md:justify-start pt-2 gap-2">
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
