import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm my-4">
      {/* Hero left side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16">
        <div className="text-gray-800 max-w-md">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 md:w-11 h-[2px] bg-black"></span>
            <p className="font-semibold text-xs md:text-sm tracking-widest uppercase text-gray-600">
              OUR BESTSELLERS
            </p>
          </div>
          
          <h1 className="prata-regular text-3xl sm:text-4xl lg:text-5xl leading-tight font-normal text-gray-900 mb-4">
            LATEST ARRIVALS
          </h1>

          <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
            Elevate your personal aesthetic with our newly curated collection of contemporary cuts, refined textures, and timeless everyday silhouettes.
          </p>

          <Link
            to="/collection"
            className="inline-flex items-center gap-3 group text-xs sm:text-sm font-semibold tracking-wider uppercase text-black hover:text-gray-600 transition"
          >
            <span>SHOP NOW</span>
            <span className="w-8 md:w-11 h-[1.5px] bg-black group-hover:w-16 transition-all duration-300"></span>
          </Link>
        </div>
      </div>

      {/* Hero right side */}
      <div className="w-full sm:w-1/2 relative min-h-[300px] sm:min-h-[440px] bg-gray-100 overflow-hidden">
        <img
          className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
          src={assets.Hero}
          alt="TexHunt Fashion Collection"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Hero;
