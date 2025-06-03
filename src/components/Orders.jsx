import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost/summit_home_appliancies/php_controllar/contraollers/myorder.php",
          { withCredentials: true }
        );

        if (res.data.status === "success") {
          const orderList = res.data.orders || [];
          setOrders(orderList);
          if (orderList.length === 0) {
            setMsg("No orders found.");
          }
        } else {
          setMsg(res.data.message || "No orders found.");
        }
      } catch (error) {
        console.error(error);
        setMsg("Failed to fetch orders.");
      } finally {
        setLoading(false); // DONE loading
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (msg) return <p>{msg}</p>;

  return (
    <div>
      <h2>My Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.order_id}>
            <strong>{order.item_name}</strong> x {order.quantity} = ₹{order.total_price}
            <br />
            Date: {order.order_date} | Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
