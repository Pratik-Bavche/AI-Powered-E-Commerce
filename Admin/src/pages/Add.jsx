import React, { useState } from 'react';
import Nav from '../component/Nav';
import SideBar from '../component/SideBar';
import upload from '../assets/upload.png';

const Add = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative'>
      <Nav />
      <SideBar />

      <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0'>
        <form className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[60px] px-[30px] md:px-[60px]'>

          {/* Page Title */}
          <div className='w-[400px] h-[50px] text-[25px] md:text-[40px] text-white font-bold'>
            Add Product Page
          </div>

          {/* Upload Images */}
          <div className='w-[80%] flex flex-col mt-[20px] gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>
              Upload Images
            </p>

            <div className='flex gap-5 flex-wrap'>
              {/* Image 1 */}
              <label htmlFor="image1" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer border-2 border-dashed border-gray-400 hover:border-[#46d1f7] flex items-center justify-center rounded shadow-2xl'>
                <img src={image1 ? URL.createObjectURL(image1) : upload} alt="upload preview" className='w-[80%] h-[80%] object-contain rounded' />
              </label>
              <input type="file" id="image1" className="hidden" accept="image/*" onChange={(e) => setImage1(e.target.files[0])} />

              {/* Image 2 */}
              <label htmlFor="image2" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer border-2 border-dashed border-gray-400 hover:border-[#46d1f7] flex items-center justify-center rounded shadow-2xl'>
                <img src={image2 ? URL.createObjectURL(image2) : upload} alt="upload preview" className='w-[80%] h-[80%] object-contain rounded' />
              </label>
              <input type="file" id="image2" className="hidden" accept="image/*" onChange={(e) => setImage2(e.target.files[0])} />

              {/* Image 3 */}
              <label htmlFor="image3" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer border-2 border-dashed border-gray-400 hover:border-[#46d1f7] flex items-center justify-center rounded shadow-2xl'>
                <img src={image3 ? URL.createObjectURL(image3) : upload} alt="upload preview" className='w-[80%] h-[80%] object-contain rounded' />
              </label>
              <input type="file" id="image3" className="hidden" accept="image/*" onChange={(e) => setImage3(e.target.files[0])} />

              {/* Image 4 */}
              <label htmlFor="image4" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] cursor-pointer border-2 border-dashed border-gray-400 hover:border-[#46d1f7] flex items-center justify-center rounded shadow-2xl'>
                <img src={image4 ? URL.createObjectURL(image4) : upload} alt="upload preview" className='w-[80%] h-[80%] object-contain rounded' />
              </label>
              <input type="file" id="image4" className="hidden" accept="image/*" onChange={(e) => setImage4(e.target.files[0])} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;
