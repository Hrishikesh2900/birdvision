import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsList from "./screens/ProductsList/ProductsList";
import ProductDetail from "./screens/ProductDetails/ProductDetails";
import SearchResults from "./screens/SearchResults/SearchResults";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} exact />
        <Route path="/product/:productId" element={<ProductDetail />} exact />
        <Route exact path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
};

export default App;
