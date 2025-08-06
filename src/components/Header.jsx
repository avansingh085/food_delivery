import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setDeliveryLocation } from "../redux/globSlice";
import { setShowLoginPopup } from "../redux/userSlice";
import { FaMapMarkerAlt, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";

 import { motion } from "framer-motion";
import { FiLogIn } from "react-icons/fi";
const Header = () => {
  const [locationLoading, setLocationLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state?.user?.isLoggedIn);
  const cartItems = useSelector((state) => state?.cart?.items);
  const dispatch = useDispatch();

  // Fetch user location
  const fetchLocation = async () => {
    setLocationLoading(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      dispatch(setDeliveryLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }));
    } catch (error) {
      console.error("Location error:", error);
    } finally {
      setLocationLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-red-600">
              <span className="text-orange-500">Beks</span> Pizza & Burger
            </h1>
            
            {/* Location Selector */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg">
              <FaMapMarkerAlt className="text-red-500" />
              {locationLoading ? (
                <span className="text-gray-500 text-sm">Detecting...</span>
              ) : (
                <span className="text-gray-700 text-sm">Delivery to <b>Current Location</b></span>
              )}
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for restaurants or dishes..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <button className="md:hidden text-gray-600">
              <FaSearch size={18} />
            </button>
            
            {/* Cart with badge */}
          
            
            {/* Auth Button */}
      
{isLoggedIn ? (
  <motion.div 
    className="relative"
    whileHover="hover"
    initial="rest"
    animate="rest"
  >
    <motion.button 
      className="flex items-center space-x-1"
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.05 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.1 }
        }}
      >
        <FaUser size={14} className="text-gray-600" />
      </motion.div>
    </motion.button>
    
    {/* Tooltip on hover */}
    <motion.div
      className="absolute top-full right-0 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap"
      variants={{
        rest: { opacity: 0, y: -5 },
        hover: { opacity: 1, y: 0 }
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      My Account
    </motion.div>
  </motion.div>
) : (
  <motion.button 
    onClick={() => dispatch(setShowLoginPopup(true))}
    className="flex items-center space-x-1 text-orange-600 hover:text-orange-700"
    whileHover={{ 
      scale: 1.05,
      backgroundColor: "rgba(234, 88, 12, 0.1)",
      transition: { 
        duration: 0.2,
        backgroundColor: { duration: 0.1 }
      }
    }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0.9 }}
    animate={{ opacity: 1 }}
  >
    <motion.span
      animate={{ 
        x: [0, 2, 0],
        transition: { repeat: Infinity, duration: 2 }
      }}
    >
      <FiLogIn size={18} />
    </motion.span>
    <motion.span className="hidden md:inline">
      Login
    </motion.span>
  </motion.button>
)}
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search food or restaurants..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;