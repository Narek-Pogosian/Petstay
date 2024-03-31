"use client";

import { useState } from "react";
import LoginContent from "./login-content";
import RegisterContent from "./register-content";

export type Mode = "login" | "register";

type Props = {
  closeDialog: () => void;
};

function AuthContent({ closeDialog }: Props) {
  const [mode, setMode] = useState<Mode>("login");

  return mode === "login" ? (
    <LoginContent setMode={setMode} closeDialog={closeDialog} />
  ) : (
    <RegisterContent setMode={setMode} closeDialog={closeDialog} />
  );
}

export default AuthContent;
