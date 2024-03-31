"use client";

import { useAuthContext } from "@/hooks/use-auth-context";
import { UserJwtPayload } from "jsonwebtoken";
import UserDropdown from "./user-dropdown";
import AuthDialog from "../auth-dialog/auth-dialog";

// HeaderAction is created as a wrapper for userdropdown and authdialog to be able to get
// the session in a server component (Header) to then pass down here so that we avoid a hydration flash,
// otherwise if only checking for session in client then authdialog will still be rendered for like a second and then change
// to userdropdown even if have a session. We also want to access the context here so that ui updates if session changes.
function HeaderAction({ user }: { user: UserJwtPayload | null }) {
  const { user: clientUser } = useAuthContext();

  if (user || clientUser) return <UserDropdown user={user} />;

  return <AuthDialog />;
}

export default HeaderAction;
