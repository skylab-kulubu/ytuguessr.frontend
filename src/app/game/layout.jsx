"use client";

import { Providers } from "../../lib/providers";

export default function GameLayout({ children }) {
  return (
    <div className="h-screen overflow-hidden">
      <Providers>{children}</Providers>
    </div>
  );
}