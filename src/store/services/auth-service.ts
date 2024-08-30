import * as jose from "jose";
import { cookies } from "next/headers";

async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jose.jwtVerify(token, secret);

  return payload;
}

async function createSessionToken(payload = {}) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const session = await new jose.SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setExpirationTime("1d")
    .sign(secret);
  const { exp, role } = await openSessionToken(session);

  cookies().set("session", session, {
    expires: (exp as number) * 1000,
    path: "/",
    httpOnly: true,
  });
}

async function isSessionValid() {
  const sessionCookie = cookies().get("session");

  if (sessionCookie) {
    const { value } = sessionCookie;
    const { exp } = await openSessionToken(value);
    const currentDate = new Date().getTime();

    return (exp as number) * 1000 > currentDate;
  }

  return false;
}

function destroySession() {
  cookies().delete("session");
}

async function getSessionUserId() {
  const sessionCookie = cookies().get("session");

  if (sessionCookie) {
    const { value } = sessionCookie;
    const { sub } = await openSessionToken(value);

    return Number(sub);
  }

  return null;
}

const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid,
  destroySession,
  getSessionUserId,
};

export default AuthService;
