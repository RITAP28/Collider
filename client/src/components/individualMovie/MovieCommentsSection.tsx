import { useAppSelector } from "@/redux/hooks/hook";
import { IUserReviews, port } from "../../lib/data.interface";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const MovieCommentsSection = () => {
  const  { id } = useParams();
  const { currentUser, accessToken } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<IUserReviews[]>([]);

  const handleFetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:${port}/get/movie/reviews?movieId=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      });
      setReviews(response.data.reviews);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching reviews for this movie: ", error);
    };
  };
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row">
        <div className="basis-1/2 flex justify-start">
          <p className="font-Poppins font-semibold text-lg">
            User Reviews (number):
          </p>
        </div>
        <div className="basis-1/2 flex justify-end items-center">
          <button
            type="button"
            className="px-3 py-2 bg-slate-300 rounded-md font-Poppins font-medium hover:cursor-pointer hover:bg-black hover:text-white transition duration-200 ease-in-out flex flex-row items-center"
          >
            <p className="pr-2"><img src="/pulsThree.png" alt="" className="w-6 h-6" /></p>
            <p className="">Review</p>
          </button>
        </div>
      </div>
      {loading ? "loading..." : (
        <div className="w-full flex flex-row">
          {reviews.map((review, index) => (
            <div className="min-w-[15rem] bg-red-400" key={index}>
              <div className="w-full">
                <p className="">{review.reviewText}</p>
              </div>
              <div className="w-full">
                <p className="">{`- ${review.username}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieCommentsSection;
