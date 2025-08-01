"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Wallet from "../../icons/wallet.png";
import Bag from "../../icons/briefcase (2).png";
import Clock from "../../icons/clock (1).png";
import Cap from "../../icons/graduation-cap.png";
import IDk from "../../icons/language.png";
import { getCookie } from "cookies-next";

interface VacancyType {
  companyName: string;
  personalId: string;
  description: string;
  createdAt: string;
  id: string;
}

const CompanyId = () => {
  const params = useParams();
  const id = params?.id as string;
  const [vacancy, setVacancy] = useState<VacancyType | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchVacancy = async () => {
      try {
        const token = getCookie("token");
        const res = await axios.get(
          `http://localhost:3001/auth/companies/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVacancy(res.data);
      } catch (error) {
        console.error("Error fetching vacancy:", error);
      }
    };

    if (id) fetchVacancy();
  }, [id]);

  return (
    <div className="w-[50%] min-h-[70vh] max-h-fit flex flex-col ">
      <div className="w-[100%] min-h-[83vh] p-8 max-h-fit rounded-t-[18px] gap-12 flex flex-col bg-white border border-gray-300 shadow-xl mt-30">
        <div className="w-[100%] flex flex-row items-center justify-between ">
          <div className="w-[100%] flex flex-col gap-3 items-start justify-between ">
            <h1 className="font-semibold text-2xl ">{vacancy?.companyName}</h1>
          </div>
        </div>

        <h1 className="font-semibold text-purple-700 -mt-5 ">
          ID: {vacancy?.personalId}
        </h1>

        <h1 className="font-semibold text-2xl mt-6">● ვაკანსიის შესახებ</h1>
        <div className="w-[100%] min-h-[140px] max-h-fit border border-gray-300 shadow-xl rounded-[12px] bg-white p-5 flex items-start">
          <p className="font-semibold text-blue-950">{vacancy?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyId;
