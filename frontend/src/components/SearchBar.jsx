import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b border-gray-100 bg-white py-4 text-center">
      <div className="inline-flex items-center justify-between border border-gray-300 px-5 py-2.5 rounded-full w-full max-w-lg mx-auto shadow-sm focus-within:border-black transition">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-xs sm:text-sm text-gray-800 placeholder-gray-400"
          type="text"
          placeholder="Search garments, shirts, denim, dresses, jackets..."
          autoFocus
        />
        <img className="w-4 opacity-60 ml-2" src={assets.search_icon} alt="Search" />
      </div>
      <button
        onClick={() => setShowSearch(false)}
        aria-label="Close search"
        className="inline-block ml-4 p-1.5 align-middle hover:bg-gray-100 rounded-full transition"
      >
        <img
          className="w-3.5 opacity-60 hover:opacity-100"
          src={assets.cross_icon}
          alt="Close"
        />
      </button>
    </div>
  ) : null;
};

export default SearchBar;
