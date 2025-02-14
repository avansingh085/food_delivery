import React, { useState, useEffect } from "react";
import axios from "axios";

const FoodManagement = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newFood, setNewFood] = useState({ name: "", price: "", image: "", description: "", discount: 0 });
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories and foods
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const categoryResponse = await axios.get("/api/categories");
    //     setCategories(categoryResponse.data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error loading categories:", error);
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, []);

  // Handle category selection
  const handleCategoryChange = (category) => {
    // setSelectedCategory(category);
    // fetchFoodsByCategory(category);
  };

  // Fetch foods by category
  const fetchFoodsByCategory = async (category) => {
    // setLoading(true);
    // try {
    //   const foodResponse = await axios.get(`/api/foods?category=${category}`);
    //   setFoods(foodResponse.data);
    //   setLoading(false);
    // } catch (error) {
    //   console.error("Error loading foods:", error);
    //   setLoading(false);
    // }
  };

  // Add a new food item
  const handleAddFood = async () => {
    // if (!selectedCategory) {
    //   alert("Please select a category first!");
    //   return;
    // }
    // try {
    //   const response = await axios.post("/api/foods", { ...newFood, category: selectedCategory });
    //   setFoods([...foods, response.data]);
    //   setNewFood({ name: "", price: "", image: "", description: "", discount: 0 });
    // } catch (error) {
    //   console.error("Error adding food:", error);
    // }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Food Management System</h1>

      {/* Category Selection */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-4">
          <select
            className="p-3 border rounded-lg text-gray-600"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setCategories([...categories, { id: Date.now(), name: "New Category" }])}
          >
            Add New Category
          </button>
        </div>
      </div>

      {/* Add New Food Form */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Food Item</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Food Name"
            value={newFood.name}
            onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
            className="p-3 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Price"
            value={newFood.price}
            onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
            className="p-3 border rounded-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Image URL"
            value={newFood.image}
            onChange={(e) => setNewFood({ ...newFood, image: e.target.value })}
            className="p-3 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Discount (%)"
            value={newFood.discount}
            onChange={(e) => setNewFood({ ...newFood, discount: e.target.value })}
            className="p-3 border rounded-lg"
          />
        </div>
        <textarea
          placeholder="Description"
          value={newFood.description}
          onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
          className="w-full p-3 border rounded-lg mb-4"
        ></textarea>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          onClick={handleAddFood}
        >
          Add Food Item
        </button>
      </div>

      {/* Food Listing */}
      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {foods.map((food) => (
            <div key={food.id} className="bg-white shadow-md rounded-lg p-4">
              <img src={food.image} alt={food.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold">{food.name}</h3>
              <p className="text-gray-600">{food.description}</p>
              <p className="text-lg font-bold mt-2">${food.price}</p>
              <p className="text-sm text-gray-500">Discount: {food.discount}%</p>
              <button className="text-red-500 mt-4 hover:text-red-600">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodManagement;
