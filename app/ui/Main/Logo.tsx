import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <>
      <Link href={"/"}>
        <div className="w-[133px] h-[40px] rounded-full bg-[#a155b9] cursor-pointer flex items-center justify-start pl-[5px] ">
          <div className="bg-white rounded-full flex items-center justify-center w-[88px] h-[30px] ">
            <p className="font-semibold text-xl  text-[900] ">MyJobs</p>
          </div>
          <p className="font-semibold text-xl pb-1  text-white ">.ge</p>
        </div>
      </Link>
    </>
  );
};

export default Logo;
