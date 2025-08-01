import Image from "next/image";
import Link from "next/link";
import React from "react";
import Team from "../../images/33433039_8056324.jpg";

const MainDecor = () => {
  return (
    <div className="w-full h-[250px] bg-[#a155b9]  rounded-[15px] flex flex-row items-center justify-between pl-10 pr-20 p-16">
      <div className="w-[700px] flex items-start flex-col gap-18">
        <h1 className="font-semibold text-3xl text-white ">
          იპოვე შენთვის სასურველი მომსახურე პერსონალები ჩვენს პლათმორმაზე
        </h1>
        <div className="flex flex-row items-center gap-2">
          <Link href={"/login"}>
            <button className="w-[170px] h-[50px] cursor-pointer rounded-[15px] flex items-center justify-center bg-white text-black font-semibold ">
              ავტორიზაცია
            </button>
          </Link>{" "}
          <Link href={"/auth"}>
            <button className="w-[170px] h-[50px] cursor-pointer rounded-[15px] flex items-center justify-center border-2 border-white text-white font-semibold ">
              ანგარიშის შექმნა
            </button>
          </Link>
        </div>
      </div>
      <Image
        src={Team}
        alt="battles"
        width={600}
        height={600}
        className="w-[350px] rounded-[12px]  h-[220px] "
      />
    </div>
  );
};

export default MainDecor;
