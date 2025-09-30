import React from 'react';

const NewLetterBox = () => {
  return (
    <div className='w-[100%] h-[15vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start gap-[10px] flex-col py-[10px] '>
      
      <p className='md:text-[30px] text-[20px] text-[#a5faf7] font-semibold px-[20px] text-center'>
        Get the Latest Updates from Our Website
      </p>
      
      <p className='md:text-[18px] text-[14px] text-blue-100 font-semibold px-[20px] text-center'>
        Be the first to know about our newest collections, exclusive offers, and website highlights.
      </p>
    </div>
  );
};

export default NewLetterBox;
