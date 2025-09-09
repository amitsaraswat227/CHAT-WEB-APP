import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
   
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    await axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          toast.success("Login successfully");
        }
        localStorage.setItem("chatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error :" + error.response.data.error);
        }
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen  bg-slate-700  text-black p-4 " style={{ backgroundImage: "url('3135763.jpg')"}}>
        <div className="w-full max-w-md bg-slate-900 rounded-2xl  p-8 shadow-slate-500 shadow-lg ">
          <div className="flex items-center justify-center ">
            <img src=".\icons8-chat-message-94.png" alt="logo" className="" />
          </div>
          <h1 className="text-lg text-white mt-1 text-center md:text-xl font-semibold items-center">
            Welcome Back
          </h1>
          <p className="text-xs md:text-sm text-gray-500  mt-1 text-center">
            Don't have an account?
            <Link
              to="/signup"
              className="cursor-pointer ml-1  text-blue-400 hover:underline"
            >
              Signup
            </Link>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block  text-sm font-medium text-gray-400"
              >
                Email
              </label>

              <input
                type="email"
                id="email"
                className="w-full h-10 mt-1 p-3 border bg-transparent text-white border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                {...register("email", { required: true })}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full h-10 mt-1 p-3  border bg-transparent text-white border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                {...register("password", { required: true })}
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:bg-blue-600 text-sm md:text-base"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
