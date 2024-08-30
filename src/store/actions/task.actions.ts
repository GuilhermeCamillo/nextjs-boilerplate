"use server";
import { revalidatePath } from "next/cache";
import db from "../../../prisma/database";
import AuthService from "../services/auth-service";

export const getTasks = async () => {
  try {
    const userId = await AuthService.getSessionUserId();
    const tasks = await db.task.findMany({ where: { userId: Number(userId) } });
    return tasks;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (title: string) => {
  try {
    const userId = await AuthService.getSessionUserId();
    const task = await db.task.create({
      data: {
        title: title,
        userId: Number(userId),
      },
    });
    revalidatePath("/tasks");
    return task;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id: number, completed: boolean) => {
  try {
    const task = await db.task.update({
      where: { id: id },
      data: {
        completed: completed,
      },
    });
    revalidatePath("/tasks");
    return task;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const task = await db.task.delete({
      where: { id: id },
    });
    revalidatePath("/tasks");
    return task;
  } catch (error) {
    console.log(error);
  }
};
