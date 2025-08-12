"use client";

import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../gameService";

const fmtTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}m ${sec}s`;
};
const fmtDist = (km) => `${(km * 1000).toFixed(0)} m`;
const fmtScore = (sc) => Math.round(sc);

export function useSummary() {
  const query = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60 * 5, // 5 dk önbellek
  });

  // Veriyi yuvarlama ve vurgulama için ufak bir format katmanı
  const formatted =
    query.data && {
      summary: {
        totalDistance: fmtDist(query.data.summary.total_distance_km),
        totalTime:     fmtTime(query.data.summary.total_time_sec),
        totalScore:    fmtScore(query.data.summary.total_score),
      },
      guesses: query.data.guesses.map((g) => ({
        distance: fmtDist(g.distance_km),
        time:     fmtTime(g.time_sec),
        score:    fmtScore(g.score),
      })),
    };

  return {
    ...query,
    formatted,
  };
}
