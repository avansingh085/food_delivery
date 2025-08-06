import React from "react";
import { FaSpinner } from "react-icons/fa";

const ModernLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <FaSpinner className="text-4xl text-blue-600 dark:text-blue-400 animate-spin" />
      <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default ModernLoader;