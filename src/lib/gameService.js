/**
 * “Dumb” servis katmanı
 * ---------------------
 * • Sadece HTTP çağrısı yapar, UI / cache mantığı bilmez.
 * • Tüm fonksiyonlar .then(r => r.data) ile çıplak JSON döndürür.
 */

import { api } from "./api";

/* oyun akışı */
export const startGame = (body) => api.post("/game/start", body).then(r => r.data);
export const makeGuess = (lat, lng) => api.post("/game/guess", { latitude: lat, longitude: lng }).then(r => r.data);
export const nextQuestion = () => api.post("/game/next").then(r => r.data);
export const getStatus = () => api.get("/game/status").then(r => r.data);
export const getSummary = () => api.get("/game/summary").then(r => r.data);
export const getLeaderboard = (page = 1) => api.get("/game/leaderboard", { params: { page } }).then(r => r.data);
