import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdContacts, MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/authContext';
import { IoMdHome, IoMdCart } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";

const Nav = () => {
  let { getCurrentUser, userData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);
      await getCurrentUser(); // refresh userData after logout
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className='w-full h-[70px] bg-[#ecfafaec] z-50 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black'>

      {/* Logo Section */}
      <div className='w-[20%] lg:w-[30%] flex items-center gap-[10px]'>
        <img src={logo} alt='Shopping Cart Logo' className='w-[30px]' />
        <h1 className='text-[25px] text-black font-sans'>ShoppingCart</h1>
      </div>

      {/* Desktop Navigation Links */}
      <ul className='w-[50%] lg:w-[40%] hidden md:flex items-center justify-center gap-[19px] text-white'>
        <li className='text-[15px] hover:bg-slate-500 bg-[#000000c9] py-[10px] px-[20px] cursor-pointer rounded-2xl'>HOME</li>
        <li className='text-[15px] hover:bg-slate-500 bg-[#000000c9] py-[10px] px-[20px] cursor-pointer rounded-2xl'>COLLECTIONS</li>
        <li className='text-[15px] hover:bg-slate-500 bg-[#000000c9] py-[10px] px-[20px] cursor-pointer rounded-2xl'>ABOUT</li>
        <li className='text-[15px] hover:bg-slate-500 bg-[#000000c9] py-[10px] px-[20px] cursor-pointer rounded-2xl'>CONTACT</li>
      </ul>

      {/* Right Icons */}
      <div className='w-[30%] flex items-center justify-end gap-[20px] relative'>
        {!showSearch && <IoSearchCircleOutline className='w-[38px] h-[38px] text-[#000000] cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />}
        {showSearch && <IoSearchCircleSharp className='w-[38px] h-[38px] text-[#000000] cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />}

        {/* User Avatar */}
        {userData && userData.name ? (
          <div className='w-[30px] h-[30px] bg-[#080808] text-white cursor-pointer rounded-full flex items-center justify-center' onClick={() => setShowProfile(prev => !prev)}>
            {userData.name.slice(0, 1).toUpperCase()}
          </div>
        ) : (
          <FaCircleUser className='w-[29px] h-[29px] text-[#000000] cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />
        )}

        {/* Shopping Cart */}
        <div className='relative'>
          <MdOutlineShoppingCart className='w-[30px] h-[30px] text-[#000000] cursor-pointer hidden md:block' />
          <span className='absolute hidden md:flex -top-1 -right-1 w-[18px] h-[18px] items-center justify-center bg-black text-white text-[9px] rounded-full'>
            10
        </span>

        </div>
      </div>

      {/* Full-width Search Bar */}
      {showSearch && (
        <div className='w-full h-[80px] bg-[#d8f6f9dd] absolute top-[70px] left-0 flex items-center justify-center z-50'>
          <input type="text" className='w-[70%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-white text-[18px]' placeholder='Search Here' />
        </div>
      )}

      {/* Profile Dropdown */}
      {showProfile && (
        <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10'>
          <ul className='w-full h-full flex flex-col justify-start text-[17px] py-[10px] text-white'>
            {!userData && <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/login"); setShowProfile(false); }}>Login</li>}
            {userData && (
              <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer' onClick={async () => { await handleLogout(); setShowProfile(false); navigate("/login"); }}>Logout</li>
            )}
            <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'>Orders</li>
            <li className='w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer'>About</li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden'>
        <button className='text-white flex items-center justify-center flex-col gap-[2px]'>
          <IoMdHome className='w-[30px] h-[30px]' />
          Home
        </button>

        <button className='text-white flex items-center justify-center flex-col gap-[2px]'>
          <HiOutlineCollection className='w-[30px] h-[30px]' />
          Collections
        </button>

        <button className='text-white flex items-center justify-center flex-col gap-[2px]'>
          <MdContacts className='w-[30px] h-[30px]' />
          Contact
        </button>

        <button className='text-white flex items-center justify-center flex-col gap-[2px]'>
          <IoMdCart className='w-[30px] h-[30px]' />
          Cart
        </button>
      </div>

    </nav>
  );
};

export default Nav;
