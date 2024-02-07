"use server";
import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { RegisterSchema } from "./schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import brcypt from "bcrypt";
import { State } from "./actions";
import { randomUUID } from "crypto";
import { sendVerificationEmail } from "./email";

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
    const user = await prisma.user.create({ data: userData });
    const verificationToken = await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token: randomUUID(),
        expires: new Date(Date.now() + 1000 * 60 * 60 * 1),
      },
    });
    await sendVerificationEmail(user.email, verificationToken.token);
  } catch (e) {
    return {
      message: "Failed to create user, please try again later!",
      errors: undefined,
    };
  }

  revalidatePath("/home");
  redirect("/home");
}
