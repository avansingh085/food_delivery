import React from 'react';

const CustomizationModal = ({ 
  selectedItem, 
  setSelectedItem, 
  customization, 
  setCustomization, 
  handleAddToCart, 
  isAddingToCart 
}) => {
  if (!selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-sm max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h3 className="text-lg font-medium">Customize {selectedItem.name}</h3>
          <button
            onClick={() => setSelectedItem(null)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          {selectedItem.category === 'Beverages' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Sugar Level</label>
              <input
                type="range"
                min="0"
                max="100"
                value={customization.sugar}
                onChange={(e) => setCustomization(prev => ({
                  ...prev,
                  sugar: parseInt(e.target.value)
                }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
              <div className="text-center text-sm font-medium">
                Selected: {customization.sugar}% Sugar
              </div>
            </div>
          )}

          {selectedItem.category === 'Pizza' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Crust Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Classic', 'Thin Crust', 'Stuffed Crust'].map(option => (
                    <button
                      key={option}
                      onClick={() => setCustomization(prev => ({
                        ...prev,
                        crust: option
                      }))}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        customization.crust === option
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="extraCheese"
                  checked={customization.extraCheese}
                  onChange={(e) => setCustomization(prev => ({
                    ...prev,
                    extraCheese: e.target.checked
                  }))}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="extraCheese" className="text-sm text-gray-700">
                  Extra Cheese (+₹50)
                </label>
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Size</label>
            <div className="grid grid-cols-3 gap-2">
              {['Small', 'Medium', 'Large'].map(size => (
                <button
                  key={size}
                  onClick={() => setCustomization(prev => ({ ...prev, size }))}
                  className={`p-2 text-sm rounded-lg border transition-colors ${
                    customization.size === size
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleAddToCart(selectedItem)}
            disabled={isAddingToCart}
            className="w-full bg-indigo-600 text-white text-sm p-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : (
              `Add to Cart - ₹${selectedItem.price}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;