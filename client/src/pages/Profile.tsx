import FavouriteSection from "../components/Profile/FavouriteSection";
import { useAppSelector } from "../redux/hooks/hook";
import WatchlistSection from "../components/Profile/WatchlistSection";
import BookmarkSection from "../components/Profile/BookmarkSection";
import UserReview from "../components/Profile/UserReview";

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <div className="w-full">
        <div className="w-full bg-black text-white font-Poppins text-2xl flex justify-center py-4">
            {currentUser?.name}
        </div>
        <FavouriteSection />
        <WatchlistSection />
        <BookmarkSection />
        <UserReview />
    </div>
  )
};

export default Profile;
