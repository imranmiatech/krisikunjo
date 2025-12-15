// import React, {useContext, useEffect, useState} from 'react'
// import { ShopContext } from '../context/ShopContext';
// import Title from './Title';
// import ProductItem from './ProductItem';
// import { Link } from 'react-router-dom';

// const LatestCollection = () => {

//     const {products} = useContext(ShopContext);
//     const [latestProducts, setLatestProducts] = useState([]);
    
//     useEffect(() => {
//         setLatestProducts(products.slice(0,10), [products])
//     })

//   return (
//     <div className='my-10'>
//         <div className='text-center py-8 text-3xl'>
//             <Title text1={'LATEST'} text2={'COLLECTION'} />
//             <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quos eius et unde asperiores vero velit, tempora neque facere eligendi.</p>
//         </div>
//         {/* Rendering products */}
//         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//             {latestProducts.map((item, index)=> (
//                 <Link to={`/product/${item._id}`}>
//                 <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
//                 </Link>
//             ))

//            }
//         </div>
//     </div>
//   )
// }

// export default LatestCollection
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'সর্বশেষ'} text2={'সংগ্রহ'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          আমাদের সর্বশেষ সংগ্রহে রয়েছে মানসম্মত বীজ, সুস্থ চারা গাছ এবং আধুনিক কৃষি পণ্য। প্রতিটি পণ্য পরীক্ষা-নিরীক্ষা করে নির্বাচিত, যা দেবে উচ্চ ফলন ও নির্ভরযোগ্যতা।
        </p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
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
  );
};

export default LatestCollection;
