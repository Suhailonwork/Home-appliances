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
        console.log("Wishlist response:", res.data);
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

  // Ensure types match (convert item.sno to int)
  const wishlistItems = user.filter((item) =>
    wishIds.includes(parseInt(item.sno))
  );

  // Debug logs
  console.log("Wish IDs:", wishIds);
  console.log("User prop:", user);
  console.log("Matched wishlist items:", wishlistItems);

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlistItems.length > 0 ? (
        wishlistItems.map((item) => (
          <div key={item.sno}>
            <h4>{item.product_description}</h4>
            <p>ID: {item.sno}</p>
            {/* Add more details if available: price, image, etc. */}
          </div>
        ))
      ) : (
        <p>No items in your wishlist.</p>
      )}
    </div>
  );
};
