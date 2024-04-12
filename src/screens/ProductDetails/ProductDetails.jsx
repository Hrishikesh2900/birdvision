import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import Navbar from "../../components/Navbar/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = (productId) => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  };

  useEffect(() => {
    if (!product) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [product]);

  console.log(product);

  const handleAddToCart = () => {};

  const handleBuyNow = () => {};

  return (
    <>
      <Navbar />
      {loader ? (
        <div>Loading...</div>
      ) : (
        <div className="product-detail-container">
          <div className="product-detail-content">
            <div className="carousel-container">
              <Carousel>
                {product?.images.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`Product ${index + 1}`} />
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="product-info">
              <h2>{product?.title}</h2>
              <p>{product?.description}</p>
              <p>Price: ${product?.price}</p>
              {product?.discount && <p>Discount: {product?.discount}%</p>}
              <div className="rating-container">
                <span className="rating-label">Rating:</span>
                <div className="star-icons">
                  {Array.from({ length: product?.rating }, (_, index) => (
                    <AiFillStar key={index} className="star-icon" />
                  ))}
                </div>
              </div>
              <p>Brand: {product?.brand}</p>
              <p>Category: {product?.category}</p>
              <div className="button-container">
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={handleBuyNow}>Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
