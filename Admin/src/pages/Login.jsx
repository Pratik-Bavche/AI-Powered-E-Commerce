import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let { serverUrl } = useContext(authDataContext);
  let { AdminData, getAdmin } = useContext(adminDataContext);
  let navigate = useNavigate();

  const AdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await axios.post(
        serverUrl + "/api/auth/adminlogin",
        { email, password },
        { withCredentials: true }
      );
      console.log("Admin login result:", result.data);

      if (result.data.token) {
        await getAdmin();
        navigate("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Admin login error:", error);
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
        <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer">
          <img className="w-[40px]" src={Logo} alt="Logo" />
          <h1 className="text-[22px] font-sans">ShoppingCart</h1>
        </div>
        <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
          <span className="text-[25px] font-semibold">Admin Login</span>
          <span className="text-[16px]">
            Welcome to ShoppingCart Admin Panel
          </span>
          {error && (
            <div className="bg-red-500/20 border border-red-500 rounded-lg px-4 py-2 mt-2">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}
        </div>
        <div className="max-w-[600px] w-[90%] min-h-[50px] py-4 bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
          <form
            onSubmit={AdminLogin}
            className="w-[90%] h-full flex flex-col items-center justify-start gap-[20px]"
          >
            <div className="w-[90%] flex flex-col items-center justify-center gap-[15px]">
              <input
                type="email"
                className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent text-white px-[20px] font-semibold placeholder-[#ffffffc7]"
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="relative w-[100%]">
                <input
                  type={show ? "text" : "password"}
                  className="w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent text-white px-[20px] font-semibold placeholder-[#ffffffc7]"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <div
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                >
                  {show ? <IoMdEye size={22} /> : <IoIosEyeOff size={22} />}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-[100%] h-[50px] cursor-pointer rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-[#6060f5] hover:bg-[#5050e5]"
                }`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
