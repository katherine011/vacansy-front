"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/rare/select";

const schema = yup.object().shape({
  title: yup.string().required("ვაკანსიის დასახელება აუცილებელია"),
  companyName: yup.string().required("კომპანიის სახელი აუცილებელია"),
  location: yup
    .string()
    .oneOf(
      [
        "თბილისი",
        "ბათუმი",
        "ქუთაისი",
        "რუსთავი",
        "გორი",
        "ზუგდიდი",
        "ფოთი",
        "თელავი",
        "სოხუმი",
        "ხაშური",
      ],
      "ლოკაცია არასწორია"
    )
    .required("ლოკაცია აუცილებელია"),
  salaryRange: yup.string().required("ხელფასი აუცილებელია"),
  workType: yup
    .string()
    .oneOf(
      ["ოფისი", "დისტანციური", "ჰიბრიდი", "თავისუფალი გრაფიკი"],
      "სამუშაო განრიგი არასწორია"
    )
    .required("სამუშაო განრიგი აუცილებელია"),
  experience: yup
    .string()
    .oneOf(
      ["გამოუცდელი", "0-2 წლამდე", "2-5 წლამდე", "5+ წელი"],
      "გამოცდილება არასწორია"
    )
    .required("გამოცდილება აუცილებელია"),
  education: yup.string().required("განათლება აუცილებელია"),
  languages: yup
    .string()
    .required("ენების ველი აუცილებელია")
    .test(
      "valid-languages",
      "ენები უნდა იყოს ქართული, ინგლისური, რუსული, ესპანური, იტალიური, თურქული, გერმანული, ფრანგული, კორეული, ჩინური ან იაპონური (კომა გააჩნდეს ცალკე)",
      (value) => {
        if (!value) return false;
        const allowed = [
          "ქართული",
          "ინგლისური",
          "რუსული",
          "ესპანური",
          "იტალიური",
          "თურქული",
          "გერმანული",
          "ფრანგული",
          "კორეული",
          "ჩინური",
          "იაპონური",
        ];
        const langs = value.split(",").map((l) => l.trim());
        return langs.every((lang) => allowed.includes(lang));
      }
    ),
  jobCategory: yup
    .string()
    .oneOf(
      [
        "საბანკო სფერო",
        "IT დეველოპმენტი",
        "გაყიდვები/ვაჭრობა",
        "საოფისე",
        "მომსახურე პერსონალი",
        "მედიცინა/ფარმაცევტი",
      ],
      "სამუშაო კატეგორია არასწორია"
    )
    .required("სამუშაო კატეგორია აუცილებელია"),
  description: yup.string().required("ვაკანსიის აღწერა აუცილებელია"),
});

