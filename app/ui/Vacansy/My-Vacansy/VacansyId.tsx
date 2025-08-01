"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { getCookie } from "cookies-next";
import { getRoleFromToken } from "@/app/store";
import { X } from "lucide-react";

import SaveBlack from "../../../icons/bookmark.png";
import Save from "../../../icons/save-instagram.png";
import Wallet from "../../../icons/wallet.png";
import Bag from "../../../icons/briefcase (2).png";
import Clock from "../../../icons/clock (1).png";
import Cap from "../../../icons/graduation-cap.png";
import IDk from "../../../icons/language.png";

interface VacancyType {
  title: string;
  companyName: string;
  location: string;
  salaryRange: string;
  workType: string;
  experience: string;
  description: string;
  customId: string;
  id: string;
}

const VacansyId = () => {
  const { id } = useParams();
  const [vacancy, setVacancy] = useState<VacancyType | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const token = getCookie("token");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("გთხოვთ, აირჩიოთ CV ფაილი!");
      return;
    }

    if (!token) {
      alert("გთხოვთ, გაიაროთ ავტორიზაცია!");
      return;
    }

    try {
      console.log(
        "Uploading CV for jobId:",
        id,
        "file:",
        selectedFile.name,
        "token:",
        token
      );
      const formData = new FormData();
      formData.append("cv", selectedFile);

      const res = await axios.post(
        `http://localhost:3001/jobs/${id}/apply`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("CV Upload response:", res.data);

      alert("CV წარმატებით გაიგზავნა!");
      setIsOpen(false);
      setSelectedFile(null);
    } catch (error: any) {
      console.error(
        "CV Upload Error:",
        error.message,
        error.response?.data,
        error.response?.status
      );
      if (error.response?.status === 401) {
        alert("სესიის ვადა ამოიწურა. გთხოვთ, ხელახლა გაიაროთ ავტორიზაცია.");
      } else if (error.response?.status === 404) {
        alert(
          "ვაკანსია ან განაცხადის ენდპოინტი მიუწვდომელია. შეამოწმეთ ვაკანსიის ID."
        );
      } else if (error.response?.status === 400) {
        alert("CV ფაილი არ არის მოწოდებული. გთხოვთ, აირჩიოთ ფაილი.");
      } else {
        alert(
          `CV ატვირთვისას მოხდა შეცდომა: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  // Fetch vacancy and saved jobs
  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        console.log("Fetching vacancy for id:", id, "token:", token);
        const res = await axios.get(`http://localhost:3001/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Vacancy response:", res.data);
        setVacancy(res.data);
      } catch (error: any) {
        console.error(
          "Error fetching vacancy:",
          error.message,
          error.response?.data
        );
      }
    };

    const fetchSavedJobs = async () => {
      try {
        if (!token) {
          console.log("No token for saved jobs");
          setIsSaved(false);
          return;
        }
        const res = await axios.get(
          "http://localhost:3001/jobs/user/saved-jobs",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Saved jobs response:", res.data);
        const savedJobs = res.data.savedJobs || [];
        setIsSaved(savedJobs.some((job: any) => job._id === id));
      } catch (error: any) {
        console.error(
          "Error fetching saved jobs:",
          error.message,
          error.response?.data
        );
        if (error.response?.status === 401) {
          setIsSaved(false);
          alert("სესიის ვადა ამოიწურა. გთხოვთ, ხელახლა გაიაროთ ავტორიზაცია.");
        } else if (error.response?.status === 404) {
          console.error("Saved jobs endpoint not found. Check backend routes.");
        }
      }
    };

    if (id) {
      fetchVacancy();
      fetchSavedJobs();
    }
  }, [id, token]);

  const handleSave = async () => {
    try {
      console.log("Handling save/unsave for jobId:", id, "token:", token);
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

      const url = `http://localhost:3001/jobs/${id}/${
        isSaved ? "unsave" : "save"
      }`;
      const res = await axios.post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Save/Unsave response:", res.data);

      setIsSaved(!isSaved);
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
        alert(
          isSaved
            ? "ვაკანსიის გაუქმებისას მოხდა შეცდომა!"
            : "ვაკანსიის შენახვისას მოხდა შეცდომა!"
        );
      }
    }
  };

  return (
    <div className="w-[100%] min-h-[70vh] max-h-fit flex flex-col">
      <div className="w-[100%] min-h-[83vh] p-8 max-h-fit rounded-t-[18px] gap-7 flex flex-col bg-white border border-gray-300 shadow-xl mt-30">
        <div className="w-[100%] flex flex-row items-center justify-between">
          <div className="w-[100%] flex flex-col gap-3 items-start justify-between">
            <h1 className="font-semibold text-2xl">
              {vacancy?.title || "ჩატვირთვა..."}
            </h1>
            <div className="flex flex-row items-center gap-4 font-semibold cursor-pointer">
              <p className="hover:text-gray-500">
                {vacancy?.companyName || "N/A"}
              </p>
              <p>●</p>
              <p>{vacancy?.location || "N/A"}</p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-5">
            <button
              onClick={handleSave}
              aria-label={isSaved ? "Unsave vacancy" : "Save vacancy"}
            >
              <Image
                src={isSaved ? SaveBlack : Save}
                alt={isSaved ? "unsave" : "save"}
                width={30}
                height={30}
                className="w-[22px] h-[20px] cursor-pointer"
              />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-[150px] h-[40px] text-white font-semibold hover:bg-purple-300 flex items-center justify-center rounded-full bg-purple-700 cursor-pointer"
            >
              გაგზავნა
            </button>
            {isOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-6 relative">
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    onClick={() => {
                      setIsOpen(false);
                      setSelectedFile(null);
                    }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    CV ატვირთვა
                  </h2>
                  <div className="mb-4">
                    <label
                      htmlFor="cv"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      აირჩიე ფაილი (PDF, DOC, DOCX)
                    </label>
                    <input
                      type="file"
                      id="cv"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-purple-100 file:text-black hover:file:bg-purple-200 transition"
                    />
                  </div>
                  <button
                    onClick={handleUpload}
                    disabled={!selectedFile}
                    className={`w-full py-2 rounded-full text-white font-semibold transition ${
                      selectedFile
                        ? "bg-purple-700 hover:bg-purple-600"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  >
                    ატვირთე
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <h1 className="font-semibold text-purple-700 -mt-5">
          ID: {vacancy?.customId || "N/A"}
        </h1>

        <div className="flex items-center flex-row gap-2">
          <Image
            src={Wallet}
            alt="wallet"
            width={30}
            height={30}
            className="w-[20px] h-[20px]"
          />
          <p className="font-semibold text-xl">
            {vacancy?.salaryRange || "N/A"}
          </p>
        </div>

        <div className="flex items-center flex-row gap-6">
          <div className="flex flex-row items-start justify-between gap-[250px]">
            <div className="flex items-start justify-between flex-col gap-6">
              <div className="flex flex-row gap-3 items-center">
                <Image
                  src={Clock}
                  alt="clock"
                  width={30}
                  height={30}
                  className="w-[20px] h-[20px]"
                />
                <p className="text-xl">{vacancy?.workType || "N/A"}</p>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <Image
                  src={Bag}
                  alt="bag"
                  width={30}
                  height={30}
                  className="w-[20px] h-[20px]"
                />
                <p className="text-xl">{vacancy?.title || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-start justify-between flex-col gap-3">
              <div className="flex flex-row gap-3 items-center">
                <Image
                  src={Cap}
                  alt="cap"
                  width={30}
                  height={30}
                  className="w-[24px] h-[24px]"
                />
                <p className="text-xl">{vacancy?.experience || "N/A"}</p>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <Image
                  src={IDk}
                  alt="lang"
                  width={30}
                  height={30}
                  className="w-[30px] h-[30px]"
                />
                <p className="text-xl">ქართული</p>
              </div>
            </div>
          </div>
        </div>

        <h1 className="font-semibold text-2xl mt-6">● ვაკანსიის შესახებ</h1>
        <div className="w-[100%] min-h-[140px] max-h-fit border border-gray-300 shadow-xl rounded-[12px] bg-white p-5 flex items-start">
          <p className="font-semibold text-blue-950">
            {vacancy?.description || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VacansyId;
