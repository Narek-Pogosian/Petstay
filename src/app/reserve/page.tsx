import ReservationListingCard from "@/components/reservation/reservation-listing-card";
import GoBack from "@/components/shared/go-back";
import ReservationForm from "@/components/reservation/reservation-form";
import { getServerSession } from "@/lib/helpers/getServerSession";
import { redirect } from "next/navigation";

function Page() {
  const user = getServerSession();

  if (!user) return redirect("/");

  return (
    <>
      <GoBack />
      <div className="grid lg:grid-cols-2 gap-12">
        <ReservationForm />
        <ReservationListingCard />
      </div>
    </>
  );
}

export default Page;
