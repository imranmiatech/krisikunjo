import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-neutral-900 text-neutral-300 text-[10px] sm:text-[11px] font-medium tracking-widest text-center py-2 px-4 uppercase">
        <span>Complimentary Express Shipping on orders over BDT 3,000</span>
        <span className="mx-2 hidden sm:inline">•</span>
        <span className="hidden sm:inline">Use code <strong className="text-white font-bold tracking-wider underline">TEXHUNT10</strong> for 10% off</span>
      </div>

      <header className="sticky top-0 z-50 bg-[#fafafa]/95 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="flex items-center justify-between py-4 font-medium max-w-7xl mx-auto">
          {/* Brand Logo */}
          <Link to="/" className="flex items-baseline gap-1 group">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-widest text-black group-hover:text-gray-700 transition">
              TEXHUNT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block"></span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden sm:flex items-center gap-8 text-xs font-semibold tracking-wider text-gray-700 uppercase">
            <NavLink className="flex flex-col items-center gap-1 hover:text-black transition" to="/">
              HOME
              <hr className="w-2/4 border-none h-[2px] bg-black hidden" />
            </NavLink>
            <NavLink className="flex flex-col items-center gap-1 hover:text-black transition" to="/collection">
              COLLECTION
              <hr className="w-2/4 border-none h-[2px] bg-black hidden" />
            </NavLink>
            <NavLink className="flex flex-col items-center gap-1 hover:text-black transition" to="/about">
              ABOUT
              <hr className="w-2/4 border-none h-[2px] bg-black hidden" />
            </NavLink>
            <NavLink className="flex flex-col items-center gap-1 hover:text-black transition" to="/contact">
              CONTACT
              <hr className="w-2/4 border-none h-[2px] bg-black hidden" />
            </NavLink>
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-5 sm:gap-6">
            <button
              onClick={() => setShowSearch(true)}
              aria-label="Search clothing"
              className="p-1.5 rounded-full hover:bg-gray-100 transition"
            >
              <img
                src={assets.search_icon}
                alt="Search"
                className="w-4 sm:w-5 cursor-pointer opacity-80 hover:opacity-100"
              />
            </button>

            {/* User Account Dropdown */}
            <div className="group relative">
              <button
                onClick={() => (token ? null : navigate("/login"))}
                aria-label="User Account"
                className="p-1.5 rounded-full hover:bg-gray-100 transition flex items-center"
              >
                <img
                  className="w-5 sm:w-6 cursor-pointer opacity-80 hover:opacity-100"
                  src={assets.user}
                  alt="Account"
                />
              </button>

              {token && (
                <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-3 z-50">
                  <div className="flex flex-col gap-2 w-44 py-3 px-4 bg-white text-gray-700 rounded-lg shadow-xl border border-gray-100 text-sm">
                    <p className="cursor-pointer hover:text-black font-medium py-1">My Profile</p>
                    <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black font-medium py-1">
                      My Orders
                    </p>
                    <hr className="border-gray-100" />
                    <p onClick={logout} className="cursor-pointer text-red-600 hover:text-red-700 font-medium py-1">
                      Sign Out
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <NavLink to="/cart" className="relative p-1.5 rounded-full hover:bg-gray-100 transition">
              <img src={assets.cart_icons} alt="Cart" className="w-5 min-w-5 opacity-85 hover:opacity-100" />
              <span className="absolute right-0 top-0 w-4 h-4 text-center leading-4 bg-black text-white rounded-full text-[10px] font-bold">
                {getCartCount()}
              </span>
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setVisible(true)}
              aria-label="Toggle Navigation"
              className="sm:hidden p-1.5"
            >
              <img
                src={assets.menu_icons}
                alt="Menu"
                className="w-5 cursor-pointer"
              />
            </button>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`fixed top-0 right-0 bottom-0 z-50 overflow-hidden bg-white transition-all duration-300 shadow-2xl ${
              visible ? "w-3/4 max-w-xs" : "w-0"
            }`}
          >
            <div className="flex flex-col text-gray-700 h-full">
              <div
                onClick={() => setVisible(false)}
                className="flex items-center gap-4 p-5 cursor-pointer border-b border-gray-100"
              >
                <img src={assets.drop_down} alt="" className="h-4 rotate-90" />
                <p className="font-semibold text-sm tracking-wide uppercase">Close Menu</p>
              </div>
              <div className="flex flex-col py-4 text-sm font-medium">
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-3 px-6 hover:bg-gray-50 transition border-b border-gray-50"
                  to="/"
                >
                  HOME
                </NavLink>
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-3 px-6 hover:bg-gray-50 transition border-b border-gray-50"
                  to="/collection"
                >
                  COLLECTION
                </NavLink>
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-3 px-6 hover:bg-gray-50 transition border-b border-gray-50"
                  to="/about"
                >
                  ABOUT
                </NavLink>
                <NavLink
                  onClick={() => setVisible(false)}
                  className="py-3 px-6 hover:bg-gray-50 transition border-b border-gray-50"
                  to="/contact"
                >
                  CONTACT
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
