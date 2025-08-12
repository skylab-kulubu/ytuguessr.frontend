"use client";

export default function GameLayout({ children }) {
  return (
    <div className="h-screen overflow-hidden">
      {children}
    </div>
  );
}