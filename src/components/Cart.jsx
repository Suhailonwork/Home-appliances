import axios from "axios";
import React, { useState } from "react";
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { Link } from "react-router-dom";

const Cart = ({ addcart, setaddcart }) => {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [msg, setMsg] = useState("");
  const [newtotal, setnewtotal] = useState(null);

  // Helper: Normalize product from item, fallback to item if no selectedProduct
  const getProduct = (item) => item.selectedProduct || item;

  // Helper: Get product ID - support both 'sno' or 'product_id'
  const getId = (product) => product.sno || product.product_id;

  // Update quantity for a cart item by id
  const updateQuantity = (id, newQuantity) => {
    const updatedCart = addcart.map((item) => {
      const product = getProduct(item);
      if (getId(product) === id) {
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    });
    setaddcart(updatedCart);
  };

  // Remove an item from cart by id
  const removeItem = (id) => {
    const updated = addcart.filter((item) => {
      const product = getProduct(item);
      return getId(product) !== id;
    });
    setaddcart(updated);
  };

  // Calculate subtotal safely with fallback price and quantity
  const subtotal = addcart.reduce((sum, item) => {
    const product = getProduct(item);
    const price = parseFloat(product.product_price) || 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  const shippingFee = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  const total = subtotal + shippingFee + tax - discount;

  // Apply coupon code
  const applyCoupon = async () => {
    try {
      const res = await axios.post(
        "http://localhost/summit_home_appliancies/php_controllar/contraollers/checkCouponStatus.php",
        new URLSearchParams({
          couponCode,
          subtotal,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials: true,
        }
      );

      const response = res.data;

      if (response.status === "success") {
        setMsg(response.message);
        setAppliedCoupon({
          code: couponCode,
          discount: parseFloat(response.discount),
          description: "Coupon applied successfully.",
        });
        setnewtotal(response.new_total);
      } else {
        setMsg(response.message);
      }
    } catch (error) {
      console.error("Coupon error:", error);
      setMsg("Something went wrong.");
    }

    setCouponCode("");
  };

  // Remove applied coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setMsg("");
  };

  // Handle checkout button click
  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert("Order placed successfully!");
      setIsCheckingOut(false);
    }, 1500);
  };

  // Debug: Log cart items structure
  // console.log("Cart Items:", addcart);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center">
            <FiShoppingCart className="mr-2" /> Your Shopping Cart
          </h1>
          <span className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {addcart.reduce((total, item) => total + (item.quantity || 0), 0)} Items
          </span>
        </div>

        {addcart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="max-w-md mx-auto">
              <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                Your cart is empty
              </h2>
              <p className="mt-2 text-gray-500">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                to="/"
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {addcart.map((item, i) => {
                  const product = getProduct(item);
                  const id = getId(product);
                  const quantity = item.quantity || 1;
                  const imageSrc = `http://localhost/summit_home_appliancies/frontend/admin/${product.product_images || product.image}`;

                  return (
                    <div
                      key={i}
                      className="grid grid-cols-12 p-4 border-b border-gray-100 items-center hover:bg-gray-50 transition"
                    >
                      <div className="col-span-5 flex items-center">
                        <img
                          src={imageSrc}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                          alt={product.product_name}
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {product.product_name}
                          </h3>
                          {product.product_stock && (
                            <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded">
                              Out of stock
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-2 text-center text-gray-900 font-medium">
                        ${parseFloat(product.product_price).toFixed(2)}
                      </div>

                      <div className="col-span-3 flex justify-center">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(id, quantity - 1)
                            }
                            disabled={quantity <= 1}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="px-3 py-1 text-gray-900 border-x border-gray-300">
                            {quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(id, quantity + 1)
                            }
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 text-right text-gray-900 font-medium">
                        ${(product.product_price * quantity).toFixed(2)}
                      </div>

                      <div className="col-span-1 text-right">
                        <button
                          onClick={() => removeItem(id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Box */}
              <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Have a coupon?
                </h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow border border-gray-300 rounded-l-md px-4 py-2"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <div className="mt-4 bg-green-50 p-3 rounded-md">
                    <div className="flex justify-between">
                      <span className="text-green-700 text-sm">
                        Applied: {appliedCoupon.code} ({appliedCoupon.description})
                      </span>
                      <button
                        onClick={removeCoupon}
                        className="text-green-700 hover:text-green-900 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
                {msg && <p className="mt-2 text-sm text-red-600">{msg}</p>}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">
                      ${newtotal ? parseFloat(newtotal).toFixed(2) : subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900 font-medium">
                      {shippingFee === 0 ? "Free" : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="text-gray-900 font-medium">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-4 mb-6">
                  <span>Total</span>
                  <span>
                    ${newtotal ? parseFloat(newtotal).toFixed(2) : total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-3 text-white rounded-md ${
                    isCheckingOut ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
