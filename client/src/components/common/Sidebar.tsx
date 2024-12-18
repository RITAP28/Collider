import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks/hook";

const Sidebar = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full bg-red-200 flex justify-center py-4">
        <div className="w-full">
          <p
            className="font-bold text-xl flex justify-center hover:cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Collider
          </p>
          <p className="text-sm flex justify-center">
            A movie recommendation system
          </p>
        </div>
      </div>
      <div className="w-full bg-red-300 flex flex-col justify-center py-3">
        <div className="w-full flex justify-center font-light">Menu</div>
        <div className="w-full flex flex-row py-1 hover:cursor-pointer hover:bg-red-400 transition duration-150 ease-in-out">
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/menu/movie.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Movies
          </div>
        </div>
        <div
          className="w-full flex flex-row py-1 hover:cursor-pointer hover:bg-red-400 transition duration-150 ease-in-out"
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
          className="w-full flex flex-row py-1 hover:cursor-pointer hover:bg-red-400 transition duration-150 ease-in-out"
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
          className="w-full flex flex-row py-1 hover:cursor-pointer hover:bg-red-400 transition duration-150 ease-in-out"
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
      <div className="w-full bg-red-300 flex flex-col justify-center py-3">
        <div className="w-full flex justify-center font-light">Library</div>
        <div className="w-full flex flex-row py-1 hover:cursor-pointer hover:bg-red-400 transition duration-150 ease-in-out">
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/library/playlist.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Playlists
          </div>
        </div>
        <div className="w-full flex flex-row py-1 hover:cursor-pointer hover:bg-red-400 transition duration-150 ease-in-out">
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/library/bookmark.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Watchlists
          </div>
        </div>
        <div className="w-full flex flex-row py-1 hover:cursor-pointer hover:bg-red-400 transition duration-150 ease-in-out">
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/library/remind.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Remind
          </div>
        </div>
        <div className="w-full flex flex-row py-1 hover:cursor-pointer hover:bg-red-400 transition duration-150 ease-in-out">
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/library/ratings.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Your Ratings
          </div>
        </div>
      </div>
      <div className="w-full bg-red-300 flex flex-col justify-center py-3">
        <div className="w-full flex justify-center font-light">General</div>
        <div className="w-full flex flex-row py-1 hover:cursor-pointer hover:bg-red-400 transition duration-150 ease-in-out">
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/general/settings.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            Settings
          </div>
        </div>
        <div
          className="w-full flex flex-row py-1 hover:cursor-pointer hover:bg-red-400 transition duration-150 ease-in-out"
          onClick={() => {
            if (isAuthenticated) {
              navigate("/profile");
            } else {
              navigate("/login");
            }
          }}
        >
          <div className="w-[40%] flex justify-end pr-1 items-center">
            <img src="/general/profile.png" className="w-5 h-5" alt="" />
          </div>
          <div className="w-[60%] flex justify-start pl-1 items-center text-lg">
            {isAuthenticated ? "Profile" : "Login"}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
