"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const ResultMap = dynamic(() => import("./ResultMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Harita yükleniyor...</p>
    </div>
  ),
});

export default function ResultModal({
  score = 0,
  distance = null, // km cinsinden
  guessCoords = null, // [lat, lng]
  correctCoords = null, // [lat, lng]
  questionNumber = 1,
  maxQuestions = 5,
  onNext,
  onSummary,
}) {
  const lastQuestion = questionNumber >= maxQuestions;

  // Puanı formatla
  const scoreText =
    typeof score === "number" && !Number.isNaN(score)
      ? Math.round(score)
      : 0;

  // Mesafeyi formatla
  const distanceText =
    typeof distance === "number" && !Number.isNaN(distance)
      ? (() => {
          const m = distance * 1000;
          return m < 10 ? `${m.toFixed(2)} m` : `${Math.round(m)} m`;
        })()
      : null;

 const scorePercentage = typeof score === 'number'
  ? Math.round((score / 10))
  : 0;

  return (
    <AnimatePresence>
      {/* Arka plan overlay'i */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 grid place-items-center bg-neutral-950/80 backdrop-blur-sm"
      >
        {/* Modal gövdesi */}
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ ease: "easeOut", duration: 0.25 }}
          className="relative w-full max-w-lg px-6 rounded-2xl shadow-xl"
        >
          {/* İç kaplama */}
          <div className="rounded-2xl bg-neutral-900/90 backdrop-blur-md">
            <header className="p-6 pb-4 space-y-4">
              {/* İlerleme çubuğu */}
              <div className="h-2 w-full rounded bg-neutral-700/50 overflow-hidden">
                <motion.div
                  initial = {{ width: 0 }}
                  animate = {{ width: `${scorePercentage}%` }}
                  transition = {{ delay: 0.5, duration: 0.5, ease: 'easeOut',}}
                  className="h-full bg-indigo-500"
                />
              </div>

              <div className="flex items-center justify-between text-gray-200">
                <span className="text-2xl font-bold">{scoreText} Puan</span>
                <span className="text-sm text-gray-400">
                  Tur {questionNumber} / {maxQuestions}
                </span>
              </div>

              {distanceText && (
                <span className="inline-flex items-center rounded-md bg-neutral-700 px-2 py-0.5 text-xs font-medium text-gray-300">
                  Mesafe: {distanceText}
                </span>
              )}
            </header>

            {/* İçerik */}
            <main className="px-6 space-y-4">
              {scoreText > 0 ? (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-200">Sonuç Haritası</h3>
                  <div className="aspect-video w-full overflow-hidden rounded-md">
                    <ResultMap
                      guessCoords={guessCoords}
                      correctCoords={correctCoords}
                      distance={distance}
                      className="h-full w-full"
                    />
                  </div>
                </div>
              ) : (
                <div className="rounded-lg bg-neutral-800 p-6 text-center">
                  <p className="text-gray-300">Tahmin yapılamadı veya süre doldu</p>
                  <p className="mt-1 text-xs text-gray-500">Harita bilgisi gösterilemiyor</p>
                </div>
              )}
            </main>

            {/* Alt kısım */}
            <footer className="p-6 pt-4">
              <button onClick={lastQuestion ? onSummary : onNext}
                className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500 active:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
                {lastQuestion ? "Özeti Gör" : "Sıradaki Tur"}
              </button>
            </footer>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}