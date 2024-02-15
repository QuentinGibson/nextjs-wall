"use server";
import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { RegisterSchema } from "./schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import brcypt from "bcrypt";
import { State, createVerificationForUser } from "./actions";
import { sendAWSVerifyEmail } from "./email";

export async function registerUser(
  prevState: State,
  formData: FormData
): Promise<State> {
  const data: z.infer<typeof RegisterSchema> = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    passwordConfirmation: formData.get("passwordConfirmation") as string,
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

  await prisma.$transaction(async (tx) => {
    try {
      await tx.user.create({ data: userData });
    } catch (e) {
      console.error(e);
      return {
        message: "Failed to create user, please try again later!",
        errors: undefined,
      };
    }

    try {
      await createVerificationForUser(email);

      const verificationToken = await prisma.verificationToken.findFirst({
        where: { identifier: email, expires: { gt: new Date() } },
      });

      if (verificationToken?.token) {
        await sendAWSVerifyEmail(email, verificationToken.token);
      } else {
        throw new Error(
          "Failed to send verification email, please try again later!"
        );
      }
    } catch (e) {
      return {
        message: "Failed to create verification token, please try again later!",
        errors: undefined,
      };
    }
  });

  revalidatePath("/home");
  redirect("/home");
}
