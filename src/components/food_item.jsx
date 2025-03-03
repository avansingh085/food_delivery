import React, { useState, useEffect, useCallback  } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser,setCart ,setMenu} from "../redux/globSlice";
import axiosInstance from "../utils/axiosInstance";
const API_URL = "https://fooddeliverybackend-7a1h.onrender.com";
const url="http://localhost:5000";
const ITEMS_PER_PAGE = 20;

const FoodMenu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { User } = useSelector((state) => state.Data);
  const dispatch = useDispatch();

  const [customization, setCustomization] = useState({
    sugar: 0,
    size: "Medium",
    crust: "Classic",
    extraCheese: false,
  });
  const fetchCartData = async () => {
    try {
      const res = await axiosInstance.get(`${url}/getCart`);
      console.log(res,"PPPPPPPPPPPPPPPPPPPP")
      if (res.data.success) {
        console.log(res)
        dispatch(setCart(res.data.cart));
      }
    } catch (err) {
      console.log("error fect cart dat",err)
      console.error("Error fetching cart data:", err);
    }
  };
  useEffect(() => {
    const fetchMenuData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/getMenu`, {
          params: { page: currentPage, limit: ITEMS_PER_PAGE }
        });
        
        setMenuData(prev => [...prev, ...response.data.items]);
        dispatch(setMenu([...menuData,...response.data.items]));
        setTotalPages(response.data.totalPages);
        setError(null);
      } catch (err) {
        setError("Failed to load menu. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuData();
  }, [currentPage]);

  const categories = menuData.reduce((acc, item) => {
    const category = acc.find(cat => cat.name === item.category);
    if (category) {
      category.items.push(item);
    } else {
      acc.push({ name: item.category, items: [item] });
    }
    return acc;
  }, []);

  const addToCart = async () => {
    if (!selectedItem || isAddingToCart) return;
    
    setIsAddingToCart(true);
    try {
      console.log(selectedItem)
      const res = await axios.post(`${url}/addCart`, {
        mobile: User?.mobile,
        item: { ...selectedItem,customizationOptions:customization }
      });
      console.log(selectedItem,"ppp")
     fetchCartData();
      
    } catch (err) {
      console.log(err)
      setError("Failed to add item to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
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
    setCustomization(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white text-black min-h-screen w-screen p-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Explore Our Menu</h1>

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      {categories.map((category) => (
        <div key={category.name} className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
            {category.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {category.items.map((item)=>{
              
            return(
              <div
                key={item._id}
                className="bg-white text-black rounded-lg overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300 flex flex-col"
              >
                <Link to={`/food/${item._id}`} className="flex-grow">
                  <img
                    src={item.imageUrls[0]}
                    alt={item.name}
                    className="w-full h-32 sm:h-40 object-cover"
                    loading="lazy"
                  />
                  <div className="p-2 sm:p-4 flex-grow">
                    <h3 className="text-sm sm:text-base font-semibold truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">
                      {item.description}
                    </p>
                    <div className="text-base sm:text-lg font-bold mt-2">
                      ₹{item.price}
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => setSelectedItem(item)}
                  className="m-2 sm:m-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Customize & Add to Cart
                </button>
              </div>
            )})}
          </div>
        </div>
      ))}

      {currentPage < totalPages && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={isLoading}
            className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-black p-6 rounded-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Customize Your {selectedItem.name}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Sugar (ml)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={customization.sugar}
                  onChange={(e) => handleCustomizationChange("sugar", e.target.value)}
                  className="w-full accent-black"
                />
                <div className="text-right text-sm">{customization.sugar}ml</div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <select
                  value={customization.size}
                  onChange={(e) => handleCustomizationChange("size", e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-black"
                >
                  {["Small", "Medium", "Large"].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Crust</label>
                <select
                  value={customization.crust}
                  onChange={(e) => handleCustomizationChange("crust", e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-lg p-2 focus:ring-2 focus:ring-black"
                >
                  {["Classic", "Thin Crust", "Cheese Burst"].map(crust => (
                    <option key={crust} value={crust}>{crust}</option>
                  ))}
                </select>
              </div>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={customization.extraCheese}
                  onChange={(e) => handleCustomizationChange("extraCheese", e.target.checked)}
                  className="w-5 h-5 accent-black"
                />
                <span className="text-sm">Extra Cheese (+₹50)</span>
              </label>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={addToCart}
                disabled={isAddingToCart}
                className="px-5 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
              >
                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodMenu;