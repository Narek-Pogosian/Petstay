import { cookies } from "next/headers";
import jwt, { UserJwtPayload } from "jsonwebtoken";

export function getServerSession() {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  return jwt.decode(token) as UserJwtPayload;
}

export function getTokenServer() {
  const cookieStore = cookies();

  return cookieStore.get("token")?.value ?? null;
}
