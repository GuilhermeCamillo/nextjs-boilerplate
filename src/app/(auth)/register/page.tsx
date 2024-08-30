import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./form";

const RegisterPage = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Criar uma conta</CardTitle>
          <CardDescription>
            Preencha o formulário abaixo para registrar sua nova conta.
          </CardDescription>
        </CardHeader>
        <Form />
      </Card>
    </main>
  );
};

export default RegisterPage;
