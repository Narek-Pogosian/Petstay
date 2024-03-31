import Link from "next/link";
import { getServerSession } from "@/lib/helpers/getServerSession";
import HeaderAction from "./header-action";

async function Header() {
  const user = getServerSession();

  return (
    <header className="py-3 shadow">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl md:text-3xl font-bold text-primary">
            PetStay
          </span>
        </Link>
        <HeaderAction user={user} />
      </div>
    </header>
  );
}

export default Header;
