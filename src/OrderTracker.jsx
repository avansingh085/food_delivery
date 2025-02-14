import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import ReviewModal from "./ReviewModal.jsx";
import LiveLocationModal from "./location.jsx";

const url = "http://localhost:5000";

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
        const response = await axiosInstance.get(`${url}/getOrder`);
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
      <div className="flex justify-between mb-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>

      <h1 className="text-3xl font-bold text-blue-800 mb-6">Order Tracker</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <p className="text-center">Loading orders...</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 mb-4 rounded shadow-md cursor-pointer transition-all"
            onClick={() => handleOrderClick(order._id)}
          >
            <div className="flex items-start">
              <img
                src={order.id.imageUrls[0]}
                alt={order.id.name}
                className="w-24 h-24 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {order.id.name}
                    </h2>
                    <p className="text-gray-600">Order ID: {order._id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
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
                    </p>
                  </div>
                </div>

                
                {expandedOrderId === order._id && (
                  <div className="mt-4 space-y-3">
                    <img
                      src={order.id.imageUrls[0]}
                      alt={order.id.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <p className="text-gray-700">{order.id.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold">Quantity:</p>
                        <p>{order.quantity}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Payment Status:</p>
                        <p className="text-green-600">{order.paymentStatus}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Delivery Address:</p>
                        <p className="text-gray-600">{order.deliveryAddress}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTrackingOrder(order);
                        }}
                        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                      >
                        Track Delivery
                      </button>

                      {/* Open review modal only if order is Delivered */}
                      {/* order.currentStatus === "Delivered" && */}
                      { (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                           
                            setReviewOrder(order);
                          }}
                          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
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
        ))
      )}

      {trackingOrder && (
        <div className="fixed inset-0 overflow-y-scroll bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl relative">
            <button
              onClick={() => setTrackingOrder(null)}
              className="absolute -top-8 right-0 text-white hover:text-gray-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
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
  );
};

export default OrderTracker;
