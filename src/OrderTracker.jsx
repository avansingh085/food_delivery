import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance"; // Ensure you have this axios instance set up.
let url="https://fooddeliverybackend-7a1h.onrender.com"
const OrderTracker = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [deliveryStatus, setDeliveryStatus] = useState([]);
  const navigate = useNavigate();

  // Fetch user data
  const fetchCartData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`${url}/profile`);
      const user = response.data.User;
      setDeliveryStatus(user.deliveryStatus);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useEffect(() => {
    if (!deliveryStatus.length) {
      fetchCartData().finally(() => setLoading(false)); // Fetch data and stop loading when finished
    } else {
      setLoading(false); // If data already exists, stop loading
    }
  }, [deliveryStatus, fetchCartData]);

  const handleOrderClick = (orderId) => {
    setSelectedOrder((prev) => (prev === orderId ? null : orderId));
  };

  // If loading, display loading message
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-6 px-4 md:px-12 flex justify-center items-center relative">
        {/* Blurred Overlay */}
        <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-blur-sm"></div>
        <div className="text-center z-10">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-6 px-4 md:px-12">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-500 transition duration-300"
      >
        Back
      </button>

      {/* Page Header */}
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Order Tracker</h1>

      {/* Orders */}
      {deliveryStatus?.length > 0 ? (
        deliveryStatus.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-lg mb-6 p-4 border border-gray-200"
          >
            {/* Order Overview */}
            <div
              className="cursor-pointer flex justify-between items-center py-4 border-b hover:bg-blue-50 transition duration-300"
              onClick={() => handleOrderClick(order.id)}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-lg font-semibold">{order.name}</h2>
                  <p className="text-gray-600">Order ID: #{order.id}</p>
                </div>
              </div>
              <span className="text-blue-600 font-medium">
                {selectedOrder === order.id ? "Hide Details" : "View Details"}
              </span>
            </div>

            {/* Order Details */}
            {selectedOrder === order.id && (
              <div className="mt-4">
                {/* Order Status */}
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Order Status
                </h3>
                <div className="flex flex-col md:flex-row items-center md:space-x-4">
                  {order.statusSteps.map((status, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center relative"
                    >
                      {/* Connector */}
                      {index !== 0 && (
                        <div
                          className={`w-8 md:w-16 h-1 absolute top-1/2 left-[-1rem] ${
                            status.completed ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        ></div>
                      )}

                      {/* Step Indicator */}
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${
                          status.completed ? "bg-blue-600" : "bg-gray-300"
                        } text-white font-bold`}
                      >
                        {index + 1}
                      </div>

                      {/* Step Info */}
                      <p className="mt-2 text-sm font-medium">{status.step}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(status.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Additional Order Details */}
                <div className="bg-gray-50 p-4 rounded-md mt-6">
                  <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                  <div className="flex justify-between items-center border-b pb-2">
                    <p className="text-gray-700">Product Name</p>
                    <p className="text-gray-800 font-medium">{order.name}</p>
                  </div>
                  <div className="flex justify-between items-center border-b py-2">
                    <p className="text-gray-700">Quantity</p>
                    <p className="text-gray-800 font-medium">{order.quantity}</p>
                  </div>
                  <div className="flex justify-between items-center border-b py-2">
                    <p className="text-gray-700">Price</p>
                    <p className="text-gray-800 font-medium">₹{order.price}</p>
                  </div>
                  <div className="flex justify-between items-center border-b py-2">
                    <p className="text-gray-700">Payment Status</p>
                    <p
                      className={`font-medium ${
                        order.paymentStatus === "Paid"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </p>
                  </div>

                  {/* Customization Details */}
                  <h3 className="text-lg font-semibold mt-6">Customization</h3>
                  <div className="mt-2">
                    <p className="text-gray-700">
                      <strong>Size:</strong> {order.customization.size}
                    </p>
                    <p className="text-gray-700">
                      <strong>Crust:</strong> {order.customization.crust}
                    </p>
                    <p className="text-gray-700">
                      <strong>Extra Cheese:</strong>{" "}
                      {order.customization.extraCheese ? "Yes" : "No"}
                    </p>
                    {order.customization.toppings.length > 0 && (
                      <p className="text-gray-700">
                        <strong>Toppings:</strong>{" "}
                        {order.customization.toppings.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default OrderTracker;
