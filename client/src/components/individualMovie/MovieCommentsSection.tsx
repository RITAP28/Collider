import { useAppSelector } from "../../redux/hooks/hook";
import { IMovieDetails, IUserReviews, port } from "../../lib/data.interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Modal } from "../common/Modal";

const MovieCommentsSection = ({
  movieDetails,
}: {
  movieDetails: IMovieDetails;
}) => {
  const { id } = useParams();
  const { currentUser, accessToken } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<string>("0");
  const [reviews, setReviews] = useState<IUserReviews[]>([]);

  const [userReviewBtn, setUserReviewBtn] = useState<boolean>(false);
  const [userReview, setUserReview] = useState<IUserReviews | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Enable scrolling
  };

  const handleFetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:${port}/get/movie/reviews?movieId=${id}&userId=${currentUser?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setReviews(response.data.reviews);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching reviews for this movie: ", error);
    }
  };

  const handleFetchUserReview = async () => {
    try {
      const response = await axios.get(
        `http://localhost:${port}/get/review/movie/user?userId=${currentUser?.id}&movieId=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        setUserReviewBtn(true);
        setUserReview(response.data.userReview);
      } else if (response.status === 404) {
        setUserReviewBtn(false);
        setUserReview(null);
      }
    } catch (error) {
      console.error(
        "Error while fetching user reviews for this movie: ",
        error
      );
    }
  };

  const handleAddReview = async () => {
    try {
      await axios.post(
        `http://localhost:${port}/add/movie/review?userId=${currentUser?.id}&movieId=${id}`,
        {
          reviewText: reviewText,
          rating: rating,
          username: currentUser?.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      closeModal();
    } catch (error) {
      console.error("Error while adding review to this movie: ", error);
    }
  };

  const handleDateConversion = (date: Date) => {
    const inputDate = new Date(date);
    const formattedDate = inputDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  useEffect(() => {
    handleFetchReviews();
    handleFetchUserReview();
  }, [id]);

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-row pb-2">
          <div className="basis-1/2 flex justify-start">
            <p className="font-Poppins font-semibold text-lg">
              User Reviews:
            </p>
          </div>
          <div className="basis-1/2 flex justify-end items-center">
            {!userReviewBtn && (
              <button
                type="button"
                className="px-3 py-2 bg-slate-300 rounded-md font-Poppins font-medium hover:cursor-pointer hover:bg-black hover:text-white transition duration-200 ease-in-out flex flex-row items-center"
                onClick={openModal}
              >
                <p className="pr-2">
                  <img src="/pulsThree.png" alt="" className="w-6 h-6" />
                </p>
                <p className="">Review</p>
              </button>
            )}
          </div>
        </div>
        {userReview && (
          <div className="w-full flex flex-row py-4">
            <div className="w-[10rem] flex justify-start font-Manrope font-semibold underline items-center">
              <p className="font-Poppins">Your Review:</p>
            </div>
            <div className="min-w-[18rem] bg-slate-400 px-4 py-4 rounded-md hover:bg-black hover:text-white transition duration-200 ease-in-out hover:scale-105 hover:cursor-default">
              <div className="w-full">
                <p className="font-Poppins font-semibold text-lg">
                  {userReview.reviewText}
                </p>
              </div>
              <div className="w-full flex justify-start">
                <p className="text-sm font-Manrope">
                  Reviewed by{" "}
                  <span className="font-semibold">you</span>{" "}
                  on {handleDateConversion(userReview.createdAt)}
                </p>
              </div>
            </div>
          </div>
        )}
        {loading ? (
          "loading..."
        ) : reviews.length > 0 ? (
          <div className="w-full flex flex-row">
            {reviews.map((review, index) => (
              <div
                className="min-w-[18rem] bg-slate-400 px-4 py-4 rounded-md hover:bg-black hover:text-white transition duration-200 ease-in-out hover:scale-105 hover:cursor-default"
                key={index}
              >
                <div className="w-full">
                  <p className="font-Poppins font-semibold text-lg">
                    {review.reviewText}
                  </p>
                </div>
                <div className="w-full flex justify-start">
                  <p className="text-sm font-Manrope">
                    Reviewed by{" "}
                    <span className="font-semibold">{review.username}</span> on{" "}
                    {handleDateConversion(review.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-400 p-2 rounded-lg">No reviews from others yet</div>
        )}
      </div>
      <div className="w-full">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="w-full flex flex-col">
            <div className="w-full">
              <h2 className="font-Manrope font-semibold pb-2">
                Add your review about {movieDetails.original_title}
              </h2>
            </div>
            <div className="w-full flex justify-start py-1">
              <input
                type="number"
                name="rate"
                id="rate"
                className="border-[1px] border-black rounded-md p-2 font-Manrope"
                placeholder="Rate"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setRating(e.target.value);
                }}
              />
            </div>
            <div className="w-full flex justify-start py-2">
              <textarea
                name="review"
                id="review"
                rows={4}
                placeholder="Enter here..."
                className="w-[80%] border-[1px] font-Manrope p-2 border-black rounded-lg"
                onChange={(e) => {
                  e.preventDefault();
                  setReviewText(e.target.value);
                }}
              />
            </div>
            <div className="w-full flex justify-start">
              <button
                type="button"
                className="px-4 py-2 bg-slate-400 text-white font-Manrope rounded-md hover:bg-black hover:text-white transition duration-200 ease-in-out hover:cursor-pointer"
                onClick={handleAddReview}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default MovieCommentsSection;
