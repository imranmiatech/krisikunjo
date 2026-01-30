import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import {toast} from 'react-toastify'
const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
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

      const response = await axios.post("https://krisikunjo-backend.vercel.app/api/product/add",formData, { headers: {token}});

      if(response.data.success){
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        } else {
          toast.error(response.data.message)
        }
    } catch (error) {
       console.log(error)
       toast.error(error.message)
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 border border-black"
              src={!image1 ? assets.upload : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 border border-black"
              src={!image2 ? assets.upload : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 border border-black"
              src={!image3 ? assets.upload : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 border border-black"
              src={!image4 ? assets.upload : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here!"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="write content heree"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="কৃষি সরঞ্জাম">কৃষি সরঞ্জাম</option>
            <option value="সার ও কীটনাশক">সার ও কীটনাশক</option>
            <option value="ফসল ও উদ্ভিদ">ফসল ও উদ্ভিদ</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="ফল উদ্ভিদ">ফল উদ্ভিদ</option>
            <option value="চারা">চারা</option>
            <option value="বীজ">বীজ</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="Enter price in BDT."
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("৫০ পিছ")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "৫০ পিছ"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("৫০ পিছ") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              ৫০ পিছ
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("১০০ পিছ")
                  ? prev.filter((item) => item !== "১০০ পিছ")
                  : [...prev, "১০০ পিছ"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("১০০ পিছ") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              ১০০ পিছ
            </p>
          </div>
           <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("১০০০ পিছ")
                  ? prev.filter((item) => item !== "১০০০ পিছ")
                  : [...prev, "১০০০ পিছ"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("১০০০ পিছ") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              ১০০০ পিছ
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("২৫০০০ পিছ")
                  ? prev.filter((item) => item !== "২৫০০০ পিছ")
                  : [...prev, "২৫০০০ পিছ"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("২৫০০০ পিছ") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              ২৫০০০ পিছ
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("ছোট")
                  ? prev.filter((item) => item !== "ছোট")
                  : [...prev, "ছোট"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("ছোট") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              ছোট
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("মাঝারি")
                  ? prev.filter((item) => item !== "মাঝারি")
                  : [...prev, "মাঝারি"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("মাঝারি") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              মাঝারি
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("বড়")
                  ? prev.filter((item) => item !== "বড়")
                  : [...prev, "বড়"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("বড়") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              বড়
            </p>
          </div>
        </div>
      </div>
      <div>
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          className="flex gap-2 mt-2"
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;

// import React, { useState } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Add = ({ token }) => {
//   const [image1, setImage1] = useState(false);
//   const [image2, setImage2] = useState(false);
//   const [image3, setImage3] = useState(false);
//   const [image4, setImage4] = useState(false);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [bestseller, setBestseller] = useState(false);

//   // size input (UPDATED)
//   const [sizes, setSizes] = useState([]);
//   const [sizeInput, setSizeInput] = useState("");

//   // add size on Enter / comma
//   const handleAddSize = (e) => {
//     if (e.key === "Enter" || e.key === ",") {
//       e.preventDefault();
//       const value = sizeInput.replace(",", "").trim();

//       if (value && !sizes.includes(value)) {
//         setSizes((prev) => [...prev, value]);
//       }
//       setSizeInput("");
//     }
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();

//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("subCategory", subCategory);
//       formData.append("bestseller", bestseller);
//       formData.append("sizes", JSON.stringify(sizes));

//       image1 && formData.append("image1", image1);
//       image2 && formData.append("image2", image2);
//       image3 && formData.append("image3", image3);
//       image4 && formData.append("image4", image4);

//       const response = await axios.post(
//         "https://krisikunjo-backend.vercel.app/api/product/add",
//         formData,
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);

//         setName("");
//         setDescription("");
//         setCategory("");
//         setSubCategory("");
//         setPrice("");
//         setImage1(false);
//         setImage2(false);
//         setImage3(false);
//         setImage4(false);
//         setSizes([]);
//         setSizeInput("");
//         setBestseller(false);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col w-full items-start gap-3"
//     >
//       {/* Upload images */}
//       <div>
//         <p className="mb-2">Upload Image</p>
//         <div className="flex gap-2">
//           {[image1, image2, image3, image4].map((img, i) => (
//             <label key={i} htmlFor={`image${i + 1}`}>
//               <img
//                 className="w-20 border border-black"
//                 src={!img ? assets.upload : URL.createObjectURL(img)}
//                 alt=""
//               />
//               <input
//                 type="file"
//                 hidden
//                 id={`image${i + 1}`}
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (i === 0) setImage1(file);
//                   if (i === 1) setImage2(file);
//                   if (i === 2) setImage3(file);
//                   if (i === 3) setImage4(file);
//                 }}
//               />
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Product name */}
//       <div className="w-full">
//         <p className="mb-2">Product Name</p>
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full max-w-[500px] px-3 py-2"
//           type="text"
//           placeholder="Type here!"
//           required
//         />
//       </div>

//       {/* Description */}
//       <div className="w-full">
//         <p className="mb-2">Product Description</p>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full max-w-[500px] px-3 py-2"
//           placeholder="Write description"
//           required
//         />
//       </div>

//       {/* Category & price */}
//       <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
//         <div>
//           <p className="mb-2">Product Category</p>
//           <select
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full px-3 py-2"
//           >
//             <option value="">Select</option>
//             <option value="কৃষি সরঞ্জাম">কৃষি সরঞ্জাম</option>
//             <option value="সার ও কীটনাশক">সার ও কীটনাশক</option>
//             <option value="ফসল ও উদ্ভিদ">ফসল ও উদ্ভিদ</option>
//           </select>
//         </div>

//         <div>
//           <p className="mb-2">Sub Category</p>
//           <select
//             onChange={(e) => setSubCategory(e.target.value)}
//             className="w-full px-3 py-2"
//           >
//             <option value="">Select</option>
//             <option value="ফল উদ্ভিদ">ফল উদ্ভিদ</option>
//             <option value="চারা">চারা</option>
//             <option value="বীজ">বীজ</option>
//           </select>
//         </div>

//         <div>
//           <p className="mb-2">Product Price</p>
//           <input
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full px-3 py-2 sm:w-[120px]"
//             type="number"
//             placeholder="BDT"
//           />
//         </div>
//       </div>

//       {/* Size / quantity input */}
//       <div>
//         <p className="mb-2">Product size / quantity</p>
//         <input
//           type="text"
//           placeholder="100pcs, 2 fit, 5kg"
//           value={sizeInput}
//           onChange={(e) => setSizeInput(e.target.value)}
//           onKeyDown={handleAddSize}
//           className="border px-3 py-2 w-full max-w-[300px] mb-2"
//         />

//         <div className="flex gap-2 flex-wrap">
//           {sizes.map((item, index) => (
//             <span
//               key={index}
//               onClick={() =>
//                 setSizes((prev) => prev.filter((_, i) => i !== index))
//               }
//               className="bg-pink-100 px-3 py-1 rounded cursor-pointer"
//             >
//               {item} ❌
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* Bestseller */}
//       <div>
//         <input
//           type="checkbox"
//           checked={bestseller}
//           onChange={() => setBestseller((prev) => !prev)}
//           id="bestseller"
//         />
//         <label htmlFor="bestseller" className="ml-2 cursor-pointer">
//           Add to bestseller
//         </label>
//       </div>

//       <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
//         ADD
//       </button>
//     </form>
//   );
// };

// export default Add;
