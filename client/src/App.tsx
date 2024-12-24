import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "./redux/hooks/hook";
import AuthenticatedLanding from "./pages/AuthenticatedLanding";
import Landing from "./pages/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import TVShowLanding from "./pages/TVShowLanding";
import Genres from "./pages/Genres";
import ComingSoon from "./pages/ComingSoon";
import Sidebar from "./components/common/Sidebar";
import SearchHeader from "./components/common/SearchHeader";
import Profile from "./pages/Profile";
import IndividualMovie from "./pages/IndividualMovie";
import ActorDetails from "./pages/ActorDetails";
import Watchlist from "./pages/library/Watchlist";
// import Trial from "./pages/Trial";
import SearchResults from "./pages/SearchResults";
import ActorMovies from "./pages/ActorMovies";
import AllCastPage from "./pages/AllCastPage";
import IndividualGenre from "./pages/IndividualGenre";
import MoreTrending from "./pages/Landing/MoreTrending";
import MoreUpcoming from "./pages/Landing/MoreUpcoming";
import MoreTopRatedMovies from "./pages/Landing/MoreTopRatedMovies";
import MoreNowPlaying from "./pages/Landing/MoreNowPlaying";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={isAuthenticated ? <AuthenticatedLanding /> : <Landing />}
          />
          <Route path="/landing/tv/shows" element={<TVShowLanding />} />
          <Route path="/landing/genres" element={<Genres />} />
          <Route path="/landing/movies/trending" element={<MoreTrending />} />
          <Route
            path="/landing/movies/top/rated"
            element={<MoreTopRatedMovies />}
          />
          <Route
            path="/landing/movies/playing/now"
            element={<MoreNowPlaying />}
          />
          <Route path="/landing/movies/upcoming" element={<MoreUpcoming />} />
          <Route
            path="/landing/genres/specific"
            element={<IndividualGenre />}
          />
          <Route path="/landing/upcoming" element={<ComingSoon />} />
          <Route path="/profile/u/:username" element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          } />
          <Route path="/movie/:id" element={<IndividualMovie />} />
          <Route path="/actor/:id" element={<ActorDetails />} />
          <Route path="/person/watchlist" element={
            <ProtectedRoutes>
              <Watchlist />
            </ProtectedRoutes>
          } />
          {/* <Route path="/trial" element={<Trial />} /> */}
          <Route path="/search/movie/:id" element={<SearchResults />} />
          <Route path="/movie/actor/:id" element={<ActorMovies />} />
          <Route path="/movie/all/cast/crew/:id" element={<AllCastPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="w-full h-screen relative">
      {/* Mobile-only Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-[5rem] bg-slate-500 flex items-center z-40 px-4">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex-1 flex justify-center">
          <SearchHeader />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="flex h-full">
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed top-0 left-0 h-full
          w-[70%] md:w-[20%] bg-slate-500 
          transform transition-transform duration-300 ease-in-out
          z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="w-full md:w-[80%] md:ml-[20%]">
          {/* Desktop Search Header */}
          <div className="hidden md:flex fixed top-0 h-[5rem] bg-slate-500 w-[80%] items-center justify-center z-40">
            <SearchHeader />
          </div>

          {/* Scrollable Content */}
          <div className="w-full h-full overflow-y-auto pt-[5rem] bg-slate-500">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
