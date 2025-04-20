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
  const user = useSelector((state) => state.Data);
  console.log(user)
  const { deliveryLocation } = useSelector((state) => state.Data);

  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const [customization, setCustomization] = useState({
    size: "Medium",
    crust: "Classic",
    extraCheese: false,
    sugar: 0,
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const { data } = await axiosInstance.get(`/food/${id}`);
        if (data.success && data.item) {
          setFoodItem(data.item);
          setTotalPrice(data.item.price);
        } else {
          setError('Food item not found');
        }
      } catch (err) {
        setError('Failed to load food item');
      } finally {
        setLoading(false);
      }
    };
    fetchFoodItem();
  }, [id]);

  const calculatePrice = (basePrice) => {
    let price = basePrice;
    const sizePrices = { Small: -50, Medium: 0, Large: 100 };
    const crustPrices = { Classic: 0, 'Thin Crust': 30, 'Stuffed Crust': 80 };
    
    price += sizePrices[customization.size];
    price += crustPrices[customization.crust];
    price += customization.extraCheese ? 50 : 0;
    
    return price;
  };

  useEffect(() => {
    if (foodItem) {
      setTotalPrice(calculatePrice(foodItem.price));
    }
  }, [customization, foodItem]);

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsAddingToCart(true);
    try {
      const { data } = await axiosInstance.post(`/addCart`, {
        mobile: user.mobile,
        item:{
        id: foodItem._id,
        quantity: 1,
        customization: {
          ...customization,
          calculatedPrice: totalPrice
        },
      },
        deliveryLocation
      });

      if (data.success) {
       
        const cartRes = await axiosInstance.get(`/getCart`);
        if (cartRes.data.success) {
          dispatch({ 
            type: 'addCart', 
            payload: cartRes.data.cart
          });
        }
        alert('Item added to cart successfully!');
      } else {
        throw new Error(data.message || 'Failed to add to cart');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      setError(errorMsg);
      alert(errorMsg);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <FaSpinner className="animate-spin text-5xl text-orange-500" />
      </div>
    );
  }

  if (error || !foodItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-2xl font-semibold text-red-500">{error || 'Food item not found'}</p>
      </div>
    );
  }

  const averageRating = foodItem.reviews?.length
    ? (foodItem.reviews.reduce((acc, rev) => acc + rev.rating, 0) / foodItem.reviews.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FaArrowLeft className="text-2xl text-gray-700" />
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FaRegHeart className="text-2xl text-gray-700" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FaShoppingCart className="text-2xl text-gray-700" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
        >
      
          <div className="relative aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-xl">
            <img 
              src={foodItem.imageUrls?.[0] || '/placeholder-food.jpg'} 
              alt={foodItem.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-zoom-in"
              onClick={() => setSelectedImage(foodItem.imageUrls?.[0])}
            />
            {foodItem.offer && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {foodItem.offer}% OFF
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">{foodItem.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{foodItem.description}</p>
            </div>

            <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900">Customize Your Order</h2>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Select Size</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { size: 'Small', price: -50 },
                    { size: 'Medium', price: 0 },
                    { size: 'Large', price: 100 }
                  ].map((option) => (
                    <button
                      key={option.size}
                      onClick={() => setCustomization(prev => ({ ...prev, size: option.size }))}
                      className={`p-3 rounded-lg text-center transition-all ${
                        customization.size === option.size
                          ? 'bg-orange-500 text-white ring-2 ring-orange-500'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-medium">{option.size}</div>
                      <div className="text-sm">
                        {option.price !== 0 && `(${option.price > 0 ? '+' : ''}₹${Math.abs(option.price)})`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {foodItem.category === 'Pizza' && (
                <>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Crust Type</h3>
                    <select
                      value={customization.crust}
                      onChange={(e) => setCustomization(prev => ({ ...prev, crust: e.target.value }))}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500"
                    >
                      <option value="Classic">Classic Crust (₹0)</option>
                      <option value="Thin Crust">Thin Crust (+₹30)</option>
                      <option value="Stuffed Crust">Stuffed Crust (+₹80)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={customization.extraCheese}
                      onChange={(e) => setCustomization(prev => ({ ...prev, extraCheese: e.target.checked }))}
                      className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
                    />
                    <span className="text-lg">Extra Cheese (+₹50)</span>
                  </div>
                </>
              )}
              {foodItem.category === 'Beverages' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Sugar Level</h3>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={customization.sugar}
                      onChange={(e) => setCustomization(prev => ({ ...prev, sugar: parseInt(e.target.value) }))}
                      className="w-full range range-warning"
                    />
                    <div className="flex justify-between text-gray-600">
                      <span>0% (Sugar Free)</span>
                      <span className="font-medium">{customization.sugar}%</span>
                      <span>100% (Extra Sweet)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl">
                <span className="text-2xl font-bold">Total Price:</span>
                <span className="text-3xl font-bold text-orange-500">₹{totalPrice}</span>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] disabled:opacity-75"
              >
                {isAddingToCart ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaShoppingCart className="text-xl" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* <Review reviews={foodItem.reviews} /> */}
      </main>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button 
              className="absolute -top-8 right-0 text-white text-4xl hover:text-orange-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged food item" 
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetailPage;