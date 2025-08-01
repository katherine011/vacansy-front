"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salaryRange: string;
  workType: string;
  experience: string;
  education: string;
  languages: string[];
  jobCategory: string;
  contact: {
    name: string;
    email: string;
  };
}

interface Props {
  onClose: () => void;
}

const ModalForId = ({ onClose }: Props) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  useEffect(() => {
    if (!jobId) return;

    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/jobs/${jobId}`);
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("ვაკანსია ვერ მოიძებნა");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return <p className="text-sm text-gray-500">იტვირთება...</p>;
  }

  if (error || !job) {
    return (
      <div className="text-center text-red-500 text-sm">
        {error || "ვაკანსია ვერ მოიძებნა"}
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-lg shadow-md p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <X size={20} />
      </button>

      <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{job.location}</p>
      <p className="mb-4 whitespace-pre-wrap">{job.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
        <p>
          <span className="font-semibold">Category:</span> {job.jobCategory}
        </p>
        <p>
          <span className="font-semibold">Work Type:</span> {job.workType}
        </p>
        <p>
          <span className="font-semibold">Experience:</span> {job.experience}
        </p>
        <p>
          <span className="font-semibold">Education:</span> {job.education}
        </p>
        <p>
          <span className="font-semibold">Salary:</span> {job.salaryRange}
        </p>
        <p>
          <span className="font-semibold">Languages:</span>{" "}
          {job.languages.join(", ")}
        </p>
      </div>

      <div className="mt-6 border-t pt-4 text-sm">
        <p className="font-semibold mb-1">კონტაქტი:</p>
        <p>
          სახელი: {job.contact.name} <br />
          Email:{" "}
          <a
            href={`mailto:${job.contact.email}`}
            className="text-blue-600 underline"
          >
            {job.contact.email}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ModalForId;
