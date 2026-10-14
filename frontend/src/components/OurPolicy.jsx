import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <section className='border-y border-gray-100 my-16 py-14 bg-white/50 rounded-2xl'>
      <div className='flex flex-col sm:flex-row justify-around gap-10 sm:gap-6 text-center max-w-6xl mx-auto px-4'>
        <div className='flex flex-col items-center'>
          <div className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 mb-4'>
            <img src={assets.OurPolicy} alt="Exchange Policy" className='w-7 opacity-80' />
          </div>
          <p className='font-semibold text-gray-900 text-sm sm:text-base'>Easy Exchange Policy</p>
          <p className='text-gray-500 text-xs sm:text-sm mt-1 max-w-xs'>
            Hassle-free size and product exchanges within 7 days.
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <div className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 mb-4'>
            <img src={assets.OurPolicy} alt="Return Policy" className='w-7 opacity-80' />
          </div>
          <p className='font-semibold text-gray-900 text-sm sm:text-base'>7 Days Free Returns</p>
          <p className='text-gray-500 text-xs sm:text-sm mt-1 max-w-xs'>
            Return eligible unwashed items with original tags attached.
          </p>
        </div>

        <div className='flex flex-col items-center'>
          <div className='w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 mb-4'>
            <img src={assets.OurPolicy} alt="Customer Support" className='w-7 opacity-80' />
          </div>
          <p className='font-semibold text-gray-900 text-sm sm:text-base'>24/7 Dedicated Support</p>
          <p className='text-gray-500 text-xs sm:text-sm mt-1 max-w-xs'>
            Friendly fashion stylists ready to assist anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;