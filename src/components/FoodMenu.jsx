import React, { useState, useEffect, useCallback  } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser,setCart ,setMenu} from "../redux/globSlice";
import axiosInstance from "../utils/axiosInstance";
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
  const {deliveryLocation} = useSelector((state) => state.Data);
  const dispatch = useDispatch();

  const [customization, setCustomization] = useState({
    sugar: 0,
    size: "Medium",
    crust: "Classic",
    extraCheese: false,
  });
  const fetchCartData = async () => {
    try {
      const res = await axiosInstance.get(`/getCart`);
      //console.log(res,"PPPPPPPPPPPPPPPPPPPP")
      if (res.data.success) {
        console.log(res)
        dispatch(setCart(res.data.cart));
      }
    } catch (err) {
     // console.log("error fect cart dat",err)
      console.error("Error fetching cart data:", err);
    }
  };
  useEffect(() => {
    const fetchMenuData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/getMenu`, {
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
   
      const res = await axiosInstance.post(`/addCart`, {
        mobile: User?.mobile,
        item: { ...selectedItem,customizationOptions:customization,deliveryLocation }
      });
   
     fetchCartData();
      
    } catch (err) {
   
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

 
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-sm ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white text-black min-h-screen w-screen p-4">
  <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Explore Our Menu</h1>

  {categories.map((category) => (
    <div key={category.name} className="mb-10">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-4">
        {category.name}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {category.items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col relative"
          >
            {item.offer && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                {item.offer}% Off
              </div>
            )}

            <Link to={`/food/${item._id}`} className="flex-grow">
              <div className="relative h-48 w-full overflow-hidden">
                {item.imageUrls?.[0] ? (
                  <img
                    src={item.imageUrls[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>

              <div className="p-4 flex-grow">
                <h3 className="text-lg font-bold truncate mb-2">
                  {item.name || "Unnamed Item"}
                </h3>
                
                {item.rating.count > 0 && (
                  <div className="flex items-center mb-2">
                    {renderStars(item.rating.count)}
                    <span className="ml-2 text-sm text-gray-600">
                      ({item.ratingCount || 0})
                    </span>
                  </div>
                )}

                {item.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-800">
                    ₹{item.price || 0}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{item.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <button
              onClick={() => setSelectedItem(item)}
              className="m-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Customize & Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>

  );
};

export default FoodMenu;