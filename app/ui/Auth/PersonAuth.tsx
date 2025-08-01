"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const schema = yup.object().shape({
  name: yup.string().required("სახელი აუცილებელია"),
  surname: yup.string().required("გვარი აუცილებელია"),
  birthDate: yup
    .date()
    .required("დაბადების თარიღი აუცილებელია")
    .typeError("გთხოვთ, აირჩიეთ სწორი თარიღი"),
  phone: yup
    .string()
    .required("ტელეფონის ნომერი აუცილებელია")
    .matches(/^\+?[\d\s-]{10,}$/, "გთხოვთ, შეიყვანეთ სწორი ტელეფონის ნომერი"),
  email: yup.string().email("არასწორი ელფოსტა").required("ელფოსტა აუცილებელია"),
  password: yup
    .string()
    .min(6, "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს")
    .required("პაროლი აუცილებელია"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "პაროლები არ ემთხვევა")
    .required("გაიმეორეთ პაროლი"),
  profilePhoto: yup.string().url("გთხოვთ, შეიყვანეთ სწორი URL").optional(),
});

const PersonAuth = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register/user",
        {
          name: data.name,
          surname: data.surname,
          birthDate: data.birthDate,
          phone: data.phone,
          email: data.email,
          password: data.password,
          profilePhoto: data.profilePhoto || undefined,
          role: "user",
        }
      );

      const token = response.data.token;
      if (token) {
        setCookie("token", token);
        alert("თქვენ წარმატებით გაიარეთ რეგისტრაცია!");
        router.push("/");
      } else {
        throw new Error("ტოკენი არ დაბრუნდა სერვერიდან");
      }
    } catch (err: any) {
      console.error("რეგისტრაცია ჩაიშალა:", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "სერვერის შეცდომა");
      } else {
        alert("უცნობი შეცდომა მოხდა");
      }
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
            {...register("name")}
            className={`w-full border rounded-[10px] p-2 h-[40px] ${
              errors.name ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="გვარი"
            {...register("surname")}
            className={`w-full border rounded-[10px] p-2 h-[40px] ${
              errors.surname ? "border-red-500" : "border-gray-200"
            }`}
          />
          {errors.surname && (
            <p className="text-red-500 text-sm mt-1">
              {errors.surname.message}
            </p>
          )}
        </div>
      </div>

      <div className="w-full">
        <input
          type="date"
          placeholder="დაბადების თარიღი"
          {...register("birthDate")}
          className={`w-full border rounded-[10px] p-2 h-[40px] ${
            errors.birthDate ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.birthDate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.birthDate.message}
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
        <input
          type="email"
          placeholder="ელფოსტა"
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
          placeholder="პროფილის ფოტოს URL (არასავალდებულო)"
          {...register("profilePhoto")}
          className={`w-full border rounded-[10px] p-2 h-[40px] ${
            errors.profilePhoto ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.profilePhoto && (
          <p className="text-red-500 text-sm mt-1">
            {errors.profilePhoto.message}
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

export default PersonAuth;
