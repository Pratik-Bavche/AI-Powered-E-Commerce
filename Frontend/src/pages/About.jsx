import React from 'react';
import Title from '../components/Title';
import about from '../assets/about.png';
import NewLetterBox from '../components/NewLetterBox';

const About = () => {
  return (
     <div className='w-[99vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px] pb-[80px]'>
      
      <Title text1={'ABOUT'} text2={'US'} />

      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row gap-[30px]'>

        {/* Image Section */}
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img 
            src={about} 
            alt="About Us" 
            className='lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm'
          />
        </div>

        {/* Text Section */}
        <div className='lg:w-[50%] w-[90%] text-white px-[10px] flex flex-col gap-[20px]'>
          <p className='text-[14px] md:text-[16px] leading-[1.6]'>
            ShoppingCart born for smart, seamless shopping—created to deliver quality products, trending styles, and everyday essentials in one place. 
            With reliable service, fast delivery, and great value, OneCart makes your online shopping experience simple, satisfying, and stress-free.
          </p>

          <p className='text-[14px] md:text-[16px] leading-[1.6]'>
            Modern shoppers—combining style, convenience, and affordability. Whether it’s fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you’ll love.
          </p>

          <h2 className='text-[18px] md:text-[20px] font-semibold'>Our Mission</h2>
          <p className='text-[14px] md:text-[16px] leading-[1.6]'>
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. 
            OneCart connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>
        </div>

      </div>

      {/* Why Choose Us Section */}
      <div className='w-[100%] flex flex-col items-center gap-[10px]'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />

        <div className='w-[80%] flex flex-col lg:flex-row items-center justify-center gap-[20px] py-[40px]'>
          
          {/* Card 1 */}
          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-100 flex flex-col items-center justify-center gap-[20px] px-[20px] py-[10px] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Quality Assurance</b>
            <p className='text-white text-[14px] text-center'>
              We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.
            </p>
          </div>

          {/* Card 2 */}
          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-100 flex flex-col items-center justify-center gap-[20px] px-[20px] py-[10px] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Fast Delivery</b>
            <p className='text-white text-[14px] text-center'>
              Get your products delivered quickly with our reliable shipping partners and tracking options.
            </p>
          </div>

          {/* Card 3 */}
          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-100 flex flex-col items-center justify-center gap-[20px] px-[20px] py-[10px] backdrop-blur-[2px] bg-[#ffffff0b]'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Customer Support</b>
            <p className='text-white text-[14px] text-center'>
              Our support team is ready to help you with queries, returns, or product guidance at any time.
            </p>
          </div>

        </div>
      </div>
<NewLetterBox/>
    </div>
  );
}

export default About;
