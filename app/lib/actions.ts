"use server";
import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { RegisterSchema } from "./schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import brcypt from "bcrypt";
import { Resend } from "resend";

export interface State {
  message: string | undefined;
  errors:
    | {
        [key: string]: string[] | undefined;
      }
    | undefined;
}

export const getPosts = async (): Promise<{
  status: string;

  posts: Prisma.PostGetPayload<{ include: { author: true } }>[] | [];
  errors: unknown;
}> => {
  let res;
  try {
    const posts = await prisma.post.findMany({
      include: { author: true },
    });
    res = { status: "success", posts, errors: undefined };
  } catch (e) {
    res = { status: "error", posts: [], errors: e };
  }
  return res;
};

export const createPost = async (data: Prisma.PostCreateInput) => {
  return await prisma.post.create({
    data,
  });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data,
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const updateUser = async (id: string, data: Prisma.UserUpdateInput) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const getUser = async (username: string) => {
  try {
    return await prisma.user.findUnique({
      where: { username },
    });
  } catch (e) {
    return null;
  }
};

export async function authenticate(
  prevState: string | void,
  formData: FormData,
  callBack?: string | null
): Promise<string | void> {
  try {
    await signIn("credentials", formData, callBack || "/home");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }

  revalidatePath("/home");
  redirect("/home");
}

export async function registerUser(
  prevState: State,
  formData: FormData
): Promise<State> {
  const usernameData = formData.get("username") as string;
  const emailData = formData.get("email") as string;
  const passwordData = formData.get("password") as string;
  const passwordConfirmationData = formData.get(
    "passwordConfirmation"
  ) as string;
  const data: z.infer<typeof RegisterSchema> = {
    username: usernameData,
    email: emailData,
    password: passwordData,
    passwordConfirmation: passwordConfirmationData,
  };
  const validateData = RegisterSchema.safeParse(data);
  if (!validateData.success) {
    const errors = validateData.error.flatten().fieldErrors;
    return { message: "Invalid data", errors };
  }
  const { username, email, password } = validateData.data;
  const userData: Prisma.UserCreateInput = {
    username,
    email,
    password: await brcypt.hash(password, 10),
  };
  try {
    await prisma.user.create({ data: userData });
  } catch (e) {
    return {
      message: "Failed to create user, please try again later!",
      errors: undefined,
    };
  }

  revalidatePath("/home");
  redirect("/home");
}

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: { identifier: email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
