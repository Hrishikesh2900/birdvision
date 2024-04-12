import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./SearchResults.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLoader } from "../../redux/loader/loaderSlice";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const loader = useSelector((state) => state.loader.isLoading);
  const dispatch = useDispatch();

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const fetchSearchResults = () => {
    fetch("https://dummyjson.com/products/search?q=phone")
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.products);
        dispatch(setLoader(false));
      })
      .catch((error) => {
        dispatch(setLoader(false));
        console.error("Error fetching search results:", error);
      });
  };

  useEffect(() => {
    fetchSearchResults();
    dispatch(setLoader(true));
  }, []);

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="loader-container">
          <ClipLoader
            color={"#123abc"}
            loading={loader}
            css={override}
            size={150}
          />
        </div>
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
