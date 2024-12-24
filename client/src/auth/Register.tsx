import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../types/types";
import { useDispatch } from "react-redux";
import axios from "axios";
import { RegistrationSuccess } from "../redux/slices/user.slice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    try {
      e.preventDefault();
      console.log(formData);
      const registerResponse = await axios.post(
        `http://localhost:8000/api/v1/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration result:", registerResponse.data);
      dispatch(RegistrationSuccess(registerResponse.data));
      navigate("/");
    } catch (error) {
      console.error("Error while submitting register form: ", error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-slate-400">
      <div className="w-full flex flex-row min-h-screen">
        {/* pictures of films and tv shows will be on carousel here */}
        <div className="w-[50%]"></div>
        {/* login form will be here */}
        <div className="w-[50%] bg-black min-h-screen flex justify-center">
          <div className="w-full flex flex-col">
            <div className="w-full h-[5rem] flex justify-center items-end">
              <p className="text-white font-Poppins text-xl font-bold">
                Welcome to Collider!
              </p>
            </div>
            <div className="w-full h-[5rem] flex justify-center items-start">
              <p className="text-slate-400 font-Poppins text-sm">
                How about you quickly enter to see all the features!
              </p>
            </div>
            <div className="w-full flex justify-center items-center pt-[3rem]">
              <form
                className="w-[20rem] bg-slate-400 flex flex-col p-4 rounded-lg shadow-lg"
                method="post"
                onSubmit={handleSubmit}
              >
                <div className="w-full font-Poppins font-bold">Hi there!</div>
                <div className="w-full pb-4 font-Poppins text-sm">
                  Please enter your username, email and password
                </div>
                <div className="w-full flex flex-col py-2 font-Poppins">
                  <div className="font-medium">Username:</div>
                  <div className="">
                    <input
                      type="text"
                      name="username"
                      id="name"
                      className="w-full pl-2 text-sm py-2 rounded-md"
                      placeholder="Enter username"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col py-2 font-Poppins">
                  <div className="font-medium">Email:</div>
                  <div className="">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="w-full pl-2 text-sm py-2 rounded-md"
                      placeholder="Enter email"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col py-2 font-Poppins">
                  <div className="font-medium">Password:</div>
                  <div className="">
                    <input
                      type="text"
                      name="password"
                      id="password"
                      className="w-full pl-2 py-2 text-sm rounded-md"
                      placeholder="Enter Password"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="w-full flex justify-center items-center pt-6">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-md bg-black text-white font-medium text-base hover:bg-slate-800 transition duration-200 ease-in-out hover:cursor-pointer font-Poppins"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
                <div className="w-full pt-1 pb-6 flex justify-center">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/register">
                      <span className="font-semibold">Login</span>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
