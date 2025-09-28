import React, { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { shopDataContext } from '../context/ShopContext';
import Card from './Card';

const BestSeller = () => {
  const { products } = useContext(shopDataContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    // Filter products where bestSeller is true and take first 4
    const filterProduct = products.filter(item => item.bestSeller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [products]);

  return (
    <div className='w-full mt-[50px] text-center'>
      <div className='h-[8%] w-full'>
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className='w-full m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>
          Tried, Tested, Loved. Discover Our All-Time Best Sellers.
        </p>
      </div>

      <div className='w-full h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
        {bestSeller.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            id={item._id}
            price={item.price}
            image={item.image1}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
