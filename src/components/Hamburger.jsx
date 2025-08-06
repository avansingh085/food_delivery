import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiUser, FiLogIn, FiLogOut, FiSettings, FiPackage, FiTruck, FiPlusCircle, FiShield } from 'react-icons/fi';

const HamburgerMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAdminPermission, setHasAdminPermission] = useState(true); // Change as needed

  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
    // In a real app, you would also handle actual authentication logic here
  };

  const menuItems = [
    { path: "/MyOrder", name: "My Order", icon: <FiPackage />, show: true },
    { path: "/DeliveryDashboard", name: "Delivery Dashboard", icon: <FiTruck />, show: true },
    { path: "/settings", name: "Settings", icon: <FiSettings />, show: true },
    { path: "/AddNewFood", name: "Add New Food", icon: <FiPlusCircle />, show: hasAdminPermission },
    { path: "/Admin", name: "Admin Page", icon: <FiShield />, show: hasAdminPermission },
  ];

  return (
    <>
      {/* Overlay with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-800 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={{
          open: { x: 0 },
          closed: { x: '-100%' },
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full bg-white shadow-lg z-50 w-64 sm:w-72"
      >
        <div className="p-6 space-y-6">
          {/* Close button */}
          <motion.button
            onClick={() => setIsMenuOpen(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-600 hover:text-gray-900 text-2xl font-semibold"
          >
            <FiX />
          </motion.button>

          {/* Auth button */}
          <motion.button
            onClick={toggleAuth}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-4 flex items-center justify-center space-x-2 text-lg font-semibold rounded-md transition-all ${
              isAuthenticated 
                ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            {isAuthenticated ? (
              <>
                <FiLogOut />
                <span>Logout</span>
              </>
            ) : (
              <>
                <FiLogIn />
                <span>Login</span>
              </>
            )}
          </motion.button>

          {/* User info if authenticated */}
          {isAuthenticated && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FiUser className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">User</p>
              </div>
            </motion.div>
          )}

          {/* Menu items */}
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              item.show && (
                <motion.li
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className="flex items-center space-x-3 py-3 px-4 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-gray-500">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </motion.li>
              )
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default HamburgerMenu;