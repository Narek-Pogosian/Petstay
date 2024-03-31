"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  function back() {
    window.location.replace("/");
  }

  return (
    <div className="text-center pt-14">
      <h2 className="text-2xl mb-8">Something went wrong!</h2>
      <div className="flex gap-4 justify-center">
        <Button onClick={() => reset()}>Try again</Button>
        <Button variant="outline" onClick={back}>
          Back to homepage
        </Button>
      </div>
    </div>
  );
}
