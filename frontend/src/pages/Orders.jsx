import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrderData = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      if (response.data.success && response.data.orders) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          if (Array.isArray(order.items)) {
            order.items.forEach((item) => {
              allOrdersItem.push({
                ...item,
                status: order.status || "Order Placed",
                payment: order.payment,
                paymentMethod: order.paymentMethod || "Cash on Delivery",
                date: order.date || Date.now(),
              });
            });
          }
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log("Orders fetch notice:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t border-gray-100 pt-12 min-h-[60vh]">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {!token ? (
        <div className="py-20 text-center flex flex-col items-center gap-4">
          <p className="text-gray-500">Please sign in to view your order history.</p>
          <Link
            to="/login"
            className="bg-black text-white px-8 py-3 text-xs font-semibold tracking-wider uppercase rounded"
          >
            SIGN IN
          </Link>
        </div>
      ) : orderData.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {orderData.map((item, index) => {
            const imgSrc = Array.isArray(item.image) ? item.image[0] : item.image;
            return (
              <div
                key={index}
                className="py-5 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-4 sm:gap-6 text-sm">
                  <img
                    className="w-16 sm:w-20 aspect-[3/4] object-cover object-top rounded-lg bg-gray-50"
                    src={imgSrc}
                    alt={item.name}
                  />
                  <div>
                    <p className="sm:text-base font-semibold text-gray-900">{item.name}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs sm:text-sm text-gray-600">
                      <p className="font-bold text-gray-900">
                        {currency}{item.price}
                      </p>
                      <span>Quantity: {item.quantity}</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-semibold uppercase">
                        Size: {item.size}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Date: <span className="text-gray-700">{new Date(item.date).toLocaleDateString()}</span>
                    </p>
                    <p className="text-xs text-gray-400">
                      Payment: <span className="text-gray-700">{item.paymentMethod}</span>
                    </p>
                  </div>
                </div>

                <div className="md:w-1/2 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 uppercase tracking-wide">
                      {item.status}
                    </p>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className="border border-gray-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded hover:bg-gray-50 transition"
                  >
                    Track Status
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center gap-4">
          <p className="text-gray-400 text-base">You haven't placed any orders yet.</p>
          <Link
            to="/collection"
            className="bg-black text-white px-8 py-3.5 text-xs font-semibold tracking-wider uppercase rounded hover:bg-gray-800 transition"
          >
            START SHOPPING
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;