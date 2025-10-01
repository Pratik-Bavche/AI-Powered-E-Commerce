import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';

function CartTotal() {
  const { currency, deliver_fee, getCartAmount } = useContext(shopDataContext);
  const subtotal = getCartAmount();
  const total = subtotal + deliver_fee;

  return (
    <div className='w-full bg-[#51808048] rounded-2xl p-6 border border-[#4d8890]'>
      {/* Title */}
      <div className='text-center mb-6'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      {/* Cart Totals Box */}
      <div className='space-y-4'>
        <div className='flex justify-between items-center py-3 px-4 bg-[#3336397c] rounded-lg'>
          <span className='text-white text-lg font-medium'>Subtotal</span>
          <span className='text-white text-lg font-semibold'>{currency} {subtotal.toFixed(2)}</span>
        </div>

        <div className='flex justify-between items-center py-3 px-4 bg-[#3336397c] rounded-lg'>
          <span className='text-white text-lg font-medium'>Shipping Fee</span>
          <span className='text-white text-lg font-semibold'>{currency} {deliver_fee.toFixed(2)}</span>
        </div>

        <div className='border-t-2 border-[#4d8890] pt-4'>
          <div className='flex justify-between items-center py-3 px-4 bg-[#2a4a4a] rounded-lg'>
            <span className='text-white text-xl font-bold'>Total</span>
            <span className='text-white text-xl font-bold'>{currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
