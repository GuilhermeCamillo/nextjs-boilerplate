"use server";
import { revalidatePath } from "next/cache";
import db from "../../../prisma/database";
import AuthService from "../services/auth-service";
import { sendDiscordMessage } from "../services/discord-service";

export const getTasks = async () => {
  try {
    const userId = await AuthService.getSessionUserId();
    const tasks = await db.task.findMany({ where: { userId: userId! } });
    return tasks;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (title: string) => {
  try {
    const userId = await AuthService.getSessionUserId();
    if (userId) {
      const task = await db.task.create({
        data: {
          title: title,
          userId: userId,
        },
      });

      await sendDiscordMessage(`Task ${title} criada \nAAAAAAAAAAAAAAA`)

      revalidatePath("/tasks");
      return task;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (id: string, completed: boolean) => {
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

export const deleteTask = async (id: string) => {
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
