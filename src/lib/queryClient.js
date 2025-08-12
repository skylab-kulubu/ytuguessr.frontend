/**
 * Tekil QueryClient
 * -----------------
 * • Uygulama genelinde aynı önbellek paylaşılsın diye singleton.
 * • <QueryClientProvider client={queryClient}>  → /app/page.jsx ve /app/game/page.jsx
 */
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Network yavaşsa loading jitter’ını azaltır
      staleTime: 0,
      refetchOnWindowFocus: true,
    },
  },
});
