import React, { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';

const foodItems = [
  'Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple', 'Strawberry',
  'Blueberry', 'Peach', 'Watermelon', 'Coconut', 'Lemon', 'Papaya', 'Cherries',
  'Plum', 'Pear', 'Kiwi', 'Raspberry', 'Blackberry', 'Pomegranate', 'Melon',
  'Cucumber', 'Tomato', 'Carrot', 'Potato', 'Onion', 'Garlic', 'Spinach',
  'Broccoli', 'Lettuce', 'Zucchini', 'Cauliflower', 'Eggplant', 'Asparagus'
];

const SearchBar = ({ items }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  const fuse = new Fuse(foodItems, {
    threshold: 0.3,
    includeScore: true
  });

  useEffect(() => {
    if (query.length > 0) {
      const results = fuse.search(query).slice(0, 5);
      setSuggestions(results.map(r => r.item));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <div className="w-full max-w-lg mx-auto relative">
      {/* Search Input */}
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-10 px-4 text-base border border-gray-300 rounded-full shadow-sm focus:outline-none focus:border-gray-400 transition-all"
        placeholder="Search..."
        autoComplete="off"
      />

      {/* Recommendation Slider */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
          <div className="flex overflow-x-auto p-2 space-x-2 hide-scroll-bar">
            {suggestions.map((item, index) => (
              <button
                key={index}
                className="flex-shrink-0 px-3 py-1 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors text-sm"
                onClick={() => setQuery(item)}
              >
                {highlightMatch(item, query)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const highlightMatch = (text, query) => {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="text-black bg-gray-200 px-1 rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const styles = `
  .hide-scroll-bar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scroll-bar::-webkit-scrollbar {
    display: none;
  }
`;

export default function App() {
  return (
    <>
      <style>{styles}</style>
      <div className=" flex items-center justify-center p-4 bg-white">
        <SearchBar items={foodItems} />
      </div>
    </>
  );
}