import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { TbCameraPlus } from "react-icons/tb";

function Signup() {
  //user profile
  const inputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };

  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //watch the passsword and confirm password fields

  const password = watch("password", " ");
  const confirmpassword = watch("confirmpassword", " ");

  const validatePasswordMatch = (value) => {
    return value === password || "Password do not match";
  };
  const onSubmit = async (data) => {
  const formData = new FormData();
  formData.append("fullname", data.fullname);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("confirmpassword", data.confirmpassword); // ✅ fixed key
  formData.append("file", image); // ✅ fixed field name

  try {
    const response = await axios.post("/api/user/signup", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(response.data);
    if (response.data) {
      toast.success("Signup successfully");
    }
    localStorage.setItem("chatApp", JSON.stringify(response.data));
    setAuthUser(response.data);
  } catch (error) {
    if (error.response) {
      toast.error("Error: " + error.response.data.message);
    }
    console.log(error);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen  bg-slate-700 text-black  p-4" style={{ backgroundImage: "url('3135763.jpg')" }}>
      <div className="w-full max-w-md bg-slate-900  rounded-2xl shadow-slate-500 shadow-lg  p-8">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Picture Upload */}
          <div
            className="flex flex-col items-center"
            onClick={handleImageClick}
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            ) : (
             
     <div className="relative w-24 h-24">
   
      <div className="w-full h-full rounded-full p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
       
        <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
          <CgProfile className="text-5xl text-gray-500" />
        </div>
      </div>

     
      <div className="absolute bottom-0 right-0 bg-gray-800 p-1.5 rounded-full border-2 border-white">
        <TbCameraPlus className="text-white text-sm" />
      </div>
    </div>
              
            )}
            <input
              type="file"
              onChange={handleImageChange}
              ref={inputRef}
              className="text-sm text-gray-500 "
              style={{ display: "none" }}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full h-11 mt-1 p-3 bg-transparent  text-white border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Full name"
              {...register("fullname", { required: true })}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full h-11 mt-1 p-3 border bg-transparent text-white border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="user@example.com"
              {...register("email", { required: true })}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block  text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full  h-11 mt-1 p-3 border bg-transparent text-white border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••••"
              {...register("password", { required: true })}
            />
          </div>

          <label>
            <div>
              <label
                htmlFor="confirm"
                className="block text-sm font-medium text-gray-400"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm"
                className="w-full h-11 mt-1 p-3 border bg-transparent text-white border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
                {...register("confirmpassword", {
                  required: true,
                  validate: validatePasswordMatch,
                })}
              />
            </div>
          </label>
          {errors.confirmpassword && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.confirmpassword.message}
            </span>
          )}

          <button
            type="submit"
            className="w-full h-11 py-3 mt-4 bg-green-600 text-white rounded-xl hover:bg-green-900 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?
          <Link
            to="/login"
            className="text-green-600 hover:underline cursor-pointer ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
