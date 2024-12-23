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
import Trial from "./pages/Trial";
import SearchResults from "./pages/SearchResults";
import ActorMovies from "./pages/ActorMovies";
import AllCastPage from "./pages/AllCastPage";
import IndividualGenre from "./pages/IndividualGenre";

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
          <Route path="/landing/genres/specific" element={<IndividualGenre />} />
          <Route path="/landing/upcoming" element={<ComingSoon />} />
          <Route path="/profile/u/:username" element={<Profile />} />
          <Route path="/movie/:id" element={<IndividualMovie />} />
          <Route path="/person/:id" element={<ActorDetails />} />
          <Route path="/person/watchlist" element={<Watchlist />} />
          <Route path="/trial" element={<Trial />} />
          <Route path="/search/movie/:id" element={<SearchResults />} />
          <Route path="/movie/person/:id" element={<ActorMovies />} />
          <Route path="/movie/all/cast/crew/:id" element={<AllCastPage />} />
        </Route>
      </Routes>
    </>
  );
}

function MainLayout() {
  return (
    <div className="w-full max-h-screen flex flex-row">
      <div className="w-[20%] bg-slate-500 flex flex-col">
        <Sidebar />
      </div>
      <div className="w-[80%] bg-slate-500 flex flex-col min-h-screen overflow-y-auto scrollbar-hide">
        <div className="w-full h-[5rem] bg-slate-500 flex flex-row justify-center items-center py-4">
          <SearchHeader />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
