import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const imgSrc = Array.isArray(image) ? image[0] : image;

  return (
    <Link to={`/product/${id}`} className='group text-gray-800 cursor-pointer flex flex-col'>
      <div className='overflow-hidden rounded-lg bg-gray-100 aspect-[3/4] relative'>
        <img
          className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out'
          src={imgSrc}
          alt={name}
          loading="lazy"
        />
        <div className='absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300'></div>
      </div>
      <div className='pt-3 pb-1 flex flex-col flex-1'>
        <p className='text-xs sm:text-sm font-medium text-gray-700 line-clamp-1 group-hover:text-black transition'>
          {name}
        </p>
        <p className='text-sm font-semibold text-gray-900 mt-1'>
          {currency}{price}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;