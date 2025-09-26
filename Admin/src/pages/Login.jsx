import React, { useContext, useState } from 'react';
import Logo from '../assets/logo.png'
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
import axios from 'axios'
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from "react-router-dom"
const Login = () => {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let {serverUrl}=useContext(authDataContext)
  let {AdminData,getAdmin}=useContext(adminDataContext);
  let navigate=useNavigate();

  const AdminLogin=async (e) => {
    e.preventDefault();
    try {
        const result=await axios.post(serverUrl+'/api/auth/adminlogin',{email,password},{withCredentials:true})
        console.log(result.data);
        getAdmin()
        navigate("/")
    } catch (error) {
        console.log(error);
        
    }
  }

  return (
    <div>
      <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
            <div className="w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer">
              <img className="w-[40px]" src={Logo} alt="Logo" />
              <h1 className="text-[22px] font-sans">ShoppingCart</h1>
            </div>
            <div className="w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]">
              <span className="text-[25px] font-semibold">Login Page</span>
              <span className="text-[16px]">Welcome to shoppingCart, Apply to admin login</span>
            </div>
            <div className='max-w-[600px] w-[90%] min-h-[50px] py-4 bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
              <form onSubmit={AdminLogin} className="w-[90%] h-full flex flex-col items-center justify-start gap-[20px]">
                
                <div className='w-[90%] flex flex-col items-center justify-center gap-[15px]'>
                  <input type="email" className='w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent text-white px-[20px] font-semibold placeholder-[#ffffffc7]' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email} />
                  <div className="relative w-[100%]">
                    <input type={show ? "text" : "password"} className='w-full h-[50px] border-[2px] border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent text-white px-[20px] font-semibold placeholder-[#ffffffc7]' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />
                    <div className="absolute inset-y-0 right-4 flex items-center cursor-pointer" onClick={() => setShow(prev => !prev)}>
                      {show ? <IoMdEye size={22} /> : <IoIosEyeOff size={22} />}
                    </div>
                  </div>
                  <button type="submit" className='w-[100%] h-[50px] cursor-pointer bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>Login</button>
                </div>
              </form>
            </div>
          </div>
    </div>
  );
}

export default Login;
