  import React, { useEffect } from "react";
  import { useParams } from "react-router-dom";
  import { FaStar, FaRegStar } from "react-icons/fa";
  import { Share2 } from "lucide-react";
  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";

  const DetailProduct = ({ user, setaddcart, addToCart }) => {
    const { id } = useParams();
    const originalProduct = user.find((item) => item.sno === id);
    const [selectedProduct, setSelectedProduct] = useState(originalProduct);
    const navigate = useNavigate();

    const [scrollIndex, setScrollIndex] = useState(0);
    const [scrollIndexMore, setScrollIndexMore] = useState(0);
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [selectshape, setselectShape] = useState(null);
    const [selectBottom, setselectBottom] = useState(null);

    const visibleCount = 4;
    const itemWidth = 260;

    // console.log(selectedProduct);

    useEffect(() => {
      setSelectedProduct(originalProduct);
    }, [originalProduct]);

    useEffect(() => {
      if (selectedProduct) {
        // console.log(selectedProduct.bottom);
        setselectShape(selectedProduct.shape);
        setselectBottom(selectedProduct.bottom);
        setSelectedWeight(selectedProduct.product_weight);
      }
    }, [selectedProduct]);

    const handleNextMore = () => {
      const maxIndex = morecategory.length * 5 - visibleCount;
      setScrollIndexMore((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    };

    const handlePrevMore = () => {
      const maxIndex = morecategory.length * 5 - visibleCount;
      setScrollIndexMore((prevIndex) =>
        prevIndex <= 0 ? maxIndex : prevIndex - 1
      );
    };

    const handleNext = () => {
      const maxIndex = youMayLike.length * 5 - visibleCount;
      setScrollIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
      const maxIndex = youMayLike.length * 5 - visibleCount;
      setScrollIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
    };

    if (!user || user.length === 0) {
      return <div>Loading...</div>;
    }

    const selectedsku = selectedProduct
      ? user.filter(
          (item) =>
            item.product_description === selectedProduct.product_description
        )
      : [];

    const hanlderPlainshap = () => {
      // alert("plain");
      setselectShape("plain");
      const newProduct = user.find(
        (item) =>
          item.product_description === originalProduct.product_description &&
          item.shape === "plain" &&
          item.bottom == originalProduct.bottom &&
          item.product_weight == originalProduct.product_weight
      );
      if (newProduct) {
        navigate(`/879/DetailProduct/${newProduct.sno}`);
        setSelectedProduct(newProduct);
      }
    };

    const hanlderPanShap = () => {
      setselectShape("pan");
      const newProduct = user.find(
        (item) =>
          item.product_description === originalProduct.product_description &&
          item.shape === "pan" &&
          item.bottom == originalProduct.bottom &&
          item.product_weight == originalProduct.product_weight
      );
      if (newProduct) {
        navigate(`/879/DetailProduct/${newProduct.sno}`);
        setSelectedProduct(newProduct);
      }
    };

    const hanlderInduction = () => {
      // alert("Induction");
      setselectShape("Induction");
      const newProduct = user.find(
        (item) =>
          item.product_description === originalProduct.product_description &&
          item.bottom === "Induction" &&
          item.shape == originalProduct.shape &&
          item.product_weight == originalProduct.product_weight
      );
      if (newProduct) {
        navigate(`/879/DetailProduct/${newProduct.sno}`);
        setSelectedProduct(newProduct);
      }
    };

    const hanlderNonInduction = () => {
      // alert("Non-Induction");
      setselectShape("Non-Induction");
      const newProduct = user.find(
        (item) =>
          item.product_description === originalProduct.product_description &&
          item.bottom === "Non-Induction" &&
          item.shape == originalProduct.shape &&
          item.product_weight == originalProduct.product_weight
      );
      if (newProduct) {
        navigate(`/879/DetailProduct/${newProduct.sno}`);
        setSelectedProduct(newProduct);
      }
    };

    if (!selectedProduct) {
      return <div>Product not found</div>;
    }

    const morecategory = user
      .filter(
        (item) => item.product_category !== selectedProduct.product_category
      )
      .reduce((acc, curr) => {
        if (
          !acc.find((item) => item.product_category === curr.product_category)
        ) {
          acc.push(curr);
        }
        return acc;
      }, []);

    const youMayLike = user.filter(
      (item) =>
        item.product_category === selectedProduct.product_category &&
        item.sno !== selectedProduct.sno // exclude the current product
    );



  const handleAddCart = () => {
    addToCart({
      product_id: selectedProduct.sno,
      product_name: selectedProduct.product_name,
      product_price: selectedProduct.product_price,
      image: selectedProduct.product_images,
    }, 1);
  };


    return (
      <div className="md:px-16 px-4 ">
        <div className="text-xs my-2">
          Home / {selectedProduct.product_category} /{" "}
          {selectedProduct.product_sub_category} / {selectedProduct.product_name}
        </div>
        <div className="w-full flex flex-col items-center md:flex-row py-10 gap-10">
          <div className="w-[40%]">
            <img
              src={`http://localhost/summit_home_appliancies/frontend/admin/${selectedProduct.product_images}`}
              alt={selectedProduct.product_name}
              className="rounded-lg w-full shadow-lg"
            />
          </div>
          <div className="w-full md:w-[60%]">
            <div className=" w-full flex justify-between items-center">
              <span className="bg-[#B91508] text-white py-1 px-3 text-sm">
                Bestseller
              </span>
              <div className="flex items-center gap-0.5">
                <FaStar className="text-[#B91508]" />
                <FaStar className="text-[#B91508]" />
                <FaStar className="text-[#B91508]" />
                <FaStar className="text-[#B91508]" />
                <FaStar className="text-[#B91508]" />
                <span className="ml-3">41 reviews</span>{" "}
                <span className="bg-[#F1F1F1] text-xs p-1.5 rounded-full font-bold mt-1 ml-1">
                  <Share2 size={15} strokeWidth={2} />
                </span>
              </div>{" "}
            </div>
            <h1 className="text-lg font-semibold mt-4">
              {selectedProduct.product_description}
            </h1>
            <span className="bg-[#F5F5F7] text-xs rounded-sm text-[#636365] px-2 py-0.5 font-semibold">
              {selectedProduct.sku}
            </span>
            <p className="font-bold text-xl mt-5">
              {" "}
              ₹{selectedProduct.product_price}
            </p>
            <span className="bg-[#F5F5F7] text-xs rounded-sm text-[#636365] px-2 py-0.5 font-semibold">
              Save {selectedProduct.product_discount}{" "}
              {selectedProduct.product_discount_type}
            </span>
            <p className="text-xs mt-1">(Inclusive of all taxes)</p>
            <div className="bg-[#FAFAFC] font-semibold items-center text-sm w-full grid-cols-2 grid md:grid-cols-3 gap-5 px-4 py-8 space-y-1 md:space-y-5 mt-5 rounded-sm">
              <div className="flex items-center gap-2">
                <img
                  src="/asset/iconvector/Vector.png"
                  alt=""
                  className="w-5 h-5"
                />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src="/asset/iconvector/basil_stack-solid.png"
                  alt=""
                  className="w-5 h-5"
                />
                <span>Long-lasting 3 Layer Body</span>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="/asset/iconvector/emojione-monotone_pot-of-food.png"
                  className="w-5 h-5"
                  alt=""
                />
                <span>No Food Burning/Sticking</span>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="/asset/iconvector/Vector (3).png"
                  alt=""
                  className="w-5 h-5"
                />
                <span>Super Easy to Clean</span>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="/asset/iconvector/Vector (4).png"
                  alt=""
                  className="w-5 h-5"
                />
                <span>Even Heating & Fast Cooking</span>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src="/asset/iconvector/Vector (5).png"
                  alt=""
                  className="w-5 h-5"
                />
                <span> ISI & ISO 9001 Certified</span>
              </div>
            </div>
            <div className="mt-5">
              <h1 className="flex items-center">
                <span className="font-semibold">Capacity : </span>
                <p className="ml-2 text-[#636365] ">For 2-3 people </p>
              </h1>
              <div className="flex gap-4 flex-wrap mt-3 text-sm">
                {[
                  ...new Map(
                    selectedsku.map((item) => [item.product_weight, item])
                  ).values(),
                ].map((item, index) => (
                  <Link key={index} to={`/879/DetailProduct/${item.sno}`}>
                    <p
                      onClick={() => setSelectedWeight(item.product_weight)} // This updates the selected item
                      className={`${
                        selectedWeight === item.product_weight
                          ? "bg-[#B915080D] text-[#B91508] border-1 border-[#B91508]" // Red background when clicked
                          : "bg-[#F5F5F7] text-[#636365]" // Default background
                      } rounded-sm px-2 py-0.5 font-semibold`}
                    >
                      {item.product_weight} {item.product_unit}
                    </p>
                  </Link>
                ))}
              </div>
              <div></div>
            </div>
            <div className="mt-5 flex gap-8">
              <div>
                <p className="font-semibold mb-2">Shape:</p>
                <span
                  className={`${
                    selectshape === "plain"
                      ? "bg-[#B915080D] text-[#B91508] border-1 border-[#B91508]"
                      : "bg-[#F5F5F7] text-[#636365]"
                  }  rounded-md  px-2 py-0.5 font-semibold cursor-pointer`}
                  onClick={() => {
                    // setselectShape("plain");
                    hanlderPlainshap();
                  }}
                >
                  Plain
                </span>
                <span
                  className={`${
                    selectshape == "pan"
                      ? "bg-[#B915080D] text-[#B91508] border-1 border-[#B91508]"
                      : "bg-[#F5F5F7] text-[#636365]"
                  }bg-[#F5F5F7]  rounded-md text-[#636365] px-2 py-0.5 font-semibold ml-2 cursor-pointer`}
                  onClick={() => {
                    // setselectShape("pan");
                    hanlderPanShap();
                  }}
                >
                  pan
                </span>
              </div>
              <div>
                <p className="font-semibold mb-2">Bottom:</p>
                <span
                  onClick={() => {
                    setselectBottom("Non-Induction");

                    hanlderNonInduction();
                  }}
                  className={`${
                    selectBottom === "Non-Induction"
                      ? "bg-[#B915080D] text-[#B91508] border-1 border-[#B91508]"
                      : "bg-[#F5F5F7] text-[#636365]"
                  }bg-[#F5F5F7]  rounded-md text-[#636365] px-2 py-0.5 font-semibold ml-2 cursor-pointer`}
                >
                  Non-Induction
                </span>
                <span
                  onClick={() => {
                    setselectBottom("Induction");
                    hanlderInduction();
                  }}
                  className={`${
                    selectBottom === "Induction"
                      ? "bg-[#B915080D] text-[#B91508] border-1 border-[#B91508]"
                      : "bg-[#F5F5F7] text-[#636365]"
                  }bg-[#F5F5F7]  rounded-md text-[#636365] px-2 py-0.5 font-semibold ml-2 cursor-pointer`}
                >
                  Induction
                </span>
              </div>
            </div>

            <div className="mt-8 flex md:justify-between gap-5">
              <button
                onClick={handleAddCart}
                className="bg-[#B91508] hover:bg-[#a21307] active:bg-[#7e0f06] text-white border border-[#B91508] px-8 md:px-15 py-2 font-semibold rounded-full cursor-pointer hover:shadow-md hover:scale-105 active:scale-95 transform transition-all duration-150"
              >
                Add to cart
              </button>
              <button className=" rounded-full  border-1 text-[#B91508]  border-[#B91508] px-8 md:px-15 py-2 font-semibold cursor-pointer">
                Buy Now
              </button>
            </div>

            <div className="mt-8">
              <div className="flex gap-5">
                <div className="flex items-center text-lg text-[#636365] gap-1">
                  {" "}
                  <img
                    src="/asset/iconvector/bitcoin-icons_tag-filled.png"
                    alt=""
                    className="w-4 h-4"
                  />
                  <p className="text-[#636365] text-sm">
                    Free shipping on orders ₹1199 & above
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  {" "}
                  <img
                    src="/asset/iconvector/hugeicons_delivery-return-01.png"
                    alt=""
                    className="w-4 h-4"
                  />
                  <p className="text-[#636365] text-sm">
                    Easy returns within 7 days
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <input
                  type="text"
                  placeholder="Enter your Pin Code"
                  className="p-2 border-2 border-gray-300 placeholder:text-sm placeholder:font-semibold rounded-lg"
                />
                <button className=" rounded-lg  border-1 text-[#B91508]  border-[#B91508] p-2 font-semibold">
                  Check Now
                </button>
                <div className="text-[#636365]">
                  Enter pincode to view delivery details
                </div>
              </div>
            </div>
            {/* -------------------end--------------- */}
          </div>
        </div>
        {/* ------------------product you may like ------------------ */}
        <div className="mt-5 relative">
          <h1 className="text-center mb-8 text-2xl font-semibold">
            You May Also Like
          </h1>
          <div className=" overflow-x-hidden ">
            <div
              className="flex gap-6  w-max px-4 py-2  "
              style={{ transform: `translateX(-${scrollIndex * itemWidth}px)` }}
            >
              {[...Array(5)]
                .flatMap(() => youMayLike)
                .map((item, index) => (
                  <Link key={index} to={`/879/DetailProduct/${item.sno}`}>
                    {" "}
                    <div
                      key={index}
                      className="w-60  shrink-0 bg-white rounded-lg p-2 shadow-md"
                    >
                      <img
                        src={`http://localhost/summit_home_appliancies/frontend/admin/${item.product_images}`}
                        alt=""
                        className="w-36 h-36 mx-auto"
                      />
                      <p className="font-semibold text-sm mt-2">
                        {item.product_description}
                      </p>
                      <p className="text-xs mt-1">
                        Fast heating | Non-reactive nature
                      </p>
                      <p className="flex mt-1 text-[#EE9E13] text-sm">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </p>
                      <p className="font-bold mt-1">₹{item.product_price}</p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="bg-[#E4F1E8] text-[#1E9531] font-semibold py-0.5 px-2 rounded-md">
                          ₹{item.product_discount} save
                        </p>
                        <button className="text-[#683208] border border-[#683208] rounded-md px-2 py-0.5">
                          Add +
                        </button>
                      </div>
                      <p className="text-xs mt-1">(incl. of all taxes)</p>
                    </div>
                  </Link>
                ))}
            </div>

            <button
              onClick={handlePrev}
              className="absolute text-sm top-45 left-7 transform -translate-y-1/2 bg-[#E2E2E5] text-[#636365] px-2 py-0.5 text-center rounded-full z-10"
            >
              ❮
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              // disabled={index + visibleCount >= user.length}
              className="absolute text-sm top-45 right-7 transform -translate-y-1/2 bg-[#E2E2E5] text-[#636365] px-2 py-0.5  rounded-full z-10"
            >
              ❯
            </button>
          </div>
        </div>

        {/* ---------------------Explore More category ------------------------- */}

        <div className="mt-15 relative">
          <h1 className="text-center mb-8 text-2xl font-semibold">
            Explore More Categories
          </h1>
          <div className=" overflow-x-hidden ">
            <div
              className="flex gap-6  w-max px-4 py-2  "
              style={{
                transform: `translateX(-${scrollIndexMore * itemWidth}px)`,
              }}
            >
              {morecategory.map((item, index) => (
                <Link key={index} to={`/879/DetailProduct/${item.sno}`}>
                  {" "}
                  <div
                    key={index}
                    className="w-60  shrink-0 bg-white rounded-lg p-2 shadow-md"
                  >
                    <img
                      src={`http://localhost/summit_home_appliancies/frontend/admin/${item.product_images}`}
                      alt=""
                      className="w-36 h-36 mx-auto"
                    />
                    <p className="font-semibold text-sm mt-2">
                      {item.product_description}
                    </p>
                    <p className="text-xs mt-1">
                      Fast heating | Non-reactive nature
                    </p>
                    <p className="flex mt-1 text-[#EE9E13] text-sm">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </p>
                    <p className="font-bold mt-1">₹{item.product_price}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="bg-[#E4F1E8] text-[#1E9531] font-semibold py-0.5 px-2 rounded-md">
                        ₹{item.product_discount} save
                      </p>
                      <button className="text-[#683208] border border-[#683208] rounded-md px-2 py-0.5">
                        Add +
                      </button>
                    </div>
                    <p className="text-xs mt-1">(incl. of all taxes)</p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              onClick={handlePrevMore}
              className="absolute text-sm top-45 left-7 transform -translate-y-1/2 bg-[#E2E2E5] text-[#636365] px-2 py-0.5 text-center rounded-full z-10"
            >
              ❮
            </button>

            {/* Next Button */}
            <button
              onClick={handleNextMore}
              // disabled={index + visibleCount >= user.length}
              className="absolute text-sm top-45 right-7 transform -translate-y-1/2 bg-[#E2E2E5] text-[#636365] px-2 py-0.5  rounded-full z-10"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default DetailProduct;
