import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import ProductList from "./productlist";
import ProductDetails from "./productdetails";
import Cart from "./cart";

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<ProductList handleAddToCart={handleAddToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={handleAddToCart} />}
        />
        <Route
          path="/cart"
          element={<Cart cart={cart} removeFromCart={removeFromCart} />}
        />
      </Routes>
    </>
  );
};

export default App;
