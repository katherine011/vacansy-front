import React from "react";
import ProfileButton from "./ProfileButton";
import Notification from "../../icons/notification.png";
import Image from "next/image";

const AdminHeader = () => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="w-[35px] h-[35px] flex items-center justify-center rounded-[5px] cursor-pointer hover:bg-gray-100 ">
        <Image
          src={Notification}
          alt="Notification"
          width={30}
          height={30}
          className="w-[20px] h-[20px] "
        />
      </div>
      <ProfileButton />
    </div>
  );
};

export default AdminHeader;
