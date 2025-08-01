"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-toastify";

import { JobSchema, JobSchemaType } from "@/lib/validation/job-schema";

type JobModalWrapperProps = {
  job: JobSchemaType;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function JobModalWrapper({
  job,
  onClose,
  onSuccess,
}: JobModalWrapperProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobSchemaType>({
    resolver: zodResolver(JobSchema),
    defaultValues: job,
  });

  useEffect(() => {
    reset(job);
  }, [job, reset]);

  const onSubmit = async (data: JobSchemaType) => {
    try {
      const res = await axios.put(`/api/jobs/${job._id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("ვაკანსია განახლდა წარმატებით");
      onSuccess?.();
      onClose();
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 403) {
        toast.error("დადასტურებული ვაკანსია ვერ დარედაქტირდება");
      } else {
        toast.error("რედაქტირების შეცდომა");
      }
    }
  };

  if (job.status === "approved") {
    return null; // ვაკანსია დადასტურებულია => არ აჩვენო მოდალი
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">ვაკანსიის რედაქტირება</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">დასახელება</label>
            <input
              {...register("title")}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">აღწერა</label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered w-full"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* სხვა ველები აქ შეგიძლიათ დაამატოთ იგივე სტილში */}

          <div className="flex justify-end gap-2 mt-6">
            <button type="button" onClick={onClose} className="btn btn-outline">
              გაუქმება
            </button>
            <button type="submit" className="btn btn-primary">
              შენახვა
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
