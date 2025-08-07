import React from 'react';

const FoodItemSkeleton = () => {
  return (
    <div className="bg-white h-72 w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="bg-gray-200 h-40 w-full"></div>
      <div className="p-3">
        <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>
        <div className="bg-gray-200 h-3 w-full rounded mb-1"></div>
        <div className="bg-gray-200 h-3 w-2/3 rounded mb-4"></div>
        <div className="flex justify-between items-center">
          <div className="bg-gray-200 h-6 w-16 rounded"></div>
          <div className="bg-gray-200 h-8 w-20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default FoodItemSkeleton;