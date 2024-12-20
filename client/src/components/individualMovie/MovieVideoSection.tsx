import {
  apiKey,
  IMovieDetails,
  IVideoDetailsOfMovie,
} from "../../lib/data.interface";
import { config } from "../../lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

const MovieVideoSection = ({
  movieDetails,
}: {
  movieDetails: IMovieDetails;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<IVideoDetailsOfMovie[]>([]);

  const handleGetVideo = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieDetails.id}/videos?language=en-US&api_key=${apiKey}`,
        config
      );
      setVideos(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error while getting the videos: ", error);
    }
  };

  useEffect(() => {
    handleGetVideo();
  }, [movieDetails.id]);

  return loading ? (
    "loading..."
  ) : (
    <div className="w-full flex flex-col p-4">
      <div className="w-full">
        <p className="font-Poppins text-xl font-medium">
          Videos related to {movieDetails.original_title}:
        </p>
      </div>
      {/* videos and photos */}
      <div className="w-full flex flex-row overflow-x-auto">
        {videos.map((video, index) => (
          <div className="" key={index}>
            <video
              src={`https://themoviedb.org/video/play?key=${video.key}`}
              className="w-[10rem] h-[8rem]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieVideoSection;
