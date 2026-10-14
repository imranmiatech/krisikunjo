import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { currency, backendUrl } from "../App";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order status updated!");
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Filtered Orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const customerName = `${order.address?.firstName || ""} ${order.address?.lastName || ""}`.toLowerCase();
    const phone = (order.address?.phone || "").toString();
    const matchesSearch =
      customerName.includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  // Pagination Calculations
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage) || 1;
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = (currentPage - 1) * ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const deliveredCount = orders.filter(o => o.status === "Delivered").length;
  const pendingCount = orders.length - deliveredCount;

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
      case "Shipped":
      case "Out for delivery":
        return "bg-blue-50 text-blue-700 border-blue-200/60";
      case "Packing":
        return "bg-purple-50 text-purple-700 border-purple-200/60";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200/60";
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Customer Orders
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Track customer shipments, manage fulfillment, and update delivery statuses
          </p>
        </div>

        <button
          onClick={fetchAllOrders}
          className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition active:scale-95 w-fit"
        >
          <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Orders</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 sm:mt-1">{orders.length}</p>
          <p className="text-[9px] sm:text-[10px] text-slate-400">All time</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-600">Volume</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 sm:mt-1">{currency}{totalRevenue.toLocaleString()}</p>
          <p className="text-[9px] sm:text-[10px] text-slate-400">Gross sales</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-500">Processing</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 sm:mt-1">{pendingCount}</p>
          <p className="text-[9px] sm:text-[10px] text-slate-400">Pending</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-500">Delivered</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 sm:mt-1">{deliveredCount}</p>
          <p className="text-[9px] sm:text-[10px] text-slate-400">Completed</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search name or phone..."
            className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-xs sm:text-sm text-slate-800 outline-none focus:border-slate-900 transition"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-slate-200 rounded-lg sm:rounded-xl px-3 py-1.5 sm:py-2 text-xs font-semibold outline-none bg-slate-50 cursor-pointer text-slate-700 w-full sm:w-auto"
        >
          <option value="All">All Statuses ({orders.length})</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Orders Cards List */}
      {loading ? (
        <div className="py-20 text-center text-sm text-slate-400 bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading orders...</span>
        </div>
      ) : currentOrders.length > 0 ? (
        <div className="flex flex-col gap-3 sm:gap-4">
          {currentOrders.map((order, index) => (
            <div
              className="bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6"
              key={order._id || index}
            >
              {/* Order Info & Customer Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    #{indexOfFirstOrder + index + 1}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {new Date(order.date).toLocaleDateString("en-US", {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(order.status)}`}>
                    ● {order.status}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {order.address?.firstName} {order.address?.lastName}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-500 mt-1.5 leading-relaxed">
                  <p>
                    <strong className="text-slate-700">Phone:</strong> {order.address?.phone || "N/A"}
                  </p>
                  <p>
                    <strong className="text-slate-700">Email:</strong> {order.address?.email || "N/A"}
                  </p>
                  <p className="sm:col-span-2">
                    <strong className="text-slate-700">Address:</strong> {order.address?.message}, {order.address?.thana}, {order.address?.district} ({order.address?.union})
                  </p>
                </div>

                {/* Ordered Items Preview */}
                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                    Garments In Package:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {order.items?.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-200/60 text-slate-800 px-2 py-0.8 rounded-lg"
                      >
                        <span className="font-semibold text-[11px] sm:text-xs">{item.name}</span>
                        <span className="text-slate-400 text-[11px]">×{item.quantity}</span>
                        <span className="bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                          {item.size}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Amount, Payment & Status Controls */}
              <div className="lg:w-64 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-3 lg:pt-0 lg:pl-6 gap-3 sm:gap-4">
                <div className="flex items-center justify-between lg:block">
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Billed</p>
                    <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                      {currency}{order.amount}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 lg:mt-1.5 text-xs">
                    <span className="text-slate-500 text-[11px] sm:text-xs">{order.paymentMethod}</span>
                    <span className="text-slate-300">•</span>
                    <span className={`font-semibold text-[11px] sm:text-xs ${order.payment ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {order.payment ? 'Paid' : 'Unpaid (COD)'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                    Update Status
                  </label>
                  <select
                    className="w-full border border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 text-xs font-bold outline-none bg-slate-50 focus:bg-white text-slate-800 cursor-pointer shadow-xs transition"
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-sm text-slate-400 bg-white rounded-xl sm:rounded-2xl border border-slate-200/80">
          No customer orders match your criteria.
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-2 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            Showing <strong className="text-slate-900 font-bold">{indexOfFirstOrder + 1}</strong> to{" "}
            <strong className="text-slate-900 font-bold">
              {Math.min(indexOfLastOrder, filteredOrders.length)}
            </strong>{" "}
            of <strong className="text-slate-900 font-bold">{filteredOrders.length}</strong> orders
          </p>

          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-slate-700 shadow-xs transition text-xs"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl text-xs font-bold transition ${
                  currentPage === number
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-slate-700 shadow-xs transition text-xs"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;