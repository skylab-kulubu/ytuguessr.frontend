"use client";

import { useLeaderboard } from "../../lib/hooks/useLeaderboard";
import { useState } from "react";
import { motion } from "framer-motion";
import { CountUp } from "./utils";
import { ArrowRight } from "lucide-react";

export default function Podium() {
    const { topThree } = useLeaderboard(1);
    const [hasEntered, setHasEntered] = useState(false);

    if (!topThree || topThree.length < 3) return null;

    return (
        <motion.div
            className="w-full max-w-md mx-auto p-6 pt-12"
            viewport={{ once: true, amount: 0.3 }}
            onViewportEnter={() => setHasEntered(true)}
        >
            <div className="grid grid-cols-16 items-end w-full h-60">
                {/* 2 */}
                <motion.div className="relative flex-1 col-span-5"
                    initial={{ y: 200, opacity: 0 }}
                    animate={hasEntered ? { y: 0, opacity: 1 } : undefined}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.div className="absolute -top-12 left-2 right-0 text-center"
                        initial={{ y: -20, opacity: 0 }}
                        animate={hasEntered ? { y: 0, opacity: 1 } : undefined}
                        transition={{ duration: 0.6, delay: 1.4 }}
                    >
                        <span className="text-sm font-medium text-indigo-200/90 bg-indigo-900/40 px-2 py-1 rounded border border-indigo-600/30">
                            {topThree[1]?.name}
                        </span>
                    </motion.div>
                    <motion.div className="absolute -top-3 left-0 right-0 h-3 bg-gradient-to-br from-indigo-600/70 to-indigo-500/70"
                        style={{ clipPath: "polygon(10% 0%, 110% 0%, 100% 100%, 0% 100%)", originY: 1 }}
                        initial={{ scaleY: 0 }}
                        animate={hasEntered ? { scaleY: 1 } : undefined}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    />
                    <motion.div className="h-36 bg-gradient-to-b from-indigo-900/80 to-indigo-950 shadow-lg border-tl border-indigo-800"
                        initial={{ scaleY: 0 }}
                        animate={hasEntered ? { scaleY: 1 } : undefined}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        style={{ originY: 1 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span className="text-5xl font-bold mb-6 text-white/20"
                            initial={{ scale: 0 }}
                            animate={hasEntered ? { scale: 1 } : undefined}
                            transition={{ duration: 0.5, delay: 1.2 }}
                        >
                            2
                        </motion.span>
                        <motion.span className="absolute bottom-2 font-semibold text-white/70"
                            initial={{ y: 20, opacity: 0 }}
                            animate={hasEntered ? { y: 0, opacity: 1 } : undefined}
                            transition={{ duration: 0.5, delay: 1.6 }}
                        >
                            <CountUp number={topThree[1]?.score || 0} active={hasEntered} />
                        </motion.span>
                    </div>
                </motion.div>

                {/* 1 */}
                <motion.div className="relative flex-1 col-span-6"
                    initial={{ y: 250, opacity: 0 }}
                    animate={hasEntered ? { y: 0, opacity: 1 } : undefined}
                    transition={{ duration: 1.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.div className="absolute -top-12 left-0 right-0 text-center"
                        initial={{ y: -20, opacity: 0 }}
                        animate={hasEntered ? { y: 0, opacity: 1 } : undefined}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    >
                        <span className="text-sm font-medium text-yellow-400/90 bg-yellow-900/40 px-2 py-1 rounded border border-yellow-600/30">
                            {topThree[0]?.name}
                        </span>
                    </motion.div>
                    <motion.div className="absolute -top-3 left-0 right-0 h-3 bg-gradient-to-b from-indigo-500/70 to-indigo-400/70"
                        style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)", originY: 1 }}
                        initial={{ scaleY: 0 }}
                        animate={hasEntered ? { scaleY: 1 } : undefined}
                        transition={{ duration: 1.0, delay: 0.4 }}
                    />
                    <motion.div className="h-48 bg-gradient-to-b from-indigo-700/70 to-indigo-950 shadow-xl"
                        initial={{ scaleY: 0 }}
                        animate={hasEntered ? { scaleY: 1 } : undefined}
                        transition={{ duration: 1.0, delay: 0.4 }}
                        style={{ originY: 1 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span className="text-6xl font-bold mb-6 text-white/20"
                            initial={{ scale: 0 }}
                            animate={hasEntered ? { scale: 1 } : undefined}
                            transition={{ duration: 0.6, delay: 1.0 }}
                        >
                            1
                        </motion.span>
                        <motion.span className="absolute bottom-2 text-lg font-semibold text-white/70"
                            initial={{ y: 20, opacity: 0 }}
                            animate={hasEntered ? { y: 0, opacity: 1 } : undefined}
                            transition={{ duration: 0.5, delay: 1.4 }}
                        >
                            <CountUp number={topThree[0]?.score || 0} active={hasEntered} />
                        </motion.span>
                    </div>
                </motion.div>

                {/* 3 */}
                <motion.div className="relative flex-1 col-span-5"
                    initial={{ y: 150, opacity: 0 }}
                    animate={hasEntered ? { y: 0, opacity: 1 } : undefined}
                    transition={{ duration: 1.0, delay: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.div className="absolute -top-12 left-0 right-2 text-center"
                        initial={{ y: -20, opacity: 0 }}
                        animate={hasEntered ? { y: 0, opacity: 1 } : undefined}
                        transition={{ duration: 0.6, delay: 1.8 }}
                    >
                        <span className="text-sm font-medium text-amber-500/90 bg-amber-900/40 px-2 py-1 rounded border border-amber-600/30">
                            {topThree[2]?.name}
                        </span>
                    </motion.div>
                    <motion.div className="absolute -top-3 left-0 right-0 h-3 bg-gradient-to-bl from-indigo-600/70 to-indigo-500/70"
                        style={{ clipPath: "polygon(0% 0%, 90% 0%, 100% 100%, 0% 100%)", originY: 1 }}
                        initial={{ scaleY: 0 }}
                        animate={hasEntered ? { scaleY: 1 } : undefined}
                        transition={{ duration: 0.6, delay: 1.2 }}
                    />
                    <motion.div className="h-28 bg-gradient-to-b from-indigo-900/80 to-indigo-950 shadow-lg border-tr border-indigo-800"
                        initial={{ scaleY: 0 }}
                        animate={hasEntered ? { scaleY: 1 } : undefined}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        style={{ originY: 1 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span className="text-5xl font-bold mb-6 text-white/20"
                            initial={{ scale: 0 }}
                            animate={hasEntered ? { scale: 1 } : undefined}
                            transition={{ duration: 0.5, delay: 1.6 }}
                        >
                            3
                        </motion.span>
                        <motion.span className="absolute bottom-2 text-sm font-semibold text-white/70"
                            initial={{ y: 20, opacity: 0 }}
                            animate={hasEntered ? { y: 0, opacity: 1 } : undefined}
                            transition={{ duration: 0.5, delay: 2.0 }}
                        >
                            <CountUp number={topThree[2]?.score || 0} active={hasEntered} />
                        </motion.span>
                    </div>
                </motion.div>
            </div>

            <motion.div  className="mt-8 w-full mx-auto max-w-md"
                initial={{ opacity: 0 }}
                animate={hasEntered ? { opacity: 1 } : undefined}
                transition={{ duration: 0.6, ease: "easeOut", delay: 4.0 }}
            >
                <a href="/leaderboard" className="mx-8 rounded-2xl p-3 bg-white/5 backdrop-blur border border-violet-500/20 shadow-lg flex items-center justify-center gap-3 text-white font-semibold hover:bg-white/10 transition-all duration-200 group">
                    Lider Tablosunu İncele
                    <ArrowRight className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" />
                </a>
            </motion.div>
        </motion.div>
    );
}