import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// Example cart data
const cartItems = [
  {
    id: 1,
    title: 'Delicious Burger',
    price: 12.99,
    quantity: 2,
    image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg',
  },
  {
    id: 2,
    title: 'Cheese Pizza',
    price: 10.99,
    quantity: 1,
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Pizza_with_pepperoni.jpg',
  },
];

const CartPage = () => {
  const [totalPrice, setTotalPrice] = useState(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
  const navigate = useNavigate();

  // Handle the Payment button click
  const handlePayment = () => {
    // Initialize Razorpay payment gateway
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
      amount: totalPrice * 100, // Amount in paise
      currency: 'INR',
      name: 'Food Cart',
      description: 'Payment for food items',
      image: 'https://your-logo-url.com/logo.png',
      handler: (response) => {
        alert('Payment successful!');
        console.log(response);
        // Logic after successful payment (e.g., redirect to order confirmation page)
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="flex items-center text-indigo-600 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Cart Header */}
      <div className="text-center space-y-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
      </div>

      {/* Cart Items List */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex-grow ml-4">
              <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
              <p className="text-gray-600">Price: ₹{item.price}</p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="mt-6 flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Total</h2>
        <p className="text-2xl font-semibold text-gray-800">₹{totalPrice}</p>
      </div>

      {/* Payment Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handlePayment}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;
