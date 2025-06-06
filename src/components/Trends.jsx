import React, { useState } from "react";
import { Link } from "react-router-dom";

const Trend = ({ user,addToCart }) => {
  const [index, setIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const visibleCount = 1;

  const categories = [
    "combos",
    "cookware",
    "pressure cooker",
    "steam cookware",
    "gas stove",
    "gas tandoor",
    "mixer grinder",
  ];

 
  const normalize = (str) => (str ? str.toLowerCase().trim() : "");


  const categoriesWithProducts = categories.filter((category) =>
    user.some((item) => normalize(item.product_category) === normalize(category))
  );

  const filteredProducts = selectedCategory
    ? user.filter(
        (item) => normalize(item.product_category) === normalize(selectedCategory)
      )
    : user;

  const NextHandler = () => {
    if (index + visibleCount < filteredProducts.length) {
      setIndex(index + 1);
    }
  };

  const PrevHandler = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handlerid = (id) => {
    alert(id);
  };

  const handlefilter = (name) => {
    // If clicking the same category, clear filter; else set new
    setSelectedCategory((prev) => (prev === name ? null : name));
    setIndex(0); // reset slider position
  };

const handleAddToCart = (item) => {
  addToCart({
    product_id: item.sno,
    product_name: item.product_name,
    product_price: item.product_price,
    image: item.product_images,
  }, 1);
};


  return (
    <div className="px-4 py-5 md:px-16 md:py-16">
      <div className="relative">
        <div className="md:w-full flex flex-col items-center ">
          <h2 className="text-2xl font-semibold">Trending Kitchen Appliances</h2>
          <p className="text-[#636365] font-semibold mt-1">Our Best Sellers</p>
        </div>

        {/* Filter Buttons - Desktop */}
        <div className=" w-full md:w-[70%] mx-auto mt-8 text-[#545455] font-medium flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isDisabled = !categoriesWithProducts.includes(category);
            const isSelected = normalize(selectedCategory) === normalize(category);

            return (
              <div
                key={category}
                className={`rounded-full px-2 py-0.5 text-[0.625rem] md:text-xs whitespace-nowrap text-center
                  ${
                    isSelected
                      ? "bg-[#B91508] text-white"
                      : isDisabled
                      ? "bg-[#E9E9EB] text-[#545455] cursor-not-allowed"
                      : "bg-[#E9E9EB] text-[#545455] cursor-pointer"
                  }`}
                onClick={() => {
                  if (!isDisabled) handlefilter(category);
                }}
              >
                {category
                  .split(" ")
                  .map((w) => w[0].toUpperCase() + w.slice(1))
                  .join(" ")}
              </div>
            );
          })}
        </div>

  

        {/* Product Slider */}
        <div className="mt-10">
          <div className="w-full overflow-hidden px-1 md:px-3 py-2">
            <div
              className="flex transition-transform duration-1000 ease-in-out space-x-3 md:space-x-15"
              style={{
                transform: `translateX(-${index * 20}%)`,
              }}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item,i) => (
                  <div className="w-42 md:w-auto p-2 md:p-4 bg-white rounded-md md:shadow-md" key={i}>
                      <div className="flex flex-col items-center">
                      <Link key={item.sno} to={`/879/DetailProduct/${item.sno}`} className="shadow-md">
                        <img
                          src={`http://localhost/summit_home_appliancies/frontend/admin/${item.product_images}`}
                          alt={item.product_name}
                          className="w-72 h-38 md:w-36 md:h-36 rounded-lg mx-auto"
                        /> </Link>
                       
                        <h2 className="text-md font-semibold truncate w-40 mt-2">
                          {item.product_name}
                        </h2>
                        <p className="text-sm font-semibold mt-2">
                          <span className="text-xs font-normal text-[#AAAAAA]">
                            From{" "}
                          </span>
                          Rs. {Math.floor(item.product_price)}
                        </p>
                        <div className="flex justify-between w-full mt-3 px-2">
                          <button className="text-xs rounded-full px-2 py-1 text-white bg-[#B91508] cursor-pointer"
                          onClick={() => handleAddToCart(item)}
                          >
                            Add to cart
                          </button>
                          <button
                            onClick={() => handlerid(item.sno)}
                            className="text-xs text-[#B91508] font-semibold"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                 
                ))
              ) : (
                <p className="text-center w-full">No products found in this category.</p>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute pt-5 right-0 flex space-x-6 ">
            <button
              onClick={PrevHandler}
              disabled={index === 0}
              className="text-sm transform -translate-y-1/2 bg-[#E2E2E5] text-[#636365] px-3 py-1 rounded-full z-10"
            >
              ❮
            </button>
            <button
              onClick={NextHandler}
              disabled={index + visibleCount >= filteredProducts.length}
              className="text-sm transform -translate-y-1/2 bg-[#E2E2E5] text-[#636365] px-3 py-1 rounded-full z-10"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trend;
