"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Job {
  _id: string;
  title: string;
  companyName: string;
  salaryRange: string;
  description: string;
  createdAt: string;
}

const Notification = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3001/jobs/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(res.data);
    } catch (err) {
      console.error("ვაკანსიების წამოღება ვერ მოხერხდა", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    jobId: string,
    status: "approved" | "rejected"
  ) => {
    try {
      await axios.put(
        `http://localhost:3001/jobs/${jobId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("სტატუსის განახლება ვერ მოხერხდა", err);
    }
  };

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">დაუდასტურებელი ვაკანსიები</h1>

      {loading && <p>იტვირთება...</p>}

      {!loading && jobs.length === 0 && (
        <p>ამჟამად არ არის დაუდასტურებელი ვაკანსიები.</p>
      )}

      <div className="space-y-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">კომპანია: {job.companyName}</p>
            <p className="text-gray-600">ანაზღაურება: {job.salaryRange}</p>
            <div className="w-[100%] flex flex-row items-center justify-between ">
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-gray-500 mt-2">{job.description}</p>
                <p className="text-xs text-gray-400 mt-1">
                  დამატებულია: {new Date(job.createdAt).toLocaleString()}
                </p>
              </div>{" "}
              <div className="flex gap-4 mt-4">
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer font-semibold hover:bg-green-700"
                  onClick={() => updateStatus(job._id, "approved")}
                >
                  დადასტურება
                </button>
                <button
                  className="px-4 py-2 bg-white  cursor-pointer font-semibold border border-gray-300 rounded hover:bg-gray-100"
                  onClick={() => updateStatus(job._id, "rejected")}
                >
                  გაუქმება
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
