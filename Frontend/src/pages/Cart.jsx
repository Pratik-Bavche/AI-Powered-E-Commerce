import React, { useContext, useEffect, useState } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from '../components/Title';
import { RiDeleteBin6Line } from 'react-icons/ri';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItem, UpdateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  // Convert cartItem object into array for rendering
  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItem) {
      for (const size in cartItem[itemId]) {
        if (cartItem[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItem[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>
      {/* Page Title */}
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Items */}
      <div className='w-full flex flex-col md:flex-row gap-6 mt-8'>
        <div className='flex-1 flex flex-col gap-4'>
          {cartData.length === 0 && (
            <p className='text-white text-center mt-10'>Your cart is empty.</p>
          )}

          {cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            if (!productData) return null;

            return (
              <div key={index} className='w-full border-t border-b py-4'>
                <div className='w-full flex items-start gap-6 bg-[#51808048] py-4 px-5 rounded-2xl relative'>
                  {/* Product Image */}
                  <img
                    src={productData.image1}
                    alt={productData.name}
                    className='w-[100px] h-[100px] rounded-md object-cover'
                  />

                  {/* Product Info */}
                  <div className='flex flex-col justify-between flex-1'>
                    <h2 className='text-white text-[18px] font-semibold'>{productData.name}</h2>
                    <p className='text-white'>Size: {item.size}</p>
                    <p className='text-white'>Price: {currency}{productData.price}</p>

                    {/* Quantity Controls */}
                    <div className='flex items-center gap-2 mt-2'>
                      <button
                        className='bg-gray-700 text-white px-3 py-1 rounded-md'
                        onClick={() => UpdateQuantity(item._id, item.size, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        className='w-[60px] text-center text-white bg-[#51808064] px-2 py-1 rounded-md border border-[#9ff9f9]'
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= 1) UpdateQuantity(item._id, item.size, value);
                        }}
                      />

                      <button
                        className='bg-gray-700 text-white px-3 py-1 rounded-md'
                        onClick={() => UpdateQuantity(item._id, item.size, item.quantity + 1)}
                      >
                        +
                      </button>

                      {/* Delete Button */}
                      <RiDeleteBin6Line
                        className='text-[#ff5555] w-[25px] h-[25px] cursor-pointer ml-3'
                        onClick={() => UpdateQuantity(item._id, item.size, 0)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Total */}
        <div className='w-full md:w-[350px] mt-6 md:mt-0'>
          <CartTotal />
          <button
            className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-3 px-6 rounded-2xl text-white flex items-center justify-center gap-4 w-full mt-4 border border-[#80808049]'
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("Your cart is empty!");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
