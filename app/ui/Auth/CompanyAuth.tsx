"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";

// ✅ Yup validation schema
const schema = yup.object().shape({
  registrantName: yup.string().required("სახელი აუცილებელია"),
  registrantSurname: yup.string().required("გვარი აუცილებელია"),
  companyName: yup.string().required("კომპანიის სახელი აუცილებელია"),
  email: yup.string().email("არასწორი იმეილი").required("ემაილი აუცილებელია"),
  password: yup
    .string()
    .min(6, "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს")
    .required("პაროლი აუცილებელია"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "პაროლები არ ემთხვევა")
    .required("გაიმეორეთ პაროლი"),
  phone: yup.string().required("ტელეფონის ნომერი აუცილებელია"),
  description: yup.string().required("კომპანიის შესახებ აუცილებელია"),
});

const CompanyAuth = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    try {
      console.log(data, "data");
      const response = await axios.post(
        "http://localhost:3001/auth/register/company",
        data
      );

      const token = response.data.token;
      if (token) {
        console.log(token, "token");
        setCookie("token", token);
        router.push("/");
      } else {
        console.error("Token not returned from backend");
      }
    } catch (err: any) {
      console.error("Registration failed:", err.response?.data || err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center gap-4"
    >
      <div className="flex flex-row items-center gap-3 w-full">
        <div className="w-full">
          <input
            type="text"
            placeholder="სახელი"
            {...register("registrantName")}
            className={`w-full border rounded-[10px] p-2 h-[40px] ${
              errors.registrantName ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.registrantName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrantName.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="გვარი"
            {...register("registrantSurname")}
            className={`w-full border rounded-[10px] p-2 h-[40px] ${
              errors.registrantSurname ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.registrantSurname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrantSurname.message}
            </p>
          )}
        </div>
      </div>

      <div className="w-full">
        <input
          type="text"
          placeholder="კომპანიის სახელი"
          {...register("companyName")}
          className={`w-full border rounded-[10px] p-2 h-[40px] ${
            errors.companyName ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.companyName && (
          <p className="text-red-500 text-sm mt-1">
            {errors.companyName.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <input
          type="email"
          placeholder="ემაილი"
          {...register("email")}
          className={`w-full border rounded-[10px] p-2 h-[40px] ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="w-full">
        <input
          type="password"
          placeholder="პაროლი"
          {...register("password")}
          className={`w-full border rounded-[10px] p-2 h-[40px] ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="w-full">
        <input
          type="password"
          placeholder="გაიმეორეთ პაროლი"
          {...register("confirmPassword")}
          className={`w-full border rounded-[10px] p-2 h-[40px] ${
            errors.confirmPassword ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <div className="w-full">
        <input
          type="text"
          placeholder="ტელეფონის ნომერი"
          {...register("phone")}
          className={`w-full border rounded-[10px] p-2 h-[40px] ${
            errors.phone ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div className="w-full">
        <textarea
          placeholder="კომპანიის შესახებ"
          {...register("description")}
          className={`w-full border rounded-[10px] p-2 h-[90px] resize-none ${
            errors.description ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full h-[50px] rounded-[10px] flex items-center justify-center text-white font-semibold text-2xl hover:bg-purple-300 cursor-pointer bg-[#a155b9]"
      >
        რეგისტრაცია
      </button>
    </form>
  );
};

export default CompanyAuth;
