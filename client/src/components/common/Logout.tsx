import { port } from "../../lib/data.interface";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hook";
import { LogoutSuccess } from "../../redux/slices/user.slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { currentUser, accessToken } = useAppSelector((state) => state.user);
    const handleLogout = async () => {
        try {
            const logoutResponse = await axios.post(`http://localhost:${port}/logout?id=${currentUser?.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            console.log("logout response: ", logoutResponse.data);
            dispatch(LogoutSuccess());
            navigate('/');
            console.log("logged out successfully");
        } catch (error) {
            console.error("Error while logging out: ", error);
        };
    };
  return (
    <div className="w-[80%] flex justify-center items-center hover:cursor-pointer py-2 hover:bg-white transition duration-200 ease-in-out">
      <button
        type="button"
        className="px-4 py-1 rounded-md font-Manrope font-semibold bg-black text-white hover:bg-white hover:text-black transition duration-200 ease-in-out"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
