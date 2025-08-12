"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLeaderboard } from "../../lib/hooks/useLeaderboard";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import LoadingScreen from "../components/LoadingScreen";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function LeaderboardPage() {
    const router = useRouter();
    const params = useSearchParams();
    const page = parseInt(params.get("page") || "1", 10);

    const {
        isLoading,
        error,
        formatted,    // { page, totalPages, totalUsers, entries }
    } = useLeaderboard(page);

    if (isLoading) return <LoadingScreen />;
    if (error) return (
        <div className="min-h-screen bg-[#1B1740] text-white">
            <Header />
            <div className="p-6 max-w-4xl mx-auto pt-24">
                <p className="text-center text-red-400 text-md">
                    Hata: {error.message}
                </p>
            </div>
        </div>
    );

    const { page: current, totalPages, totalUsers, entries } = formatted;

    const goTo = (p) => router.push(`/leaderboard?page=${p}`);

    return (
        <div className="min-h-screen bg-[#1B1740] text-white">
            <Header />

            {/* Main Content */}
            <div className="p-6 max-w-4xl mx-auto space-y-6 pt-24">
                <motion.div
                    className="text-center mb-8"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-4 italic text-shadow-lg"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    >
                        LİDER TABLOSU
                    </motion.h1>
                    <motion.p
                        className="text-gray-300 font-semibold"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        Toplam Oyuncu: <span className="text-yellow-400">{totalUsers}</span> — Sayfa <span className="text-yellow-400">{current}</span> / <span className="text-yellow-400">{totalPages}</span>
                    </motion.p>
                </motion.div>

                {/* Leaderboard Card */}
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        height: { duration: 0.6 },
                        opacity: { duration: 0.4, delay: 0.2 }
                    }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed border-collapse">
                            <motion.thead
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <tr className="border-b border-gray-600">
                                    <th className="w-1/12 px-6 py-4 text-left font-bold text-yellow-400">#</th>
                                    <th className="w-6/12 px-6 py-4 text-left font-bold text-yellow-400">İsim</th>
                                    <th className="w-5/12 px-6 py-4 text-right font-bold text-yellow-400">Puan</th>
                                </tr>
                            </motion.thead>
                            <AnimatePresence mode="wait">
                                <motion.tbody
                                    key={current}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    {entries.map((u, index) => (
                                        <motion.tr
                                            key={u.rank}
                                            initial={{ height: 0, opacity: 0, y: 20}}
                                            animate={{ height: "auto", opacity: 1, y: 0}}
                                            transition={{ delay: 0.1 + (index * 0.05), duration: 0.3, ease: "easeOut"}}
                                            className={`border-b border-gray-700/30 hover:bg-gray-700/30 transition-colors duration-200 ${u.isMe
                                                    ? "font-semibold border-blue-500/50 bg-gradient-to-r from-blue-500/10 to-purple-500/10" : ""
                                                } ${u.rank <= 3 ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10" : ""
                                                }`}
                                        >
                                            <td className="px-6 py-4">
                                                <motion.div
                                                    className="flex items-center"
                                                    initial={{ x: -30, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.2 + (index * 0.05), duration: 0.3, ease: "easeOut"}}
                                                >
                                                    {u.rank === 1 && <span className="text-yellow-400 text-lg mr-2">🥇</span>}
                                                    {u.rank === 2 && <span className="text-gray-300 text-lg mr-2">🥈</span>}
                                                    {u.rank === 3 && <span className="text-orange-400 text-lg mr-2">🥉</span>}
                                                    {u.rank > 3 && <span className={`font-semibold text-gray-300`}> {u.rank}</span>}
                                                </motion.div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <motion.div
                                                    className="truncate whitespace-nowrap overflow-hidden text-white font-medium"
                                                    initial={{ x: -50, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.25 + (index * 0.05), duration: 0.3, ease: "easeOut"}}>
                                                    <motion.span
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.3 + (index * 0.05), duration: 0.2}}>
                                                        {u.name}
                                                    </motion.span>
                                                    {u.isMe && (
                                                        <motion.span
                                                            className="ml-2 text-blue-400 text-sm"
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{ delay: 0.4 + (index * 0.05), duration: 0.2, type: "spring", stiffness: 200}}>
                                                            (Sen)
                                                        </motion.span>
                                                    )}
                                                </motion.div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <motion.span
                                                    className={`font-bold text-lg ${u.rank <= 3 ? "text-yellow-400" : "text-gray-200"}`}
                                                    initial={{ x: 30, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.35 + (index * 0.05), duration: 0.3, ease: "easeOut" }}>
                                                    {u.score.toLocaleString()}
                                                </motion.span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </motion.tbody>
                            </AnimatePresence>
                        </table>
                    </div>
                </motion.div>

                {/* Pagination */}
                <motion.div
                    className="flex justify-center space-x-4 pt-8"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        delay: 0.5 + (entries.length * 0.05),
                        duration: 0.4,
                        ease: "easeOut"
                    }}
                >
                    <button
                        onClick={() => goTo(current - 1)}
                        disabled={current <= 1}
                        className="px-6 py-3 rounded-xl bg-indigo-600/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg"
                    >
                        <span className="flex items-center gap-2"> <ArrowLeft className="mt-0.5" size={18} />Önceki</span>
                    </button>
                    <button
                        onClick={() => goTo(current + 1)}
                        disabled={current >= totalPages}
                        className="px-6 py-3 bg-indigo-600/80 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg"
                    >
                        <span className="flex items-center gap-2">Sonraki<ArrowRight className="mt-0.5" size={18} /></span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
