"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Bag from "../../icons/briefcase (1).png";
import Ways from "../../icons/three-way (2).png";
import Location from "../../icons/location (1).png";
import Search from "../../icons/search.png";

const MainSearch = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (location) params.set("location", location);
    if (workType) params.set("workType", workType);

    router.push(`/vacancy?${params.toString()}`);
  };

  return (
    <div className="w-[100%] pt-10 flex items-center justify-center pl-30 pr-30  ">
      <div className="w-[100%] h-[80px] flex flex-row items-center justify-between rounded-full border-2 border-[#a155b9] pl-14 pr-6 ">
        <div className="flex relative flex-row items-center gap-2">
          <Image
            src={Bag}
            alt="bag"
            width={40}
            height={40}
            className="w-[20px] h-[20px] "
          />
          <input
            type="text"
            placeholder="ვაკანსიის ძებნა"
            className="border-none outline-none w-[100%]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="w-[1px] h-[45px] bg-gray-300 absolute right-0 "></div>
        </div>
        <div className="flex relative flex-row items-center gap-2">
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
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
          />{" "}
          <div className="w-[1px] h-[45px] bg-gray-300 absolute right-0 "></div>
        </div>
        <div className="flex flex-row items-center gap-2">
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />{" "}
        </div>
        <button
          onClick={handleSearch}
          className="rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer bg-[#a155b9] "
        >
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
  );
};

export default MainSearch;
