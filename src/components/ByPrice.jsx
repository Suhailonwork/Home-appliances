import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ByPrice = ({ user }) => {
  const [data, setData] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("all");

  const scrollContainerRef = useRef(null); // for controlling scroll

  useEffect(() => {
    if (Array.isArray(user)) {
      setData(user);
    } else {
      console.error("Invalid data passed to user prop");
    }
  }, [user]);

  const priceRanges = [
    { label: "Under ₹999", value: 999 },
    { label: "Under ₹1499", value: 1499 },
    { label: "Under ₹1999", value: 1999 },
    { label: "Under ₹2499", value: 2499 },
    { label: "Under ₹2999", value: 2999 },
  ];

  const filteredData =
    selectedPrice === "all"
      ? data
      : data.filter((item) => parseFloat(item.product_price) <= selectedPrice);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center p-4 mt-11">
      <div className="md:w-full flex flex-col items-center ">
        <h2 className="text-2xl font-semibold">Thoughtful Picks by Price</h2>
        <p className="text-[#636365] text-[0.9rem] font-medium mt-1">
          Gifting Made Simple, Shopping Made Smarter
        </p>
      </div>

      {/* Price Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-4 mt-9">
        <div
          className={`px-3 py-1 rounded-full cursor-pointer text-xs ${
            selectedPrice === "all"
              ? "bg-[#B91508] text-white"
              : "bg-[#E9E9EB] text-[#545455]"
          }`}
          onClick={() => setSelectedPrice("all")}
        >
          All
        </div>
        {priceRanges.map((range) => (
          <div
            key={range.value}
            onClick={() => setSelectedPrice(range.value)}
            className={`px-3 py-1 rounded-full cursor-pointer text-xs ${
              selectedPrice === range.value
                ? "bg-[#B91508] text-white"
                : "bg-[#E9E9EB] text-[#545455]"
            }`}
          >
            {range.label}
          </div>
        ))}
      </div>

      <p className="text-[#636365] text-[0.8rem] font-medium mb-7">
        Festive Favorites & Luxe Kitchenware - For those who want to give (or
        get) something truly special.
      </p>

      {/* Scroll Buttons */}
      <div className="flex items-center w-full">
        <button
          onClick={scrollLeft}
          className="px-2 py-1 text-white bg-[#B91508] rounded-full mr-2"
        >
          ◀
        </button>

        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-hidden w-full px-2 py-2"
        >
          {filteredData.map((item) => (
            <Link key={item.sno} to={`/879/DetailProduct/${item.sno}`}>
              <div className="w-42 md:w-auto p-2 md:p-4 bg-white rounded-md shadow-md">
                <div className="flex flex-col items-center">
                  <img
                    src={`http://localhost/summit_home_appliancies/frontend/admin/${item.product_images}`}
                    alt={item.product_name}
                    className="w-9 h-9 md:w-36 md:h-36 rounded-lg mx-auto"
                  />
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
                    <button className="text-xs rounded-full px-2 py-1 text-white bg-[#B91508]">
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
            </Link>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="px-2 py-1 text-white bg-[#B91508] rounded-full ml-2"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default ByPrice;
