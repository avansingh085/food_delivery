import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

// Example food data
const foodItem = {
  title: 'Delicious Burger',
  price: 12.99,
  description: 'A tasty burger with a juicy patty, fresh lettuce, tomatoes, and your choice of sauce.',
  image: 'https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg',
  reviews: [
    { username: 'John', rating: 4, comment: 'Great taste! Highly recommend.' },
    { username: 'Jane', rating: 5, comment: 'Absolutely delicious! Worth every penny.' },
    { username: 'Mike', rating: 3, comment: 'Good, but could use more seasoning.' }
  ],
  customizationOptions: [
    { name: 'Size', options: ['Small', 'Medium', 'Large'] },
    { name: 'Toppings', options: ['Lettuce', 'Tomato', 'Onion', 'Cheese', 'Bacon'] },
    { name: 'Sauce', options: ['Ketchup', 'Mustard', 'BBQ', 'Mayo'] }
  ]
};

const FoodDetailPage = () => {
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState('Ketchup');
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState('');
  const navigate = useNavigate();

  const handleToppingToggle = (topping) => {
    setSelectedToppings(prev =>
      prev.includes(topping) ? prev.filter(item => item !== topping) : [...prev, topping]
    );
  };

  const handleSubmitReview = () => {
    if (userRating && userComment) {
      const newReview = { username: 'You', rating: userRating, comment: userComment };
      foodItem.reviews.push(newReview);
      setUserRating(0);
      setUserComment('');
    }
  };

  const handleAddToCart = () => {
    alert(`${foodItem.title} added to cart!`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100">
    
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

     
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{foodItem.title}</h1>
        <p className="text-xl text-gray-600">${foodItem.price}</p>
      </div>

      <div className="flex justify-center my-6">
        <img src={foodItem.image} alt={foodItem.title} className="rounded-lg shadow-lg w-full max-w-md" />
      </div>

      <div className="text-center mb-6">
        <p className="text-lg text-gray-600">{foodItem.description}</p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Select Size</h2>
          <div className="flex justify-center space-x-4">
            {foodItem.customizationOptions[0].options.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full ${selectedSize === size ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">Select Toppings</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {foodItem.customizationOptions[1].options.map((topping, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={topping}
                  onChange={() => handleToppingToggle(topping)}
                  className="form-checkbox"
                />
                <span>{topping}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800">Select Sauce</h2>
          <div className="flex justify-center space-x-4">
            {foodItem.customizationOptions[2].options.map((sauce, index) => (
              <button
                key={index}
                onClick={() => setSelectedSauce(sauce)}
                className={`px-4 py-2 rounded-full ${selectedSauce === sauce ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
              >
                {sauce}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleAddToCart}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
        >
          Add to Cart
        </button>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>
        <div className="space-y-4">
          {foodItem.reviews.map((review, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-700">{review.username}</span>
                <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Your Review */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800">Submit Your Review</h3>
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-gray-700">Rating</label>
            <select
              value={userRating}
              onChange={(e) => setUserRating(parseInt(e.target.value))}
              className="w-full p-2 border rounded-lg"
            >
              <option value={0}>Select rating</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>{rating} Stars</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-700">Comment</label>
            <textarea
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Write your comment here"
            />
          </div>

          <button
            onClick={handleSubmitReview}
            className="w-full bg-blue-500 text-white py-2 rounded-lg"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;
