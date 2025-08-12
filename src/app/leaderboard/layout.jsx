"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/queryClient";

export default function LeaderboardLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}