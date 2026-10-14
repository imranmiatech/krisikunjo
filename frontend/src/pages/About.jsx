import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="pt-6">
      <div className="text-2xl text-center py-6 border-t border-gray-100">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* Brand Story Section */}
      <div className="my-10 flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
        <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-sm bg-gray-100 aspect-[4/3]">
          <img
            className="w-full h-full object-cover"
            src={assets.AboutImg}
            alt="TexHunt Atelier and Design Studio"
          />
        </div>
        
        <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-600 text-sm sm:text-base leading-relaxed">
          <p>
            <strong className="text-gray-900 font-semibold">TexHunt</strong> was founded on the conviction that everyday clothing should feel extraordinary. We bridge the gap between contemporary runway aesthetics and everyday practicality, crafting versatile apparel designed to make you feel confident, stylish, and comfortable in every setting.
          </p>
          <p>
            We take pride in our meticulous manufacturing process. From sourcing ethically harvested cotton, premium linen, and durable denim to collaborating with master patternmakers, every piece is engineered for lasting silhouette and enduring quality.
          </p>
          
          <div className="border-l-2 border-black pl-4 py-1">
            <h3 className="text-gray-900 font-bold tracking-wide uppercase text-sm mb-1">
              ✨ Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              To inspire individuality through thoughtfully designed, sustainable, and accessible clothing that seamlessly adapts to your dynamic lifestyle.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="my-20">
        <div className="text-center py-4">
          <Title text1={"WHY"} text2={"CHOOSE TEXHUNT"} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="border border-gray-200 rounded-xl p-8 sm:p-10 flex flex-col gap-4 bg-white shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-900">
              01
            </div>
            <h4 className="font-semibold text-gray-900 text-base">Uncompromised Quality</h4>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Every garment undergoes stringent fabric testing, pre-shrinking, and seam reinforcement to guarantee long-lasting wear and comfort.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-8 sm:p-10 flex flex-col gap-4 bg-white shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-900">
              02
            </div>
            <h4 className="font-semibold text-gray-900 text-base">Modern Contemporary Design</h4>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Our in-house design team crafts minimal, versatile cuts that move effortlessly with you from casual mornings to evening occasions.
            </p>
          </div>

          <div className="border border-gray-200 rounded-xl p-8 sm:p-10 flex flex-col gap-4 bg-white shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-900">
              03
            </div>
            <h4 className="font-semibold text-gray-900 text-base">Exceptional Customer Care</h4>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              Enjoy lightning-fast dispatch, transparent tracking, hassle-free 7-day exchanges, and friendly human support whenever you need assistance.
            </p>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
