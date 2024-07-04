import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./productlist.css";

const ProductList = () => {
  const [prod, setProd] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products').then(res => res.json());

        const transformedData = response.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          image: item.image,
          rating: item.rating['rate']
        }));

        setProd(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const renderProductCards = () => {
    let sortedProducts = [...prod];

    if (sortOption === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    return sortedProducts.map((product) => (
      <Link to={`/product/${product.id}`} key={product.id}>
        <div className="product-card">
          <img src={product.image} alt={product.name} />
          <h5>{product.name}</h5>
          <p>Price: ${product.price}</p>
        </div>
      </Link>
    ));
  };

  return (
    <div className="product-list-container">
      <div className="header-container">
        <h4 className="title">Our Products</h4>
        <div className="sort-by-container">
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="product-grid">{renderProductCards()}</div>
    </div>
  );
};

export default ProductList;
