import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const fetchProductData = () => {
    products.map((item)=> {
      if(item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null
      }
    })
  }

  useEffect(() =>{
    fetchProductData();
  },[productId])


  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
             {/* product image */}
             <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                 <div className='flex sm:flex-col overflow-x-scroll sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.75%] w-full'>
                    {
                      productData.image.map((item, index) => (
                        <img onClick={() => setImage(item)}  src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                    ))}
                 </div>
                 <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto' src={image} alt="" />
                 </div>
             </div>
             {/* product info */}
             <div className='flex-1'>
              <h1 className='font-medium'>{productData.name}</h1>
              <div className='flex items-center gap-1 mt-2'>
                 <img src={assets.search_icon} alt="" className="w-3 5" />
                 <img src={assets.search_icon} alt="" className="w-3 5" />
                 <img src={assets.search_icon} alt="" className="w-3 5" />
                 <img src={assets.search_icon} alt="" className="w-3 5" />
                 <img src={assets.search_icon} alt="" className="w-3 5" />
                 <p className='pl-2'>(122)</p>
              </div>
              <p className='mt-5 text-3xl font-medium '>{currency} {productData.price}</p>
              <p className='mt-5 text-gray-500 md:w-4/5'>{productData.descreptiion}</p>
              <div className='flex flex-col gap-4 my-8'>
                    <p>Select Size</p>
                    <div className='flex gap-2'>
                        {
                          productData.sizes.map((item, index) => (
                            <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''} `}>{item}</button>
                        ))}
                    </div>
              </div>
              <button onClick={()=>addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>কার্টে যুক্ত করুন</button>
              <hr className='mt-8 sm:w-4/5' />
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                  <p>১০০% অরিজিনাল পণ্য</p>
                  <p>এই পণ্যের জন্য ক্যাশ অন ডেলিভারি (COD) সুবিধা উপলব্ধ।</p>
                  <p>👉 ৭ দিনের মধ্যে সহজ রিটার্ন ও এক্সচেঞ্জ নীতি প্রযোজ্য।</p>
              </div>
             </div>
      </div>
      {/* description and review section */}
      <div className='mt-20'>
        <div className="flex">
          <b className="border px-5 py-3 text-sm">বর্ণনা</b>
          <p className='border px-5 py-3 text-sm'>রিভিউ</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
           <p>কৃশিকুঞ্জ একটি প্রফেশনাল ও বিশ্বস্ত প্ল্যাটফর্ম যেখানে সব পণ্য ১০০% অরিজিনাল। ওয়েবসাইটটি ব্যবহার করা সহজ, ডেলিভারি দ্রুত এবং ক্যাশ অন ডেলিভারি সুবিধা রয়েছে।
             তাদের কাস্টমার সাপোর্ট বন্ধুত্বপূর্ণ ও সহায়ক। সহজ রিটার্ন ও এক্সচেঞ্জ নীতি থাকায় কেনাকাটা আরও নিশ্চিন্ত। মোটের ওপর, কৃশিকুঞ্জে কেনাকাটা করা একটি সন্তোষজনক এবং
              ঝামেলামুক্ত অভিজ্ঞতা।</p>
            <p>কৃশিকুঞ্জ একটি নির্ভরযোগ্য প্ল্যাটফর্ম যেখানে কৃষি পণ্যের বিস্তৃত কালেকশন পাওয়া যায়। ডেলিভারি দ্রুত এবং পণ্য ১০০% অরিজিনাল। ওয়েবসাইটের ন্যাভিগেশন সহজ এবং কাস্টমার সাপোর্ট খুবই বন্ধুত্বপূর্ণ। সহজ রিটার্ন ও এক্সচেঞ্জ নীতি থাকায় কেনাকাটা আরও স্বাচ্ছন্দ্যপূর্ণ।
               সত্যিই এটি একটি ঝামেলামুক্ত এবং সন্তোষজনক অনলাইন শপিং অভিজ্ঞতা।</p>
        </div>
      </div>
      {/* display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product