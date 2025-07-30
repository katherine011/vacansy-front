"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import axios from "axios";
import Default from "../../images/images.jpg";
import Filtered from "../../icons/filter.png";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ka";

dayjs.extend(relativeTime);
dayjs.locale("ka");

interface Type {
  companyName: string;
  description: string;
  _id: string;
  personalId?: string;
  createdAt: string;
}

const Company = () => {
  const [vacancies, setVacancies] = useState<Type[]>([]);
  const token = getCookie("token");

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/companies",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const filteredVacancies = response.data.map((vacancy: any) => ({
          description: vacancy.description,
          companyName: vacancy.companyName,
          personalId: vacancy.personalId,
          createdAt: vacancy.createdAt,
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
    <div className="w-[100%] rounded-t-2xl min-h-[70vh] max-h-fit flex flex-col mt-10 bg-white border border-gray-200">
      <div className="flex flex-row items-center m-5 justify-between">
        <h1 className="font-semibold">ყველა ვაკანსია</h1>
        <Image
          src={Filtered}
          alt="default"
          width={60}
          height={60}
          className="w-[20px] h-[20px] rounded-[2px] "
        />
      </div>
      <div className="w-[100%] h-fit p-[30px] flex flex-wrap gap-[20px] border-gray-200 border">
        {vacancies.length > 0 ? (
          vacancies.map((vacancy, index) => (
            <Link href={`/company/${vacancy._id}`} key={index}>
              <div className="p-5 gap-4 flex border-gray-200 hover:bg-purple-50 cursor-pointer items-start border rounded-[22px]">
                <Image
                  src={Default}
                  alt="default"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="h-fit flex flex-wrap gap-[px] flex-col">
                  <div className="flex flex-col gap-3 items-start">
                    <h2 className="font-[inter] font-semibold text-black">
                      {vacancy.companyName}
                    </h2>
                    <h1 className="font-[inter] font-semibold text-black">
                      {vacancy.description}
                    </h1>
                  </div>
                  <div className="w-[100%] flex justify-between items-center gap-[265px]">
                    <div className="w-[100%] flex flex-row items-center gap-2">
                      <h1 className="font-[inter] font-semibold text-black">
                        იხილეთ სრულად
                      </h1>
                    </div>
                    <p className="font-[inter] font-medium text-gray-400">
                      {dayjs(vacancy.createdAt).fromNow()}
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
    </div>
  );
};

export default Company;
