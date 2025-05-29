import React from 'react'
import { FiPhoneCall,FiEdit} from "react-icons/fi";
import { MdOutlineEmojiEvents,MdLocalShipping   } from "react-icons/md";
import { RiGiftLine } from "react-icons/ri";
import { HiOutlineShoppingBag   } from "react-icons/hi";
import { RiBankCardLine } from "react-icons/ri";
import {FaGlobe, } from 'react-icons/fa';

const Connectivity = () => {
  return (
    <div className='bg-[#F9F9F9] grid grid-cols-2 md:grid-cols-4 md:px-16 mt-5 py-10 text-sm text-[#B91508] gap-y-10'>
      <div className='flex flex-col items-center space-y-4 text-center'>
<FiPhoneCall className='text-4xl '/>
<p className='text-black'>Toll free assistance</p>
      </div>
      <div className='flex flex-col items-center space-y-4  text-center'>
<HiOutlineShoppingBag className='text-4xl'/>
<p className='text-black'>Available on leading <br />
E-commerce platforms</p>
      </div>
      <div className='flex flex-col items-center space-y-4  text-center'>
< FaGlobe className='text-3xl'/>
<p className='text-black'>28+ Years of Industry <br /> Experience</p>
      </div>
      <div className='flex flex-col items-center space-y-4  text-center'>
< MdOutlineEmojiEvents     className='text-3xl'/>
<p className='text-black'>Uncompromised Quality <br /> Assurance</p>
      </div>
      <div className='flex flex-col items-center space-y-4  text-center'>
<FiEdit  className='text-3xl'/>
<p className='text-black'>Custom Name Engraving</p>
      </div>
      <div className='flex flex-col items-center space-y-4  text-center'>
<MdLocalShipping   className='text-3xl'/>
<p className='text-black'>Pan-India Delivery</p>
      </div>
      <div className='flex flex-col items-center space-y-4  text-center'>
<RiBankCardLine   className='text-3xl'/>
<p className='text-black'>Secure & Flexible <br /> Payments</p>
      </div>
      <div className='flex flex-col items-center space-y-4  text-center'>
<RiGiftLine   className='text-3xl'/>
<p className='text-black'>Perfect for Gifting</p>
      </div>
      
    </div>
  )
}

export default Connectivity;
