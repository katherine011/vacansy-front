import Image from "next/image";
import React from "react";
import Alta from "../../images/60e49331-aba4-49a5-81d2-4eb5ef2f2634757ea3f5-4822-4638-92ac-df66a6963811.webp";

const AuthDecor = () => {
  return (
    <div className="w-[60%] h-[100%] fixed rounded-r-[20px] bg-[#a155b9] p-18 ">
      <div className="w-[100%] h-[100%] rounded-[20px] bg-white flex items-center flex-col gap-20 justify-center ">
        <h1 className="font-semibold font-[inter] text-4xl text-[#a155b9]">
          იჩქარე, მხოლოდ ალტაში!
        </h1>
        <Image
          src={Alta}
          alt="alta"
          width={700}
          height={700}
          className="w-[700px] h-[200px] "
        />
      </div>
    </div>
  );
};

export default AuthDecor;
