import React, { useState, useCallback } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Pizza',
    customizationOptions: {
      sizes: [],
      crustTypes: [],
      toppings: [],
      extras: {
        extraCheese: false,
        sugarOptions: []
      }
    },
    nutritionalInfo: {
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    },
    imageUrls: [''],
    stock: '',
    tags: [],
    available: true
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const generateFakeData = async () => {
    setGenerating(true);
    setError('');
    setSuccess('');

    const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const randomPrice = () => parseFloat((Math.random() * (25 - 5) + 5).toFixed(2));
    const categories = ['Pizza', 'Sides', 'Drinks', 'Desserts'];
    const sizes = ['Small', 'Medium', 'Large'];
    const crusts = ['Classic', 'Thin Crust', 'Cheese Burst'];
    const toppingsList = [
      { name: 'Pepperoni', price: 1.5 },
      { name: 'Mushrooms', price: 1.0 },
      { name: 'Onions', price: 0.5 },
      { name: 'Sausage', price: 2.0 },
      { name: 'Bacon', price: 2.5 },
    ];

    const fakeProducts = Array.from({ length: 1500 }, (_, i) => ({
      name: `${['Supreme', 'Deluxe', 'Cheese Lovers', 'Veggie', 'Meat', 'BBQ', 'Hawaiian', 'Margherita', 'Pepperoni', 'Buffalo'][i % 10]} ${randomChoice(['Pizza', 'Pie', 'Special'])}`,
      description: `Delicious ${['hand-tossed', 'thin crust', 'deep dish', 'wood-fired'][i % 4]} ${categories[i % 4]} with premium ingredients`,
      price: randomPrice(),
      category: categories[i % 4],
      customizationOptions: {
        sizes: sizes.slice(0, randomInt(1, 3)),
        crustTypes: crusts.slice(0, randomInt(1, 2)),
        toppings: toppingsList.slice(0, randomInt(2, 5)),
        extras: {
          extraCheese: Math.random() < 0.5,
          sugarOptions: ['Regular', 'Less', 'Half', 'None'].slice(0, randomInt(1, 3))
        }
      },
      nutritionalInfo: {
        calories: randomInt(200, 800),
        protein: randomInt(5, 40),
        carbs: randomInt(20, 100),
        fat: randomInt(10, 50)
      },
      imageUrls: [`https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/375px-Pizza-3007395.jpg`],
      stock: randomInt(0, 100),
      tags: [
        ...(Math.random() < 0.5 ? ['vegetarian'] : []),
        ...(Math.random() < 0.3 ? ['spicy'] : []),
        ...(Math.random() < 0.7 ? ['new'] : [])
      ],
      available: Math.random() < 0.9,
      rating: {
        average: parseFloat((Math.random() * 2 + 3).toFixed(1)),
        count: randomInt(0, 500)
      }
    }));

    try {
      // Send in batches of 10 to avoid server overload
      for (let i = 0; i < fakeProducts.length; i += 10) {
        const batch = fakeProducts.slice(i, i + 10);
        await axios.all(batch.map(product => axios.post('http://localhost:5000/addNewFood', product)));

        // Wait for 500ms after every 10 requests to prevent overload
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      setSuccess('Successfully generated 100 fake products!');
    } catch (err) {
      setError(`Failed to generate data: ${err.message}`);
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.post('http://localhost:5000/addNewFood', formData);
      setSuccess('Product created successfully!');
    } catch (err) {
      setError(`Failed to create product: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create New Product</h2>
        <button
          type="button"
          onClick={generateFakeData}
          disabled={generating}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {generating ? 'Generating...' : 'Generate 100 Fake Products'}
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Keep all existing form fields */}

        <div className="mt-4 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Development Notes</h3>
          <p className="text-sm text-gray-600">
            The "Generate 100 Fake Products" button creates sample data with:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-600 mt-2 space-y-1">
            <li>Randomized valid product information</li>
            <li>Realistic nutritional values</li>
            <li>Varied customization options</li>
            <li>Automatic API calls with rate limiting</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Creating Product...' : 'Create Single Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
