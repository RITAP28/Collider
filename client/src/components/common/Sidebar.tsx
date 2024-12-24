import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hook";
import Logout from "./Logout";

const Sidebar = () => {
  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full text-white flex justify-center py-4">
        <div className="w-full">
          <p
            className="font-bold text-xl flex justify-center hover:cursor-pointer font-Poppins"
            onClick={() => {
              navigate("/");
            }}
          >
            Collider
          </p>
          <p className="text-sm flex justify-center font-Manrope">
            A movie recommendation system
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center text-white py-3 font-Manrope">
        <div className="w-[80%] flex flex-row py-2 hover:cursor-pointer hover:bg-white transition duration-150 ease-in-out hover:text-black rounded-sm">
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/menu/movie.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Movies
          </div>
        </div>
        <div
          className="w-[80%] flex flex-row py-2 hover:cursor-pointer hover:bg-white transition duration-150 ease-in-out hover:text-black rounded-sm"
          onClick={() => {
            navigate("/landing/tv/shows");
          }}
        >
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/menu/tvshow.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            TV Shows
          </div>
        </div>
        <div
          className="w-[80%] flex flex-row py-2 rounded-sm hover:cursor-pointer hover:bg-white transition duration-150 ease-in-out hover:text-black"
          onClick={() => {
            navigate("/landing/genres");
          }}
        >
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/menu/genres.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Genres
          </div>
        </div>
        <div
          className="w-[80%] flex flex-row py-2 rounded-sm hover:cursor-pointer hover:bg-white transition duration-150 ease-in-out hover:text-black"
          onClick={() => {
            navigate("/landing/upcoming");
          }}
        >
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/menu/comingsoon.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Coming Soon
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center text-white py-3 font-Manrope">
        <div className="w-full flex text-white justify-center font-light">
          Library
        </div>
        <div className="w-[80%] flex flex-row py-2 rounded-sm hover:cursor-pointer hover:bg-white transition duration-150 ease-in-out hover:text-black">
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/library/playlist.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Playlists
          </div>
        </div>
        <div
          className="w-[80%] flex flex-row py-2 hover:cursor-pointer hover:bg-white transition duration-150 ease-in-out hover:text-black rounded-sm te"
          onClick={() => {
            navigate(`/person/watchlist?userId=${currentUser?.id}`);
          }}
        >
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/library/bookmark.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Watchlists
          </div>
        </div>
        <div className="w-[80%] flex flex-row py-2 hover:cursor-pointer hover:bg-white transition duration-150 ease-in-out hover:text-black rounded-sm te">
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/library/remind.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Remind
          </div>
        </div>
        <div className="w-[80%] flex flex-row py-2 hover:cursor-pointer hover:bg-white transition duration-150 ease-in-out hover:text-black rounded-sm te">
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/library/ratings.png" className="w-5 h-5" alt="" />
          </div>
          <div
            className="w-[60%] flex justify-start pl-1 items-center text-lg"
          >
            Your Ratings
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center text-white py-3">
        <div className="w-full flex justify-center text-white font-light text-lg font-Manrope">
          General
        </div>
        <div className="w-[80%] flex flex-row py-2 hover:cursor-pointer hover:bg-white transition duration-150 ease-in-out hover:text-black rounded-sm">
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/general/settings.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg font-Manrope">
            Settings
          </div>
        </div>
        <div
          className="w-[80%] flex flex-row py-2 hover:cursor-pointer hover:bg-white transition duration-150 ease-in-out hover:text-black rounded-sm te"
          onClick={() => {
            if (isAuthenticated) {
              navigate(`/profile/u/${currentUser?.name}`);
            } else {
              navigate("/login");
            }
          }}
        >
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/general/profile.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg font-Manrope">
            {isAuthenticated ? currentUser?.name : "Login"}
          </div>
        </div>
        {isAuthenticated && <Logout />}
      </div>
    </>
  );
};

export default Sidebar;
