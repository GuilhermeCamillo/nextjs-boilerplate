"use server";
import { revalidatePath } from "next/cache";
import db from "../../../prisma/database";
import { api } from "../axios";

export const getTasks = async () => {
  try {
    const tasks = await api.get("/api/tasks");
    return tasks.data;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (title: string) => {
  try {
    const task = await api.post("/api/tasks", { title: title });
    revalidatePath("/tasks");
    return task.data;
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
