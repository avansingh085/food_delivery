import React from "react";

const items = [
    { id: 4, name: "Pizza BBQ Chicken", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
    { id: 5, name: "Pizza Hawaiian", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
    { id: 6, name: "Pizza Cheese", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
    { id: 7, name: "Pizza Seafood", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
    { id: 8, name: "Pizza Supreme", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg"},
  
    { id: 4, name: "Pizza BBQ Chicken", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
    { id: 5, name: "Pizza Hawaiian", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
    { id: 6, name: "Pizza Cheese", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
    { id: 7, name: "Pizza Seafood", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
    { id: 8, name: "Pizza Supreme", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg"},
   { id: 4, name: "Pizza BBQ Chicken", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 5, name: "Pizza Hawaiian", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 6, name: "Pizza Cheese", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 7, name: "Pizza Seafood", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 8, name: "Pizza Supreme", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg"},
{ id: 4, name: "Pizza BBQ Chicken", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 5, name: "Pizza Hawaiian", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 6, name: "Pizza Cheese", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 7, name: "Pizza Seafood", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 8, name: "Pizza Supreme", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg"},
  { id: 4, name: "Pizza BBQ Chicken", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 5, name: "Pizza Hawaiian", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 6, name: "Pizza Cheese", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 7, name: "Pizza Seafood", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg" },
  { id: 8, name: "Pizza Supreme", image: "https://www.allrecipes.com/thmb/V5sR7qqZ2VsnAjwRy9vYvDKijto=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-LittleCaesarsCrazyPuffs-d425e22e11764f1faf47aee253afceac.jpg"},
];
const FullWidthSlider = () => {
  return (
    <div className="relative w-full bg-gray-100">
      <h2 className="text-center text-2xl font-serif py-4 text-gray-800">
        What's New
      </h2>

      {/* Horizontal Scrollable Section */}
      <div className="overflow-x-auto whitespace-nowrap scroll-smooth  hide-scroll-bar px-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="inline-block w-60 md:w-64 lg:w-72 bg-white mx-2 rounded-lg shadow-md"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-36 object-cover rounded-t-lg"
            />
            <div className="p-2 text-center">
              <span className="font-medium text-sm text-gray-800">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullWidthSlider;