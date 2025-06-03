import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountsPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/summit_home_appliancies/php_controllar/contraollers/GetUserCartDetails.php", {
        withCredentials: true, // send session cookie
      })
      .then((res) => {
      if (res.data.status === "success") {
  setUserInfo(res.data.user);
  setCartItems(res.data.cart);
}else {
  alert(res.data.message || "Something went wrong."); // safer fallback
}
      })
      .catch((err) => {
        console.error("Failed to fetch user/cart info:", err);
      });
  }, []);

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Information</h2>
      <div className="mb-6">
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Phone:</strong> {userInfo.phone}</p>
        {/* Add more fields if available */}
      </div>

      <h2 className="text-xl font-bold mb-4">Cart Items</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li key={index} className="border p-3 rounded-md">
              <p><strong>Product:</strong> {item.product_name}</p>
              <p><strong>Price:</strong> ₹{item.product_price}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Total:</strong> ₹{item.total}</p>
              <img
                src={`http://localhost/summit_home_appliancies/frontend/admin/${item.image}`}
                alt={item.product_name}
                className="w-20 h-20 object-cover mt-2"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccountsPage;
