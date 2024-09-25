"use server";

import * as bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import AuthService from "../services/auth-service";
import db from "../../../prisma/database";

export const createAccount = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const hashPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashPassword,
    },
  });

  redirect("/login");
};

export const login = async (email: string, password: string) => {
  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    console.log("Error");
    redirect("/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    console.log("Usuário ou senha inválidos");
    redirect("/login");
  }

  await AuthService.createSessionToken({
    sub: user.id,
    firstName: user.firstName,
    email: user.email,
  });

  redirect("/tasks");
};
