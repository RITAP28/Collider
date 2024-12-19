import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full min-h-screen bg-slate-400">
      <div className="w-full flex flex-row min-h-screen">
        {/* pictures of films and tv shows will be on carousel here */}
        <div className="w-[50%]"></div>
        {/* login form will be here */}
        <div className="w-[50%] bg-slate-700 min-h-screen flex justify-center">
          <div className="w-full flex flex-col">
            <div className="w-full h-[5rem] flex justify-center items-end">
              <p className="text-white font-Poppins text-xl font-bold">Welcome back to Collider!</p>
            </div>
            <div className="w-full h-[5rem] flex justify-center items-start">
              <p className="text-slate-400 font-Poppins text-sm">
                How about you quickly enter to see all the features
              </p>
            </div>
            <div className="w-full flex justify-center items-center pt-[3rem]">
              <div className="w-[20rem] bg-slate-400 flex flex-col p-4 rounded-lg shadow-lg">
              <div className="w-full font-Poppins font-bold">Hi there!</div>
              <div className="w-full pb-4 font-Poppins text-sm">Please enter your email and password</div>
              <div className="w-full flex flex-col py-2 font-Poppins">
                <div className="font-medium">Email:</div>
                <div className="">
                  <input
                    type="text"
                    name="email"
                    id=""
                    className="w-full pl-2 text-sm py-2 rounded-md"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col py-2 font-Poppins">
                <div className="font-medium">Password:</div>
                <div className="">
                  <input
                    type="text"
                    name="password"
                    id=""
                    className="w-full pl-2 py-2 text-sm rounded-md"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <div className="w-full flex justify-center items-center pt-6">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-black text-white font-medium text-base hover:bg-slate-800 transition duration-200 ease-in-out hover:cursor-pointer font-Poppins"
                >
                  Sign-in
                </button>
              </div>
              <div className="w-full pt-1 pb-6 flex justify-center">
                <p className="text-sm">Don't have an account? <Link to="/register"><span className="font-semibold">Register</span></Link></p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
