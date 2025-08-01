"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Sun from "../../icons/sun.png";
import Wallet from "../../icons/wallet.png";
import Clock from "../../icons/clock.png";
import Case from "../../icons/briefcase (2).png";
import Default from "../../images/images.jpg";
import { getCookie } from "cookies-next";
import axios from "axios";
import Link from "next/link";

interface Job {
  _id: string;
  title: string;
  companyName: string;
  salaryRange: string;
  workType: string;
  createdAt: string;
}

const VacanciesSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [vacancies, setVacancies] = useState<Job[]>([]);
  const token = getCookie("token");

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 340;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchLatestJobs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const latestJobs = response.data
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 10)
          .map((job: any) => ({
            _id: job._id,
            title: job.title,
            companyName: job.companyName,
            salaryRange: job.salaryRange,
            workType: job.workType,
            createdAt: new Date(job.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
          }));

        setVacancies(latestJobs);
      } catch (err) {
        console.error("Error fetching latest jobs:", err);
      }
    };

    fetchLatestJobs();
  }, [token]);

  return (
    <div className="w-[100%] flex flex-col gap-5">
      <div className="w-[100%] flex flex-row gap-4 justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          <Image src={Sun} alt="Sun" width={40} height={40} />
          <h1 className="font-semibold font-[inter] text-xl mb-2">
            უახლესი ვაკანსიები
          </h1>
        </div>

        <div className="flex flex-row gap-2 cursor-pointer">
          <Link href="/vacancy" className="no-underline hover:text-[#a155b9]">
            ყველა ვაკანსია
          </Link>

          <button
            onClick={() => scroll("left")}
            className="w-[30px] h-[30px] cursor-pointer rounded-full flex items-center justify-center border-1 border-gray-400 "
          >
            &lt;
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-[30px] h-[30px] cursor-pointer rounded-full flex items-center justify-center border-1 border-gray-400 "
          >
            &gt;
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto pb-5 scroll-smooth hide-scrollbar"
      >
        {vacancies.map((job) => (
          <Link
            key={job._id}
            href={`/vacancy/${job._id}`}
            className="w-[297px] h-[320px] bg-white border-1 hover:border-none hover:shadow-xs transition-shadow border-gray-200 rounded-[22px] p-4 flex flex-col justify-between"
          >
            <div className="p-3 w-[307px] h-[330px] flex flex-col justify-between pb-9">
              <div className="flex flex-row gap-2">
                <Image
                  src={Default}
                  alt="default"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h1 className="font-semibold">{job.companyName}</h1>
                  <p className="text-xs text-gray-500">{job.createdAt}</p>
                </div>
              </div>

              <h3 className="font-[inter] font-semibold text-2xl mt-2">
                {job.title}
              </h3>

              <ul className="flex flex-col gap-5 font-[inter] font-semibold mt-3">
                <li className="flex flex-row gap-3">
                  <Image src={Wallet} alt="wallet" width={25} height={25} />
                  <p>{job.salaryRange || "შეთანხმებით"}</p>
                </li>
                <li className="flex flex-row gap-3">
                  <Image src={Clock} alt="clock" width={25} height={25} />
                  <p>სრული განაკვეთი</p>
                </li>
                <li className="flex flex-row gap-3">
                  <Image src={Case} alt="case" width={25} height={25} />
                  <p>{job.workType}</p>
                </li>
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VacanciesSlider;
