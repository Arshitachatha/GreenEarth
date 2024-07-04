import React from "react";
import "./cart.css";

const Cart = ({ cart, removeFromCart }) => {
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-head">Cart</h1>
      {cart.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <h5>{item.name}</h5>
                  <p>
                    <b>Price: ${item.price}</b>
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="remove-button"
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
