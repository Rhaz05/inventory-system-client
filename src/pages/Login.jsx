import { ToastContainer, toast, Slide } from "react-toastify";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "../api/axios";
import Logo from "../assets/images/5L_logo-Red.png";
import useAuth from "../hooks/useAuth";

import "react-toastify/dist/ReactToastify.css";
const LOGIN_URL = "/auth";

const Login = () => {
  const userRef = useRef();
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username, password }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );
      const accessToken = response?.data.accessToken;
      const userInfo = response?.data.UserInfo;
      setAuth({ username, userInfo, accessToken });
      setUsername("");
      setPassword("");
      if (response?.status === 200) {
        toast.success("Login successful", { theme: "dark" });
      }
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        toast.error("No server Response");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized", { theme: "dark" });
      } else if (err.response?.status === 429) {
        toast.error("Too many attempts. Please try again after 1m", {
          theme: "dark",
        });
      }
    }
  };

  return (
    <>
      <div className="flex mx-auto h-screen container justify-center text-gray-500/95">
        <div className="flex flex-wrap flex-col m-4 my-12 md:flex-row w-full max-h-screen overflow-y-auto rounded-md bg-white border-2 border-teal-300 shadow-xl md:max-w-[72%] md:m-24">
          <div className="md:flex-1 w-full my-auto">
            <div className="flex flex-col text-center">
              <img src={Logo} alt="logo" className="w-60 mx-auto" />
              <h1 className="text-gray-500/85 text-2xl tracking-wide">
                Welcome to 5L Solutions <br />
                Cyber Power
              </h1>
            </div>
            <div className="flex flex-col py-12 px-10 md:px-20">
              <span className="text-left text-md mb-2">
                Please login to your account
              </span>
              <form className="" onSubmit={handleSubmit}>
                <div className="flex flex-col static w-full">
                  <label
                    htmlFor="username"
                    className="text-teal-400 text-md font-medium relative top-3 ml-[7px] px-[3px] bg-white w-fit"
                  >
                    Username:
                  </label>
                  <input
                    type="text"
                    placeholder="Write here..."
                    name="username"
                    className="border-teal-400 px-[10px] py-[11px] text-md bg-white border rounded-[5px] focus:outline-none placeholder:text-black/25"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    id="username"
                    required
                  />
                </div>

                <div className="flex flex-col static w-full">
                  <label
                    htmlFor="input"
                    className="text-teal-400 text-md font-medium relative top-3 ml-[7px] px-[3px] bg-white w-fit"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    placeholder="Write here..."
                    name="input"
                    className="border-teal-400 px-[10px] py-[11px] text-md bg-white border rounded-[5px] focus:outline-none placeholder:text-black/25"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>

                <button className="relative border mt-6 hover:border-teal-600 duration-500 group cursor-pointer text-teal-50  overflow-hidden h-10 w-full rounded-md bg-teal-900/95 p-2 flex justify-center items-center font-extrabold">
                  <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-teal-700/80 delay-150 group-hover:delay-75"></div>
                  <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-teal-600 delay-150 group-hover:delay-100"></div>
                  <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-teal-500 delay-150 group-hover:delay-150"></div>
                  <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-teal-400 delay-150 group-hover:delay-200"></div>
                  <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-teal-300 delay-150 group-hover:delay-300"></div>
                  <p className="z-10 text-xl tracking-wider">Login</p>
                </button>
              </form>
              <span className="text-left text-md mx-auto mt-2 cursor-pointer hover:underline">
                Forgot password?
              </span>
              <span className="text-left text-md mx-auto mt-4">
                Dont have an account?{" "}
                <span className="text-red-600 cursor-pointer">Register</span>
              </span>
            </div>
          </div>
          <div className="md:flex-1 w-full px-12 my-auto hidden xl:block">
            <h1 className="py-8 text-3xl text-center text-red-500">
              We are more than just a Company
            </h1>
            <p className="text-lg text-justify indent-16 text-gray-500/85 px-12">
              A dynamic and forward-thinking company dedicated to providing
              comprehensive solutions in the realm of supplies and allied
              services. Specializing in a wide range of industries, the company
              is committed to meeting the diverse needs of its clients through
              innovative and efficient approaches. With a focus on quality,
              reliability, and customer satisfaction, 5L Solutions aims to be a
              trusted partner in delivering tailored solutions for procurement,
              logistics, and allied services. The company thrives on a
              foundation of professionalism, integrity, and a proactive mindset,
              ensuring it stays at the forefront of its field and consistently
              exceeds the expectations of its clientele.
            </p>
          </div>
        </div>
      </div>
      <ToastContainer transition={Slide} />
    </>
  );
};

export default Login;
