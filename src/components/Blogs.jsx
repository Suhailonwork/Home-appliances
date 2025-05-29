import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const Blogs = () => {


  const [value, setValue] = useState(0); 
    

  const NextHandler = () => {
   
      value >= 168 ? "" : setValue(prev => prev  + 52)
      
  };

  const PrevHandler = () => {
   value<=0?"": setValue(prev=> prev - 52);
    
  };

  
  return (
    <div className='w-full px-3 md:px-16 my-10 pb-11 sm:py-0  relative '>
      <h2 className='text-center text-2xl font-bold'>Blogs</h2>
      <div className='w-full flex gap-5 sm:justify-between mt-5 duration-500  mx-auto scroll-smooth scrollbar-hide'
      style={{ transform: `translateX(-${value}%)`}}> 
        
        <div className='w-1/2 md:w-1/6'>
            <img src="/asset/images/blogs.png" alt="" className='min-w-40 h-40  object-cover rounded-lg' />
            <p className='text-xs text-[#636365]'>February 22, 2025   Samar Verma</p>
            <h2 className='font-semibold'>When to use triply ply pressure cookers?</h2>
            <p className='text-xs my-1'>Expert advice best use cases for triply ply pressure cookers</p>
            <div className='flex items-center space-x-2 '>
            <button className='text-xs'> Read more </button>
            <FaArrowRight className='text-xs'/>
            </div>
        </div>

         <div className='w-1/2 md:w-1/6'>
            <img src="/asset/images/blogs.png" alt="" className='min-w-40 h-40  object-cover rounded-lg'/>
            <p className='text-xs text-[#636365]'>February 22, 2025   Samar Verma</p>
            <h2 className='font-semibold'>When to use triply ply pressure cookers?</h2>
            <p className='text-xs my-1'>Expert advice best use cases for triply ply pressure cookers</p>
            <div className='flex items-center space-x-2 '>
            <button className='text-xs'> Read more </button>
            <FaArrowRight className='text-xs'/>
            </div>
           
        </div>
        <div className='w-1/2 md:w-1/6'>
            <img src="/asset/images/blogs.png" alt="" className='min-w-40 h-40  object-cover rounded-lg'/>
            <p className='text-xs text-[#636365]'>February 22, 2025   Samar Verma</p>
            <h2 className='font-semibold'>When to use triply ply pressure cookers?</h2>
            <p className='text-xs my-1'>Expert advice best use cases for triply ply pressure cookers</p>
            <div className='flex items-center space-x-2 '>
            <button className='text-xs'> Read more </button>
            <FaArrowRight className='text-xs'/>
            </div>
           
        </div>
        <div className='w-1/2 md:w-1/6'>
            <img src="/asset/images/blogs.png" alt="" className='min-w-40 h-40  object-cover rounded-lg'/>
            <p className='text-xs text-[#636365]'>February 22, 2025   Samar Verma</p>
            <h2 className='font-semibold'>When to use triply ply pressure cookers?</h2>
            <p className='text-xs my-1'>Expert advice best use cases for triply ply pressure cookers</p>
            <div className='flex items-center space-x-2 '>
            <button className='text-xs'> Read more </button>
            <FaArrowRight className='text-xs'/>
            </div>
           
        </div>
          <div className='w-1/2 md:w-1/6'>
            <img src="/asset/images/blogs.png" alt="" className='min-w-40 h-40     object-cover rounded-lg' />
            <p className='text-xs text-[#636365]'>February 22, 2025   Samar Verma</p>
            <h2 className='font-semibold'>When to use triply ply pressure cookers?</h2>
            <p className='text-xs my-1'>Expert advice best use cases for triply ply pressure cookers</p>
            <div className='flex items-center space-x-2 '>
            <button className='text-xs'> Read more </button>
            <FaArrowRight className='text-xs'/>
            </div>
           
        </div>
      </div>
      <div className='text-center text-xs mt-8 font-semibold hidden md:block'><button className='bg-[#F1F1F1] px-4 py-2 rounded-full'>View More Articles</button></div>
      
      <div className="md:hidden absolute pt-5 right-5 flex space-x-6 mt-5 ">
    <button
        onClick={PrevHandler}
        
        className= {`text-sm  transform -translate-y-1/2 bg-[#E2E2E5] text-[#636365]  px-3 py-1 rounded-full z-10 ${value<=0? "text-gray-300" : ""}`}
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={NextHandler}
        
        className={`text-sm  transform -translate-y-1/2 bg-[#E2E2E5] text-[#636365] px-3 py-1 rounded-full z-10 ${value >= 168? "text-gray-300" : ""}`}
      >
        ❯
      </button>
    
    </div>

    </div>
  )
}

export default Blogs
