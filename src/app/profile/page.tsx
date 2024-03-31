import { ReservationsResponse } from "@/app/api/profile/[userId]/route";
import { getServerSession } from "@/lib/helpers/getServerSession";
import { getBaseUrl } from "@/lib/utils";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { format } from "date-fns";
import Link from "next/link";

async function page() {
  const user = getServerSession();

  if (!user) return redirect("/");

  const reservations: ReservationsResponse = await fetch(
    `${getBaseUrl()}/api/profile/${user.userId}`,
    {
      // headers() needed to send cookies
      headers: headers(),
      cache: "no-store",
    }
  ).then((res) => res.json());

  return (
    <>
      <h1 className="text-center mb-8 font-semibold text-xl">
        Your reservations
      </h1>
      {reservations.length > 0 ? (
        <ul className="grid gap-12 lg:grid-cols-2">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="rounded border p-4">
              <Link
                href={`/listing/${reservation.Listing.id}`}
                className="font-semibold text-lg mb-2 block"
              >
                {reservation.Listing.name}
              </Link>
              <p className="text-sm">
                <b>From: </b>
                {format(new Date(reservation.from_date), "LLL dd, y")}

                <b> To: </b>
                {format(new Date(reservation.to_date), "LLL dd, y")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-center">
          You have no reservations
        </p>
      )}
    </>
  );
}

export default page;
