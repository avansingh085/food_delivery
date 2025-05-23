import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa";
import { setCart, updateUser } from "../redux/userSlice";
import axiosInstance from "../utils/axiosInstance";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mobile = useSelector((state) => state.user?.user?.mobile);
  const cartItems = useSelector((state) => state.user?.cart);
  const [showCoupen, setShowCoupen] = useState(false);
 
  const [totalPrice, setTotalPrice] = useState(0);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [processingIds, setProcessingIds] = useState([]);

  const coupen = [
    {
      "code": "WELCOME50",
      "description": "Flat 50% off on first order",
      "discountType": "percentage",
      "discountValue": 50,
      "maxDiscountAmount": 100,
      "minPurchaseAmount": 200,
      "validFrom": "2025-05-01T00:00:00Z",
      "validTill": "2025-06-01T23:59:59Z",
      "usageLimit": 1,
      "usedCount": 0,
      "isActive": true
    },
    {
      "code": "FREESHIP",
      "description": "Free shipping on orders above ₹500",
      "discountType": "free_shipping",
      "discountValue": 0,
      "maxDiscountAmount": 0,
      "minPurchaseAmount": 500,
      "validFrom": "2025-05-10T00:00:00Z",
      "validTill": "2025-07-10T23:59:59Z",
      "usageLimit": 2,
      "usedCount": 0,
      "isActive": true
    },
    {
      "code": "SUMMER10",
      "description": "10% off on summer sale items",
      "discountType": "percentage",
      "discountValue": 10,
      "maxDiscountAmount": 50,
      "minPurchaseAmount": 100,
      "validFrom": "2025-05-15T00:00:00Z",
      "validTill": "2025-06-30T23:59:59Z",
      "usageLimit": 5,
      "usedCount": 0,
      "isActive": true
    }
  ]



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

  const addProcessingId = (id) =>
    setProcessingIds((prev) => [...prev, id]);

  const removeProcessingId = (id) =>
    setProcessingIds((prev) => prev.filter((itemId) => itemId !== id));

  const updateQuantity = async (_id, quantity) => {
    if (quantity < 1 || processingIds.includes(_id)) return;
    addProcessingId(_id);
    try {
      let res = await axiosInstance.post("/updateCart", { mobile, id: _id, quantity });

      dispatch(updateUser(res.data.user));

    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      removeProcessingId(_id);
    }
  };

  const deleteCartItem = async (_id) => {
    if (processingIds.includes(_id)) return;
    addProcessingId(_id);
    try {
      console.log(mobile, _id)
      let res = await axiosInstance.post("/deleteCart", { mobile, id: _id });

      dispatch(updateUser(res.data.user));

    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      removeProcessingId(_id);
    }
  };

  const updateOrderStatus = async (paymentId) => {
    try {
      const response = await axiosInstance.post("/addOrder", {
        mobile,
        paymentId,
        cartItems,
        amount: totalPrice,
      });
      if (response.data.success) {
        dispatch(setCart([]));
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
      amount: Math.round(parseFloat(totalPrice) * 100),
      currency: "INR",
      name: "Cart Payment",
      description: "Complete your purchase",
      handler: async (response) => {
        if (response.razorpay_payment_id) {
          await updateOrderStatus(response.razorpay_payment_id);
        } else {
          console.error("Payment failed");
        }
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
   console.log(cartItems,"PPPPPPPPPPLLLLLLLLLL")
  return (
    <div className="min-h-screen w-screen">
      <div className="max-w-7xl mx-auto p-6 bg-gray-100">

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          {cartItems.length > 0 && (
            <div className="flex items-center gap-3 mt-4">

              <div className="w-full">
                <input
                  type="text"
                  placeholder="Apply Coupon"
                  className="border border-gray-300 rounded-lg p-3 w-44 md:w-56 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  onMouseDown={() => setShowCoupen(true)}

                />
                <div className={`absolute mt-1  w-screen bg-white left-0 transform duration-1000 `} onClick={() => setShowCoupen((pre) => !pre)}>

                  {showCoupen && coupen.map((data, key) => {
                    const discountLabel =
                      data.discountType === "percentage"
                        ? `${data.discountValue}% OFF`
                        : data.discountType === "free_shipping"
                          ? "Free Shipping"
                          : `₹${data.discountValue} OFF`;

                    return (
                      <div
                        key={key}
                        className="flex justify-between items-center bg-white rounded-xl shadow-md px-4 py-3 mb-4 hover:shadow-lg transition-all duration-300"
                      >
                        <div>
                          <div className="text-lg font-semibold text-gray-800">{data.code}</div>
                          <div className="text-sm text-gray-500">{data.description}</div>
                        </div>

                        <div className="text-green-600 font-bold">{discountLabel}</div>

                        <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-200">
                          Apply
                        </button>
                      </div>
                    );
                  }
                  )}

                </div>
              </div>


            </div>
          )}

        </div>

        <div className="text-center space-y-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        </div>

        <div className="space-y-4 mb-24">
          {cartItems?.length > 0 ? (
            cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Link to={`/food/${item._id}`}>
                    <img
                      src={item?.imageUrls[0] || "/default-image.jpg"}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>
                  <div>
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p>Price: ₹{item.price}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={processingIds.includes(item._id)}
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
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        disabled={processingIds.includes(item._id)}
                        className="bg-gray-300 px-3 py-1 rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteCartItem(item._id)}
                  disabled={processingIds.includes(item._id)}
                  className="text-red-500 hover:text-red-600 ml-4"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            ))
          ) : (
            <h1 className="text-center text-xl text-gray-600">Your cart is empty!</h1>
          )}
        </div>
      </div>
      <div className="h-24 w-screen border-t shadow-2xl fixed bottom-0 left-0 right-0 bg-white px-8 flex items-center justify-between z-50">

      
        <div className="text-lg font-bold text-gray-800">
          Total Price: ₹{totalPrice}
        </div>

        <div>
          {cartItems.length > 0 && (
            <button
              onClick={handlePayment}
              disabled={processingIds.length > 0}
              className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-sm font-semibold px-8 py-3 rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 disabled:opacity-50"
            >
              {processingIds.length > 0 ? 'Processing...' : 'Proceed to Payment'}
            </button>
          )}
        </div>

      </div>

    </div>
  );
};

export default CartPage;
