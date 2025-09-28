import React, { useState, useEffect, useContext } from 'react';
import Nav from '../component/Nav';
import SideBar from '../component/SideBar';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

const Lists = () => {
  const [list, setList] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`);
      setList(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeList = async (id) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      );
      if (result.data) {
        fetchList();
      } else {
        console.log('Failed to remove product');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">
      <Nav />
      <div className="w-[100%] h-[100%] flex items-start justify-start">
        <SideBar />
        <div className="w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-8 md:gap-10 lg:gap-20 overflow-x-hidden py-[50px]">
          <div className="w-[400px] h-[50px] text-[28px] md:text-[32px] text-white mb-[20px]">
            All Listed Products
          </div>
          {list && list.length > 0 ? (
            list.map((item, index) => (
              <div
                key={index}
                className="w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex items-center justify-between gap-[10px] md:gap-[30px] p-[10px] md:px-[30px]"
              >
                <div className="flex items-center gap-[10px] md:gap-[30px]">
                  <img
                    src={item.image1}
                    className="w-[30%] md:w-[120px] h-[90%] rounded-lg object-cover"
                    alt={item.name}
                  />
                  <div className="flex flex-col justify-center ml-4 gap-1">
                    <div className="text-white font-semibold">{item.name}</div>
                    <div className="md:text-[17px] text-[15px] text-[#bef3da]">
                      {item.category}
                    </div>
                    <div className="md:text-[17px] text-[15px] text-[#bef3da]">
                      ₹ {item.price}
                    </div>
                  </div>
                </div>
                {/* Remove Button */}
                <span
                  className="w-[35px] h-[30px] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer"
                  onClick={() => removeList(item._id)}
                >
                  X
                </span>
              </div>
            ))
          ) : (
            <div className="text-white text-lg">No products available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lists;
