"use client";

import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("გთხოვთ, შეიყვანოთ სწორი მეილი")
    .required("მეილი სავალდებულოა"),
  password: yup
    .string()
    .min(6, "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო")
    .required("პაროლი სავალდებულოა"),
});

export default function Login() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  const onSubmit = async (data: any) => {
    try {
      setApiError(null);
      const response = await axios.post("http://localhost:3001/auth/login", {
        email: data.email,
        password: data.password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/`;

      const decoded = JSON.parse(atob(token.split(".")[1]));
      const role = decoded.role || "unauthenticated";

      console.log("Logged in with role:", role);

      setTimeout(() => {
        router.push("/");
      }, 100);
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      setApiError(err.response?.data?.message || "შესვლა ვერ მოხერხდა");
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(onSubmit)(e);
  };

  if (loading) return null;

  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center ">
      <div className="w-[50%] h-[100vh] flex flex-col pl-44 pr-44 p-50 items-center">
        <h1 className="text-4xl font-semibold font-[inter] ">ავტორიზაცია</h1>
        <form
          onSubmit={handleFormSubmit}
          className="w-[100%] flex flex-col items-end justify-between gap-5 mt-14 "
        >
          {apiError && (
            <div className="w-[100%] text-red-500 text-center">{apiError}</div>
          )}
          <input
            type="text"
            placeholder="მეილი"
            className={`w-[100%] h-[40px] rounded-[8px] border outline-1 ${
              errors.email ? "border-red-500" : "border-gray-300"
            } outline-gray-300 p-2 `}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <input
            type="password"
            placeholder="პაროლი"
            className={`w-[100%] h-[40px] rounded-[8px] border outline-1 ${
              errors.password ? "border-red-500" : "border-gray-300"
            } outline-gray-300 p-2 `}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <p className="font-[inter] font-semibold text-end hover:text-gray-600 cursor-pointer ">
            პაროლის აღდგენა
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[100%] h-[50px] bg-blue-950 text-white text-2xl font-semibold font-[inter] cursor-pointer hover:bg-blue-200 rounded-[8px] "
          >
            შესვლა
          </button>
        </form>
        <p className="font-[inter] font-semibold text-gray-400 mt-4 ml-5 text-xl">
          არ გაქვს ანგარიში? -
          <Link href={"/auth"}>
            <span className="text-blue-500 hover:text-blue-400 "> შექმენი</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
