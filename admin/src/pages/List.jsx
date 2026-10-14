import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { currency, backendUrl } from '../App';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Are you sure you want to remove this garment from inventory?")) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Product removed from catalog!");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Filtered List
  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.subCategory && item.subCategory.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination Calculations
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const menCount = list.filter(item => item.category === "Men").length;
  const womenCount = list.filter(item => item.category === "Women").length;
  const kidsCount = list.filter(item => item.category === "Kids").length;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
            Catalog Inventory
          </h1>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Manage your fashion catalog, edit items, and monitor active stock
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchList}
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition active:scale-95"
          >
            <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Items</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 sm:mt-1">{list.length}</p>
          <p className="text-[9px] sm:text-[10px] text-slate-400">In database</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-500">Men</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 sm:mt-1">{menCount}</p>
          <p className="text-[9px] sm:text-[10px] text-slate-400">Apparel</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-rose-500">Women</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 sm:mt-1">{womenCount}</p>
          <p className="text-[9px] sm:text-[10px] text-slate-400">Apparel</p>
        </div>
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-500">Kids</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 sm:mt-1">{kidsCount}</p>
          <p className="text-[9px] sm:text-[10px] text-slate-400">Apparel</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-2">
        <div className="relative flex-1">
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
            placeholder="Search garment or category..."
            className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-xs sm:text-sm text-slate-800 outline-none focus:border-slate-900 transition"
          />
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-xs text-slate-400 hover:text-slate-700 font-semibold px-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Product List Container */}
      <div className='bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs'>
        {/* Table Header (Desktop only) */}
        <div className='hidden md:grid grid-cols-[1fr_3.5fr_1.8fr_1.2fr_1fr] items-center py-3 px-5 bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-400 uppercase tracking-widest'>
          <span>Garment</span>
          <span>Details</span>
          <span>Department</span>
          <span>Price</span>
          <span className='text-center'>Actions</span>
        </div>

        {/* Rows */}
        {loading ? (
          <div className="py-16 text-center text-sm text-slate-400 flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            <span>Synchronizing catalog...</span>
          </div>
        ) : currentItems.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {currentItems.map((item, index) => {
              const imgSrc = Array.isArray(item.image) ? item.image[0] : item.image;
              const categoryBadge =
                item.category === "Men"
                  ? "bg-blue-50 text-blue-700 border-blue-200/60"
                  : item.category === "Women"
                  ? "bg-rose-50 text-rose-700 border-rose-200/60"
                  : "bg-amber-50 text-amber-700 border-amber-200/60";

              return (
                <div
                  className='p-3.5 sm:px-5 flex items-center justify-between md:grid md:grid-cols-[1fr_3.5fr_1.8fr_1.2fr_1fr] gap-3 hover:bg-slate-50/70 transition'
                  key={item._id || index}
                >
                  {/* Left: Thumbnail & Main info */}
                  <div className="flex items-center gap-3 min-w-0 flex-1 md:contents">
                    <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200/60">
                      <img
                        className='w-full h-full object-cover object-top hover:scale-110 transition duration-300'
                        src={imgSrc}
                        alt={item.name}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">{item.name}</p>
                      
                      {/* Mobile extra row */}
                      <div className="flex items-center gap-2 mt-1 md:hidden">
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${categoryBadge}`}>
                          {item.category}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                          {currency}{item.price}
                        </span>
                      </div>

                      {/* Desktop sizes preview */}
                      <div className="hidden md:flex items-center gap-1.5 mt-1">
                        {item.sizes && item.sizes.slice(0, 4).map((s, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold">
                            {s}
                          </span>
                        ))}
                        {item.bestseller && (
                          <span className="ml-1.5 text-[10px] bg-amber-50 text-amber-700 border border-amber-200/60 font-bold px-1.5 py-0.5 rounded-full">
                            ★ Bestseller
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Category */}
                  <div className="hidden md:flex items-center gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${categoryBadge}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {item.subCategory}
                    </span>
                  </div>

                  {/* Desktop Price */}
                  <div className="hidden md:block">
                    <span className="text-sm font-extrabold text-slate-900">
                      {currency}{item.price}
                    </span>
                  </div>

                  {/* Delete Action */}
                  <div className="text-right md:text-center flex-shrink-0">
                    <button
                      onClick={() => removeProduct(item._id)}
                      className='p-2 rounded-lg sm:rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200'
                      title="Delete Product"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-16 text-center text-sm text-slate-400">
            No garments match your search criteria.
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-2 text-xs text-slate-500">
          <p className="text-center sm:text-left">
            Showing <strong className="text-slate-900 font-bold">{indexOfFirstItem + 1}</strong> to{" "}
            <strong className="text-slate-900 font-bold">
              {Math.min(indexOfLastItem, filteredList.length)}
            </strong>{" "}
            of <strong className="text-slate-900 font-bold">{filteredList.length}</strong> items
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

export default List;
