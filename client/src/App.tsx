import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "./redux/hooks/hook";
import AuthenticatedLanding from "./pages/AuthenticatedLanding";
import Landing from "./pages/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <AuthenticatedLanding /> : <Landing />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
