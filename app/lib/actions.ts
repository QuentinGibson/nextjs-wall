import { Prisma } from "@prisma/client";
import prisma from "./prisma";

export const getPosts = async () => {
  return await prisma.post.findMany({
    include: { author: true },
  });
};

export const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data,
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};

export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

export const getUser = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
