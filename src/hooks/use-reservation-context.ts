import { ReservationContext } from "@/context/reservation-context";
import { useContext } from "react";

export function useReservationContext() {
  const context = useContext(ReservationContext);

  if (!context)
    throw new Error(
      "useReservationContext must be inside a ReservationContextProvider"
    );

  return context;
}
