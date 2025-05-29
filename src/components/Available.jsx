import React from 'react'

const Available = () => {
  return (
    <div className='flex items-center justify-center gap-6 py-6 md:px-16  px-4 w-full'>
     <div className='flex-grow h-[0.2rem] bg-gray-300 max-w-[100px]'></div>
     <div className='flex items-center gap-4 whitespace-nowrap '> 
        <h2 className='text-sm font-semibold'>Also Available On</h2>
       <div className='bg-yellow shadow-lg'><img src="/asset/images/Available/amazon.png" alt="" className='md:w-16 w-10 h-10 object-contain' /></div> 
       <div className='bg-yellow shadow-lg'><img src="/asset/images/Available/Flipkart.png" alt="" className='md:w-16 w-10 h-10 object-contain' /></div> 
       <div className='bg-yellow shadow-lg'><img src="/asset/images/Available/Myntra.png" alt="" className='md:w-16 w-10 h-10 object-contain' /></div> 
     </div>
     <div className='flex-grow h-[0.2rem] bg-gray-300 max-w-[100px]'></div>

     {/* ----------------------------End---------------------------- */}
    </div>
  )
}

export default Available
