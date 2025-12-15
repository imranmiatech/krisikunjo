import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.OurPolicy} alt="" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>সহজ এক্সচেঞ্জ নীতি।</p>
            <p className='text-gary-400'>আমরা ঝামেলামুক্ত এক্সচেঞ্জ সুবিধা প্রদান করি।</p>
        </div>
         <div>
            <img src={assets.OurPolicy} alt="" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>৭ দিনের মধ্যে পণ্য ফেরত সুবিধা</p>
            <p className='text-gary-400'>আমরা ৭ দিনের ফ্রি রিটার্ন সুবিধা প্রদান করি।</p>
        </div>
         <div>
            <img src={assets.OurPolicy} alt="" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>সেরা কাস্টমার সাপোর্ট।</p>
            <p className='text-gary-400'>আমরা ২৪/৭ কাস্টমার সাপোর্ট প্রদান করি।</p>
        </div>
    </div>
  )
}

export default OurPolicy