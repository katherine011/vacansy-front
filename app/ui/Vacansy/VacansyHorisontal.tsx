"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import axios from "axios";
import Default from "../../images/images.jpg";
import Wallet from "../../icons/wallet.png";

interface Type {
  title: string;
  companyName: string;
  salaryRange: string;
  createdAt: string;
  _id: string;
}

const VacansyHorisontal = () => {
  const [vacancies, setVacancies] = useState<Type[]>([]);
  const token = getCookie("token");

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const filteredVacancies = response.data.map((vacancy: any) => ({
          title: vacancy.title,
          companyName: vacancy.companyName,
          salaryRange: vacancy.salaryRange,
          createdAt: new Date(vacancy.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          _id: vacancy._id,
        }));
        setVacancies(filteredVacancies);
      } catch (err) {
        console.error("Error fetching vacancies:", err);
      }
    };

    fetchVacancies();
  }, [token]);

  return (
    <div className="w-[100%] h-fit p-[30px] flex flex-wrap gap-[20px] border-gray-100 border">
      {vacancies.length > 0 ? (
        vacancies.map((vacancy, index) => (
          <Link href={`/vacancy/${vacancy._id}`} key={index}>
            <div className="p-5 gap-4 flex border-gray-200 hover:bg-purple-50 cursor-pointer items-start border rounded-[22px]">
              <Image
                src={Default}
                alt="default"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="h-fit flex flex-wrap gap-[20px] flex-col">
                <div className="flex flex-col gap-3 items-start">
                  <h2 className="font-[inter] font-semibold text-black">
                    {vacancy.companyName}
                  </h2>
                  <h1 className="font-[inter] font-semibold text-black">
                    {vacancy.title}
                  </h1>
                </div>
                <div className="w-[100%] flex justify-between items-center gap-40">
                  <div className="w-[100%] flex flex-row items-center gap-2">
                    <Image src={Wallet} alt="Wallet" width={20} height={20} />
                    <h1 className="font-[inter] font-semibold text-black">
                      {vacancy.salaryRange}{" "}
                      <span className="font-[inter] font-medium text-gray-400">
                        /თვეში
                      </span>
                    </h1>
                  </div>
                  <p className="font-[inter] font-medium text-gray-400">
                    {vacancy.createdAt}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-center p-5">No vacancies found</div>
      )}
    </div>
  );
};

export default VacansyHorisontal;
