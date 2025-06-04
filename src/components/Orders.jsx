import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

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
        console.error("❌ Fetch Error:", error);
        setMsg("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading orders...</p>;
  if (msg) return <p className="text-center text-red-500 mt-10">{msg}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-500"> My Orders</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.order_id}
            className="bg-white shadow-md rounded-lg p-5 border border-gray-200"
          >
            <div className="flex flex-col space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {order.item_name}
              </h3>
              <p className="text-gray-600">
                Quantity: <span className="font-medium">{order.quantity}</span>
              </p>
              <p className="text-gray-600">
                Total Price: <span className="font-medium text-green-600">₹{order.total_price}</span>
              </p>
              <p className="text-gray-500 text-sm">Ordered on: {order.order_date}</p>

              {/* Status Badge */}
              <p className="text-sm">
                Status:{" "}
                <span
                  className={`inline-block px-3 py-1 rounded-full text-white text-xs ${
                    order.status === "pending"
                      ? "bg-red-500"
                      : order.status === "delivered"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {order.status}
                </span>
              </p>

              {/* Product Image */}
              {order.image_path ? (
                <img
                  src={`http://localhost/summit_home_appliancies/frontend/admin/${order.image_path}`}
                  alt={order.item_name}
                  className="w-full h-40 object-cover rounded-md mt-3"
                />
              ) : (
                <p className="text-red-400 text-sm mt-2">⚠ No image available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
