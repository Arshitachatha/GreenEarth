import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addToCartStatus, setAddToCartStatus] = useState("idle");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products").then(
          (res) => res.json()
        );

        // Transform the data and set the state
        const transformedData = response.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          image: item.image,
          rating: item.rating["rate"],
          desc: item.description,
        }));

        const productData = transformedData.find(
          (p) => p.id === parseInt(id, 10)
        );
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]); // Add 'id' as a dependency to re-run the effect when 'id' changes

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    setAddToCartStatus("adding");

    setTimeout(() => {
      setAddToCartStatus("added");
    }, 1000);
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);
  };

  const calculateTotalPrice = () => {
    return product.price * quantity;
  };

  return (
    <div className="product-details-container fade-in">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>
        <b>Description:</b> {product.desc}
      </p>
      {/* <p>Weight: {product.weight}</p> */}
      <p>
        <b>Review</b> {product.review ? product.review : "Not Available"}
      </p>

      <div className="quantity-container">
        <label htmlFor="quantity">Quantity:</label>
        <select id="quantity" value={quantity} onChange={handleQuantityChange}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          {/* Add more options if needed */}
        </select>
      </div>
      <p className="total-price">Total Price: ${calculateTotalPrice()}</p>
      <button
        className={`add-to-cart-button ${
          addToCartStatus === "adding" ? "adding" : ""
        }`}
        onClick={handleAddToCart}
        disabled={addToCartStatus !== "idle"}
      >
        {addToCartStatus === "adding" ? "Adding..." : "Add to Cart"}
      </button>

      <Link to="/cart" className="go-to-cart-link">
        Go to Cart
      </Link>
    </div>
  );
};

export default ProductDetails;
