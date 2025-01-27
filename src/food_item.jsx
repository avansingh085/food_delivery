import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axiosInstance from "./axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./globSlice";
import axios from "axios";
let url="https://fooddeliverybackend-7a1h.onrender.com";
const categories = [
  {
    name: "Pizzas",
    items: Array.from({ length: 20 }, (_, i) => ({
      id: `pizza-${i + 1}`,
      name: `Pizza ${i + 1}`,
      description: `Delicious Pizza with a variety of toppings.`,
      price: (200 + i * 10).toFixed(2),
      image: `https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg`,
    })),
  },
  {
    name: "Burgers",
    items: Array.from({ length: 20 }, (_, i) => ({
      id: `burger-${i + 1}`,
      name: `Burger ${i + 1}`,
      description: `Juicy and tasty burger loaded with flavors.`,
      price: (100 + i * 5).toFixed(2),
      image: `https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg`,
    })),
  },
  {
    name: "Desserts",
    items: Array.from({ length: 20 }, (_, i) => ({
      id: `dessert-${i + 1}`,
      name: `Dessert ${i + 1}`,
      description: `Sweet and irresistible dessert.`,
      price: (80 + i * 5).toFixed(2),
      image: `https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg`,
    })),
  },
];

const FoodMenu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { User } = useSelector((state) => state.Data);
  const dispatch = useDispatch();
  const [customization, setCustomization] = useState({
    sugar: 0,
    size: "Medium",
    crust: "Classic",
    extraCheese: false,
  });

  const addToCart = async () => {
    if (selectedItem) {
      try {
        let res = await axios.post(`${url}/addCart`, { mobile: User?.mobile, item: { ...selectedItem, customization } });
        dispatch(setUser(res.data.user));
      } catch (err) {
        console.log(err, "Error while adding to cart");
      }
      setSelectedItem(null);
      setCustomization({
        sugar: 0,
        size: "Medium",
        crust: "Classic",
        extraCheese: false,
      });
    }
  };

  const handleCustomizationChange = (key, value) => {
    setCustomization({ ...customization, [key]: value });
  };

  return (
    <div className="bg-black text-white min-h-screen w-screen p-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Explore Our Menu</h1>
      {categories.map((category) => (
        <div key={category.name} className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">{category.name}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="bg-white text-black shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 flex flex-col"
              >
                <Link to="/food" key={Math.random()}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 sm:h-40 object-cover"
                  />
                </Link>
                <div className="p-2 sm:p-4 flex-grow">
                  <h3 className="text-xs sm:text-sm font-semibold text-black truncate">{item.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-700 truncate">{item.description}</p>
                  <div className="text-sm sm:text-base font-bold text-black mt-2">₹{item.price}</div>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                  >
                    Customize & Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white text-black p-8 rounded-lg shadow-xl w-80 sm:w-96">
            <h2 className="text-2xl font-semibold mb-6">Customize Your {selectedItem.name}</h2>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Sugar (ml):</label>
              <input
                type="number"
                min="0"
                value={customization.sugar}
                onChange={(e) => handleCustomizationChange("sugar", e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Size:</label>
              <select
                value={customization.size}
                onChange={(e) => handleCustomizationChange("size", e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Crust:</label>
              <select
                value={customization.crust}
                onChange={(e) => handleCustomizationChange("crust", e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="Classic">Classic</option>
                <option value="Thin Crust">Thin Crust</option>
                <option value="Cheese Burst">Cheese Burst</option>
              </select>
            </div>
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                checked={customization.extraCheese}
                onChange={(e) => handleCustomizationChange("extraCheese", e.target.checked)}
                className="mr-3"
              />
              <label className="text-gray-700 font-semibold">Add Extra Cheese</label>
            </div>
            <div className="flex justify-end space-x-6">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={addToCart}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodMenu;
