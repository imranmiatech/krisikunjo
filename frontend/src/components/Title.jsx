import React from 'react';

const Title = ({ text1, text2 }) => {
  return (
    <div className='inline-flex gap-2.5 items-center mb-3 tracking-wider uppercase'>
      <p className='text-gray-500 font-light text-xl sm:text-2xl'>
        {text1} <span className='text-gray-900 font-bold'>{text2}</span>
      </p>
      <span className='w-8 sm:w-12 h-[2px] bg-gray-900 inline-block'></span>
    </div>
  );
};

export default Title;