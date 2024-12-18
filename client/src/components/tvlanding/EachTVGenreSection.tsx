import { useEffect, useState } from "react";
import {
  apiKey,
  IGenre,
  ITVShowByGenre,
} from "../../lib/data.interface";
import axios from "axios";

const EachTVGenreSection = ({ genre }: { genre: IGenre }) => {
  const imageClass = "w-15 h-15 rounded-sm";

  const [moviesByGenreLoading, setMoviesByGenreLoading] =
    useState<boolean>(false);

  const [action, setAction] = useState<ITVShowByGenre[]>([]);
  const [animation, setAnimation] = useState<ITVShowByGenre[]>([]);
  const [crime, setCrime] = useState<ITVShowByGenre[]>([]);
  const [comedy, setComedy] = useState<ITVShowByGenre[]>([]);
  const [documentary, setDocumentary] = useState<ITVShowByGenre[]>([]);
  const [drama, setDrama] = useState<ITVShowByGenre[]>([]);
  const [family, setFamily] = useState<ITVShowByGenre[]>([]);
  const [kids, setKids] = useState<ITVShowByGenre[]>([]);
  const [mystery, setMystery] = useState<ITVShowByGenre[]>([]);
  const [fantasy, setFantasy] = useState<ITVShowByGenre[]>([]);
  const [western, setWestern] = useState<ITVShowByGenre[]>([]);

  const handleGetMoviesByGenres = async (genreId: number) => {
    setMoviesByGenreLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}&api_key=${apiKey}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
          },
        }
      );
      const limitedResponse = response.data.results.slice(0, 4);
      switch (genreId) {
        case 28:
          setAction(limitedResponse);
          break;
        case 16:
          setAnimation(limitedResponse);
          break;
        case 35:
          setComedy(limitedResponse);
          break;
        case 80:
          setCrime(limitedResponse);
          break;
        case 99:
          setDocumentary(limitedResponse);
          break;
        case 18:
          setDrama(limitedResponse);
          break;
        case 10751:
          setFamily(limitedResponse);
          break;
        case 10762:
          setKids(limitedResponse);
          break;
        case 9648:
          setMystery(limitedResponse);
          break;
        case 10765:
          setFantasy(limitedResponse);
          break;
        case 37:
          setWestern(limitedResponse);
          break;
        default:
          break;
      }
      setMoviesByGenreLoading(false);
    } catch (error) {
      console.error(`Failed to fetch movies of genre ${genreId}: `, error);
    }
  };

  const renderContentByGenreId = (genreId: number) => {
    switch (genreId) {
      case 28:
        return (
          <>
            <div className="flex flex-row gap-[0.125rem]">
              {action.slice(0, 2).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[0.125rem]">
              {action.slice(2, 4).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
          </>
        );
      case 16:
        return (
          <>
            <div className="flex flex-row gap-[0.125rem]">
              {animation.slice(0, 2).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[0.125rem]">
              {animation.slice(2, 4).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
          </>
        );
      case 35:
        return (
          <>
            <div className="flex flex-row gap-[0.125rem]">
              {comedy.slice(0, 2).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[0.125rem]">
              {comedy.slice(2, 4).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
          </>
        );
      case 80:
        return (
          <>
            <div className="flex flex-row gap-[0.125rem]">
              {crime.slice(0, 2).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[0.125rem]">
              {crime.slice(2, 4).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
          </>
        );
      case 99:
        return (
          <>
            <div className="flex flex-row gap-[0.125rem]">
              {documentary.slice(0, 2).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[0.125rem]">
              {documentary.slice(2, 4).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
          </>
        );
      case 18:
        return (
          <>
            <div className="flex flex-row gap-[0.125rem]">
              {drama.slice(0, 2).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[0.125rem]">
              {drama.slice(2, 4).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
          </>
        );
      case 10751:
        return (
          <>
            <div className="flex flex-row gap-[0.125rem]">
              {family.slice(0, 2).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[0.125rem]">
              {family.slice(2, 4).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
          </>
        );
      case 10765:
        return (
          <>
            <div className="flex flex-row gap-[0.125rem]">
              {fantasy.slice(0, 2).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[0.125rem]">
              {fantasy.slice(2, 4).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
          </>
        );
      case 9648:
        return (
          <>
            <div className="flex flex-row gap-[0.125rem]">
              {mystery.slice(0, 2).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[0.125rem]">
              {mystery.slice(2, 4).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
          </>
        );
      case 37:
        return (
          <>
            <div className="flex flex-row gap-[0.125rem]">
              {western.slice(0, 2).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[0.125rem]">
              {western.slice(2, 4).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
          </>
        );
      case 10762:
        return (
          <>
            <div className="flex flex-row gap-[0.125rem]">
              {kids.slice(0, 2).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[0.125rem]">
              {kids.slice(2, 4).map((movie) => (
                <div className="basis-1/2 flex justify-center" key={movie.id}>
                  <img
                    src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${movie.poster_path}`}
                    alt={movie.original_name}
                    className={imageClass}
                  />
                </div>
              ))}
            </div>
          </>
        );
      default:
        break;
    }
  };

  useEffect(() => {
    handleGetMoviesByGenres(genre.id);
  }, [genre.id]);

  return moviesByGenreLoading ? (
    "loading..."
  ) : (
    <>
      <div className="flex flex-col gap-[0.125rem]">
        {renderContentByGenreId(genre.id)}
      </div>
      <div className="w-full flex justify-center py-2 font-Manrope font-bold">
        {genre.name}
      </div>
    </>
  );
};

export default EachTVGenreSection;
