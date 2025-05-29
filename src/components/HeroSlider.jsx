import React from 'react'
import { useState,useEffect } from "react";

const images = [
    "/asset/images/FooterMountains.png",
    "/asset/images/slide2.jpg",
    "/asset/images/slide3.png"
  ];

const HeroSlider = ()=>{
    const [current, setCurrent] = useState(0);


    useEffect(() => {
        const interval = setInterval(() => {
          setCurrent((prev) => (prev + 1) % images.length);
        }, 4000); 
    
        return () => clearInterval(interval); 
      }, []);
    
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % images.length);
      };
    
      const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
      };
      const goToSlide = (index) => {
        setCurrent(index);
      };


    return(
        <div  className='relative flex justify-between items-center  h-[450px]'>
        <img
          src={images[current]}
          alt="slide"
          className='w-full h-full  object-center transition-opacity '
          
        />
        <button onClick={prevSlide} className=' absolute left-4 md:left-16 top-1/2 transform -translate-y-1/2 bg-opacity-50 bg-[#E2E2E5] text-[#636365] text-center px-3 py-1 rounded-full'  >❮</button>
        <button onClick={nextSlide} className='absolute right-4 md:right-16 top-1/2 transform -translate-y-1/2  bg-opacity-50 bg-[#E2E2E5] text-[#636365] text-center px-3 py-1 rounded-full'>❯</button>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${
              index === current ? 'bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
      </div>
    )
}

export default HeroSlider;