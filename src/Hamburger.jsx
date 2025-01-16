import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = ({isMenuOpen,setIsMenuOpen}) => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false); // User auth state
  const [hasAdminPermission, setHasAdminPermission] = useState(false); // Admin permission state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <div className="fixed z-20 min-h-screen  ">
     
      <div
        className={`absolute top-0 left-0   min-h-screen bg-gray-800 bg-opacity-75 flex justify-center items-center transition-all duration-1000 ${
          isMenuOpen ? 'w-52 opacity-100 ' : 'w-0 opacity-0'
        }`}
      >
        
        <div className="bg-white w-64 p-6 space-y-6 rounded-lg shadow-lg">
          <ul className="space-y-6">
            {/* Conditionally Rendered Login/Logout */}
            <li>
              <button
                onClick={toggleAuth}
                className="w-full py-2 px-4 text-center text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </li>

            {/* Food Delivery Options */}
            <li>
              <Link
                to="/order-food"
                className="w-full py-2 px-4 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
              >
                Order Food
              </Link>
            </li>
            <li>
              <Link
                to="/track-order"
                className="w-full py-2 px-4 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
              >
                Track Order
              </Link>
            </li>

            {/* About Us Option */}
            <li>
              <Link
                to="/about-us"
                className="w-full py-2 px-4 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
              >
                About Us
              </Link>
            </li>

            {/* Contact Option */}
            <li>
              <Link
                to="/contact"
                className="w-full py-2 px-4 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
              >
                Contact Us
              </Link>
            </li>

            {/* Settings Option */}
            <li>
              <Link
                to="/settings"
                className="w-full py-2 px-4 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
              >
                Settings
              </Link>
            </li>

            {/* Admin Option (Visible only if user has permission) */}
            {hasAdminPermission && (
              <li>
                <Link
                  to="/admin"
                  className="w-full py-2 px-4 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                >
                  Admin Page
                </Link>
              </li>
            )}
          </ul>
        </div>
        </div>
    </div>
  );
};

export default HamburgerMenu;
