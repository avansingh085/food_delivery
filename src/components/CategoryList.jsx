import React from 'react';

const CategoryList = ({ categories }) => {
  return (
    <div className="mx-2 min-h-screen">
      {categories.map((category) => (
        <section
          key={category.name}
          className="mt-6"
          role="region"
          aria-label={`Category: ${category.name}`}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4 px-4">
            {category.name}
          </h2>
          <div className="flex w-full overflow-x-scroll gap-4 scroll-smooth snap-x snap-mandatory hide-scrollbar">

            
            {category.items.map((item, id) => (
              <div
                key={`${id}-${item._id}`}
                className="bg-white h-80 w-64 sm:w-56 md:w-72 flex-shrink-0 rounded-lg overflow-hidden mt-4 shadow-2xl snap-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CategoryList;