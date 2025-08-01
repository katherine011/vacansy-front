"use client";

import React, { useEffect, useState } from "react";
import Battles from "../../images/beatles-abbey-road.webp";
import Link from "next/link";
import Image from "next/image";
import { getRoleFromToken } from "@/app/store";

const NewOpportunity = () => {
  const [role, setRole] = useState("unauthenticated");

  useEffect(() => {
    const userRole = getRoleFromToken();
    setRole(userRole);
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(270deg, rgb(52, 111, 206) 0%, rgb(161, 85, 185) 100%)",
      }}
      className="w-full h-[250px] rounded-[15px] flex flex-row items-center justify-between pl-10 pr-20 p-8"
    >
      <div className="flex items-start flex-col gap-22">
        <h1 className="font-semibold text-3xl text-white ">
          გამოსცადე ახალი შესაძლებლობები!
        </h1>

        {role === "unauthenticated" ? (
          <div className="flex flex-row items-center gap-2">
            <Link href={"/auth"}>
              <button className="w-[170px] h-[50px] cursor-pointer rounded-[15px] flex items-center justify-center bg-white text-black font-semibold ">
                ანგარიშის შექმნა
              </button>
            </Link>{" "}
            <Link href={"/login"}>
              <button className="w-[170px] h-[50px] cursor-pointer rounded-[15px] flex items-center justify-center border-2 border-white text-white font-semibold ">
                ავტორიზაცია
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-row items-center gap-2">
            <Link href={"/vacancy"}>
              <button className="w-[170px] h-[50px] cursor-pointer rounded-[15px] flex items-center justify-center bg-white text-black font-semibold ">
                ვაკანსიები
              </button>
            </Link>{" "}
            <Link href={"/company"}>
              <button className="w-[170px] h-[50px] cursor-pointer rounded-[15px] flex items-center justify-center border-2 border-white text-white font-semibold ">
                კომპანიები
              </button>
            </Link>
          </div>
        )}
      </div>
      <Image
        src={Battles}
        alt="battles"
        width={600}
        height={600}
        className="w-[400px] rounded-[12px]  h-[220px] "
      />
    </div>
  );
};

export default NewOpportunity;
