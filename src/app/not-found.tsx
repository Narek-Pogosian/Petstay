"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function NotFound() {
  const router = useRouter();

  function reset() {
    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col items-center pt-14">
      <h1 className="text-6xl font-semibold mb-2">404</h1>
      <h2 className="text-3xl mb-12">Not found</h2>
      <Button onClick={reset}>Back to home</Button>
    </div>
  );
}

export default NotFound;
