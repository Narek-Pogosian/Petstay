"use client";

import { UserJwtPayload } from "jsonwebtoken";
import { createContext, useCallback, useState } from "react";
import { deleteCookie } from "@/lib/helpers/cookies";
import getClientSession from "@/lib/helpers/getClientSession";
import jwt from "jsonwebtoken";

type AuthContextType = {
  user: UserJwtPayload | null;
  signin: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthContextType["user"]>(() => {
    return getClientSession();
  });

  const signin = useCallback((token: string) => {
    setUser(jwt.decode(token) as UserJwtPayload);
  }, []);

  const logout = useCallback(() => {
    deleteCookie("token");

    // Makes sure cookie is deleted with reload
    if (window.location.pathname.startsWith("/reserve")) {
      window.location.href = "/";
    } else {
      window.location.reload();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, signin }}>
      {children}
    </AuthContext.Provider>
  );
}
