"use client";

import React, { useState } from "react";
import Image from "next/image";
import Bag from "../../icons/briefcase (1).png";
import Ways from "../../icons/three-way (2).png";
import Location from "../../icons/location (1).png";
import Search from "../../icons/search.png";
import Filter from "../../icons/filter.png";
import VacansyFilter from "./VacansyFilter";

const VacansySearch = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col">
      <div className="w-[100%]  p-7 bg-white  flex items-center justify-center pl-[140px] pr-[180px] gap-2 ">
        <div className="w-[100%] h-[60px] border pl-10 pr-10 border-gray-200 shadow-2xs p-4 rounded-[12px] flex flex-row items-center gap-3 ">
          <div className="w-[100%] relative flex flex-row items-center justify-between gap-2">
            <Image
              src={Bag}
              alt="bag"
              width={40}
              height={40}
              className="w-[22px] h-[22px] "
            />
            <input
              type="text"
              placeholder="ვაკანსიის ძებნა"
              className="border-none outline-none w-[100%]"
            />
            <div className="w-[1px] h-[30px] bg-gray-300 absolute right-7 "></div>
          </div>
          <div className="w-[100%] relative flex flex-row items-center gap-2">
            <Image
              src={Ways}
              alt="bag"
              width={40}
              height={40}
              className="w-[30px] h-[30px] "
            />
            <input
              type="text"
              placeholder="სამუშაო ტიპები"
              className="border-none outline-none w-[100%]"
            />{" "}
            <div className="w-[0.9px] h-[30px] bg-gray-300 absolute right-7 "></div>
          </div>
          <div className="w-[100%] flex flex-row items-center gap-2">
            <Image
              src={Location}
              alt="bag"
              width={40}
              height={40}
              className="w-[25px] h-[25px] "
            />
            <input
              type="text"
              placeholder="მდეგბარეობა"
              className="border-none outline-none w-[100%]"
            />{" "}
          </div>
          <div className="w-[2%] items-end ">
            <button className="rounded-full w-[45px] h-[45px] flex items-center justify-center cursor-pointer bg-[#a155b9] ">
              {" "}
              <Image
                src={Search}
                alt="bag"
                width={40}
                height={40}
                className="w-[25px] h-[25px] "
              />
            </button>
          </div>
        </div>
        <button
          onClick={() => setOpenModal(!openModal)}
          className="w-[200px] h-[45px] flex-row rounded-[12px] border-black border hover:bg-gray-100 text- cursor-pointer flex items-center justify-center font-semibold text- "
        >
          <Image
            src={Filter}
            alt="bag"
            width={40}
            height={40}
            className="w-[28px] h-[22px] pr-2 "
          />
          ფილტრები
        </button>
      </div>
      {openModal && <VacansyFilter />}
    </div>
  );
};

export default VacansySearch;
