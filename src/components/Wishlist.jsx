import axios from "axios";
import React, { useState, useEffect } from "react";

export const Wishlist = ({ user }) => {
  const [wishIds, setWishIds] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://localhost/summit_home_appliancies/php_controllar/contraollers/wishlistupload.php?action=get"
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          const productIds = res.data.map((item) => parseInt(item.product_id));
          setWishIds(productIds);
        } else {
          console.error("Unexpected wishlist format", res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load wishlist:", err);
      });
  }, []);

  const wishlistItems = user.filter((item) =>
    wishIds.includes(parseInt(item.sno))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Wishlist</h2>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.sno}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={`http://localhost/summit_home_appliancies/frontend/admin/${item.product_images}`}
                alt={item.product_description}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.product_description}
                </h4>
                <p className="text-sm text-gray-500">Product ID: {item.sno}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">No items in your wishlist.</p>
      )}
    </div>
  );
};
  