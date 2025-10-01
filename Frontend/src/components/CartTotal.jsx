import React, { useContext } from 'react';
import { shopDataContext } from '../context/ShopContext';
import Title from './Title';

function CartTotal() {
  const { currency, deliver_fee, getCartAmount } = useContext(shopDataContext);
  const subtotal = getCartAmount();
  const total = subtotal + deliver_fee;

  return (
    <div className='w-full lg:ml-[30px]'>
      {/* Title */}
      <div className='text-xl py-[10px]'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      {/* Cart Totals Box */}
      <div className='flex flex-col gap-2 mt-2 text-sm p-[30px] border-[2px] border-[#4d8890]'>
        <div className='flex justify-between text-white text-[18px] p-[10px]'>
          <p>Subtotal</p>
          <p>{currency} {subtotal.toFixed(2)}</p>
        </div>
        <hr />

        <div className='flex justify-between text-white text-[18px] p-[10px]'>
          <p>Shipping Fee</p>
          <p>{currency} {deliver_fee.toFixed(2)}</p>
        </div>
        <hr />

        <div className='flex justify-between text-white text-[18px] p-[10px]'>
          <b>Total</b>
          <b>{currency} {total.toFixed(2)}</b>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
