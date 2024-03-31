"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import AuthContent from "./auth-content";

function AuthDialog() {
  const [isOpen, setIsOpen] = useState(false);

  function closeDialog() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button pill>Log in</Button>
      </DialogTrigger>
      <DialogContent className="sm:px-10 max-w-md py-12">
        <AuthContent closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
