import React from "react";
import {
  FaRandom,
  FaRegUser,
  FaRegHeart,
  FaWhatsapp,
  FaChevronDown,
} from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineMenu } from "react-icons/hi";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import { FaShop } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Header = ({ addcart }) => {
  return (
    <div>
      <header className=" hidden  md:flex justify-between items-center bg-[#F0F0F2] font-helv  p-3 px-16 text-black ">
        <div className="flex justify-between items-center text-sm w-96">
          <p>
            <a href="">Product Catalogue</a>
          </p>
          <p>
           <Link to={"/about"}>About us</Link>
          </p>
          <p>
            <Link to={"/contact"}>Contact us</Link>
          </p>
        </div>
        <div className="flex items-center justify-end w-96 space-x-4 text-sm">
          <p className="flex items-center ">
            <a href="" className="mr-1">
              <FaWhatsapp />
            </a>
            +91 9990555161
          </p>
          <div className="border-l h-5"></div>
          <p className="flex items-center">
            <a href="" className="mr-2">
              <FiPhoneCall />
            </a>
            1800 419 6048
          </p>
        </div>
      </header>
      {/* -----------------------Header End---------------------------------- */}
      <nav className="px-4 py-1.5 md:px-16  md:py-5 bg-[#FAFAFC]">
        {/* ---------------------first nav bar--------------------- */}
        <div className="flex  items-center justify-between  w-full">
          <div className="flex w-full space-x-5  md:w-[60%]">
            <div className="hidden md:block">
              <Link to={"/"}>
                {" "}
                <img
                  src="/asset/images/Logo.png"
                  alt=""
                  className="md:w-24 rounded-md"
                />
              </Link>
            </div>

            <div className="md:hidden flex justify-between w-full">
              <div>
                <Link to={"/"}>
                  <img src="/asset/images/LogoS.png" alt="" className="w-14" />
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <FiSearch className="bg-[#F1F1F1] rounded-full text-black p-2 w-7 h-7" />
                <span className="relative">
                  <FiShoppingCart className="bg-[#F1F1F1] rounded-full text-black object-contain p-2 w-8 h-7 flex justify-center items-center" />
                </span>
                <HiOutlineMenu className="w-7 h-7 text-[#1C1C1C]" />
              </div>
            </div>
            <div className="hidden md:relative md:flex items-center justify-center md:w-1/1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-700 text-sm">
                <FiSearch />
              </span>
              <input
                type="search"
                placeholder="Search for products"
                className="bg-white rounded-full w-full py-2 px-8 text-sm placeholder-gray-500 border border-gray-300"
              ></input>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-between space-x-4 ">
            <a href="">
              {" "}
              <FaRandom className="text-gray-500 font-normal" />
            </a>
            <a
              href="#"
              className="bg-[#F1F1F1] rounded-full p-2 text-gray-950 font-normal"
            >
              <FaRegHeart />
            </a>
            <div className="border-l border-[#BEBEBE] h-6"></div>
            <a
              href=""
              className="bg-[#F1F1F1] text-sm px-4 py-2 text-center rounded-full"
            >
              Track Shipment
            </a>
            <Link
              to={"/Cart"}
              className="relative bg-[#F1F1F1] rounded-full p-2 text-gray-950 font-normal"
            >
              <ShoppingCartOutlinedIcon className="" />
              {addcart.length > 0 && (
                <div className="text-white bg-red-700 text-xs absolute top-0 right-0 rounded-full px-1">
                  {addcart.length}
                </div>
              )}
            </Link>
            <Link
              to={"/login"}
              className="bg-[#F1F1F1] rounded-full p-2 text-gray-950 font-normal"
            >
              <FaRegUser />
            </Link>
          </div>
        </div>
        {/* -----------------------second nav bar--------------------- */}
        <div className="hidden md:mt-5 md:flex items-center justify-between space-x-2">
          <div className="flex items-center text-sm ">
            <img src="/asset/images/Cookware.png" alt="" className="w-14" />
            <p>Cookware</p>
            <FaChevronDown className="mt-1" />
          </div>
          <div className="flex items-center text-sm space-x-1">
            <img src="/asset/images/Gas Stove.png" alt="" className="w-14" />
            <p>Gas Stove</p>
            <FaChevronDown className="mt-1" />
          </div>
          <div className="flex items-center text-sm space-x-1">
            <img src="/asset/images/Gas Tandoor.png" alt="" className="w-14" />
            <p>Gas Tandoor</p>
            <FaChevronDown className="mt-1" />
          </div>
          <div className="flex items-center text-sm space-x-1">
            <img
              src="/asset/images/Mixer Grinder.png"
              alt=""
              className="w-12 h-12"
            />
            <p>Mixer Grinder</p>
            <FaChevronDown className="mt-1" />
          </div>
          <div className="flex items-center text-sm space-x-1">
            <img
              src="/asset/images/Pressure Cooker.png"
              alt=""
              className="w-15"
            />
            <p>Pressure Cooker</p>
            <FaChevronDown className="mt-1" />
          </div>
          <div className="flex items-center text-sm space-x-1">
            <img
              src="/asset/images/Steam Cookware.png"
              alt=""
              className="w-16"
            />
            <p>Steam Cookware</p>
            <FaChevronDown className="mt-1" />
          </div>
          <div className="flex items-center text-sm space-x-1">
            <img src="/asset/images/Others.png" alt="" className="w-16" />
            <p>Others</p>
            <FaChevronDown className="mt-1" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
