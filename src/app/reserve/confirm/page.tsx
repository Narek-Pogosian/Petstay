import ReservationConfirmation from "@/components/reservation/reservation-confirmation";
import CancelButton from "@/components/reservation/cancel-button";
import GoBack from "@/components/shared/go-back";
import { getServerSession } from "@/lib/helpers/getServerSession";
import { redirect } from "next/navigation";

function Page() {
  const user = getServerSession();

  if (!user) return redirect("/");

  return (
    <>
      <div className="flex justify-between mb-8">
        <GoBack />
        <CancelButton />
      </div>
      <h1 className="text-2xl text-center mb-12 font-bold">
        Your trip details
      </h1>
      <ReservationConfirmation />
    </>
  );
}

export default Page;
