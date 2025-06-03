import axios from 'axios';
import React, { useState,useEffect } from 'react'

export const Wishlist = () => {

    const [wishlist,setWishlist] = useState([])
    useEffect(() => {
      axios.get('http://localhost/summit_home_appliancies/php_controllar/contraollers/wishlistupload.php?action=get')
        .then(res => {
          console.log("Wishlist response:", res.data); // Inspect structure
          if (Array.isArray(res.data)) {
            const productIds = res.data.map(item => parseInt(item.product_id));
            setWishlist(productIds);
          } else {
            console.error("Unexpected wishlist format", res.data);
          }
        })
        .catch(err => {
          console.error("Failed to load wishlist:", err);
        });
    }, []);
  return (
    <div>
    <p>{wishlist}</p>
    </div>
  )
}
