import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (products && products.length > 0) {
      const found = products.find((item) => String(item._id) === String(productId));
      if (found) {
        setProductData(found);
        setImage(Array.isArray(found.image) ? found.image[0] : found.image);
        setSize(found.sizes && found.sizes.length > 0 ? found.sizes[0] : '');
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="py-20 text-center text-gray-400">Loading garment details...</div>;
  }

  const imagesList = Array.isArray(productData.image) ? productData.image : [productData.image];

  return (
    <div className='border-t border-gray-100 pt-10 transition-opacity ease-in duration-300'>
      {/* Product Detail Grid */}
      <div className='flex gap-10 lg:gap-14 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[20%] w-full flex-shrink-0'>
            {imagesList.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt=""
                className={`w-20 sm:w-full aspect-[3/4] object-cover object-top rounded-lg cursor-pointer border-2 transition ${
                  image === item ? 'border-black' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          {/* Main Photo */}
          <div className='w-full sm:w-[80%] rounded-xl overflow-hidden bg-gray-100 aspect-[3/4]'>
            <img className='w-full h-full object-cover object-top' src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Info & Actions */}
        <div className='flex-1 flex flex-col justify-center'>
          <p className="text-xs font-bold tracking-widest uppercase text-amber-700 mb-2">
            {productData.category} • {productData.subCategory}
          </p>
          <h1 className='text-2xl sm:text-3xl font-semibold text-gray-900'>{productData.name}</h1>

          {/* Star Rating */}
          <div className='flex items-center gap-1.5 mt-2.5 text-xs text-gray-500'>
            <span className="text-amber-500 font-bold">★★★★★</span>
            <span className='pl-1 font-medium'>(128 verified reviews)</span>
          </div>

          <p className='mt-5 text-2xl sm:text-3xl font-bold text-gray-900'>
            {currency}{productData.price}
          </p>

          <p className='mt-4 text-gray-600 text-sm leading-relaxed'>
            {productData.description || productData.descreptiion}
          </p>

          {/* Size Selector */}
          <div className='flex flex-col gap-3 my-7'>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-900">Select Size</p>
              <span className="text-xs text-gray-400">Standard Fit</span>
            </div>
            <div className='flex flex-wrap gap-2.5'>
              {productData.sizes && productData.sizes.map((item, index) => (
                <button
                  type="button"
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 rounded text-xs font-semibold uppercase tracking-wider transition ${
                    item === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 bg-white text-gray-800 hover:border-gray-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white px-10 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-gray-800 active:scale-95 transition-all rounded shadow-sm w-full sm:w-auto'
          >
            ADD TO CART
          </button>

          <hr className='mt-8 border-gray-100' />

          {/* Assurances */}
          <div className='text-xs text-gray-500 mt-6 flex flex-col gap-2.5'>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>100% Original and verified TexHunt craftsmanship.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Nationwide fast delivery within 2-4 business days.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Complimentary 7-day size replacement and return guarantee.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <span>Direct customer concierge: +880 1739-299521</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Reviews Tabs */}
      <div className='mt-20'>
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('description')}
            className={`px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase border-b-2 transition ${
              activeTab === 'description' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Product Details & Care
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 text-xs sm:text-sm font-bold tracking-wider uppercase border-b-2 transition ${
              activeTab === 'reviews' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            Customer Reviews (128)
          </button>
        </div>

        <div className="p-6 sm:p-8 bg-white rounded-b-xl border border-t-0 border-gray-200 text-sm text-gray-600">
          {activeTab === 'description' ? (
            <div className="flex flex-col gap-4 leading-relaxed max-w-3xl">
              <p>
                Engineered with high-grade organic fibers, this garment delivers a lightweight, breathable drape that moves naturally with your body. Every seam is reinforced with double-thread stitching to guarantee shape retention and durability through repeated wash cycles.
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1.5 text-xs sm:text-sm text-gray-500">
                <li>Material: 100% Breathable Combed Cotton / Premium Textile Blend</li>
                <li>Fit: Tailored contemporary silhouette</li>
                <li>Care: Machine wash cold with like colors; do not tumble dry hot</li>
                <li>Origin: Designed and ethically tailored by TexHunt Studio</li>
              </ul>
            </div>
          ) : (
            <div className="flex flex-col gap-6 max-w-3xl">
              <div className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900 text-sm">Tanvir Ahmed</p>
                  <span className="text-xs text-amber-500">★★★★★</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  "The fabric quality and stitching are world-class. It fits perfectly true to size, feels incredibly premium, and looks amazing in person."
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-gray-900 text-sm">Nusrat Jahan</p>
                  <span className="text-xs text-amber-500">★★★★★</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  "Ordered this for everyday casual styling. The drape and texture feel like an international designer brand. Fast 2-day delivery in Dhaka!"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
