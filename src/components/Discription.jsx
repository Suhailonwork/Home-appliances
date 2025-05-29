import React from 'react'

const Discription = ()=>{
    return(
        <div className='bg-[#F5F5F7] mt-18 w-full p-4 md:p-16 flex flex-col md:flex-row space-x-10'>

            <div className='w-1/1 md:w-1/4 '><img src="/asset/images/Gallery/Pressure Cooker.png" alt="" className=' bg-no-repeat h-52 w-full rounded-2xl object-cover'/></div>
            <div className=' flex flex-col space-y-8 mt-8'> 
                <h2 className='text-2xl font-bold'>Personalize It – Get Your Name Engraved,<br /> Just Like We’ve Always Done</h2>
                <h3 className='font-medium text-sm'> Make it truly yours. Add your name to selected cookware—just like in homes across India. Once engraved, it's non-returnable and prepaid, but 100% yours forever</h3>
                <p className='text-[#636365] text-xs'>Customized products are non-returnable. Full payment required in advance.</p>
                <button className='bg-[#B91508] px-4 py-2 w-max self-start text-white rounded-full'>Get yours Now</button>
            </div>
        </div>
    )
}

export default Discription