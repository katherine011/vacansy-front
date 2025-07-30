"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Sun from "../../icons/sun.png";
import Wallet from "../../icons/wallet.png";
import Clock from "../../icons/clock.png";
import Case from "../../icons/briefcase (2).png";
import Default from "../../images/images.jpg";

const VacanciesSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 340;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-[100%] flex flex-col gap-5">
      <div className="w-[100%] flex flex-row gap-4 justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Image src={Sun} alt="Sun" width={40} height={40} />
          <h1 className="font-semibold font-[inter] text-xl mb-2 ">
            უახლესი ვაკანსიები
          </h1>
        </div>

        <div className="flex flex-row gap-2 cursor-pointer">
          <a className="no-underline hover:text-[#a155b9] " href="">
            ყველა ვაკანსია
          </a>

          <button
            onClick={() => scroll("left")}
            className="w-[30px] h-[30px] cursor-pointer rounded-full flex items-center justify-center border-1 border-gray-400 "
          >
            &lt;
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-[30px] h-[30px] cursor-pointer rounded-full flex items-center justify-center border-1 border-gray-400 "
          >
            &gt;
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex  gap-4 overflow-x-auto px-4 pb-2 scroll-smooth"
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="w-[307px] h-[330px] bg-white border-1 border-gray-200 rounded-[22px] p-4  flex flex-col justify-between"
          >
            <div className="p-3 w-[307px] h-[330px] flex flex-col justify-between pb-9 ">
              <div className="flex flex-row gap-2">
                {/* <img src="" className="w-10 h-10 rounded-full " alt="logo" /> */}
                <Image
                  src={Default}
                  alt="default"
                  width={40}
                  height={40}
                  className="rounded-full "
                />
                <div>
                  <h1 className="font-semibold">თიბისი</h1>
                  <p className="text-xs text-gray-500">თბილისი, საქართველო</p>
                </div>
              </div>
              <h3 className="font-[inter] font-semibold text-2xl ">
                სისტემის ანალიტიკოსი
              </h3>
              <ul className="flex flex-col gap-5 font-[inter] font-semibold">
                <div className="flex flex-row gap-3">
                  <Image src={Wallet} alt="wallet" width={25} height={25} />
                  <p>შთაბეჭდილები</p>
                </div>
                <div className="flex flex-row gap-3">
                  <Image src={Clock} alt="clock" width={25} height={25} />
                  <p>სრული განაკვეთი</p>
                </div>
                <div className="flex flex-row gap-3">
                  <Image src={Case} alt="case" width={25} height={25} />
                  <p>ოფისიდან</p>
                </div>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VacanciesSlider;
