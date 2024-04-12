import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchResults.css";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = () => {
    fetch("https://dummyjson.com/products/search?q=phone")
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.products);
        setLoader(false);
      })
      .catch((error) => console.error("Error fetching search results:", error));
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div>Loading...</div>
      ) : (
        <div className="product-list">
          {searchResults.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-link"
            >
              <div key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <div className="product-details">
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
