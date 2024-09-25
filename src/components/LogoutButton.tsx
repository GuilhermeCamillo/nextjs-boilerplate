"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import AuthService from "@/store/services/auth-service";
import { redirect } from "next/navigation";

const LogoutButton = () => {
  const handleLogout = () => {
    setTimeout(async () => {
      "use server";

      AuthService.destroySession();
      redirect("/login");
    });
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="flex flex-row gap-2 border rounded-sm py-1 px-3 text-sm items-center font-medium hover:bg-slate-200"
    >
      SAIR <LogOut className="w-3 h-3" />
    </Button>
  );
};

export default LogoutButton;
