import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size: size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t border-gray-100 pt-10 min-h-[60vh]">
      <div className="text-2xl mb-6">
        <Title text1={"YOUR"} text2={"SHOPPING BAG"} />
      </div>

      {cartData.length > 0 ? (
        <div>
          <div className="divide-y divide-gray-100">
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => String(product._id) === String(item._id)
              );

              if (!productData) return null;
              const imgSrc = Array.isArray(productData.image) ? productData.image[0] : productData.image;

              return (
                <div
                  key={`${item._id}-${item.size}-${index}`}
                  className="py-4 text-gray-700 grid grid-cols-[3fr_1fr_0.5fr] sm:grid-cols-[4fr_1.5fr_0.5fr] items-center gap-4"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <img
                      className="w-16 sm:w-20 aspect-[3/4] object-cover object-top rounded-lg bg-gray-50"
                      src={imgSrc}
                      alt={productData.name}
                    />
                    <div>
                      <p className="text-xs sm:text-base font-semibold text-gray-900">
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-3 sm:gap-5 mt-1.5 text-xs sm:text-sm">
                        <p className="font-medium text-gray-900">
                          {currency}{productData.price}
                        </p>
                        <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-semibold uppercase">
                          Size: {item.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <input
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val > 0) {
                          updateQuantity(item._id, item.size, val);
                        }
                      }}
                      className="border border-gray-300 rounded max-w-16 sm:max-w-20 px-2 py-1.5 text-center text-sm outline-none focus:border-black"
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      aria-label="Remove item"
                      className="p-1.5 hover:bg-gray-100 rounded-full transition"
                    >
                      <img
                        className="w-4 cursor-pointer opacity-60 hover:opacity-100"
                        src={assets.remove_icon}
                        alt="Remove"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end my-12">
            <div className="w-full sm:w-[450px]">
              <CartTotal />
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black text-white text-xs font-bold tracking-widest uppercase my-8 px-8 py-4 rounded hover:bg-gray-800 transition active:scale-95 shadow-md w-full"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center gap-4">
          <p className="text-gray-400 text-lg">Your shopping bag is currently empty.</p>
          <Link
            to="/collection"
            className="bg-black text-white px-8 py-3.5 text-xs font-semibold tracking-wider uppercase rounded hover:bg-gray-800 transition"
          >
            DISCOVER THE COLLECTION
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
