"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createAccount } from "@/store/actions/auth.actions";
import Link from "next/link";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("O campo nome é obrigatório"),
  lastName: Yup.string().required("O campo sobrenome é obrigatório"),
  email: Yup.string()
    .email("Email inválido")
    .required("O campo e-mail é obrigatório"),
  password: Yup.string().required("O campo senha é obrigatório"),
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await createAccount({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <form id="register-form" onSubmit={formik.handleSubmit}>
      <CardContent className="mx-auto max-w-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nome</Label>
            <Input
              id="firstName"
              placeholder="John"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Sobrenome</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="john@example.com"
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="***********"
            autoComplete="current-password"
          />
          <p className="text-red-500 text-sm">Por favor, digite a senha</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button type="submit" className="w-full">
          Criar conta
        </Button>
        <Link
          href="/login"
          className="w-full border rounded-md py-2 px-4 text-center text-sm"
        >
          Voltar
        </Link>
      </CardFooter>
    </form>
  );
};

export default Form;
