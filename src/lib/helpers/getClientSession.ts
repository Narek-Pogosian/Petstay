"use client";

import jwt, { UserJwtPayload } from "jsonwebtoken";
import { getCookie } from "./cookies";

export default function getClientSession() {
  const token = getCookie("token");

  if (!token) return null;

  return jwt.decode(token) as UserJwtPayload;
}

export function getClientToken() {
  return getCookie("token");
}
