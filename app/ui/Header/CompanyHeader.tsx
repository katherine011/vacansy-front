"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Add from "../../icons/addition.png";
import ProfileButton from "./ProfileButton";
import Link from "next/link";
import { getRoleFromToken } from "@/app/store";

const CompanyHeader = () => {
  const [role, setRole] = useState("unauthenticated");

  useEffect(() => {
    const userRole = getRoleFromToken();
    setRole(userRole);
  }, []);

  const addVacancyHref = role === "company" ? "/add-vacansy" : "/login";

  return (
    <div className="flex flex-row items-center gap-3">
      <Link href={addVacancyHref}>
        <button className="w-[200px] h-[45px] flex flex-row bg-[#f4eaf7] rounded-[12px] hover:bg-purple-100 cursor-pointer items-center justify-center gap-2">
          <Image
            src={Add}
            alt="save"
            width={30}
            height={30}
            className="w-[20px] h-[20px] rounded-full"
          />
          <p className="font-semibold text-[#a155b9]">ვაკანსიის დამატება</p>
        </button>
      </Link>
    </div>
  );
};

export default CompanyHeader;
