import React, { useEffect, useState, useContext } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from "../components/Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "../components/Card";

const Collections = () => {
  const [showFilter, setShowFilter] = useState(false);

  const { products } = useContext(shopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  // ✅ Toggle category
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // ✅ Toggle sub-category
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // ✅ Apply filter
  const applyFilter = () => {
    let productCopy = [...products];

    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Sorting logic
    if (sortType === "low-high") {
      productCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProduct(productCopy);
  };

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortType]);

  return (
    <div className="w-[99vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row items-start justify-start pt-[70px] overflow-x-hidden z-2">
      {/* Sidebar Filters */}
      <div
        className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] p-[20px] border-r border-[1px] border-gray-400 text-[#aaf5fa] lg:fixed ${
          showFilter ? "h-[45vh]" : "h-[8vh]"
        }`}
      >
        <p
          className="text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer"
          onClick={() => setShowFilter((prev) => !prev)}
        >
          FILTERS
          {!showFilter && <FaChevronRight className="text-[18px] md:hidden" />}
          {showFilter && <FaChevronDown className="text-[18px] md:hidden" />}
        </p>

        {/* Categories */}
        <div
          className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa]">CATEGORIES</p>
          <div className="flex flex-col items-start justify-start gap-[10px] mt-2">
            <label className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value="Men"
                className="w-3 h-3"
                onChange={toggleCategory}
              />{" "}
              Men
            </label>
            <label className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value="Woman"
                className="w-3 h-3"
                onChange={toggleCategory}
              />{" "}
              Woman
            </label>
            <label className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value="Kids"
                className="w-3 h-3"
                onChange={toggleCategory}
              />{" "}
              Kids
            </label>
          </div>
        </div>

        {/* Sub-Categories */}
        <div
          className={`border-[2px] border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600 ${
            showFilter ? "" : "hidden"
          } md:block`}
        >
          <p className="text-[18px] text-[#f8fafa]">SUB-CATEGORIES</p>
          <div className="flex flex-col items-start justify-start gap-[10px] mt-2">
            <label className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value="TopWear"
                className="w-3 h-3"
                onChange={toggleSubCategory}
              />{" "}
              TopWear
            </label>
            <label className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value="BottomWear"
                className="w-3 h-3"
                onChange={toggleSubCategory}
              />{" "}
              BottomWear
            </label>
            <label className="flex items-center gap-[10px] text-[16px] font-light">
              <input
                type="checkbox"
                value="WinterWear"
                className="w-3 h-3"
                onChange={toggleSubCategory}
              />{" "}
              WinterWear
            </label>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-[30vw] lg:ml-[20vw] p-5">
        {/* ALL COLLECTIONS header + sort dropdown */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mt-10">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            name="sort"
            id="sort"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="bg-slate-600 w-[60%] md:w-[190px] h-[50px] px-[10px] 
                       text-white rounded-lg hover:border-[#46d1f7] border-[2px] 
                       md:ml-0 self-start md:self-end mr-25"
          >
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="lg:w-[80vw] md:w-[60vw] mt-8 w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]">
          {filterProduct.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
