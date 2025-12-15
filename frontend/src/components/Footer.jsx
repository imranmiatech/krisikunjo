import React from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.OO1} alt="" className="mb-5 w-32" />
          <p className="w-full md:2/3 text-gray-600">
            আমরা আধুনিক কৃষি প্রযুক্তি, ফসল ব্যবস্থাপনা ও টেকসই কৃষি সমাধানে কাজ
            করি। কৃষকদের জন্য নির্ভরযোগ্য তথ্য ও সহায়ক দিকনির্দেশনা প্রদানই
            আমাদের লক্ষ্য। উন্নত কৃষির মাধ্যমে দেশের খাদ্য নিরাপত্তা নিশ্চিত
            করাই আমাদের প্রতিশ্রুতি। কৃষকের উন্নয়নই আমাদের শক্তি এবং আমাদের
            অনুপ্রেরণা।
          </p>
        </div>
        <div>
          <p className="text-xl font-madium mb-5">কোম্পানি</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/"><li>হোম</li></Link>
            <Link to="/about"><li>আমাদের সম্পর্কে</li></Link>  
            <Link to="/contact"><li>যোগাযোগ</li></Link>
            
            <li>গোপনীয়তা নীতি</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-madium mb-5">আমাদের সাথে যোগাযোগ করুন</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+88 01943747529</li>
            <li>imran@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <div className="h-[1px] bg-black w-full px-10"></div>
        <p className="py-5 text-sm text-center">
          কপিরাইট ২০২৫ @ imran.com - সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </div>
  );
};

export default Footer;
