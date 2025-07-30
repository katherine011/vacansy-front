import Image from "next/image";
import React from "react";
import Add from "../../icons/addition.png";
import ProfileButton from "./ProfileButton";
import Link from "next/link";

const CompanyHeader = () => {
  return (
    <div className="flex flex-row items-center gap-3">
      <Link href={"/add-vacansy"}>
        <button className="w-[200px] h-[45px] flex flex-row bg-[#eddcf3] rounded-[12px] hover:bg-purple-100 cursor-pointer items-center justify-center gap-2 ">
          <Image
            src={Add}
            alt="save"
            width={30}
            height={30}
            className="w-[20px] h-[20px] rounded-full "
          />
          <p className="font-semibold text-[#a155b9] bg-[#7e1c722] ">
            ვაკანსიის დამატება
          </p>
        </button>
      </Link>
      <ProfileButton />
    </div>
  );
};

export default CompanyHeader;
