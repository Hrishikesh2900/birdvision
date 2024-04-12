import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { Carousel } from "react-responsive-carousel";
import Navbar from "../../components/Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../../redux/loader/loaderSlice";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ProductDetail.css";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const ProductDetail = () => {
  const { productId } = useParams();
  const loader = useSelector((state) => state.loader.isLoading);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  const fetchProduct = (productId) => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        dispatch(setLoader(false));
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        dispatch(setLoader(false));
      });
  };

  const handleAddToCart = () => {};

  const handleBuyNow = () => {};

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  useEffect(() => {
    dispatch(setLoader(true));
  }, []);

  return (
    <>
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
