import React, { useState } from "react";
import {Link} from 'react-router-dom'
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
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [customization, setCustomization] = useState({
    sugar: 0,
    size: "Medium",
    crust: "Classic",
    extraCheese: false,
  });

  const addToCart = () => {
    if (selectedItem) {
      setCart([...cart, { ...selectedItem, customization }]);
      alert(
        `${selectedItem.name} added to cart with customization: ${JSON.stringify(customization)}`
      );
      setSelectedItem(null); // Close modal
      setCustomization({
        sugar: 0,
        size: "Medium",
        crust: "Classic",
        extraCheese: false,
      }); // Reset customization
    }
  };

  const handleCustomizationChange = (key, value) => {
    setCustomization({ ...customization, [key]: value });
  };

  return (
    <div className="bg-gray-50 min-h-screen w-screen p-2">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-gray-800">
        Explore Our Menu
      </h1>
      {categories.map((category) => (
        <div key={category.name} className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2 text-gray-700">
            {category.name}
          </h2>
          <div
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2"
            style={{ gridAutoRows: "1fr" }}
          >
            {category.items.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition duration-300 flex flex-col"
              >
             <Link to="/food" key={Math.random()} >  <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-24 sm:h-32 object-cover"
                />
                </Link>
                <div className="p-2 text-sm flex-grow">
                  <h3 className="font-semibold text-gray-800 truncate">{item.name}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm truncate">{item.description}</p>
                  <div className="text-lg font-bold text-gray-800">₹{item.price}</div>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-xs sm:text-sm"
                  >
                    Customize & Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Customization Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Customize Your {selectedItem.name}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Sugar (ml):</label>
              <input
                type="number"
                min="0"
                value={customization.sugar}
                onChange={(e) => handleCustomizationChange("sugar", e.target.value)}
                className="w-full border rounded p-2 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Size:</label>
              <select
                value={customization.size}
                onChange={(e) => handleCustomizationChange("size", e.target.value)}
                className="w-full border rounded p-2 text-gray-700"
              >
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Crust:</label>
              <select
                value={customization.crust}
                onChange={(e) => handleCustomizationChange("crust", e.target.value)}
                className="w-full border rounded p-2 text-gray-700"
              >
                <option value="Classic">Classic</option>
                <option value="Thin Crust">Thin Crust</option>
                <option value="Cheese Burst">Cheese Burst</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Extra Cheese:</label>
              <input
                type="checkbox"
                checked={customization.extraCheese}
                onChange={(e) => handleCustomizationChange("extraCheese", e.target.checked)}
                className="mr-2"
              />
              Add Extra Cheese
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={addToCart}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
