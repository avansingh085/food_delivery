
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSearch, FaTag, FaTimes, FaPlus } from 'react-icons/fa';
const fakeData = [
  {
    _id: '1',
    name: 'Pepperoni Feast Pizza',
    description: 'Classic pepperoni with extra cheese',
    price: 14.99,
    typeFood: 'Italian',
    category: 'Pizza',
    customizationOptions: {
      sizes: ['Medium', 'Large'],
      crustTypes: ['Thin Crust', 'Cheese Burst'],
      toppings: [
        { name: 'Extra Pepperoni', price: 2.50 },
        { name: 'Jalapeños', price: 1.75 }
      ],
      extras: {
        extraCheese: true,
        sugarOptions: []
      }
    },
    nutritionalInfo: {
      calories: 950,
      protein: 42,
      carbs: 105,
      fat: 48
    },
    imageUrls: ['https://via.placeholder.com/150/FF0000/FFFFFF?text=Pepperoni'],
    offors: 15,
    stock: 8,
    available: true,
    tags: ['spicy', 'meat-lovers'],
  },
  {
    _id: '2',
    name: 'Garlic Breadsticks',
    description: 'Freshly baked garlic bread sticks',
    price: 6.99,
    typeFood: 'Appetizer',
    category: 'Sides',
    customizationOptions: {
      sizes: ['Regular'],
      crustTypes: [],
      toppings: [],
      extras: {
        extraCheese: false,
        sugarOptions: []
      }
    },
    nutritionalInfo: {
      calories: 320,
      protein: 8,
      carbs: 42,
      fat: 14
    },
    imageUrls: ['https://via.placeholder.com/150/FFFF00/000000?text=Breadsticks'],
    offors: 0,
    stock: 15,
    available: true,
    tags: ['vegetarian'],
  },
  {
    _id: '3',
    name: 'Cola',
    description: 'Classic carbonated drink',
    price: 3.50,
    typeFood: 'Beverage',
    category: 'Drinks',
    customizationOptions: {
      sizes: ['Small', 'Medium', 'Large'],
      crustTypes: [],
      toppings: [],
      extras: {
        extraCheese: false,
        sugarOptions: ['Regular', 'Zero Sugar']
      }
    },
    nutritionalInfo: {
      calories: 150,
      protein: 0,
      carbs: 39,
      fat: 0
    },
    imageUrls: ['https://via.placeholder.com/150/0000FF/FFFFFF?text=Cola'],
    offors: 10,
    stock: 20,
    available: true,
    tags: ['cold-drinks'],
  },
  {
    _id: '4',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center',
    price: 8.99,
    typeFood: 'Dessert',
    category: 'Desserts',
    customizationOptions: {
      sizes: ['Regular'],
      crustTypes: [],
      toppings: [
        { name: 'Vanilla Ice Cream', price: 1.50 }
      ],
      extras: {
        extraCheese: false,
        sugarOptions: ['Sugar Free']
      }
    },
    nutritionalInfo: {
      calories: 450,
      protein: 6,
      carbs: 60,
      fat: 22
    },
    imageUrls: ['https://via.placeholder.com/150/4B0082/FFFFFF?text=Cake'],
    offors: 20,
    stock: 6,
    available: true,
    tags: ['sweet', 'featured'],
  },
  // Add 6 more items following the same structure
  {
    _id: '5',
    name: 'Veggie Supreme Pizza',
    description: 'Loaded with fresh vegetables',
    price: 13.99,
    typeFood: 'Italian',
    category: 'Pizza',
    customizationOptions: {
      sizes: ['Medium', 'Large'],
      crustTypes: ['Classic'],
      toppings: [
        { name: 'Mushrooms', price: 1.00 },
        { name: 'Olives', price: 0.75 }
      ],
      extras: {
        extraCheese: true,
        sugarOptions: []
      }
    },
    nutritionalInfo: {
      calories: 880,
      protein: 35,
      carbs: 98,
      fat: 40
    },
    imageUrls: ['https://via.placeholder.com/150/00FF00/000000?text=Veggie'],
    offors: 0,
    stock: 10,
    available: true,
    tags: ['vegetarian', 'healthy'],
  },
  {
    _id: '6',
    name: 'Mozzarella Sticks',
    description: 'Fried cheese sticks with marinara sauce',
    price: 7.50,
    typeFood: 'Appetizer',
    category: 'Sides',
    customizationOptions: {
      sizes: ['6pc', '12pc'],
      crustTypes: [],
      toppings: [],
      extras: {
        extraCheese: false,
        sugarOptions: []
      }
    },
    nutritionalInfo: {
      calories: 480,
      protein: 22,
      carbs: 32,
      fat: 28
    },
    imageUrls: ['https://via.placeholder.com/150/FFA500/000000?text=Cheese'],
    offors: 0,
    stock: 12,
    available: true,
    tags: ['cheesy'],
  },
  {
    _id: '7',
    name: 'Iced Tea',
    description: 'Freshly brewed iced tea',
    price: 3.00,
    typeFood: 'Beverage',
    category: 'Drinks',
    customizationOptions: {
      sizes: ['Medium', 'Large'],
      crustTypes: [],
      toppings: [],
      extras: {
        extraCheese: false,
        sugarOptions: ['Regular', 'Less Sugar', 'No Sugar']
      }
    },
    nutritionalInfo: {
      calories: 90,
      protein: 0,
      carbs: 23,
      fat: 0
    },
    imageUrls: ['https://via.placeholder.com/150/008000/FFFFFF?text=Tea'],
    offors: 0,
    stock: 18,
    available: true,
    tags: ['refreshing'],
  },
  {
    _id: '8',
    name: 'Tiramisu',
    description: 'Classic Italian dessert',
    price: 9.50,
    typeFood: 'Dessert',
    category: 'Desserts',
    customizationOptions: {
      sizes: ['Regular'],
      crustTypes: [],
      toppings: [],
      extras: {
        extraCheese: false,
        sugarOptions: ['Original']
      }
    },
    nutritionalInfo: {
      calories: 420,
      protein: 7,
      carbs: 45,
      fat: 24
    },
    imageUrls: ['https://via.placeholder.com/150/800080/FFFFFF?text=Tiramisu'],
    offors: 15,
    stock: 5,
    available: true,
    tags: ['coffee-flavored'],
  },
  {
    _id: '9',
    name: 'Hawaiian Pizza',
    description: 'Ham and pineapple combination',
    price: 15.99,
    typeFood: 'Italian',
    category: 'Pizza',
    customizationOptions: {
      sizes: ['Medium', 'Large'],
      crustTypes: ['Classic', 'Cheese Burst'],
      toppings: [
        { name: 'Extra Ham', price: 2.00 },
        { name: 'Bacon Bits', price: 1.50 }
      ],
      extras: {
        extraCheese: true,
        sugarOptions: []
      }
    },
    nutritionalInfo: {
      calories: 920,
      protein: 38,
      carbs: 110,
      fat: 45
    },
    imageUrls: ['https://via.placeholder.com/150/FF69B4/FFFFFF?text=Hawaiian'],
    offors: 10,
    stock: 7,
    available: true,
    tags: ['sweet-savory'],
  },
  {
    _id: '10',
    name: 'Lemonade',
    description: 'Fresh squeezed lemon drink',
    price: 4.50,
    typeFood: 'Beverage',
    category: 'Drinks',
    customizationOptions: {
      sizes: ['Medium', 'Large'],
      crustTypes: [],
      toppings: [],
      extras: {
        extraCheese: false,
        sugarOptions: ['Regular', 'Less Sugar']
      }
    },
    nutritionalInfo: {
      calories: 120,
      protein: 0,
      carbs: 31,
      fat: 0
    },
    imageUrls: ['https://via.placeholder.com/150/FFFF00/000000?text=Lemonade'],
    offors: 0,
    stock: 15,
    available: true,
    tags: ['summer'],
  }
];


const FoodManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: '',
    description: '',
    price: '',
    typeFood: '',
    category: 'Pizza',
    customizationOptions: {
      sizes: ['Medium'],
      crustTypes: ['Thin Crust'],
      toppings: [],
      extras: {
        extraCheese: false,
        sugarOptions: []
      }
    },
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    imageUrls: [''],
    offors: 0,
    stock: 0,
    available: true,
    tags: [],
  });

  const [searchResults, setSearchResults] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    setProducts(fakeData);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setShowRecommendations(true);
    } else {
      setShowRecommendations(false);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (parent, field, value) => {
    setCurrentProduct(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const handleImageUrlChange = (index, value) => {
    setCurrentProduct(prev => {
      const newUrls = [...prev.imageUrls];
      newUrls[index] = value;
      return { ...prev, imageUrls: newUrls };
    });
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setCurrentProduct(prev => ({ ...prev, tags }));
  };

  const handleToppingChange = (index, field, value) => {
    setCurrentProduct(prev => {
      const newToppings = [...prev.customizationOptions.toppings];
      newToppings[index][field] = value;
      return {
        ...prev,
        customizationOptions: {
          ...prev.customizationOptions,
          toppings: newToppings
        }
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(p => p._id === currentProduct._id ? currentProduct : p));
    } else {
      const newProduct = { ...currentProduct, _id: Date.now().toString() };
      setProducts([...products, newProduct]);
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p._id !== id));
  };

  const handleSearchClick = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setShowRecommendations(false);
    setSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProduct({
      name: '',
      description: '',
      price: '',
      typeFood: '',
      category: 'Pizza',
      customizationOptions: {
        sizes: ['Medium'],
        crustTypes: ['Thin Crust'],
        toppings: [],
        extras: {
          extraCheese: false,
          sugarOptions: []
        }
      },
      nutritionalInfo: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      },
      imageUrls: [''],
      offors: 0,
      stock: 0,
      available: true,
      tags: [],
    });
  };

  return (
    <div className="min-h-screen bg-white text-white p-6">
      <div className="max-w-6xl mx-auto">
       
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Food Management</h1>
          <div className="relative flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            {showRecommendations && (
              <div className="absolute z-10 w-full mt-2 bg-gray-800 rounded-lg shadow-lg">
                <div className="flex overflow-x-auto gap-4 p-4">
                  {searchResults.map(product => (
                    <div
                      key={product._id}
                      onClick={() => handleSearchClick(product)}
                      className="flex-shrink-0 w-48 bg-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-600 transition-colors"
                    >
                      <img
                        src={product.imageUrls[0]}
                        alt={product.name}
                        className="w-full h-24 object-cover rounded-md mb-2"
                      />
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <p className="text-sm text-gray-300">${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 p-6 rounded-xl space-y-6">
          <h2 className="text-2xl font-bold">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={currentProduct.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Description *</label>
                <textarea
                  name="description"
                  value={currentProduct.description}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 h-32"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Price *</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Category *</label>
                <select
                  name="category"
                  value={currentProduct.category}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700"
                >
                  {['Pizza', 'Sides', 'Drinks', 'Desserts'].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2">Type of Food</label>
                <input
                  type="text"
                  name="typeFood"
                  value={currentProduct.typeFood}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2">Image URLs</label>
                {currentProduct.imageUrls.map((url, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      className="flex-1 p-2 rounded bg-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageUrlChange(index, '')}
                      className="p-2 bg-gray-600 rounded hover:bg-gray-500"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleImageUrlChange(currentProduct.imageUrls.length, '')}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  + Add Image URL
                </button>
              </div>

              <div>
                <label className="block mb-2">Tags (comma separated)</label>
                <input
                  type="text"
                  value={currentProduct.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="w-full p-2 rounded bg-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={currentProduct.stock}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700"
                  />
                </div>

                <div>
                  <label className="block mb-2">Discount (%)</label>
                  <input
                    type="number"
                    name="offors"
                    min="0"
                    max="100"
                    value={currentProduct.offors}
                    onChange={handleInputChange}
                    className="w-full p-2 rounded bg-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">Availability</label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={currentProduct.available}
                    onChange={(e) => handleInputChange({
                      target: { name: 'available', value: e.target.checked }
                    })}
                    className="rounded text-black"
                  />
                  <span>Available</span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-white text-black rounded-lg hover:bg-gray-200 font-semibold transition-colors"
            >
              {isEditing ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="bg-gray-800 rounded-xl p-4 relative group">
              {product.offors > 0 && (
                <div className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                  <FaTag className="text-sm" />
                  <span>{product.offors}% OFF</span>
                </div>
              )}

              {product.imageUrls[0] && (
                <img 
                  src={product.imageUrls[0]} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold truncate">{product.name}</h3>
                  <div className="text-right">
                    <p className={`text-lg ${product.offors > 0 ? 'line-through text-gray-400' : ''}`}>
                      ${product.price}
                    </p>
                    {product.offors > 0 && (
                      <p className="text-lg font-semibold">
                        ${(product.price * (1 - product.offors/100)).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 text-sm line-clamp-2">{product.description}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-700 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-400">
                    <p>Stock: {product.stock}</p>
                    <p>Category: {product.category}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 bg-gray-700 rounded hover:bg-gray-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="p-2 bg-red-600 rounded hover:bg-red-500"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodManagement;