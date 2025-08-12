/**
 * Axios instance
 * --------------
 * • baseURL:   Ortam değişkeni yoksa localhost.
 * • withCredentials: FastAPI JWT çerezini her istekte otomatik gönderir.
 */
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
  withCredentials: true,
});