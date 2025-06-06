import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSlider from "./components/HeroSlider";
import Trend from "./components/Trends";
import Gallery from "./components/Gallery";
import CookerFinder from "./components/CookerFinder";
import Discription from "./components/Discription";
import ByPrice from "./components/ByPrice";
import ReelSection from "./components/ReelSection";
import SummitSection from "./components/SummitSection";
import Available from "./components/Available";
import Feedback from "./components/Feedback";
import Connectivity from "./components/Connectivity";
import Blogs from "./components/Blogs";
import DetailProduct from './components/DetailProduct';
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cart from './components/Cart';
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import { Contactus } from "./components/Contactus";
import { Checkout } from "./components/Checkout";
import  AccountsPage  from "./components/AccountsPage";
import { Imran } from "./components/Imran";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSyncedLocalCart, setHasSyncedLocalCart] = useState(false);

  useEffect(() => {
    axios.get("http://localhost/summit_home_appliancies/api/products.php")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error loading products:", err));
  
      
  }, []);
  useEffect(() => {
  console.log("Fetched products:", products);
}, [products]);

  useEffect(() => {
    fetch('http://localhost/summit_home_appliancies/php_controllar/contraollers/CheckLogin.php', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setIsLoggedIn(data.loggedIn))
      .catch(err => console.error("Error checking login status:", err));
  }, []);

 useEffect(() => {
  if (isLoggedIn && !hasSyncedLocalCart) {
    const localCart = localStorage.getItem("cartItems");
    if (localCart) {
      const cartItemsFromLocal = JSON.parse(localCart);

      // Transfer each item to DB
      Promise.all(cartItemsFromLocal.map(item =>
        axios.post('http://localhost/summit_home_appliancies/php_controllar/contraollers/UpdateCart.php', {
          product_id: item.product_id,
          quantity: item.quantity,
          product_name: item.product_name,
          product_price: item.product_price,
          image: item.image,
        }, { withCredentials: true })
      ))
        .then(() => {
          localStorage.removeItem("cartItems");
          setHasSyncedLocalCart(true); // Prevent future syncs
          console.log("Local cart synced to DB");

          // Load updated cart from DB
          return axios.get('http://localhost/summit_home_appliancies/php_controllar/contraollers/UpdateCart.php', {
            withCredentials: true
          });
        })
        .then(res => {
          setCartItems(res.data);
        })
        .catch(err => {
          console.error("Error syncing cart:", err);
        });
    } else {
      // Load cart directly from DB
      axios.get('http://localhost/summit_home_appliancies/php_controllar/contraollers/UpdateCart.php', {
        withCredentials: true
      })
        .then(res => setCartItems(res.data))
        .catch(err => {
          console.error("Error loading cart from DB:", err);
          setCartItems([]);
        });
    }
  } else if (!isLoggedIn) {
    // Reset sync state and load local cart
    setHasSyncedLocalCart(false);
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      setCartItems([]);
    }
  }
}, [isLoggedIn]);

  
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);


  const addToCart = async (product, quantity = 1) => {
    if (isLoggedIn) {
      try {
        await axios.post('http://localhost/summit_home_appliancies/php_controllar/contraollers/UpdateCart.php', {
          product_id: product.product_id,
          quantity,
          product_name: product.product_name,
          product_price: product.product_price,
          image: product.image,
        }, { withCredentials: true });

        const response = await axios.get('http://localhost/summit_home_appliancies/php_controllar/contraollers/UpdateCart.php', {
          withCredentials: true
        });
        setCartItems(response.data);
        console.log("Cart updated from DB");
      } catch (error) {
        console.error("Error updating cart in DB:", error);
      }
    } else {
      const existingIndex = cartItems.findIndex(item => item.product_id === product.product_id);
      let updatedCart = [...cartItems];

      if (existingIndex >= 0) {
        updatedCart[existingIndex].quantity += quantity;
        updatedCart[existingIndex].total = updatedCart[existingIndex].quantity * updatedCart[existingIndex].product_price;
      } else {
        updatedCart.push({
          user_id: null,
          product_id: product.product_id,
          product_name: product.product_name,
          product_price: product.product_price,
          quantity,
          total: product.product_price * quantity,
          image: product.image,
        });
      }
      setCartItems(updatedCart);
    }
  };

  return (
    <>
      <Header addcart={cartItems} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSlider />
              <Trend user={products} addToCart={addToCart} />
              <Gallery />
              <CookerFinder />
              <Discription />
              <ByPrice user={products} />
              <ReelSection />
              <SummitSection />
              <Available />
              <Feedback />
              <Connectivity />
              <Blogs />
            </>
          }
        />
        {/* <Route
          path="/879/DetailProduct/:id"
          element={<><DetailProduct setaddcart={setCartItems} user={products} addToCart={addToCart} /><Blogs /></>}
        /> */}

        <Route
  path="/879/DetailProduct/:id"
  element={
    <>
      <DetailProduct
        setaddcart={setCartItems}
        user={products}
        addToCart={addToCart}
      />
      <Blogs />
    </>
  }
/>
      <Route path="/cart" element={<Cart setaddcart={setCartItems} isLoggedIn={isLoggedIn} addcart={cartItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contactus />} />
         <Route path="/checkout" element={<Checkout/>} />
          <Route path="/accountsPage" element={<AccountsPage/>} />
          <Route path="/trail" element={<Imran/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
