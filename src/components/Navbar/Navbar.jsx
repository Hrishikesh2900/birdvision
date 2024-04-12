import React, { useState } from "react";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link to={`/search?q=${searchQuery}`}>
          <button>
            <FaSearch />
          </button>
        </Link>
      </div>
      <ul className="nav-menu">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <div className="nav-link">About Us</div>
        </li>
        <li className="nav-item">
          <FaShoppingCart />
        </li>
        <li className="nav-item">
          <FaUser />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
