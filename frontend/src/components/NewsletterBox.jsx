import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewsletterBox = () => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing to TexHunt VIP Club!");
      setEmail('');
    }
  };

  return (
    <div className='text-center my-16 py-12 px-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100 max-w-4xl mx-auto'>
      <p className='text-2xl sm:text-3xl font-semibold text-gray-900'>
        Subscribe now & get 20% off
      </p>
      <p className='text-gray-500 mt-2 text-xs sm:text-sm max-w-md mx-auto'>
        Be the first to know about new drops, seasonal sales, and exclusive fashion previews.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-2/3 max-w-lg flex items-center gap-2 mx-auto mt-6 bg-white border border-gray-300 rounded-full p-1 pl-4 shadow-sm focus-within:border-black transition'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email address...'
          className='w-full flex-1 outline-none text-xs sm:text-sm text-gray-700 bg-transparent'
          required
        />
        <button
          type='submit'
          className='bg-black text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition active:scale-95'
        >
          JOIN
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;