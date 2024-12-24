import FavouriteSection from "../components/Profile/FavouriteSection";
import { useAppSelector } from "../redux/hooks/hook";
import WatchlistSection from "../components/Profile/WatchlistSection";
import BookmarkSection from "../components/Profile/BookmarkSection";
import UserReview from "../components/Profile/UserReview";

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <div className="w-full">
      {/* header section of the profile containing the username and userId */}
      <div className="w-full text-white flex flex-col py-4 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center md:items-end text-xl md:text-2xl mb-2 md:mb-0">
          <p className="font-Poppin">name:</p>
          <p className="font-Manrope text-2xl md:text-3xl md:pl-2 mt-1 md:mt-0">
            {currentUser?.name}
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-end text-xl md:text-2xl mt-2 md:mt-0">
          <p className="font-Poppin">userId:</p>
          <p className="font-Manrope text-2xl md:text-3xl md:pl-2 mt-1 md:mt-0">
            {currentUser?.id}
          </p>
        </div>
      </div>

      {/* favourite or liked movies of the user */}
      <div className="px-4 md:px-0">
        <FavouriteSection />
      </div>

      {/* watchlisted movies of the user */}
      <div className="px-4 md:px-0">
        <WatchlistSection />
      </div>

      {/* bookmarked section of the user */}
      <div className="px-4 md:px-0">
        <BookmarkSection />
      </div>

      {/* section containing the reviews given by the user */}
      <div className="px-4 md:px-0">
        <UserReview />
      </div>
    </div>
  );
};

export default Profile;
