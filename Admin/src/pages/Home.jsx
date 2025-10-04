import React, { useContext, useEffect, useState } from "react";
import Nav from "../component/Nav";
import SideBar from "../component/SideBar";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
  const { serverUrl } = useContext(authDataContext);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCounts = async () => {
    try {
      // Fetch total products
      const productsResponse = await axios.get(`${serverUrl}/api/product/list`);
      setTotalProducts(productsResponse.data.length);

      // Fetch total orders
      const ordersResponse = await axios.get(`${serverUrl}/api/order/list`, {
        withCredentials: true,
      });
      setTotalOrders(ordersResponse.data.length);
    } catch (error) {
      console.error("Error fetching counts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serverUrl) {
      fetchCounts();
    }
  }, [serverUrl]);

  return (
    <div className="w-full h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white relative overflow-hidden">
      <Nav />
      <SideBar />

      {/* Dashboard Content */}
      <div className="lg:w-[85%] md:w-[70%] h-[100%] lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-[20px] overflow-x-hidden py-[30px] ml-[100px]">
        {/* Page Title */}
        <div className="w-full text-center mb-[20px]">
          <h1 className="text-[28px] md:text-[40px] text-white font-bold">
            OneCart Admin Panel
          </h1>
        </div>

        {/* Dashboard Cards */}
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Products Card */}
            <div className="bg-[#3336397c] border border-[#4d8890] rounded-xl p-6 hover:bg-[#33363990] transition-all duration-300">
              <div className="text-center">
                <h3 className="text-white text-lg md:text-xl mb-4">
                  Total No. of Products :
                </h3>
                <div className="bg-[#333639] border border-[#4d8890] rounded-lg px-6 py-3 inline-block">
                  <span className="text-white text-2xl md:text-3xl font-bold">
                    {loading ? "..." : totalProducts}
                  </span>
                </div>
              </div>
            </div>

            {/* Total Orders Card */}
            <div className="bg-[#3336397c] border border-[#4d8890] rounded-xl p-6 hover:bg-[#33363990] transition-all duration-300">
              <div className="text-center">
                <h3 className="text-white text-lg md:text-xl mb-4">
                  Total No. of Orders :
                </h3>
                <div className="bg-[#333639] border border-[#4d8890] rounded-lg px-6 py-3 inline-block">
                  <span className="text-white text-2xl md:text-3xl font-bold">
                    {loading ? "..." : totalOrders}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
