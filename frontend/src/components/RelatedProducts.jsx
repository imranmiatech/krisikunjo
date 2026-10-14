import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      let filtered = products.filter((item) => item.category === category);
      if (subCategory) {
        const subFiltered = filtered.filter((item) => item.subCategory === subCategory);
        if (subFiltered.length > 0) {
          filtered = subFiltered;
        }
      }
      setRelated(filtered.slice(0, 5));
    }
  }, [products, category, subCategory]);

  if (related.length === 0) return null;

  return (
    <div className='my-24'>
      <div className='text-center py-4'>
        <Title text1={'RELATED'} text2={'STYLES'} />
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Complete the look with curated garments that pair seamlessly with this item.
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 gap-y-8 mt-6'>
        {related.map((item, index) => (
          <ProductItem
            key={item._id || index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;