import React from "react";

const OrderTracker = () => {
  const orderStatus = [
    { step: "Order Placed", date: "Jan 18, 2025", completed: true },
    { step: "Processing", date: "Jan 19, 2025", completed: true },
    { step: "Shipped", date: "Jan 20, 2025", completed: true },
    { step: "Out for Delivery", date: "Jan 21, 2025", completed: false },
    { step: "Delivered", date: "Expected: Jan 22, 2025", completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12">
      {/* Page Header */}
      <div className="bg-white shadow-md rounded-md p-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Track Your Order
        </h1>
        <p className="text-gray-600 mt-1">Order ID: #1234567890</p>
      </div>

      {/* Order Status Tracker */}
      <div className="mt-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Order Status
        </h2>
        <div className="flex flex-col md:flex-row items-center md:space-x-4">
          {orderStatus.map((status, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
              {/* Connector line */}
              {index !== 0 && (
                <div
                  className={`w-8 md:w-16 h-1 absolute top-1/2 left-[-1rem] ${
                    status.completed ? "bg-blue-600" : "bg-gray-300"
                  }`}
                ></div>
              )}
              {/* Status Indicator */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  status.completed ? "bg-blue-600" : "bg-gray-300"
                } text-white font-bold`}
              >
                {index + 1}
              </div>
              {/* Status Details */}
              <p className="mt-2 text-sm font-medium text-gray-700">
                {status.step}
              </p>
              <p className="text-xs text-gray-500">{status.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Order Details
        </h2>
        <div className="flex justify-between items-center border-b pb-4">
          <p className="text-gray-700">Product Name</p>
          <p className="text-gray-800 font-medium">Gaming Laptop</p>
        </div>
        <div className="flex justify-between items-center border-b py-4">
          <p className="text-gray-700">Order Date</p>
          <p className="text-gray-800 font-medium">Jan 18, 2025</p>
        </div>
        <div className="flex justify-between items-center border-b py-4">
          <p className="text-gray-700">Total Amount</p>
          <p className="text-gray-800 font-medium">₹85,000</p>
        </div>
        <div className="flex justify-between items-center py-4">
          <p className="text-gray-700">Payment Status</p>
          <p className="text-green-600 font-medium">Paid</p>
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          Need Help?
        </h2>
        <p className="text-gray-600 mb-4">
          If you have any questions or issues with your order, feel free to
          contact our support team.
        </p>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default OrderTracker;
