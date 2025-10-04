import React, { useState, useContext, useEffect } from "react";
import SideBar from "../component/SideBar";
import Nav from "../component/Nav";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { SiEbox } from "react-icons/si";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { serverUrl } = useContext(authDataContext);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/order/list", {
        withCredentials: true,
      });
      setOrders(result.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  // Update order status
  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        serverUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { withCredentials: true }
      );

      if (result.data) {
        await fetchAllOrders();
        alert("Status updated successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating status");
    }
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "order placed":
        return "bg-blue-500";
      case "packing":
        return "bg-yellow-500";
      case "shipped":
        return "bg-purple-500";
      case "out for delivery":
        return "bg-orange-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="w-[99vw] min-h-[100vh] bg-gradient-to-b from-[#141414] to-[#0c2025] text-white">
      <Nav />

      <div className="w-[100%] h-[100%] flex items-center lg:justify-start justify-center">
        <SideBar />

        <div className="lg:w-[85%] md:w-[70%] h-[100%] lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-[20px] overflow-x-hidden py-[30px] ml-[100px]">
          <div className="w-full text-center mb-[20px]">
            <h1 className="text-[28px] md:text-[40px] text-white font-bold">
              All Orders List
            </h1>
          </div>

          {orders.length === 0 ? (
            <div className="text-center mt-20">
              <p className="text-white text-xl mb-4">No orders found.</p>
              <p className="text-gray-400">
                Orders will appear here when customers place them.
              </p>
            </div>
          ) : (
            <div className="w-[95%] space-y-4">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="w-full bg-[#51808048] rounded-xl p-3 border border-[#4d8890] hover:bg-[#51808060] transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row gap-2">
                    {/* Order Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-[50px] h-[50px] bg-white rounded-lg flex items-center justify-center">
                        <SiEbox className="w-[30px] h-[30px] text-black" />
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Items Section */}
                        <div>
                          <h3 className="text-white text-base font-semibold mb-2">
                            Order Items
                          </h3>
                          <div className="space-y-1">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between bg-[#3336397c] p-2 rounded-lg"
                              >
                                <div className="flex-1">
                                  <p className="text-white font-medium text-sm truncate">
                                    {item.name}
                                  </p>
                                  <p className="text-[#aaf4e7] text-xs">
                                    Size: {item.size} | Qty: {item.quantity}
                                  </p>
                                </div>
                                <p className="text-white font-semibold text-sm ml-2">
                                  ₹{item.price}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Customer & Payment Info */}
                        <div>
                          <h3 className="text-white text-base font-semibold mb-2">
                            Customer Details
                          </h3>
                          {order.address && (
                            <div className="bg-[#3336397c] p-3 rounded-lg mb-3">
                              <p className="text-white font-medium text-sm">
                                {order.address.firstName}{" "}
                                {order.address.lastName}
                              </p>
                              <p className="text-[#aaf4e7] text-xs">
                                {order.address.street}
                              </p>
                              <p className="text-[#aaf4e7] text-xs">
                                {order.address.city}, {order.address.state},{" "}
                                {order.address.country} -{" "}
                                {order.address.pinCode}
                              </p>
                              <p className="text-[#aaf4e7] text-xs">
                                📞 {order.address.phone}
                              </p>
                            </div>
                          )}

                          <div className="bg-[#3336397c] p-3 rounded-lg">
                            <div className="grid grid-cols-2 gap-1 text-xs">
                              <div>
                                <span className="text-[#aaf4e7]">Items:</span>
                                <span className="text-white ml-1">
                                  {order.items.length}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#aaf4e7]">Method:</span>
                                <span className="text-white ml-1">
                                  {order.paymentMethod}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#aaf4e7]">Payment:</span>
                                <span
                                  className={`ml-1 ${
                                    order.payment
                                      ? "text-green-400"
                                      : "text-yellow-400"
                                  }`}
                                >
                                  {order.payment ? "Done" : "Pending"}
                                </span>
                              </div>
                              <div>
                                <span className="text-[#aaf4e7]">Date:</span>
                                <span className="text-white ml-1">
                                  {new Date(order.date).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2 pt-2 border-t border-gray-600">
                              <p className="text-white text-lg font-bold">
                                Total: ₹{order.amount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status Section */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-center">
                        <div
                          className={`w-3 h-3 rounded-full ${getStatusColor(
                            order.status
                          )} mx-auto mb-1`}
                        ></div>
                        <p className="text-white font-semibold capitalize text-sm">
                          {order.status}
                        </p>
                      </div>

                      <select
                        value={order.status}
                        onChange={(e) => statusHandler(e, order._id)}
                        className="px-3 py-1 bg-[#3336397c] text-white rounded-lg border border-[#4d8890] focus:outline-none focus:border-[#3bcee8] transition-colors duration-300 text-sm"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for delivery">
                          Out for delivery
                        </option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
