import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";

const Order = () => {
  const [orderData, setOrderData] = useState([]);
  const { currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/order/userorder", {
        withCredentials: true,
      });

      if (result.data) {
        let allOrdersItem = [];
        result.data.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#141414] to-[#0c2025] pb-20">
      {/* Page Header */}
      <div className="pt-20 pb-8 text-center">
        <Title text1={"MY"} text2={"ORDER"} />
        <p className="text-gray-400 mt-2">
          {orderData.length === 0
            ? "No orders found"
            : `You have ${orderData.length} order(s)`}
        </p>
      </div>

      {/* Orders Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {orderData.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-[#51808048] rounded-2xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl text-white mb-2">No Orders Yet</h3>
              <p className="text-gray-400 mb-6">
                You haven't placed any orders yet.
              </p>
              <button
                onClick={() => (window.location.href = "/collection")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {orderData.map((item, index) => (
              <div
                key={index}
                className="bg-[#51808048] rounded-2xl p-6 border border-[#96969635] backdrop-blur-sm"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image1}
                      alt={item.name}
                      className="w-full max-w-[200px] h-[200px] object-cover rounded-xl"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">
                        {item.name}
                      </h3>

                      {/* Product Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="bg-[#00000025] rounded-lg p-3">
                          <p className="text-gray-400 text-sm">Price</p>
                          <p className="text-white font-semibold text-lg">
                            {currency} {item.price}
                          </p>
                        </div>
                        <div className="bg-[#00000025] rounded-lg p-3">
                          <p className="text-gray-400 text-sm">Quantity</p>
                          <p className="text-white font-semibold text-lg">
                            {item.quantity}
                          </p>
                        </div>
                        <div className="bg-[#00000025] rounded-lg p-3">
                          <p className="text-gray-400 text-sm">Size</p>
                          <p className="text-white font-semibold text-lg">
                            {item.size}
                          </p>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="bg-[#00000025] rounded-lg p-3">
                          <p className="text-gray-400 text-sm">Order Date</p>
                          <p className="text-white">
                            {new Date(item.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="bg-[#00000025] rounded-lg p-3">
                          <p className="text-gray-400 text-sm">
                            Payment Method
                          </p>
                          <p className="text-white capitalize">
                            {item.paymentMethod}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col items-center lg:items-end justify-between min-w-[200px]">
                    {/* Status */}
                    <div className="text-center lg:text-right mb-4">
                      <div className="flex items-center justify-center lg:justify-end gap-2 mb-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.status === "Order Placed"
                              ? "bg-yellow-500"
                              : item.status === "Shipped"
                              ? "bg-blue-500"
                              : item.status === "Delivered"
                              ? "bg-green-500"
                              : "bg-gray-500"
                          }`}
                        ></div>
                        <span className="text-white font-medium">
                          {item.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">Order Status</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 w-full lg:w-auto">
                      <button
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                        onClick={loadOrderData}
                      >
                        Track Order
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                        onClick={() => (window.location.href = "/collection")}
                      >
                        Order Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
