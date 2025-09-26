import React from 'react';
import Nav from '../component/Nav';
import SideBar from '../component/SideBar';

const Lists = () => {
  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <Nav />
      <div className="w-[100%] h-[100%] flex items-start justify-start">
        <SideBar />
        <div className="w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]">
          <div className="w-[400px] h-[50px] text-[28px] md:text-[32px] text-white mb-[20px]">
            All Listed Products
          </div>
          {/* Add your products list component or mapping here */}
        </div>
      </div>
    </div>
  );
};

export default Lists;