const CreateVacansy = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (formData: any) => {
    const token = getCookie("token");

    if (!token) {
      alert("მხოლოდ ავტორიზებულ კომპანიებს შეუძლიათ ვაკანსიის დამატება");
      return;
    }

    try {
      const payload = {
        ...formData,
        languages: formData.languages.split(",").map((l: string) => l.trim()),
      };

      await axios.post("http://localhost:3001/jobs", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("ვაკანსია წარმატებით დაემატა");
      router.push("/");
    } catch (error: any) {
      alert(
        error?.response?.data?.message || "ვერ მოხერხდა ვაკანსიის დამატება"
      );
      console.error(error);
    }
  };

  return (
    <div className="absolute right-0 w-[50%] pl-[120px] pr-[120px] pt-20 flex flex-col gap-10 items-center">
      <h1 className="font-semibold text-4xl text-black">ვაკანსიის დამატება</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-center gap-4"
      >
        <div className="w-full flex flex-row items-center gap-3">
          <div className="w-full">
            <input
              type="text"
              placeholder="ვაკანსიის დასახელება"
              {...register("title")}
              className={`w-full border rounded-[10px] p-2 h-[40px] ${
                errors.title ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
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
        </div>

        <div className="w-full flex flex-row items-center gap-3">
          <div className="w-full">
            {/* Location select */}
            <Select
              onValueChange={(value: any) => setValue("location", value)}
              defaultValue=""
            >
              <SelectTrigger
                className={`w-full h-[40px] border rounded-[10px] p-2 ${
                  errors.location ? "border-red-500" : "border-gray-200"
                }`}
              >
                <SelectValue placeholder="ლოკაცია" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>ლოკაცია</SelectLabel>
                  {[
                    "თბილისი",
                    "ბათუმი",
                    "ქუთაისი",
                    "რუსთავი",
                    "გორი",
                    "ზუგდიდი",
                    "ფოთი",
                    "თელავი",
                    "სოხუმი",
                    "ხაშური",
                  ].map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <input
              type="text"
              placeholder="ხელფასი"
              {...register("salaryRange")}
              className={`w-full border rounded-[10px] p-2 h-[40px] ${
                errors.salaryRange ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.salaryRange && (
              <p className="text-red-500 text-sm mt-1">
                {errors.salaryRange.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full flex flex-row items-center gap-3">
          <div className="w-full">
            {/* Work Type select */}
            <Select
              onValueChange={(value: any) => setValue("workType", value)}
              defaultValue=""
            >
              <SelectTrigger
                className={`w-full h-[40px] border rounded-[10px] p-2 ${
                  errors.workType ? "border-red-500" : "border-gray-200"
                }`}
              >
                <SelectValue placeholder="სამუშაო განრიგი" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>სამუშაო განრიგი</SelectLabel>
                  {[
                    "ოფისი",
                    "დისტანციური",
                    "ჰიბრიდი",
                    "თავისუფალი გრაფიკი",
                  ].map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.workType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.workType.message}
              </p>
            )}
          </div>
          <div className="w-full">
            {/* Experience select */}
            <Select
              onValueChange={(value: any) => setValue("experience", value)}
              defaultValue=""
            >
              <SelectTrigger
                className={`w-full h-[40px] border rounded-[10px] p-2 ${
                  errors.experience ? "border-red-500" : "border-gray-200"
                }`}
              >
                <SelectValue placeholder="გამოცდილება" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>გამოცდილება</SelectLabel>
                  {["გამოუცდელი", "0-2 წლამდე", "2-5 წლამდე", "5+ წელი"].map(
                    (exp) => (
                      <SelectItem key={exp} value={exp}>
                        {exp}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>
        </div>

        <input
          type="text"
          placeholder="განათლება"
          {...register("education")}
          className={`w-full border rounded-[10px] p-2 h-[40px] ${
            errors.education ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.education && (
          <p className="text-red-500 text-sm mt-1">
            {errors.education.message}
          </p>
        )}

        <input
          type="text"
          placeholder="ენები (მაგ: ქართული, ინგლისური)"
          {...register("languages")}
          className={`w-full border rounded-[10px] p-2 h-[40px] ${
            errors.languages ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.languages && (
          <p className="text-red-500 text-sm mt-1">
            {errors.languages.message}
          </p>
        )}

        <Select
          onValueChange={(value: any) => setValue("jobCategory", value)}
          defaultValue=""
        >
          <SelectTrigger
            className={`w-full h-[40px] border rounded-[10px] p-2 ${
              errors.jobCategory ? "border-red-500" : "border-gray-200"
            }`}
          >
            <SelectValue placeholder="სამუშაო კატეგორია" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>სამუშაო კატეგორია</SelectLabel>
              {[
                "საბანკო სფერო",
                "IT დეველოპმენტი",
                "გაყიდვები/ვაჭრობა",
                "საოფისე",
                "მომსახურე პერსონალი",
                "მედიცინა/ფარმაცევტი",
              ].map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.jobCategory && (
          <p className="text-red-500 text-sm mt-1">
            {errors.jobCategory.message}
          </p>
        )}

        <textarea
          placeholder="ვაკანსიის შესახებ"
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

        <button
          type="submit"
          className="w-full h-[50px] rounded-[10px] flex items-center justify-center text-white font-semibold text-2xl hover:bg-blue-200 cursor-pointer bg-[#1a063b]"
        >
          დამატება
        </button>
      </form>
    </div>
  );
};

export default CreateVacansy;
