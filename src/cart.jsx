import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import { setUser } from "./globSlice";
import axiosInstance from "./axiosInstance";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mobile = useSelector((state) => state.Data.User?.mobile);
  const User = useSelector((state) => state.Data);
  const [cartItems, setCartItems] = useState(User?.User?.cart || []);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch user cart data
  const fetchCartData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("http://localhost:5000/profile", {
        params: { mobile },
      });
      const user = response.data.User;
      dispatch(setUser(user));
      setCartItems(user.cart || []);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  }, [dispatch, mobile]);

  // Load Razorpay script
  const loadRazorpayScript = useCallback(() => {
    if (document.getElementById("razorpay-script")) {
      setIsRazorpayLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.id = "razorpay-script";
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = (error) => console.error("Error loading Razorpay:", error);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    fetchCartData();
    loadRazorpayScript();
  }, [fetchCartData, loadRazorpayScript]);

  // Calculate total price
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

  // Update cart item quantity
  const updateQuantity = async (id, quantity) => {
    setIsProcessing(true);
    try {
      await axiosInstance.post("http://localhost:5000/updateCart", {
        mobile,
        id,
        quantity,
      });
      fetchCartData();
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Delete cart item
  const deleteCartItem = async (id) => {
    setIsProcessing(true);
    try {
      await axiosInstance.post("http://localhost:5000/deleteCart", {
        mobile,
        id,
      });
      fetchCartData();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateOrderStatus = async (paymentId) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/updateOrderStatus",
        {
          mobile,
          paymentId,
          cartItems,
        }
      );

      if (response.data.success) {
        navigate("/OrderTracker"); // Navigate to the order tracker page
      } else {
        console.error("Error updating order status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Handle payment with Razorpay
  const handlePayment = () => {
    if (!isRazorpayLoaded) {
      console.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_hI0niYSDJZ36yP", // Replace with your Razorpay Key ID
      amount: totalPrice * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "Cart Payment",
      description: "Complete your purchase",
      handler: async (response) => {
        console.log("Payment successful:", response);
        const { razorpay_payment_id } = response;

        if (!razorpay_payment_id) {
          console.error("Payment ID not received");
          return;
        }

        await updateOrderStatus(razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: mobile || "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
        {cartItems.length > 0 && (
          <button
            onClick={handlePayment}
            disabled={isProcessing || !isRazorpayLoaded}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 w-full sm:w-auto"
          >
            Proceed to Payment
          </button>
        )}
      </div>
      <div className="text-center space-y-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
      </div>
      <div className="space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md sm:flex-row flex-col"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0"
                onError={(e) => (e.target.src = "/default-image.jpg")}
              />
              <div className="flex-grow ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600">Price: ₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={isProcessing || item.quantity <= 1}
                    className="bg-gray-300 px-3 py-1 rounded-l-md text-gray-800 hover:bg-gray-400"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center border-t border-b border-gray-300"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={isProcessing}
                    className="bg-gray-300 px-3 py-1 rounded-r-md text-gray-800 hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => deleteCartItem(item.id)}
                disabled={isProcessing}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
          ))
        ) : (
          <h1 className="text-center text-xl text-gray-600">
            Your cart is empty!
          </h1>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="mt-6 flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Total</h2>
          <p className="text-2xl font-semibold text-gray-800">₹{totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
