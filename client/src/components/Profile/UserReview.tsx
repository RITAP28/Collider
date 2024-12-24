import { IUserReviews, port } from "../../lib/data.interface";
import { useAppSelector } from "../../redux/hooks/hook";
import axios from "axios";
import { useEffect, useState } from "react";

const UserReview = () => {
  const { currentUser, accessToken } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [reviews, setReviews] = useState<IUserReviews[]>([]);

  useEffect(() => {
    const handleGetReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:${port}/api/v1/get/user/reviews?userId=${currentUser?.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setReviews(response.data.userReview);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching reviews: ", error);
      }
    };

    handleGetReviews();
  }, [currentUser?.id, accessToken]);

  const handleDateConversion = (date: Date) => {
    const inputDate = new Date(date);
    const formattedDate = inputDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <div className="w-full flex flex-col p-2">
      <div className="w-full flex justify-start font-Manrope font-semibold text-xl pb-2">
        Your Reviews:
      </div>
      {loading ? (
        "loading..."
      ) : (
        <div className="w-full md:grid md:grid-cols-3 flex flex-col gap-2 pb-4">
          {reviews.length === 0
            ? (
                <p className="font-Poppins text-xl font-semibold pb-4">No reviews from you yet</p>
            )
            : reviews.map((review, index) => (
                <div
                  className="min-w-[18rem] bg-slate-400 px-4 py-4 rounded-md"
                  key={index}
                >
                    <div className="w-full flex justify-between items-center pb-3">
                        <div className="font-medium font-Manrope">Film: {review.movieName}</div>
                        <div className="flex flex-row gap-1">
                            <div className="font-semibold">{review.rating}</div>
                            <div className="flex items-center">
                                <img src="/star.png" alt="" className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                  <div className="w-full">
                    <p className="font-Poppins font-semibold text-sm">
                      {review.reviewText}
                    </p>
                  </div>
                  <div className="w-full flex justify-start pt-3">
                    <p className="text-sm font-Manrope">
                      Reviewed by <span className="font-semibold">you</span> on{" "}
                      {handleDateConversion(review.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default UserReview;
