"use client";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "@/store/actions/auth.actions";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido")
    .required("O campo e-mail é obrigatório"),
  password: Yup.string().required("O campo senha é obrigatório"),
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      email: "gui.camillo@outlook.com",
      password: "Gui12345!",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await login(values.email, values.password);
    },
  });

  return (
    <form id="login-form" onSubmit={formik.handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              autoComplete="current-password"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-1 right-1 h-7 w-7"
            >
              <EyeIcon className="h-4 w-4" />
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" type="submit">
          Entrar
        </Button>
        <Link href="/register" className="w-full border rounded-md py-2 px-4 text-center text-sm">
          Criar conta
        </Link>
      </CardFooter>
    </form>
  );
};

export default Form;
