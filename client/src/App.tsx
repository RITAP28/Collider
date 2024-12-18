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
import SearchHeader from "./components/landing/SearchHeader";

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
          <Route path="/landing/upcoming" element={<ComingSoon />} />
        </Route>
      </Routes>
    </>
  );
}

function MainLayout() {
  return (
    <div className="w-full max-h-screen bg-slate-500 flex flex-row">
      <div className="w-[20%] bg-slate-400 flex flex-col">
        <Sidebar />
      </div>
      <div className="w-[80%] bg-slate-500 flex flex-col overflow-y-auto scrollbar-hide">
        <div className="w-full h-[5rem] bg-slate-600 flex flex-row justify-center items-center py-4">
          <SearchHeader />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
