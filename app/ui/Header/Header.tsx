"use client";
import React, { useState, useEffect } from "react";
import Logo from "../Main/Logo";
import Link from "next/link";
import UserHeader from "./UserHeader";
import CompanyHeader from "./CompanyHeader";
import OutOfAuth from "./OutOfAuth";
import AdminHeader from "./AdminHeader";
import { getRoleFromToken } from "@/app/store";

const Header = () => {
  const [role, setRole] = useState("unauthenticated");

  useEffect(() => {
    const userRole = getRoleFromToken();
    setRole(userRole);
  }, []);

  return (
    <div className="w-[100%] h-[80px] flex fixed pl-[140px] pr-[140px] mt-0 flex-row items-center justify-between bg-white shadow-2xs">
      <div className="w-[100%] flex flex-row items-center gap-8">
        <Logo />
        <Link href={"/vacancy"} className="hover:text-gray-500">
          ვაკანსიები
        </Link>
        <Link href={"/company"} className="hover:text-gray-500">
          კომპანიები
        </Link>
        {role === "company" ? (
          <Link href={"/my-vacansy"} className="hover:text-gray-500">
            ჩემი ვაკანსიები
          </Link>
        ) : (
          <Link href={"/cv"} className="hover:text-gray-500">
            შექმენი Cv
          </Link>
        )}
      </div>

      <div className="w-[30%] flex items-center gap-2 flex-row justify-end">
        {role === "user" && <UserHeader />}
        {role === "admin" && <AdminHeader />}
        {role === "company" && <CompanyHeader />}
        {role === "unauthenticated" && <OutOfAuth />}
      </div>
    </div>
  );
};

export default Header;
