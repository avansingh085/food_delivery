import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.jsx";
import ReviewModal from "./ReviewModal.jsx";
import LiveLocationModal from "./location.jsx";
import OrderProgress from "./OrderProgress.jsx";
const OrderTracker = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewOrder, setReviewOrder] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/getOrder");
        if (response.data.success && response.data.orders.length > 0) {
          setOrders(response.data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Could not load orders. Showing demo orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Back to Home
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-800">
            Order Tracker
          </h1>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {loading ? (
          <p className="text-center">Loading orders...</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 rounded shadow-md transition-all cursor-pointer hover:shadow-lg"
                onClick={() => handleOrderClick(order._id)}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={order.id.imageUrls[0]}
                    alt={order.id.name}
                    className="w-full sm:w-32 h-32 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">
                          {order.id.name}
                        </h2>
                        <p className="text-gray-500 text-sm">
                          Order ID: {order._id}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-right">
                        {/* <p className="text-lg font-bold text-blue-600">
                          ₹{order.price}
                        </p>
                        <p
                          className={`text-sm ${
                            order.currentStatus === "Delivered"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {order.currentStatus}
                        </p> */}
                      </div>
                    </div>

                    {expandedOrderId === order._id && (
                      <div className="mt-4 space-y-3">
                        {/* <img
                          src={order.id.imageUrls[0]}
                          alt={order.id.name}
                          className="w-full h-48 object-cover rounded-lg"
                        /> */}
                        <p className="text-gray-700">
                          {order.id.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                          <div>
                            <p className="font-semibold">Quantity:</p>
                            <p>{order.quantity}</p>
                          </div>
                          <div>
                            <p className="font-semibold">Payment Status:</p>
                            <p className="text-green-600">
                              {order.paymentStatus}
                            </p>
                          </div>
                          <div className="sm:col-span-2">
                            <p className="font-semibold">Delivery Address:</p>
                            <p className="text-gray-600">
                              {order.deliveryAddress}
                            </p>
                          </div>
                        </div>
                          <OrderProgress/>
                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setTrackingOrder(order);
                            }}
                            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full sm:w-auto"
                          >
                            Track Delivery
                          </button>

                          {order.currentStatus === "Delivered" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setReviewOrder(order);
                              }}
                              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full sm:w-auto"
                            >
                              Rate & Review
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {trackingOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl relative">
              <button
                onClick={() => setTrackingOrder(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="p-4 h-[500px]">
                <LiveLocationModal
                  order={trackingOrder}
                  onClose={() => setTrackingOrder(null)}
                />
              </div>
            </div>
          </div>
        )}

        {reviewOrder && (
          <ReviewModal
            orderId={reviewOrder._id}
            productId={reviewOrder.id._id}
            onClose={() => setReviewOrder(null)}
          />
        )}
      </div>
    </div>
  );
};

export default OrderTracker;
