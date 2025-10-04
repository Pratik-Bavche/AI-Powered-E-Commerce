import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] text-white relative">
      <Nav />

      {/* 404 Content */}
      <div className="flex flex-col items-center justify-center min-h-screen pt-20">
        <div className="text-center">
          {/* 404 Error Message */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
            404 Page Not Found
          </h1>

          {/* Login Button */}
          <button
            onClick={() => navigate("/login")}
            className="bg-white cursor-pointer text-black px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors duration-300"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
