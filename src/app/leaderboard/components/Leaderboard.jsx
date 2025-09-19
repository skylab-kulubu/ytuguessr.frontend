"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Leaderboard({ entries, current }) {
    return (
        <motion.div className="bg-white/5 backdrop-blur-sm rounded-xl border border-violet-500/20 overflow-hidden shadow-2xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", height: { duration: 0.6 }, opacity: { duration: 0.4, delay: 0.2 } }}
        >
            <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse">
                    <motion.thead
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <tr className="border-b border-violet-500/30">
                            <th className="w-1/12 px-6 py-4 text-left font-bold text-violet-400">#</th>
                            <th className="w-6/12 px-6 py-4 text-left font-bold text-violet-400">İsim</th>
                            <th className="w-5/12 px-6 py-4 text-right font-bold text-violet-400">Puan</th>
                        </tr>
                    </motion.thead>
                    <AnimatePresence mode="wait">
                        <motion.tbody key={current}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {entries.map((data, index) => (
                                <motion.tr key={data.rank}
                                    initial={{ height: 0, opacity: 0, y: 20}}
                                    animate={{ height: "auto", opacity: 1, y: 0}}
                                    transition={{ delay: 0.1 + (index * 0.05), duration: 0.3, ease: "easeOut"}}
                                    className={`border-b border-violet-500/20 hover:bg-violet-500/10 transition-colors duration-200 ${data.isMe
                                        ? "font-semibold border-blue-500/50 bg-gradient-to-r from-blue-500/10 to-indigo-500/10" : ""}`}
                                >
                                    <td className="px-6 py-4">
                                        <motion.div className="flex items-center"
                                            initial={{ x: -30, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 + (index * 0.05), duration: 0.3, ease: "easeOut"}}
                                        >
                                            <span className={`font-semibold text-gray-300`}> {data.rank}</span>
                                        </motion.div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <motion.div className="truncate whitespace-nowrap overflow-hidden text-white font-medium"
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.25 + (index * 0.05), duration: 0.3, ease: "easeOut"}}>
                                            <motion.span
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 + (index * 0.05), duration: 0.2}}>
                                                {data.name}
                                            </motion.span>
                                            {data.isMe && (
                                                <motion.span className="ml-2 text-blue-400 text-sm"
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ delay: 0.4 + (index * 0.05), duration: 0.2, type: "spring", stiffness: 200}}>
                                                    (Siz)
                                                </motion.span>
                                            )}
                                        </motion.div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <motion.span className={`font-bold text-lg ${data.rank <= 3 ? "text-yellow-400" : "text-gray-200"}`}
                                            initial={{ x: 30, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.35 + (index * 0.05), duration: 0.3, ease: "easeOut" }}>
                                            {data.score.toLocaleString()}
                                        </motion.span>
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </AnimatePresence>
                </table>
            </div>
        </motion.div>
    );
}