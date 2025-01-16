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
      <div className="relative w-screen overflow-hidden bg-gray-100">
        <div className="h-20 w-screen text-3xl font-serif text-center">What's New</div>
        <div className="flex space-x-4 overflow-x-auto hide-scroll-bar p-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-96 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 text-center">
                <span className="font-semibold text-gray-800">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FullWidthSlider;