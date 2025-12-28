import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'যোগাযোগ'} text2={'করুন'} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className='w-full md:max-w-[480px]' src={assets.Hero} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>আমাদের স্টোর</p>
          <p className='text-gray-500'>নারায়ণধর বাজার <br /> হোসেনপুর, কিশোরগঞ্জ, বাংলাদেশ</p>
          <p className='text-gray-500'>ফোন: 01739299521<br />ইমেইল: ekhlasuddin.subuj1981@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>ক্যারিয়ারস এ্যাট কৃশিকুঞ্জ</p>
            {/* <br />
            <p className='text-gray-500'> <br /> হোসেনপুর, কিশোরগঞ্জ, বাংলাদেশ</p>
          <p className='text-gray-500'>ফোন: 01739299521<br />ইমেইল: ekhlasuddin.subuj1981@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>ক্যারিয়ারস এ্যাট কৃশিকুঞ্জ</p> */}
           <p className='text-gray-500'>আমাদের টিমে যোগ দিয়ে আপনার ক্যারিয়ারকে এগিয়ে নিন — কৃশিকুঞ্জ।</p>
         

          <button className='border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500'>অন্বেষণ করুন</button>

        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact