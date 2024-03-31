import { ReservationSchemaType } from "@/lib/validations/reservation-validation";
import { Listing } from "@prisma/client";
import { addDays } from "date-fns";
import { createContext, useCallback, useState } from "react";
import { DateRange } from "react-day-picker";
import type { Dispatch, SetStateAction } from "react";

type ReservationContextType = {
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  listing: Listing | undefined;
  setListing: Dispatch<SetStateAction<Listing | undefined>>;
  formInfo: ReservationSchemaType | undefined;
  setFormInfo: Dispatch<SetStateAction<ReservationSchemaType | undefined>>;
  resetFormInfo: () => void;
};

export const ReservationContext = createContext<ReservationContextType | null>(
  null
);

export function ReservationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [date, setDate] = useState<ReservationContextType["date"]>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [listing, setListing] = useState<ReservationContextType["listing"]>();
  const [formInfo, setFormInfo] =
    useState<ReservationContextType["formInfo"]>();

  const resetFormInfo = useCallback(() => {
    setFormInfo(undefined);
  }, []);

  return (
    <ReservationContext.Provider
      value={{
        date,
        setDate,
        listing,
        setListing,
        formInfo,
        setFormInfo,
        resetFormInfo,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
}
