/* ---------------------------------------------------------------------
 * Oyun akışını koruyan ortak “guard” mantığı
 * 
 * @returns {Object} 
 * @property {Object} statusQuery - useCurrentStatus sorgusu
 * @property {Function} safeGuess - Korumalı tahmin fonksiyonu
 * @property {Function} safeNext - Korumalı sonraki soru fonksiyonu
 * @property {Object} guessMut - Tahmin mutate objesi
 * @property {Object} nextMut - Sonraki soru mutate objesi
 * --------------------------------------------------------------------- */
"use client";

import { useRef, useEffect } from "react";
import {
    useCurrentStatus,
    useGuess,
    useNextQuestion,
} from "./useGame";

export const useGuard = () => {
    const statusQuery = useCurrentStatus();
    const guessMut = useGuess();
    const nextMut = useNextQuestion();

    const lastQRef = useRef(null);              // en son görünen question_number
    const guessedRef = useRef(false);           // bu soruya tahmin yollandı mı?
    const timerStartedRef = useRef(false);      // süre > 0 değerini en az 1 kez göründü mü?
    const prevTimeRef = useRef(null);

    /* ---- guard 1 : aynı soruya çifte tahmin ---- */
    const safeGuess = (coords) => {
        if (guessedRef.current || guessMut.isPending) return;
        guessedRef.current = true;
        guessMut.mutate(coords);
    };

    /* ---- guard 2 : süre bitince otomatik 0 puan ---- */
    useEffect(() => {
        const d = statusQuery.data;
        if (!d) return;

        /* -- soru değiştiğinde ref'leri sıfırla -- */
        if (lastQRef.current !== d.question_number) {
            lastQRef.current = d.question_number;
            guessedRef.current = false;
            timerStartedRef.current = false;
            prevTimeRef.current = d.time_left;
            return;
        }

        /* -- geri sayım başladı mı? -- */
        if (d.time_left > 0) timerStartedRef.current = true;

        if (
            timerStartedRef.current &&
            prevTimeRef.current > 0 &&
            d.time_left <= 0 &&
            !guessedRef.current &&
            !guessMut.isPending
        ) {
            safeGuess({ lat: 0, lng: 0 });      // otomatik 0-puan tahmini
        }

        /* -- sonraki tur için önceki zamanı güncelle -- */
        prevTimeRef.current = d.time_left;
    }, [statusQuery.data]);

    /* ---- guard 3 : kontrolsüz “next” çağrısı ---- */
    const safeNext = () => {
        // aynı tur içinde bir kez “next” çalışsın
        if (nextMut.isPending) return;
        nextMut.mutate();
    };

    return { statusQuery, safeGuess, safeNext, guessMut, nextMut };
};
