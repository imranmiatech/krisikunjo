import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <section className='my-14'>
      <div className='text-center py-6'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-full sm:w-3/4 max-w-2xl m-auto text-xs sm:text-sm text-gray-500 leading-relaxed'>
          Explore our newest seasonal drops curated with premium textiles, bespoke stitching, and timeless silhouettes crafted for everyday luxury.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 gap-y-8'>
        {latestProducts.map((item, index) => (
          <ProductItem
            key={item._id || index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestCollection;
