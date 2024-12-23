import FavouriteSection from "../components/Profile/FavouriteSection";
import { useAppSelector } from "../redux/hooks/hook";
import WatchlistSection from "../components/Profile/WatchlistSection";
import BookmarkSection from "../components/Profile/BookmarkSection";
import UserReview from "../components/Profile/UserReview";

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <div className="w-full">
        <div className="w-full text-white flex flex-col py-4 pl-4">
            <div className="flex flex-row text-2xl">
              <p className="font-Poppin flex items-end">name:</p>
              <p className="font-Manrope pl-2 text-3xl">{currentUser?.name}</p>
            </div>
            <div className="flex flex-row text-2xl">
              <p className="font-Poppin flex items-end">userId:</p>
              <p className="font-Manrope pl-2 text-3xl2">{currentUser?.id}</p>
            </div>
        </div>
        <FavouriteSection />
        <WatchlistSection />
        <BookmarkSection />
        <UserReview />
    </div>
  )
};

export default Profile;
