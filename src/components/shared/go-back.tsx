"use client";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function GoBack() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="font-semibold flex items-center gap-2 mb-6 hover:underline"
    >
      <ArrowLeftIcon />
      Back
    </button>
  );
}

export default GoBack;
