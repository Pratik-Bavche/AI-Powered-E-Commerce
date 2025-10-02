import React, { useState, useContext } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import razorpayImg from '../assets/image.png'; 
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');

  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const productId in cartItem) {
        for (const size in cartItem[productId]) {
          if (cartItem[productId][size] > 0) {
            const itemInfo = structuredClone(products.find(p => p._id === productId));
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItem[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod':
          const result = await axios.post(`${serverUrl}/api/order/placeorder`, orderData, { withCredentials: true });
          console.log(result.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative">

      {/* Delivery Form */}
      <div className="lg:w-[50%] w-[100%] flex items-center justify-center lg:mt-0 mt-[90px]">
        <form onSubmit={onSubmitHandler} className="lg:w-[70%] w-[95%] flex flex-col gap-[10px]">
          <div className="py-[10px]">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          {/* Name */}
          <div className="w-full flex items-center justify-between gap-[4%]">
            <input type="text" name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First name" className="w-[48%] h-[50px] rounded-md bg-slate-700 text-white text-[18px] px-[20px] shadow-sm placeholder:text-white" required />
            <input type="text" name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last name" className="w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-white text-[18px] px-[20px]" required />
          </div>

          {/* Email */}
          <input type="email" name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email address" className="w-full h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-white text-[18px] px-[20px]" required />

          {/* Street */}
          <input type="text" name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street" className="w-full h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-white text-[18px] px-[20px]" required />

          {/* City & State */}
          <div className="w-full flex items-center justify-between gap-[4%]">
            <input type="text" name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]" required />
            <input type="text" name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]" required />
          </div>

          {/* Pincode & Country */}
          <div className="w-full flex items-center justify-between gap-[4%]">
            <input type="text" name="pinCode" value={formData.pinCode} onChange={onChangeHandler} placeholder="Pincode" className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]" required />
            <input type="text" name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]" required />
          </div>

          {/* Phone */}
          <input type="tel" name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone Number" className="w-full h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-white text-[18px] px-[20px]" required />
        </form>
      </div>

      {/* Cart Total & Payment */}
      <div className="lg:w-[50%] w-[100%] flex items-center justify-center gap-[30px]">
        <div className="lg:w-[50%] w-[90%] max-h-[400px] flex flex-col items-center justify-start gap-[10px] overflow-auto">
          <CartTotal />
          <div className="py-[10px] w-full">
            <Title text1="PAYMENT" text2="METHOD" />
          </div>

          <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-[50px]">
            <button type="button" onClick={() => setMethod('razorpay')} className={`w-[150px] h-[50px] rounded-sm ${method === 'razorpay' ? 'border-4 border-blue-900' : ''}`}>
              <img src={razorpayImg} alt="Razorpay" className="w-full h-full object-fill rounded-sm cursor-pointer" />
            </button>

            <button type="button" onClick={() => setMethod('cod')} className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-white text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-4 border-blue-900' : ''} cursor-pointer`}>
              CASH ON DELIVERY
            </button>
          </div>

          <button
            type="submit"
            onClick={onSubmitHandler}
            className="text-[18px] bg-[#3bcee848] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] cursor-pointer active:bg-slate-500 border border-[#80808049] mt-[20px]"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
