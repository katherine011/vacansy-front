import { z } from "zod";

export const JobSchema = z.object({
  title: z.string().min(2, "სათაური უნდა იყოს მინიმუმ 2 სიმბოლო"),
  description: z.string().min(10, "აღწერა უნდა იყოს მინიმუმ 10 სიმბოლო"),
  location: z.string().min(2, "მიუთითე მდებარეობა"),
  workType: z.string().min(2, "აირჩიე დასაქმების ტიპი"),
  jobCategory: z.string().min(2, "აირჩიე კატეგორია"),
  experience: z.string().min(2, "მიუთითე გამოცდილება"),
  language: z.union([z.string(), z.array(z.string())]).optional(),
  salaryRange: z.string().optional(),
  education: z.string().optional(),
  _id: z.string().optional(),
  status: z.string().optional(),
});

export type JobSchemaType = z.infer<typeof JobSchema>;
