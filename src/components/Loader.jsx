import React from "react";

const FoodMenuSkeleton = () => {
  // Create skeleton categories similar to your actual data structure
  const skeletonCategories = [
    { name: "Loading...", items: Array(5).fill({}) },
    { name: "Loading...", items: Array(5).fill({}) },
    { name: "Loading...", items: Array(5).fill({}) },
  ];

  return (
    <div className="bg-slate-200 w-screen overflow-hidden min-h-screen p-2 grid items-start justify-center">
      {/* Pizza Menu Skeleton */}
      <div className="relative w-screen mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 w-1/3 bg-gray-300 rounded mb-8 mx-auto"></div>
        <div className="flex space-x-8 py-4 px-2">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="flex-shrink-0 w-64">
              <div className="w-48 h-48 bg-gray-300 rounded-full mx-auto"></div>
              <div className="h-4 w-24 bg-gray-300 rounded mt-4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Offers Section Skeleton */}
      <div className="relative w-full mt-8 mb-12 animate-pulse">
        <div className="flex items-center justify-between mb-6 px-6">
          <div className="h-8 w-1/4 bg-gray-300 rounded"></div>
          <div className="h-4 w-1/6 bg-gray-300 rounded"></div>
        </div>
        <div className="flex gap-6 pb-8 pl-6">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="h-44 w-80 bg-gray-300 rounded-2xl flex-shrink-0"></div>
          ))}
        </div>
      </div>

      {/* Food Items Skeleton */}
      <div className="mx-2 w-screen min-h-screen bg-gray-200">
        {skeletonCategories.map((category, catIndex) => (
          <section key={catIndex} className="mt-2 bg-white p-4">
            <div className="h-6 w-1/4 bg-gray-300 rounded mb-4"></div>
            <div className="flex w-full overflow-x-scroll gap-4">
              {category.items.map((_, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="bg-white h-64 w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-xl"
                >
                  <div className="relative h-full w-full bg-gray-300 animate-pulse">
                    <div className="absolute bottom-0 left-0 w-full p-4">
                      <div className="h-6 w-1/2 bg-gray-400 rounded mb-2"></div>
                      <div className="h-4 w-full bg-gray-400 rounded mb-4"></div>
                      <div className="grid grid-cols-2 items-center mt-4 pt-2">
                        <div className="h-6 w-1/3 bg-gray-400 rounded"></div>
                        <div className="h-8 w-24 bg-gray-400 rounded justify-self-end"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default FoodMenuSkeleton;