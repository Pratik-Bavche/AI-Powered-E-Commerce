import React from 'react';
import Title from '../components/Title';
import contact from '../assets/contact.png';
import NewLetterBox from '../components/NewLetterBox';

const Contact = () => {
  return (
    <div className='w-[99vw] min-h-[100vh] flex flex-col items-center justify-start bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px] pb-[80px]'>

      <Title text1={'CONTACT'} text2={'US'} />

      <div className='w-[100%] flex flex-col lg:flex-row items-center justify-center gap-[30px]'>
        
        {/* Image Section */}
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img 
            src={contact} 
            alt="Contact Us" 
            className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm'
          />
        </div>

        {/* Contact Info Section */}
        <div className='lg:w-[50%] w-[90%] flex flex-col items-start justify-center gap-[20px] mt-[20px] lg:mt-0 text-white px-[10px]'>
          
          <h2 className='text-[18px] md:text-[20px] font-semibold'>Our Store</h2>
          <p className='text-[14px] md:text-[16px] leading-[1.6]'>
            12345 Random Station <br />
            Random City, State, India
          </p>
          <p className='text-[14px] md:text-[16px] leading-[1.6]'>
            Tel: +91-9876543210 <br />
            Email: admin@shoppingcart.com
          </p>

          <h2 className='text-[18px] md:text-[20px] font-semibold mt-[20px]'>Careers at OneCart</h2>
          <p className='text-[14px] md:text-[16px] leading-[1.6]'>
            Learn more about our teams and job openings
          </p>
          <button className='mt-[10px] px-[20px] py-[10px] border border-white rounded-md text-white hover:bg-white hover:text-black transition-all duration-300'>
            Explore Jobs
          </button>
        </div>

      </div>
      <NewLetterBox/>
    </div>
    
  );
}

export default Contact;
