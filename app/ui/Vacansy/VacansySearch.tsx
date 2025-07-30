import React from "react";
import Search from "../../icons/magnifying-glass.png";
import Image from "next/image";

const VacansySearch = () => {
  return (
    <div className="w-[100%] p-7 bg-white  flex items-center justify-center pl-[140px] pr-[140px] mt- ">
      <div className="w-[100%] h-[60px] border-2 border-gray-700 p-4 rounded-[12px] flex flex-row items-center gap-3 ">
        <Image
          src={Search}
          alt="search"
          width={90}
          height={90}
          className="w-[20px] h-[20px] "
        />
        <input
          type="text"
          placeholder="ვაკანსიის დასახელება"
          className="border-none outline-none w-[100%] "
        />
      </div>
    </div>
  );
};

export default VacansySearch;
