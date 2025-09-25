import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import { authDataContext } from "../context/authContext";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firebase";

const Registration = () => {
  const [show, setShow] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        serverUrl + '/api/auth/registration',
        { name, email, password },
        { withCredentials: true }
      );

      console.log(result.data);
      if (result.data._id || result.data.user?._id) {  
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const { displayName, email } = response.user;

      const result = await axios.post(
        serverUrl + "/api/auth/googlelogin",
        { name: displayName, email },
        { withCredentials: true }
      );
      console.log(result.data);
      if (result.data.user?._id) navigate("/"); // redirect after Google signup
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer" onClick={() => navigate("/")}>
        <img className="w-[40px]" src={Logo} alt="Logo" />
        <h1 className="text-[22px] font-sans">ShoppingCart</h1>
      </div>
      <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Registration Page</span>
        <span className="text-[16px]">Welcome to shoppingCart, place your order here</span>
      </div>
      <div className='max-w-[600px] w-[90%] min-h-[500px] py-4 bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form onSubmit={handleSignup} className="w-[90%] h-full flex flex-col items-center justify-start gap-[20px]">
          <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer'  onClick={googleSignUp}>
            <img src={google} alt="Google Icon" className='w-[20px]' /> Registration with Google
          </div>
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>
          <div className='w-[90%] flex flex-col items-center justify-center gap-[15px]'>
            <input type="text" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent text-white px-[20px] font-semibold placeholder-[#ffffffc7]' placeholder='Username' required onChange={(e) => setName(e.target.value)} value={name} />
            <input type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent text-white px-[20px] font-semibold placeholder-[#ffffffc7]' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email} />
            <div className="relative w-[100%]">
              <input type={show ? "text" : "password"} className='w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent text-white px-[20px] font-semibold placeholder-[#ffffffc7]' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
              <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer" onClick={() => setShow(prev => !prev)}>
                {show ? <IoMdEye size={22} /> : <IoIosEyeOff size={22} />}
              </div>
            </div>
            <button type="submit" className='w-[100%] h-[50px] cursor-pointer bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Create Account</button>
            <p className='flex gap-[10px]'>You have an account? <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer' onClick={() => navigate("/login")}>Login</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
