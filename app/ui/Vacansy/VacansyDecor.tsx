import Image from "next/image";
import React from "react";
import TBC from "../../images/3280x994-1-1.avif";

const VacansyDecor = () => {
  return (
    <div className="w-[50%] h-[100%] fixed rounded-r-[20px] bg-[#1a063b] p-18 ">
      <div className="w-[100%] h-[100%] rounded-[20px] bg-white flex items-center flex-col gap-20 justify-center ">
        <h1 className="font-semibold font-[inter] text-4xl text-[#1a063b]">
          აიღე ახალი თიბისი ბარათი!
        </h1>
        <Image
          src={TBC}
          alt="alta"
          width={700}
          height={700}
          className="w-[700px] h-[200px] "
        />
      </div>
    </div>
  );
};

export default VacansyDecor;
