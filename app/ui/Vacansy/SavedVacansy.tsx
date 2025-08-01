"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import Link from "next/link";
import axios from "axios";
import { usePathname } from "next/navigation";

import Save from "../../icons/save-instagram.png";
import Save2 from "../../icons/bookmark.png";
import Default from "../../images/images.jpg";
import Wallet from "../../icons/wallet.png";
import { getRoleFromToken } from "@/app/store";

interface Type {
  title: string;
  companyName: string;
  salaryRange: string;
  createdAt: string;
  _id: string;
}

const SavedVacansy = () => {
  const [vacancies, setVacancies] = useState<Type[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const token = getCookie("token");
  const pathname = usePathname();

  // Fetch vacancies or saved jobs
  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        console.log("Fetching vacancies, token:", token, "pathname:", pathname);
        if (pathname === "/save") {
          if (!token) {
            console.log("No token, setting empty vacancies");
            setVacancies([]);
            return;
          }
          const res = await axios.get(
            "http://localhost:3001/jobs/user/saved-jobs",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("Saved jobs response:", res.data);
          const savedVacancies = res.data.savedJobs.map((vacancy: any) => ({
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
          setVacancies(savedVacancies);
          setSavedJobs(savedVacancies.map((v: Type) => v._id));
        } else {
          const response = await axios.get("http://localhost:3001/jobs", {
            headers: { Authorization: `Bearer ${token}` },
            params: { status: "approved" },
          });
          console.log("All jobs response:", response.data);
          const vacancies = response.data.map((vacancy: any) => ({
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
          setVacancies(vacancies);
        }
      } catch (err: any) {
        console.error(
          "Error fetching vacancies:",
          err.message,
          err.response?.data
        );
        if (err.response?.status === 401) {
          setVacancies([]);
        }
      }
    };

    const fetchSavedJobs = async () => {
      try {
        if (!token) {
          console.log("No token for saved jobs");
          return;
        }
        const res = await axios.get(
          "http://localhost:3001/jobs/user/saved-jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Saved jobs for icon toggle:", res.data);
        setSavedJobs(res.data.savedJobs.map((job: any) => job._id));
      } catch (err: any) {
        console.error("Error fetching saved jobs:", err.message);
      }
    };

    fetchVacancies();
    if (pathname !== "/save") {
      fetchSavedJobs();
    }
  }, [token, pathname]);

  const handleSave = async (jobId: string, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      console.log("Handling save/unsave for jobId:", jobId);
      const role = getRoleFromToken();
      if (!token || role === "unauthenticated") {
        alert("გთხოვთ, გაიაროთ ავტორიზაცია!");
        return;
      }

      if (role !== "user") {
        alert(
          "ვაკანსიის შენახვა შესაძლებელია მხოლოდ იუზერისთვის. გთხოვთ, გაიაროთ იუზერის ავტორიზაცია!"
        );
        return;
      }

      const isSaved = savedJobs.includes(jobId);
      const url = `http://localhost:3001/jobs/${jobId}/${
        isSaved ? "unsave" : "save"
      }`;
      const response = await axios.post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Save/Unsave response:", response.data);

      setSavedJobs((prev) =>
        isSaved ? prev.filter((id) => id !== jobId) : [...prev, jobId]
      );

      if (pathname === "/save" && isSaved) {
        setVacancies((prev) => prev.filter((v) => v._id !== jobId));
      }

      alert(
        isSaved
          ? "ვაკანსია წარმატებით გაუქმდა!"
          : "ვაკანსია წარმატებით შეინახა!"
      );
    } catch (error: any) {
      console.error("Save/Unsave Error:", error.message, error.response?.data);
      if (error.response?.status === 401) {
        alert("სესიის ვადა ამოიწურა. გთხოვთ, ხელახლა გაიაროთ ავტორიზაცია.");
      } else {
        alert("ვაკანსიის შენახვისას მოხდა შეცდომა!");
      }
    }
  };

  return (
    <div className="w-[100%] min-h-[83vh] bg-white rounded-t-[14px] max-h-fit  flex flex-col gap-[20px] border-gray-100 border">
      <div className="w-[100%] p-4 border border-gray-100 rounded-t-[14px] ">
        <h1 className="font-semibold pl-3 ">შენახული ვაკანსიები</h1>
      </div>
      <div className="w-[100%] h-fit p-[30px] flex flex-wrap gap-[20px] border-gray-100 ">
        {vacancies.length > 0 ? (
          vacancies.map((vacancy) => (
            <Link href={`/vacancy/${vacancy._id}`} key={vacancy._id}>
              <div className="p-5 gap-4 flex border-gray-200 hover:bg-purple-50 cursor-pointer items-start border rounded-[22px]">
                <Image
                  src={Default}
                  alt="default"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="h-fit flex flex-wrap gap-[20px] flex-col">
                  <div className="flex items-start justify-between flex-row w-[100%]">
                    <div className="flex flex-col gap-3 items-start">
                      <h2 className="font-[inter] font-semibold text-black">
                        {vacancy.companyName}
                      </h2>
                      <h1 className="font-[inter] font-semibold text-black">
                        {vacancy.title}
                      </h1>
                    </div>
                    <button
                      onClick={(e) => handleSave(vacancy._id, e)}
                      aria-label={
                        savedJobs.includes(vacancy._id)
                          ? "Unsave vacancy"
                          : "Save vacancy"
                      }
                    >
                      <Image
                        src={savedJobs.includes(vacancy._id) ? Save2 : Save}
                        alt={
                          savedJobs.includes(vacancy._id) ? "unsave" : "save"
                        }
                        width={20}
                        height={20}
                      />
                    </button>
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
          <div className="text-center p-5">
            {pathname === "/save"
              ? "არ გაქვთ შენახული ვაკანსიები"
              : "ვაკანსიები ვერ მოიძებნა"}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedVacansy;
