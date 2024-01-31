import { Prisma } from "@prisma/client";
import prisma from "./prisma";

export const getPosts = async (): Promise<{
  status: string;

  posts: Prisma.PostGetPayload<{ include: { user: true } }>[] | [];
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

export const getUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
