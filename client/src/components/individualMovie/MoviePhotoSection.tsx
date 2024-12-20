import { useEffect, useState } from "react";
import {
  apiKey,
  IMovieDetails,
  IPhotoDetailsOfMovie,
} from "../../lib/data.interface";
import axios from "axios";
import { config } from "../../lib/utils";

const MoviePhotoSection = ({
  movieDetails,
}: {
  movieDetails: IMovieDetails;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [photos, setPhotos] = useState<IPhotoDetailsOfMovie[]>([]);
  const handleGetPhotos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieDetails.id}/images?api_key=${apiKey}`,
        config
      );
      setPhotos(response.data.backdrops);
      setLoading(false);
    } catch (error) {
      console.error("Error while getting photos related to the movie: ", error);
    }
  };

  useEffect(() => {
    handleGetPhotos();
  }, [movieDetails.id]);

  return loading ? (
    "loading..."
  ) : (
      <div className="w-full flex flex-col p-4">
      <div className="w-full pb-4">
        <p className="font-Poppins text-xl font-medium">
          Photos related to {movieDetails.original_title}:
        </p>
      </div>
      <div className="w-full flex flex-row gap-2 overflow-x-auto scrollbar-hide">
        {photos.slice(0,10).map((photo, index) => (
          <div className="min-w-[12rem]" key={index}>
            <img
              src={`https://media.themoviedb.org/t/p/w260_and_h390_bestv2/${photo.file_path}`}
              alt={movieDetails.original_title}
              className="w-[12rem] h-[16rem] rounded-md shadow-lg"
            />
          </div>
        ))}
        <div className="min-w-[10rem] flex justify-center items-center">
            <button type="button" className="bg-black w-[4.5rem] text-white font-medium font-Poppins text-sm p-4 rounded-full hover:cursor-pointer hover:scale-105 transition duration-200 ease-in-out hover:bg-white hover:text-black hover:underline">
                View More
            </button>
        </div>
      </div>
      </div>
  );
};

export default MoviePhotoSection;
