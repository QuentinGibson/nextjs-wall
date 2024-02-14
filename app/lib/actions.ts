"use server";
import { Prisma } from "@prisma/client";
import prisma from "./prisma";
import { AuthError } from "next-auth";
import { auth, signIn } from "@/auth";
import {
  ContactFormSchema,
  EditPostSchema,
  NewPostSchema,
  RegisterSchema,
  UpdateUserSchema,
} from "./schemas";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import brcypt from "bcrypt";
import { setFlash } from "./flash-toast";
import { randomUUID } from "crypto";
import { sendVerificationEmail } from "./email";

//TODO: Handle errors better
//TODO: Split into multiple files
//TODO: Split into more functions
//TODO: Add more comments
//TODO: Add types to typefile

export interface State {
  message: string | undefined;
  errors:
    | {
        [key: string]: string[] | undefined;
      }
    | undefined;
}

export const getLiked = async (
  email: string,
  postId: string
): Promise<boolean> => {
  const user = await getUserByEmail(email);
  if (!user) return false;
  const liked = await prisma.userLike.findFirst({
    where: { userId: user.id, postId },
  });
  return !!liked;
};

export const getNumberOfLikes = async (post_id: string): Promise<number> => {
  try {
    return await prisma.userLike.count({
      where: { postId: post_id },
    });
  } catch (e) {
    console.error(e);
    return 0;
  }
};

