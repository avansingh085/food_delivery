import React, { useState } from 'react';
import Fuse from 'fuse.js';

// Example data for food items
const foodItems = [
  'Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple', 'Strawberry',
  'Blueberry', 'Peach', 'Watermelon', 'Coconut', 'Lemon', 'Papaya', 'Cherries',
  'Plum', 'Pear', 'Kiwi', 'Raspberry', 'Blackberry', 'Pomegranate', 'Melon',
  'Cucumber', 'Tomato', 'Carrot', 'Potato', 'Onion', 'Garlic', 'Spinach',
  'Broccoli', 'Lettuce', 'Zucchini', 'Cauliflower', 'Eggplant', 'Asparagus'
];

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(foodItems);

  // Initialize Fuse.js with food items and options for fuzzy search
  const fuse = new Fuse(foodItems, {
    includeScore: true,
    threshold: 0.8, // Allow more tolerance for typos (can be adjusted)
    keys: ['name'],  // If you have more fields in your data, you can add them here.
  });

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (!searchQuery) {
      setFilteredItems([]); // Hide suggestions if no query
      return;
    }

    // Perform the fuzzy search with Fuse.js
    const results = fuse.search(searchQuery).slice(0, 5); // Limit to top 5 results

    setFilteredItems(results.map(result => result.item)); // Extract food item names from results
  };

  return (
    <div className="w-screen h-auto bg-gray-100">
      {/* Fixed Header */}
      

      {/* Search Input */}
      <div className="pt-2 px-4"> {/* Added padding to ensure content stays below the fixed header */}
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search food items..."
          />

          {/* Suggestions List or No Results Message */}
          {query && filteredItems.length > 0 && (
            <ul className="absolute top-16 w-full bg-white shadow-lg border mt-2 rounded-lg">
              {filteredItems.map((item, index) => (
                <li key={index} className="p-2 border-b border-gray-200 hover:bg-gray-100">
                  {/* Highlight matching part of the search */}
                  {highlightMatchingText(item, query)}
                </li>
              ))}
            </ul>
          )}

          {query && filteredItems.length === 0 && (
            <div className="absolute top-16 w-full bg-white shadow-lg border mt-2 rounded-lg text-center text-gray-500 p-2">
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Function to highlight the matching part of the text
const highlightMatchingText = (text, query) => {
  const regex = new RegExp(`(${query})`, 'gi'); // Case insensitive regex
  return text.split(regex).map((part, index) =>
    regex.test(part) ? <span key={index} className="text-indigo-600 font-semibold">{part}</span> : part
  );
};

export default SearchComponent;