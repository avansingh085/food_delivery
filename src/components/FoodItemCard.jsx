import React from 'react';
import { Link } from 'react-router-dom';
import FoodItemSkeleton from './FoodItemSkeleton';

const FoodItemCard = ({ item }) => {
    if (!item) return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-300 h-72 w-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg animate-pulse border border-gray-200">
            <div className="bg-gray-200 h-40 w-full"></div>
            <div className="p-4">
                <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
                <div className="bg-gray-300 h-3 w-full rounded mb-1"></div>
                <div className="bg-gray-300 h-3 w-2/3 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                    <div className="bg-gray-300 h-6 w-16 rounded"></div>
                    <div className="bg-gray-300 h-8 w-20 rounded-full"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white h-72 w-64 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 border border-gray-200 transition-all duration-300 snap-center mx-2 relative group">
            {item.imageUrls?.[0] ? (
                <div className="relative h-full w-full">
                    <div
                        className="block relative aspect-square overflow-hidden"
                        aria-label={`View details for ${item.name}`}
                    >
                        <img
                            src={item.imageUrls[0] || 'https://assets.box8.co.in/rectangle-19x10/xhdpi/product/8074'}
                            alt={item.name || 'Food item'}
                            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            onError={(e) => (e.target.src = '/fallback-image.jpg')}
                            style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full backdrop-blur-md bg-white/60 p-4 text-gray-900 rounded-b-2xl shadow-lg border-t border-gray-200">
                        <button
                            className="absolute top-3 right-3 px-4 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-md hover:scale-105 hover:from-pink-500 hover:to-red-500 transition-all duration-200"
                            onClick={() => setSelectedItem(item)}
                            aria-label={`Customize ${item.name}`}
                        >
                            <span className="material-icons align-middle mr-1" style={{ fontSize: '16px' }}>tune</span> Customize
                        </button>
                        <div className="flex items-center gap-2 mt-8">
                            <div className="w-4 h-4 border-2 border-green-400 bg-white flex items-center justify-center rounded-sm shadow">
                                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                            </div>
                            <h3 className="font-bold text-base tracking-wide">{item.name}</h3>
                        </div>
                        <p className="text-xs text-gray-700 line-clamp-2 mt-1 font-medium">{item.description}</p>
                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-300/30">
                            <span className="text-lg font-extrabold text-red-600">
                                ₹{item.price}
                            </span>
                            <button
                                className={`px-5 py-2 text-sm rounded-full font-semibold shadow transition-all duration-200 ${itemIdsInCart?.includes(item._id)
                                        ? 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100'
                                        : 'bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-pink-600 hover:to-red-600'
                                    }`}
                                onClick={(e) => handleAddToCart(item, e)}
                                aria-label={`Add ${item.name} to cart`}
                            >
                                {itemIdsInCart?.includes(item._id) ? 'Added ✓' : 'Add +'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No Image Available</span>
                </div>
            )}
            {item.offer && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs px-3 py-1 rounded-full shadow-lg border border-white/30 z-10 animate-bounce">
                    <span className="font-bold">{item.offer}% OFF</span>
                </div>
            )}
        </div>
    );
};

export default FoodItemCard;