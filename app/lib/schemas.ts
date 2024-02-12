import { z } from "zod";

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Name must be more than 3 characters" })
      .max(30, { message: "Name must be less than 30 characters" }),
    email: z
      .string()
      .email()
      .max(100, { message: "Email must be less than 100 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be more than 6 characters" })
      .max(30, { message: "Password must be less than 30 characters" }),
    passwordConfirmation: z.string().min(6).max(30),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be more than 3 characters" })
    .max(30, { message: "Name must be less than 30 characters" }),
  email: z
    .string()
    .email()
    .max(100, { message: "Email must be less than 100 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be more than 10 characters" })
    .max(500, { message: "Message must be less than 500 characters" }),
});

export const NewPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be more than 3 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  content: z
    .string()
    .min(2, { message: "Content must be more than 2 characters" })
    .max(500, { message: "Content must be less than 500 characters" }),
});

export const EditPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be more than 3 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  content: z
    .string()
    .min(2, { message: "Content must be more than 2 characters" })
    .max(500, { message: "Content must be less than 500 characters" }),
});

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
export const UpdateUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Name must be more than 3 characters" })
    .max(30, { message: "Name must be less than 30 characters" }),
  email: z
    .string()
    .email()
    .max(100, { message: "Email must be less than 100 characters" }),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});
