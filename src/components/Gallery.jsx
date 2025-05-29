import React from "react";

const Gallery = () => {
  return (
    <div className="w-full md:mt-1 py-10 px-4 md:py-1 md:px-16 md:pb-1 ">
      <div className="flex flex-col items-center ">
        {" "}
        <h2 className="text-2xl font-semibold">Curated Kitchen Essentials</h2>
        <p className="text-[#636365] font-semibold mt-1">Only the Best</p>
      </div>
      {/* ------------------gallery------------------ */}

      <div className="flex md:px-16  mb-5 w-[100%] space-x-3 mt-10 overflow-hidden">
        <div className="h-[247px] md:w-[35%] ">
          <img
            className="rounded-lg h-full object-cover md:w-[441px] "
            src="/asset/images/Gallery/Cookware.png"
            alt=""
          />
        </div>
        <div className="h-[247px] md:w-[65%]">
          <img
            className="rounded-lg w-full h-full object-cover "
            src="/asset/images/Gallery/Gas Stove.png"
            alt=""
          />
        </div>
      </div>
      <div className="w-full md:px-16 mt-10">
        <div className="flex   mb-5   space-x-3 mt-10 overflow-hidden">
          <div className="h-[247px] md:w-[33%] ">
            <img
              className="rounded-lg h-full object-cover md:w-[441px] "
              src="/asset/images/Gallery/Electric Rice Cooker.png"
              alt=""
            />
          </div>
          <div className="h-[247px] md:w-[33%]">
            <img
              className="rounded-lg w-full h-full object-cover "
              src="/asset/images/Gallery/Steam Cookware.png"
              alt=""
            />
          </div>
          <div className='h-[247px] hidden md:block md:w-[33%]'><img className='rounded-lg w-full h-full object-center ' src="/asset/images/Gallery/Gas Tandoor.png" alt="" /></div><br />
        </div>

        <div className="w-full h-44 overflow-hidden relative md:hidden rounded-lg">
          <img
            src="/asset/images/Gallery/Pressure Cooker.png"
            alt=""
            className="absolute top-[-100px] left-0 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
