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
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

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
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter and map products to display collection items */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          ফিল্টার
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.drop_down}
            alt=""
          />
        </p>

        {/* CATEGORY FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">ক্যাটাগরি/শ্রেণী</p>
          <div className="flex flex-col gap-2 text-gray-700 text-sm font-light">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"ফসল ও উদ্ভিদ"}
                onChange={toggleCategory}
              />{" "}
              ফসল ও উদ্ভিদ
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"কৃষি সরঞ্জাম"}
                onChange={toggleCategory}
              />{" "}
              কৃষি সরঞ্জাম
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"সার ও কীটনাশক"}
                onChange={toggleCategory}
              />{" "}
              সার ও কীটনাশক
            </p>
          </div>
        </div>
        {/* Subcategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">প্রকার</p>
          <div className="flex flex-col gap-2 text-gray-700 text-sm font-light">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"বীজ"}
                onChange={toggleSubCategory}
              />{" "}
              বীজ
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"চারা"}
                onChange={toggleSubCategory}
              />{" "}
              চারা
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"ফল উদ্ভিদ"}
                onChange={toggleSubCategory}
              />{" "}
              ফল উদ্ভিদ
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"সমস্ত"} text2={"সংগ্রহ"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relavent">ক্রমবিন্যাস করুন: প্রাসঙ্গিক</option>
            <option value="low-high">ক্রমবিন্যাস করুন: কম থেকে বেশি</option>
            <option value="high-low">ক্রমবিন্যাস করুন: বেশি থেকে কম</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 gap-y-6">
          {filteredProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
