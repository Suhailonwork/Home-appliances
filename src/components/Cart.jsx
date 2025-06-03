import axios from "axios";
import React, { useState } from "react";
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ addcart, setaddcart, isLoggedIn }) => {
  const navigate = useNavigate();

  const safeCart = Array.isArray(addcart) ? addcart : [];

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [msg, setMsg] = useState("");
  const [newtotal, setnewtotal] = useState(null);

  const getProduct = (item) => item.selectedProduct || item;
  const getId = (product) => product.sno || product.product_id;

  const updateQuantity = async (id, newQuantity) => {
    const updatedCart = safeCart.map((item) => {
      const product = getProduct(item);
      if (getId(product) === id) {
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    });
    setaddcart(updatedCart);

    if (isLoggedIn) {
      const updatedItem = updatedCart.find(
        (item) => getId(getProduct(item)) === id
      );
      const product = getProduct(updatedItem);

      try {
        await axios.post(
          "http://localhost/summit_home_appliancies/php_controllar/contraollers/UpdateCart.php",
          {
            product_id: product.product_id || product.sno,
            quantity: Math.max(1, newQuantity),
            product_name: product.product_name,
            product_price: product.product_price,
            image: product.image || product.product_images,
            mode: "update",
          },
          { withCredentials: true }
        );
        console.log("Cart quantity updated in backend.");
      } catch (error) {
        console.error("Error updating quantity in backend:", error);
      }
    }
  };

  const subtotal = safeCart.reduce((sum, item) => {
    const product = getProduct(item);
    const price = parseFloat(product.product_price) || 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  const shippingFee = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
  const total = subtotal + shippingFee + tax - discount;

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

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setMsg("");
  };

  // ✅ Checkout logic with login check
  const handleCheckout = () => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", "/checkout");
      navigate("/login");
      return;
    }

    setIsCheckingOut(true);
    setTimeout(() => {
      alert("Order placed successfully!");
      setIsCheckingOut(false);
    }, 1500);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost/summit_home_appliancies/php_controllar/contraollers/DeleteCartItem.php",
        { product_id: productId },
        { withCredentials: true }
      );

      if (response.data.status === "success") {
        setaddcart((prevItems) =>
          prevItems.filter((item) => {
            const product = item.selectedProduct || item;
            return product.product_id !== productId;
          })
        );
        console.log("Item deleted successfully");
      } else {
        console.error("Failed to delete item:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900 flex items-center">
            <FiShoppingCart className="mr-2" /> Your Shopping Cart
          </h1>
          <span className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {safeCart.reduce((total, item) => total + (item.quantity || 0), 0)} Items
          </span>
        </div>

        {safeCart.length === 0 ? (
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

                {safeCart.map((item, i) => {
                  const product = getProduct(item);
                  const id = getId(product);
                  const quantity = item.quantity || 1;
                  const imageSrc = `http://localhost/summit_home_appliancies/frontend/admin/${
                    product.product_images || product.image
                  }`;

                  return (
                    <div
                      key={i}
                      className="grid grid-cols-12 p-4 border-b border-gray-100 items-center hover:bg-gray-50 transition relative"
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
                            onClick={() => updateQuantity(id, quantity - 1)}
                            disabled={quantity <= 1}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <FiMinus size={14} />
                          </button>
                          <span className="px-3 py-1 text-gray-900 border-x border-gray-300">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(id, quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 text-right font-semibold text-gray-900">
                        ${(parseFloat(product.product_price) * quantity).toFixed(2)}
                      </div>

                      <div className="col-span-1 text-right absolute right-30">
                        <button
                          onClick={() =>
                            handleDelete(product.product_id || product.sno)
                          }
                          className="text-red-500 hover:text-red-700"
                          title="Remove item"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-1/3 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Summary</h2>

              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between font-bold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Code */}
              {!appliedCoupon ? (
                <div className="mt-4">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={applyCoupon}
                    className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={!couponCode.trim()}
                  >
                    Apply Coupon
                  </button>
                  {msg && (
                    <p className="mt-2 text-sm text-red-600">{msg}</p>
                  )}
                </div>
              ) : (
                <div className="mt-4 flex items-center justify-between bg-green-100 text-green-800 p-3 rounded-md">
                  <span>{appliedCoupon.description}</span>
                  <button
                    onClick={removeCoupon}
                    className="underline hover:text-green-600"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* ✅ Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || safeCart.length === 0}
                className="mt-6 w-full bg-green-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {isCheckingOut ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
