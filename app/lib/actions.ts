"use server";
import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { AuthError } from "next-auth";
import { auth, signIn, signOut } from "@/auth";
import {
  ContactFormSchema,
  EditPostSchema,
  NewPostSchema,
  RegisterSchema,
} from "./schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import brcypt from "bcrypt";
import { setFlash } from "./flash-toast";

export interface State {
  message: string | undefined;
  errors:
    | {
        [key: string]: string[] | undefined;
      }
    | undefined;
}

export const getLiked = async (email: string, postId: string) => {
  const user = await getUserByEmail(email);
  if (!user) return false;
  const liked = await prisma.userLike.findFirst({
    where: { userId: user.id, postId },
  });
  return !!liked;
};

export const getNumberOfLikes = async (post_id: string) => {
  try {
    return await prisma.userLike.count({
      where: { postId: post_id },
    });
  } catch (e) {
    console.error(e);
    return 0;
  }
};

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

export const getPostsByUser = async (id: string) => {
  try {
    return await prisma.post.findMany({
      where: { authorId: id },
    });
  } catch (e) {
    return [];
  }
};

export const createPost = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const session = await auth();
  if (!session?.user?.email) {
    return {
      message: "You must be logged in to create a post",
      errors: { error: ["user not logged in"] },
    };
  }
  const user = await getUserByEmail(session.user.email);
  const data = {
    title,
    content,
  };
  const validatedData = NewPostSchema.safeParse(data);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;
    return { message: "Invalid data", errors };
  }

  const goodData = {
    title: validatedData.data.title,
    content: validatedData.data.content,
    author: { connect: { id: user!.id } },
  };

  try {
    await prisma.post.create({ data: goodData });
    return { message: "Post created successfully", errors: undefined };
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to create post",
      errors: { error: ["Failed to create post"] },
    };
  }
};

export async function updatePost(
  prevState: State,
  formData: FormData
): Promise<State> {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;
  const data = {
    title,
    content,
  };
  const validatedData = EditPostSchema.safeParse(data);
  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;
    return { message: "Invalid data", errors };
  }
  try {
    await prisma.post.update({
      where: { id: postId },
      data: validatedData.data,
    });
    return { message: "Post updated successfully", errors: undefined };
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to update post",
      errors: { error: ["Failed to update post"] },
    };
  }
}

export const createLike = async (postId: string, userId: string) => {
  try {
    await prisma.userLike.create({
      data: {
        postId,
        userId,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const deleteLike = async (postId: string, userId: string) => {
  try {
    await prisma.userLike.deleteMany({
      where: {
        postId,
        userId,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const toggleLike = async (prevState: boolean, queryData: FormData) => {
  const session = await auth();
  const liked = prevState;
  const postId = queryData.get("postId") as string;
  if (!session?.user?.email) {
    return false;
  }
  const user = await getUserByEmail(session.user.email);
  if (!user) {
    return false;
  }
  if (liked) {
    await deleteLike(postId, user.id);
    revalidatePath("/home");
    return false;
  } else {
    await createLike(postId, user.id);
    revalidatePath("/home");
    return true;
  }
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

export const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: { email },
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
    await signIn("credentials", formData);
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

  setFlash({
    type: "success",
    message: "Welcome! You have successfully registered!",
  });
  revalidatePath("/home");
  redirect("/home");
}

export async function createContact(
  prevState: { message: string } | void,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const data = {
    name,
    email,
    message,
  };
  const validatedData = ContactFormSchema.safeParse(data);
  if (!validatedData.success) {
    return { message: "Invalid data" };
  }
  try {
    await prisma.contact.create({ data: validatedData.data });
    return { message: "Contact Form Created!" };
  } catch (e) {
    console.error(e);
  }
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
