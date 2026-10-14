import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState(["M", "L", "XL"]);
  const [loading, setLoading] = useState(false);

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "30", "32", "34", "36"];

  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes((prev) => prev.filter((item) => item !== size));
    } else {
      setSizes((prev) => [...prev, size]);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image1 && !image2 && !image3 && !image4) {
      return toast.error("Please upload at least one image");
    }
    if (sizes.length === 0) {
      return toast.error("Please select at least one size");
    }

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Garment added to catalog successfully!");
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
          Add New Garment
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
          Upload fashion product visuals, specify categories, sizes, and pricing
        </p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="w-full bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 p-4 sm:p-8 shadow-xs flex flex-col gap-5 sm:gap-6"
      >
        {/* Image Upload Grid */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Product Photography (Up to 4 angles)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { id: "image1", state: image1, setter: setImage1, label: "Front View" },
              { id: "image2", state: image2, setter: setImage2, label: "Back View" },
              { id: "image3", state: image3, setter: setImage3, label: "Model Fit" },
              { id: "image4", state: image4, setter: setImage4, label: "Close-up" },
            ].map((img, i) => (
              <label key={i} htmlFor={img.id} className="cursor-pointer group">
                <div className="aspect-[3/4] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center overflow-hidden hover:border-slate-900 transition-all bg-slate-50/70 relative">
                  {img.state ? (
                    <>
                      <img
                        className="w-full h-full object-cover"
                        src={URL.createObjectURL(img.state)}
                        alt=""
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          img.setter(false);
                        }}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-slate-900/80 text-white flex items-center justify-center text-xs hover:bg-rose-600 transition"
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-slate-400 p-2 text-center">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-200/60 flex items-center justify-center text-slate-600 font-bold group-hover:scale-110 transition">
                        +
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {img.label}
                      </span>
                    </div>
                  )}
                </div>
                <input
                  onChange={(e) => img.setter(e.target.files[0])}
                  type="file"
                  id={img.id}
                  hidden
                  accept="image/*"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Garment Title */}
        <div className="w-full">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Garment Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm outline-none focus:bg-white focus:border-slate-900 transition font-medium"
            type="text"
            placeholder="e.g. Men's Minimalist Linen Casual Shirt"
            required
          />
        </div>

        {/* Garment Description */}
        <div className="w-full">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Description & Weave Details
          </label>
          <textarea
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm outline-none focus:bg-white focus:border-slate-900 transition font-medium resize-none leading-relaxed"
            placeholder="Describe the fabric blend, tailored cut, styling tips, and wash instructions..."
            required
          />
        </div>

        {/* Category, SubCategory, Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-slate-900 bg-slate-50/50 cursor-pointer"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Sub Category
            </label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold outline-none focus:border-slate-900 bg-slate-50/50 cursor-pointer"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Price (BDT)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                BDT
              </span>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="w-full pl-11 pr-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm outline-none focus:bg-white focus:border-slate-900 font-bold"
                type="number"
                min="1"
                placeholder="1950"
                required
              />
            </div>
          </div>
        </div>

        {/* Sizes Selector */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Available Sizes
            </label>
            <span className="text-[10px] sm:text-[11px] text-slate-400">Selected: {sizes.join(", ") || "None"}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {availableSizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold border transition-all duration-200 ${
                  sizes.includes(size)
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Bestseller Option */}
        <div className="pt-1">
          <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <input
              onChange={() => setBestseller((prev) => !prev)}
              checked={bestseller}
              className="w-4 h-4 sm:w-5 sm:h-5 accent-slate-900 rounded cursor-pointer"
              type="checkbox"
            />
            <div>
              <span className="text-xs font-bold text-slate-900 block">Feature in Bestsellers</span>
              <span className="text-[10px] sm:text-[11px] text-slate-400 block">Highlight on store homepage</span>
            </div>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            disabled={loading}
            type="submit"
            className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-slate-900 text-white text-xs font-bold tracking-widest uppercase rounded-lg sm:rounded-xl hover:bg-slate-800 transition active:scale-95 disabled:opacity-50 shadow-md shadow-slate-900/10 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding to Catalog...</span>
              </>
            ) : (
              <span>Add Garment to Store</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
