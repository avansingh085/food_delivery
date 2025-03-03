import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import { setCart } from "../redux/globSlice";
import axiosInstance from "../utils/axiosInstance";

const url = "http://localhost:5000";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mobile = useSelector((state) => state.Data.User?.mobile);
  const cartItems = useSelector((state) => state.Data.cart);

  const [totalPrice, setTotalPrice] = useState(0);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  // Instead of one global isProcessing, we track item-specific processing IDs.
  const [processingIds, setProcessingIds] = useState([]);

  // Fetch cart data
  const fetchCartData = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`${url}/getCart`);
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (err) {
      console.error("Error fetching cart data:", err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const loadRazorpayScript = useCallback(() => {
    if (document.getElementById("razorpay-script")) {
      setIsRazorpayLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.id = "razorpay-script";
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => console.error("Error loading Razorpay SDK");
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    loadRazorpayScript();
  }, [loadRazorpayScript]);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total.toFixed(2));
  }, [cartItems]);

  // Helper functions to add and remove processing IDs
  const addProcessingId = (id) =>
    setProcessingIds((prev) => [...prev, id]);
  const removeProcessingId = (id) =>
    setProcessingIds((prev) => prev.filter((itemId) => itemId !== id));

  const updateQuantity = async (id, quantity) => {
    // Prevent update if already processing for this id or if quantity < 1
    if (quantity < 1 || processingIds.includes(id)) return;
    addProcessingId(id);
    try {
      await axiosInstance.post(`${url}/updateCart`, { mobile, id, quantity });
      await fetchCartData();
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      removeProcessingId(id);
    }
  };

  const deleteCartItem = async (id) => {
    // Prevent duplicate deletion calls for the same item
    if (processingIds.includes(id)) return;
    addProcessingId(id);
    try {
      await axiosInstance.post(`${url}/deleteCart`, { mobile, id });
      await fetchCartData();
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      removeProcessingId(id);
    }
  };

  const updateOrderStatus = async (paymentId) => {
    try {
      const response = await axiosInstance.post(`${url}/addOrder`, {
        mobile,
        paymentId,
        cartItems,
        amount: totalPrice,
      });
      if (response.data.success) {
        dispatch(setCart([]))
        navigate("/MyOrder");
      } else {
        console.error("Error updating order status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handlePayment = () => {
    if (!isRazorpayLoaded) {
      console.error("Razorpay SDK not loaded");
      return;
    }

    const options = {
      key: "rzp_test_hI0niYSDJZ36yP",
      amount: (parseInt(totalPrice)* 100),
      currency: "INR",
      name: "Cart Payment",
      description: "Complete your purchase",
      handler: async (response) => {
        if (!response.razorpay_payment_id) {
          console.error("Payment failed");
          return;
        }
        await updateOrderStatus(response.razorpay_payment_id);
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: mobile || "9999999999",
      },
      theme: { color: "#F37254" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        {cartItems.length > 0 && (
          <button
            onClick={handlePayment}
            // Disable payment if any operation is in progress
            disabled={processingIds.length > 0}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
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
            <Link to={`/food/${item._id}`}> <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <img
                src={item.imageUrls[0] || "/default-image.jpg"}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p>Price: ₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={processingIds.includes(item.id)}
                    className="bg-gray-300 px-3 py-1 rounded-l-md"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center border"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={processingIds.includes(item.id)}
                    className="bg-gray-300 px-3 py-1 rounded-r-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => deleteCartItem(item.id)}
                disabled={processingIds.includes(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
            </Link>
          ))
        ) : (
          <h1 className="text-center text-xl text-gray-600">Your cart is empty!</h1>
        )}
      </div>
    </div>
   
  );
};

export default CartPage;
