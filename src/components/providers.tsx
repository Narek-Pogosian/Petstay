"use client";

import { AuthContextProvider } from "@/context/auth-context";
import { ReservationContextProvider } from "@/context/reservation-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 15,
        cacheTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ReservationContextProvider>{children}</ReservationContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default Providers;
