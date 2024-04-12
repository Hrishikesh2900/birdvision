import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import "./ProductsList.css";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

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

  return (
    <div>
      <Navbar />
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
  );
};

export default ProductsList;
