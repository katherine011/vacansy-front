"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import axios from "axios";
import Acc from "../../images/images.jpg";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const ProfileButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState<string>("...");
  const [email, setEmail] = useState<string>("...");
  const router = useRouter();
  const token = getCookie("token");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:3001/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data;
        setUsername(user.name || "მომხმარებელი");
        setEmail(user.email || "...");
      } catch (err) {
        console.error("მომხმარებლის მონაცემები ვერ მივიღეთ:", err);
      }
    };

    if (token) fetchUserInfo();
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModal(false);
      }
    };

    if (openModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openModal]);

  const handleLogout = async () => {
    try {
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

      deleteCookie("token");
      router.push("/");
      setOpenModal(false);
    } catch (err: any) {
      console.error("გამოსვლა ჩაიშალა:", err.response?.data || err.message);
    }
  };

  return (
    <div className="relative" ref={modalRef}>
      <button
        onClick={() => setOpenModal(!openModal)}
        className="min-w-[160px] max-w-auto h-[45px] rounded-[10px] border border-gray-300 hover:bg-gray-100 cursor-pointer flex flex-row gap-2 items-center justify-center px-2"
      >
        <Image
          src={Acc}
          alt="account"
          width={20}
          height={20}
          className="w-[25px] h-[25px] rounded-full"
        />
        <h1 className="font-semibold text-nowrap">{username}</h1>
        <ChevronDown
          className={`w-[18px] h-[18px] transition-transform duration-200 ${
            openModal ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {openModal && (
        <div className="w-[222px] h-[220px] border shadow-2xl border-gray-200 rounded-[15px]  bg-white flex flex-col top-14 right-0 absolute z-50">
          <div className="w-full p-3 flex items-center gap-2 flex-row">
            <Image
              src={Acc}
              alt="account"
              width={60}
              height={60}
              className="w-[40px] h-[40px] rounded-full"
            />
            <div className="w-[180px] flex flex-col items-start font-[inter]">
              <p className="text-sm text-gray-500">{email}</p>
              <p className="text-sm text-gray-500">{username}</p>
            </div>
          </div>
          <div className="w-[100%] h-[1px] bg-gray-300  "></div>
          <Link
            href={"/profile"}
            className="w-[100%] h-[40px] mt-1 cursor-pointer flex items-center pl-3 font-semibold justify-start  hover:bg-gray-100 "
          >
            ჩემი პროფილი
          </Link>
          <Link
            href={"/"}
            className="w-[100%] h-[40px] cursor-pointer flex items-center pl-3 font-semibold justify-start mt-2 mb-2 hover:bg-gray-100 "
          >
            მონაცემთა ცვლილება
          </Link>{" "}
          <div className="w-[100%] h-[1px] bg-gray-300  "></div>
          <div className="flex-grow" />
          <button
            onClick={handleLogout}
            className="w-[200px] ml-2 mt-2 mb-2 cursor-pointer h-[40px] rounded-[12px] flex items-center justify-center    border-gray-200 hover:bg-gray-200 font-semibold"
          >
            გამოსვლა
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
