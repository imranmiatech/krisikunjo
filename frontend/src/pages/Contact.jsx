import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="pt-6">
      <div className="text-center text-2xl py-6 border-t border-gray-100">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-12 lg:gap-16 items-center mb-24">
        <div className="w-full md:w-1/2 max-w-md rounded-2xl overflow-hidden shadow-sm aspect-[4/3] bg-gray-100">
          <img
            className='w-full h-full object-cover'
            src={assets.Hero}
            alt="TexHunt Storefront"
          />
        </div>

        <div className="flex flex-col justify-center items-start gap-6 md:w-1/2 max-w-md">
          <div>
            <p className='font-bold text-lg text-gray-900 tracking-wide uppercase mb-2'>
              OUR FLAGSHIP STORE
            </p>
            <p className='text-gray-500 text-sm leading-relaxed'>
              House 42, Road 11, Block D<br />
              Banani, Dhaka 1213, Bangladesh
            </p>
          </div>

          <div>
            <p className='font-bold text-lg text-gray-900 tracking-wide uppercase mb-2'>
              CUSTOMER CONCIERGE
            </p>
            <p className='text-gray-500 text-sm'>
              Phone: <a href="tel:+8801739299521" className="text-gray-800 hover:text-black font-medium">+880 1739-299521</a>
              <br />
              Email: <a href="mailto:support@texhunt.com" className="text-gray-800 hover:text-black font-medium">support@texhunt.com</a>
            </p>
          </div>

          <div>
            <p className='font-bold text-lg text-gray-900 tracking-wide uppercase mb-2'>
              CAREERS AT TEXHUNT
            </p>
            <p className='text-gray-500 text-sm leading-relaxed mb-4'>
              Passionate about fashion, textile design, or creative direction? Join our expanding creative collective.
            </p>
            <button
              onClick={() => window.location.href = "mailto:careers@texhunt.com"}
              className='border border-black px-8 py-3 text-xs font-semibold tracking-wider uppercase hover:bg-black hover:text-white transition-all duration-300 rounded'
            >
              EXPLORE JOBS
            </button>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;