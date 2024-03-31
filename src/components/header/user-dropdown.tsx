"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuthContext } from "@/hooks/use-auth-context";
import { UserJwtPayload } from "jsonwebtoken";

function UserDropdown({ user }: { user: UserJwtPayload | null }) {
  const { user: clientUser, logout } = useAuthContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {<Button pill>{user?.name || clientUser?.name}</Button>}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href={`/profile`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