export const getPostById = async (
  id: string
): Promise<Prisma.PostGetPayload<{}> | null> => {
  try {
    return await prisma.post.findUnique({
      where: { id },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUserByPostId = async (id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      select: { author: true },
    });
    return post?.author;
  } catch (e) {
    return null;
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

export const getPostsByUser = async (
  id: string
): Promise<Prisma.PostGetPayload<{}>[] | null> => {
  try {
    return await prisma.post.findMany({
      where: { authorId: id },
    });
  } catch (e) {
    return [];
  }
};

export const deletePost = async (formData: FormData): Promise<void> => {
  const session = await auth();
  if (!session?.user?.email) {
    return;
  }
  const postId = formData.get("postId") as string;
  const user = await getUserByPostId(postId);
  if (!user) {
    return;
  }
  if (user.email !== session.user.email) {
    return;
  }
  try {
    await prisma.post.delete({
      where: { id: postId },
    });
  } catch (e) {
    console.error(e);
  }

  revalidatePath("/profile");
  redirect("/profile");
};

export const createPost = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const session = await auth();
  if (!session?.user?.email) {
    return {
      message: "You must be logged in to create a post",
      errors: { error: ["user not logged in"] },
    };
  }
  const user = await getUserByEmail(session.user.email);
  if (!user) {
    return {
      message: "You must be logged in to create a post",
      errors: { error: ["user not logged in"] },
    };
  }
  if (!user.emailVerified) {
    return {
      message: "You must verify your email to create a post",
      errors: { error: ["user not verified"] },
    };
  }
  const userEmail = session.user.email;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
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
    author: { connect: { email: userEmail } },
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
  const session = await auth();
  if (!session?.user?.email) {
    return {
      message: "You must be logged in to update a post",
      errors: { error: ["user not logged in"] },
    };
  }
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const postId = formData.get("postId") as string;

  const author = await getUserByPostId(postId);

  if (!author) {
    return { message: "Post not found", errors: { error: ["Post not found"] } };
  }

  if (session.user.email === author.email) {
    return {
      message: "You are not authorized to update this post",
      errors: { error: ["You are not authorized to update this post"] },
    };
  }

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

export const createLike = async (
  postId: string,
  userId: string
): Promise<void> => {
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

export const deleteLike = async (
  postId: string,
  userId: string
): Promise<void> => {
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

export const toggleLike = async (
  prevState: boolean,
  queryData: FormData
): Promise<boolean> => {
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

export const createUser = async (
  data: Prisma.UserCreateInput
): Promise<Prisma.UserGetPayload<{}> | null> => {
  try {
    return await prisma.user.create({
      data,
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const deleteUser = async (
  id: string
): Promise<Prisma.UserGetPayload<{}> | null> => {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }
  if (session.user.id !== id) {
    return null;
  }
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateUser = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  //TODO: Implement updateUser
  const file = formData.get("image") as string;
  const fileUrl =
    file !== "/placeholder-image.jpg"
      ? file
      : "/uploads/avatars/default-avatar.png";
  console.log(`fileUrl: ${fileUrl}`);
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email || "");

  if (!user?.id) {
    console.log("not logged in");
    return {
      message: "You must be logged in to update a user",
      errors: { error: ["user not logged in"] },
    };
  }

  const data = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    image: fileUrl,
  };
  const validatedData = UpdateUserSchema.safeParse(data);

  if (!validatedData.success) {
    const errors = validatedData.error.flatten().fieldErrors;
    console.log({ errors });
    return { message: "Invalid data", errors };
  }
  console.log(validatedData.data);
  const userToUpdate = await prisma.user.findUnique({
    where: { id: user.id },
  });
  if (!userToUpdate) {
    return {
      message: "User not found",
      errors: { error: ["User not found"] },
    };
  }
  if (validatedData.data.email !== userToUpdate.email) {
    const emailExists = await getUserByEmail(validatedData.data.email);
    if (emailExists) {
      return {
        message: "Email already exists",
        errors: { email: ["Email already exists"] },
      };
    } else {
    }
  }
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: validatedData.data,
    });
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to update user",
      errors: { error: ["Failed to update user"] },
    };
  }

  if (validatedData.data.email !== userToUpdate.email) {
    try {
      await createVerificationForUser(validatedData.data.email);
    } catch (e) {
      console.error(e);
      return {
        message: "Failed to create verification token",
        errors: { error: ["Failed to create verifcation token"] },
      };
    }
    setFlash({ type: "success", message: "Please verify your email." });
  }

  setFlash({ type: "success", message: "User updated successfully!" });
  revalidatePath("/profile");
  redirect("/profile");
};

export const getUserByUsername = async (
  username: string
): Promise<Prisma.UserGetPayload<{}> | null> => {
  try {
    return await prisma.user.findUnique({
      where: { username },
    });
  } catch (e) {
    return null;
  }
};

export const getUserByEmail = async (
  email: string
): Promise<Prisma.UserGetPayload<{}> | null> => {
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
  formData: FormData
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

  await prisma.$transaction(async (tx) => {
    try {
      await tx.user.create({ data: userData });
    } catch (e) {
      return {
        message: "Failed to create user, please try again later!",
        errors: undefined,
      };
    }

    try {
      await createVerificationForUser(email);
    } catch (e) {
      return {
        message: "Failed to create verification token, please try again later!",
        errors: undefined,
      };
    }

    try {
      const verificationToken = await prisma.verificationToken.findFirst({
        where: { identifier: email, expires: { gt: new Date() } },
      });

      if (verificationToken?.token) {
        await sendVerificationEmail(email, verificationToken.token);
      } else {
        throw new Error(
          "Failed to send verification email, please try again later!"
        );
      }
    } catch (e) {
      console.error(e);
      return {
        message: "Failed to send verification email, please try again later!",
        errors: undefined,
      };
    }
  });

  revalidatePath("/home");
  redirect("/home");
}

export async function createContact(
  prevState: State,
  formData: FormData
): Promise<State> {
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
    return {
      message: "Invalid data",
      errors: validatedData.error.flatten().fieldErrors,
    };
  }
  try {
    await prisma.contact.create({ data: validatedData.data });
    return { message: "Contact Form Created!", errors: undefined };
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to create contact form",
      errors: { error: ["Failed to create contact form"] },
    };
  }
}

export const isUserVerified = async (email: string): Promise<boolean> => {
  try {
    const user = await prisma.user.findFirst({
      where: { emailVerified: email },
    });
    if (!user) return false;
    return user.emailVerified !== null;
  } catch (e) {
    console.log(e);
    return false;
  }
};

interface VerificationResult {
  success?: string;
  error?: string;
}

export const newVerification = async (
  token: string
): Promise<VerificationResult> => {
  const existingToken = await prisma.verificationToken.findFirst({
    where: { token },
  });
  if (!existingToken) {
    return { error: "Token already used" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (!hasExpired) {
    return { error: "Token has expired" };
  }

  const user = await prisma.user.findFirst({
    where: { email: existingToken.identifier },
  });

  if (!user) {
    return { error: "User not registered" };
  }

  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  // Only update the user and delete the token if the transaction is successful
  try {
    await prisma.$transaction(async (tx) => {
      // Update user emailVerified
      await tx.user.update({
        where: { email: existingToken.identifier },
        data: { emailVerified: date },
      });
      // Delete verification token
      await tx.verificationToken.delete({
        where: { token },
      });
    });
  } catch (e) {
    console.log(e);
    return { error: "Something went wrong while verifing your email." };
  }

  return { success: "Account verified successfully!" };
};

export const createVerificationForUser = async (
  email: string
): Promise<void> => {
  const token = randomUUID();
  let expires = new Date();
  expires.setHours(expires.getHours() + 1);
  try {
    await prisma.verificationToken.create({
      data: {
        token,
        identifier: email,
        expires,
      },
    });
  } catch (e) {
    console.error(e);
  }
};
