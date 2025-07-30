import React from "react";
import ProfileButton from "./ProfileButton";
import Save from "../../icons/save-instagram.png";
import Image from "next/image";
import Link from "next/link";

const UserHeader = () => {
  return (
    <div className="flex flex-row items-center gap-3">
      <Link href={"/save"}>
        <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[5px] cursor-pointer hover:bg-gray-100 ">
          <Image
            src={Save}
            alt="save"
            width={30}
            height={30}
            className="w-[20px] h-[20px] "
          />
        </div>
      </Link>
      <ProfileButton />
    </div>
  );
};

export default UserHeader;
