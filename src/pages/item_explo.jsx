// FoodDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import axiosInstance from '../utils/axiosInstance';
import {
  FaArrowLeft,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
  FaSpinner
} from 'react-icons/fa';

const url = "http://localhost:5000";

const FoodDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.Data);
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log(id,"ppp");
  const [selectedOptions, setSelectedOptions] = useState({
    Size: 'Medium',
    Toppings: [],
    Sauce: 'Ketchup'
  });
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const { data } = await axiosInstance.get(`${url}/food/${id}`);
        if (data.success && data.item) {
          setFoodItem(data.item);
        } else {
          setError('Food item not found');
        }
      } catch (err) {
        setError('Failed to load food item');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodItem();
  }, [id]);

  const handleOptionSelect = (optionType, value) => {
    setSelectedOptions(prev => {
      if (optionType === 'Toppings') {
        const toppings = prev.Toppings.includes(value)
          ? prev.Toppings.filter(item => item !== value)
          : [...prev.Toppings, value];
        return { ...prev, Toppings: toppings };
      }
      return { ...prev, [optionType]: value };
    });
  };

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const { data } = await axiosInstance.post(`${url}/addCart`, {
        id,
        options: selectedOptions,
        mobile: user.mobile
      });

      if (data.success) {
        dispatch({ 
          type: 'ADD_TO_CART', 
          payload: {
            ...foodItem,
            selectedOptions,
            quantity: 1
          }
        });
        alert('Item added to cart successfully!');
      }
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Failed to add item to cart');
    }
  };

  const handleSubmitReview = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const { data } = await axiosInstance.post(`${url}/api/reviews`, {
        foodId: id,
        rating: userRating,
        comment: userComment,
        userId: user.id
      });

      if (data.success) {
        setFoodItem(prev => ({
          ...prev,
          reviews: [...prev.reviews, { 
            username: user.name, 
            rating: userRating, 
            comment: userComment 
          }]
        }));
        setUserRating(0);
        setUserComment('');
        alert('Review submitted successfully!');
      }
    } catch (err) {
      console.error('Review submission error:', err);
      alert('Failed to submit review');
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
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

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Image Section */}
          <div className="relative aspect-square bg-gray-200 rounded-3xl overflow-hidden shadow-lg">
            <img 
              src={foodItem.imageUrls?.[0] || '/placeholder-food.jpg'} 
              alt={foodItem.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
            <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm">
              <span className="font-bold text-lg text-gray-700">
                ${foodItem.price}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900">{foodItem.name}</h1>
            <p className="text-lg text-gray-600">{foodItem.description}</p>

           
            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-orange-600 transition-colors"
            >
              <FaShoppingCart />
              Add to Cart
            </motion.button>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Customer Reviews ({foodItem.reviews?.length || 0})
          </h2>
          
          {/* Review Form */}
          {user ? (
            <div className="mb-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {[1,2,3,4,5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setUserRating(star)}
                      className={`text-2xl ${star <= userRating ? 'text-orange-400' : 'text-gray-300'}`}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
                <textarea
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
                  rows="3"
                />
                <button
                  onClick={handleSubmitReview}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  disabled={!userRating || !userComment}
                >
                  Submit Review
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-8 p-6 bg-orange-50 rounded-xl text-center">
              <p className="text-orange-600">
                Please <button onClick={() => navigate('/login')} className="font-semibold underline">login</button> to submit a review
              </p>
            </div>
          )}

         
          <div className="space-y-6">
            {foodItem.reviews?.length > 0 ? (
              foodItem.reviews.map((review, index) => (
                <div key={index} className="pb-6 border-b last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                     
                    </div>
                    <div>
                      <h4 className="font-semibold">XXXXXXXX{review.mobile.slice(9,13) || 'Anonymous'}</h4>
                      <div className="flex items-center gap-1 text-orange-400">
                        {[...Array(review.rating)].map((_, i) => (
                          <FaStar key={i} className="text-sm" />
                        ))}
                      </div>
                     
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                  <div className="flex h-20 w-fit items-center justify-center">
                      {review.photos && review.photos.map((photo, index) => (
           
            <img key={index} className="h-16 w-16 m-2" src={`http://localhost:5000/${photo}`} alt={`Review ${index}`} />
          ))}
          </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-6">
                No reviews yet. Be the first to review!
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default FoodDetailPage;