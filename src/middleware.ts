import { NextRequest, NextResponse } from "next/server";
import AuthService from "./store/services/auth-service";

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next/static|_next/image|media|fonts|favicon.ico|favicon.png).*)",
      missing: [{ type: "header", key: "next-action" }],
    },
  ],
};

const publicRoutes = ["/", "/cadastro", "/login", "/register"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    const session = await AuthService.isSessionValid();
    if (session) {
      return NextResponse.redirect(new URL("/tasks", req.url));
    }
    return NextResponse.next();
  }

  const session = await AuthService.isSessionValid();
  if (!session) {
    const isAPIRoute = pathname.startsWith("/api");

    if (isAPIRoute) {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
