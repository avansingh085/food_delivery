import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [hasAdminPermission, setHasAdminPermission] = useState(false); 

  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <div className="fixed   z-50">
      
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)} 
      ></div>

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 sm:w-72`}
      >
        <div className="p-6 space-y-6">
         
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-600 hover:text-gray-900 text-2xl font-semibold"
          >
            ✕
          </button>

          <ul className="space-y-6">
            
            <li>
              <button
                onClick={toggleAuth}
                className="w-full py-2 px-4 text-center text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </li>

           
           
            <li>
              <Link
                to="/MyOrder"
                className="block py-2 px-4 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
              >
                My Order
              </Link>
              
            </li>
            <li>
              <Link
                to="/DeliveryDashboard"
                className="block py-2 px-4 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
              >
               Delivery Dashboard
              </Link>
              
            </li>
           
            
            <li>
              <Link
                to="/settings"
                className="block py-2 px-4 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
              >
                Settings
              </Link>
            </li>

            <li>
              <Link
                to="/AddNewFood"
                className="block py-2 px-4 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
              >
                Add New Food
              </Link>
            </li>
              <li>
                <Link
                  to="/Admin"
                  className="block py-2 px-4 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-all"
                >
                  Admin Page
                </Link>
              </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
