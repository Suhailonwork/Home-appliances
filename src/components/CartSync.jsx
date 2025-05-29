// CartSync.js
import { useEffect } from "react";
import axios from "axios";

const CartSync = ({ isLoggedIn, cartItems, setCartItems }) => {
  useEffect(() => {
    if (isLoggedIn) {
      const localCart = localStorage.getItem("cartItems");

      if (localCart) {
        const parsedCart = JSON.parse(localCart);

        Promise.all(
          parsedCart.map((item) =>
            axios.post(
              "http://localhost/summit_home_appliancies/php_controllar/contraollers/UpdateCart.php",
              {
                product_id: item.product_id,
                quantity: item.quantity,
                product_name: item.product_name,
                product_price: item.product_price,
                image: item.image,
              },
              { withCredentials: true }
            )
          )
        )
          .then(() => {
            localStorage.removeItem("cartItems");
            return axios.get(
              "http://localhost/summit_home_appliancies/php_controllar/contraollers/UpdateCart.php",
              { withCredentials: true }
            );
          })
          .then((res) => {
            setCartItems(res.data);
          })
          .catch((err) => {
            console.error("Cart sync error:", err);
          });
      }
    }
  }, [isLoggedIn]);

  return null;
};

export default CartSync;
