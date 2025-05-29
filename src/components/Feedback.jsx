import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

const feedbackArray = [
  {
    name: "Priya Sharma",
    profession: "Home Chef & Food Blogger",
    review:
      "“I recently purchased a cookware combo set and a gas tandoor—both exceeded my expectations. The build is premium, and they look so good in my modern kitchen. Highly recommended!”",
    rating: 4,
    image: "/asset/images/feedback/feed1.png",
  },
  {
    name: "Rajiv Malhotra",
    profession: "Culinary Instructor",
    review:
      "The gas stove and pressure cooker I bought are absolute game-changers. The heat distribution is perfect, and the safety features are spot on.",
    rating: 4,
    image: "/asset/images/feedback/feed2.png",
  },
  {
    name: "Anjali Mehta",
    profession: "Kitchen Lifestyle Influencer",
    review:
      "This brand nails functionality with style. It’s now my go-to for all cooking needs.",
    rating: 5,
    image: "/asset/images/feedback/feed3.png",
  },
];

const MobileFeedback = () => {
  const [index, setIndex] = useState(0);
  const feedback = feedbackArray[index];

  const next = () => {
    if (index < feedbackArray.length - 1) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <>
      {/* Desktop Feedback */}
      <div className="hidden md:block px-4 md:px-16 py-10">
        <div className="relative">
          <div className="w-full flex flex-col">
            <h2 className="text-2xl font-bold">Hear It from Happy Kitchens</h2>
            <p className="text-[#636365] font-semibold text-sm mt-1">
              Real reviews from Amazon, Flipkart, and more—see why Indian cooks
              trust Summit every day.
            </p>
          </div>

          <div className="mt-8 overflow-hidden w-full">
            <div className="flex transition-transform duration-700 ease-in-out">
              {feedbackArray.map((item, i) => (
                <div
                  key={i}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4 py-6"
                >
                  <div className="flex flex-col h-full bg-[#F5F5F7] rounded-md shadow-lg p-4">
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, starIndex) =>
                        starIndex < item.rating ? (
                          <FaStar key={starIndex} className="text-[#B91508]" />
                        ) : (
                          <FaRegStar key={starIndex} className="text-[#B91508]" />
                        )
                      )}
                    </div>

                    <p className="text-sm mb-4 whitespace-pre-line break-words">
                      {item.review}
                    </p>

                    <div className="flex items-center space-x-4 mt-auto">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold">{item.name}</p>
                        <p className="text-xs">{item.profession}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Feedback */}
      <div className="block sm:hidden px-4 py-8">
        <h2 className="text-xl font-bold mb-2">Hear It from Happy Kitchens</h2>
        <p className="text-sm text-[#636365] mb-4">
          Real reviews from Amazon, Flipkart, and more.
        </p>

        <div className="bg-[#F5F5F7] p-4 rounded-md shadow-md min-h-[300px] flex flex-col justify-between">
          <div>
            <div className="flex mb-2">
              {Array.from({ length: 5 }).map((_, i) =>
                i < feedback.rating ? (
                  <FaStar key={i} className="text-[#B91508] text-sm" />
                ) : (
                  <FaRegStar key={i} className="text-[#B91508] text-sm" />
                )
              )}
            </div>

            <p className="text-sm mb-4 break-words whitespace-pre-line">
              {feedback.review}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src={feedback.image}
              alt={feedback.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-bold">{feedback.name}</p>
              <p className="text-xs">{feedback.profession}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={prev}
            disabled={index === 0}
            className="px-3 py-1 text-sm bg-gray-200 text-gray-600 rounded-full"
          >
            ❮
          </button>
          <button
            onClick={next}
            disabled={index === feedbackArray.length - 1}
            className="px-3 py-1 text-sm bg-gray-200 text-gray-600 rounded-full"
          >
            ❯
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileFeedback;
