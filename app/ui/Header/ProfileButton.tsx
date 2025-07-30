"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";

const ProfileButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // ოპციონალური: გავუგზავნოთ მოთხოვნა ბექენდის logout ენდპოინტზე
      const token = getCookie("token");
      if (token) {
        await axios.post(
          "http://localhost:3001/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // წავშალოთ ტოკენი
      deleteCookie("token");

      // გადავამისამართოთ მომხმარებელი /login-ზე
      router.push("/");
      setOpenModal(false); // დავხუროთ მოდალი
    } catch (err: any) {
      console.error("გამოსვლა ჩაიშალა:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpenModal(!openModal)}
        className="w-[140px] h-[45px] rounded-[10px] border border-gray-200 hover:bg-gray-100 cursor-pointer flex items-center justify-center"
      >
        katherina
      </button>

      {openModal && (
        <div className="w-[200px] h-[300px] border border-gray-200 rounded-[15px] shadow-2xs bg-white p-3 flex flex-col top-18 right-34 absolute">
          <button
            onClick={handleLogout}
            className="w-[100%] cursor-pointer h-[50px] rounded-[12px] flex items-center justify-center border border-gray-200 hover:bg-gray-200 font-semibold"
          >
            გამოსვლა
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
