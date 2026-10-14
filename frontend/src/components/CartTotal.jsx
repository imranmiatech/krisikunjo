import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className='w-full bg-white p-6 rounded-xl border border-gray-200'>
      <div className="text-xl mb-4">
        <Title text1={'ORDER'} text2={'SUMMARY'} />
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <p>Subtotal</p>
          <p className="font-medium text-gray-900">{currency}{subtotal.toFixed(2)}</p>
        </div>
        <hr className="border-gray-100" />
        <div className="flex justify-between text-gray-600">
          <p>Shipping Fee</p>
          <p className="font-medium text-gray-900">{currency}{delivery_fee.toFixed(2)}</p>
        </div>
        <hr className="border-gray-100" />
        <div className="flex justify-between text-base font-bold text-gray-900 pt-1">
          <p>Total</p>
          <p>{currency}{total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;