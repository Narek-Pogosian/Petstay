"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-center pt-10">
      <h2 className="text-3xl font-bold mb-12">
        {error.message ?? "Someting went wrong"}
      </h2>
      <Button asChild>
        <Link href="/">Back to homepage</Link>
      </Button>
    </div>
  );
}
