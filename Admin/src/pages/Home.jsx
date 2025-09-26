import React from 'react';
import Nav from '../component/Nav';
import SideBar from '../component/SideBar';

const Home = () => {
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative'>
      <Nav/> 
      <SideBar/>
    </div>
  );
}

export default Home;
