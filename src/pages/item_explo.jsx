import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Review from '../components/Review';
import axiosInstance from '../utils/axiosInstance';
import {
  FaArrowLeft,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
  FaSpinner,
  FaTag
} from 'react-icons/fa';

const FoodDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Data);

  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    console.log("Fetching food item for ID:", id);

    const fetchFoodItem = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/food/${id}`);
        console.log("Fetched Data:", data);

        if (data.success && data.item) {
          setFoodItem(data.item);
        } else {
          setError('Food item not found');
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError('Failed to load food item');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItem();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const { data } = await axiosInstance.post(`/addCart`, {
        id,
        mobile: user.mobile
      });

      if (data.success) {
        dispatch({ type: 'ADD_TO_CART', payload: { ...foodItem, quantity: 1 } });
        alert('Item added to cart successfully!');
      } else {
        alert('Failed to add item to cart');
      }
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Failed to add item to cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-orange-500" />
      </div>
    );
  }

  if (error || !foodItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error || 'Food item not found'}</p>
      </div>
    );
  }

  const averageRating = foodItem.reviews?.length
    ? (foodItem.reviews.reduce((acc, rev) => acc + rev.rating, 0) / foodItem.reviews.length).toFixed(1)
    : 'No Ratings';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition">
            <FaArrowLeft className="text-2xl text-gray-600" />
          </button>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaRegHeart className="text-2xl text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaShoppingCart className="text-2xl text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Food Details */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Food Image */}
          <div className="relative aspect-square bg-gray-200 rounded-3xl overflow-hidden shadow-lg">
            <img 
              src={foodItem.imageUrls?.[0] || '/placeholder-food.jpg'} 
              alt={foodItem.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
              onClick={() => setSelectedImage(foodItem.imageUrls?.[0] || '/placeholder-food.jpg')}
            />
          </div>

          {/* Food Details */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{foodItem.name}</h1>
            <p className="text-lg text-gray-700">{foodItem.description}</p>

            {/* Price & Category */}
            <p className="text-2xl font-semibold text-orange-500">₹{foodItem.price}</p>
            <p className="text-gray-600">Category: <span className="font-semibold">{foodItem.category}</span></p>
            <p className="text-gray-600">Ingredients: <span className="font-semibold">{foodItem.ingredients?.join(', ') || 'N/A'}</span></p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">{averageRating}</span>
              <div className="flex text-orange-400">
  {averageRating > 0 ? (
    Array.from({ length: Math.min(5, Math.round(averageRating)) }, (_, i) => <FaStar key={i} />)
  ) : (
    <span className="text-gray-500 text-sm">No Ratings</span>
  )}
</div>
            </div>

            {/* Offers */}
            <div className="bg-yellow-100 p-3 rounded-lg flex items-center gap-3 shadow-md">
              <FaTag className="text-yellow-500 text-xl" />
              <p className="text-yellow-700 font-semibold">
                Get 10% off on your first order! Use code: <span className="text-yellow-900">FOOD10</span>
              </p>
            </div>

            {/* Add to Cart */}
            <button onClick={handleAddToCart} className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-orange-600 transition">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <Review reviews={foodItem.reviews} />
      </main>

      {/* Image Popup */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
            <button className="absolute top-2 right-2 text-gray-600 text-2xl" onClick={() => setSelectedImage(null)}>
              &times;
            </button>
            <img src={selectedImage} alt="Food" className="w-full rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetailPage;
