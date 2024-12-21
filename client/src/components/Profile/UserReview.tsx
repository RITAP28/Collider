import { IUserReviews, port } from "../../lib/data.interface";
import { useAppSelector } from "../../redux/hooks/hook";
import axios from "axios";
import { useEffect, useState } from "react"

const UserReview = () => {
      const { currentUser, accessToken } = useAppSelector((state) => state.user);
    const [loading, setLoading] = useState<boolean>(false);
    const [reviews, setReviews] = useState<IUserReviews[]>([]);

    const handleGetReviews = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:${port}/get/user/reviews?userId=${currentUser?.id}`,
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

      useEffect(() => {
        handleGetReviews();
      }, [currentUser?.id]);

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
        <div className="w-full grid grid-cols-3 gap-2">
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
                    <span className="font-semibold">you</span> on{" "}
                    {handleDateConversion(review.createdAt)}
                  </p>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default UserReview