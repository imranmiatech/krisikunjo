import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const val = e.target.value;
    if (category.includes(val)) {
      setCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setCategory((prev) => [...prev, val]);
    }
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    if (subCategory.includes(val)) {
      setSubCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setSubCategory((prev) => [...prev, val]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products ? products.slice() : [];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilteredProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filteredProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilteredProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilteredProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t border-gray-100">
      {/* Filter Sidebar */}
      <div className="min-w-60">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-base font-semibold flex items-center cursor-pointer gap-2 uppercase tracking-wider text-gray-900"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform ${showFilter ? "rotate-90" : ""}`}
            src={assets.drop_down}
            alt=""
          />
        </button>

        {/* CATEGORY FILTER */}
        <div
          className={`border border-gray-200 rounded-lg p-5 mt-4 bg-white ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-900">
            CATEGORIES
          </p>
          <div className="flex flex-col gap-2.5 text-gray-600 text-sm">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-black">
                <input
                  className="w-4 h-4 accent-black rounded cursor-pointer"
                  type="checkbox"
                  value={cat}
                  checked={category.includes(cat)}
                  onChange={toggleCategory}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory / Type Filter */}
        <div
          className={`border border-gray-200 rounded-lg p-5 my-5 bg-white ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-900">
            TYPE
          </p>
          <div className="flex flex-col gap-2.5 text-gray-600 text-sm">
            {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-black">
                <input
                  className="w-4 h-4 accent-black rounded cursor-pointer"
                  type="checkbox"
                  value={type}
                  checked={subCategory.includes(type)}
                  onChange={toggleSubCategory}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Product Catalog */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
            <p className="text-xs text-gray-400 mt-[-6px]">
              Showing {filteredProducts.length} items
            </p>
          </div>

          {/* Product Sort */}
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-xs sm:text-sm text-gray-700 bg-white outline-none cursor-pointer"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Price: Low to High</option>
            <option value="high-low">Sort by: Price: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 gap-y-8">
            {filteredProducts.map((item, index) => (
              <ProductItem
                key={item._id || index}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400">
            <p className="text-base font-medium">No garments matched your selected filters.</p>
            <button
              onClick={() => {
                setCategory([]);
                setSubCategory([]);
              }}
              className="mt-4 text-xs font-semibold underline text-black uppercase"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
