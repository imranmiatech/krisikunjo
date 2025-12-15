import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item => item.bestseller))
        setBestSeller(bestProduct.slice(0,5));
    }, [products]);
 

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'সেরা বিক্রিত'} text2={'পণ্য'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          আমাদের সেরা বিক্রিত পণ্যগুলো নির্বাচন করা হয়েছে গ্রাহকের সন্তুষ্টি ও উচ্চ ফলন নিশ্চিত করার জন্য। এই পণ্যগুলো প্রমাণিত মান ও বিশ্বাসযোগ্যতার সঙ্গে কৃষকদের মধ্যে সবচেয়ে জনপ্রিয়।
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default BestSeller;