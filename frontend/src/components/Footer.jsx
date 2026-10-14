import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-gray-200 pt-16 pb-8 text-gray-600 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14 max-w-7xl mx-auto">
        {/* Brand Information */}
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex items-baseline gap-1 mb-4 group">
            <span className="text-2xl font-extrabold tracking-widest text-black">
              TEXHUNT
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block"></span>
          </Link>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-md">
            TexHunt is a contemporary clothing brand combining modern tailoring with breathable, durable fabrics. We design timeless staples and streetwear collections engineered for everyday confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <p className="text-xs font-bold tracking-wider uppercase text-gray-900 mb-4">
            QUICK LINKS
          </p>
          <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-500">
            <Link to="/" className="hover:text-black transition">Home</Link>
            <Link to="/collection" className="hover:text-black transition">All Collections</Link>
            <Link to="/about" className="hover:text-black transition">About TexHunt</Link>
            <Link to="/contact" className="hover:text-black transition">Customer Care</Link>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <p className="text-xs font-bold tracking-wider uppercase text-gray-900 mb-4">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-gray-500">
            <li>
              <a
                href="tel:+8801739299521"
                className="hover:text-black transition"
              >
                +880 1739-299521
              </a>
            </li>
            <li>
              <a
                href="mailto:support@texhunt.com"
                className="hover:text-black transition"
              >
                support@texhunt.com
              </a>
            </li>
            <li className="text-gray-400">
              Banani 11, Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <p>© 2026 TexHunt. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-gray-600 cursor-pointer">Terms of Service</span>
          <span className="hover:text-gray-600 cursor-pointer">Shipping & Returns</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
