import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./form";

const LoginPage = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Olá, bem-vindo(a)!</CardTitle>
          <CardDescription>
            Digite seu e-mail e senha para acessar sua conta.
          </CardDescription>
        </CardHeader>
        <Form />
      </Card>
    </main>
  );
};

export default LoginPage;
