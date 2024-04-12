import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import "./ProductsList.css";
import { Link } from "react-router-dom";
import { setLoader } from "../../redux/loader/loaderSlice";
import { useSelector, useDispatch } from "react-redux";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader.isLoading);

  const productsPerPage = 10;

  const fetchProducts = () => {
    const skip = (currentPage - 1) * productsPerPage; // Calculate skip based on currentPage
    const apiUrl = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setCurrentProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setLoader(false));
        setProducts(data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
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
        <div>
          <div className="product-list">
            {currentProducts.map((product) => (
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
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <RiArrowLeftSLine />
            </button>
            {Array.from(
              { length: Math.ceil(products.length / productsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(products.length / productsPerPage)
              }
            >
              <RiArrowRightSLine />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
