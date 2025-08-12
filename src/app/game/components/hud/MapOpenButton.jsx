"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { BorderBeam } from "@/app/components/BorderBeam";

export default function MapOpenButton({ onClick, title = "Haritayı Aç" }) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={title}
            className="fixed bottom-6 right-4 z-10 
             flex items-center justify-center"
        >
            <div className="relative isolate h-23 w-23 rounded-full flex items-center justify-center">
                <BorderBeam
                    className="z-20"
                    size={128}
                    duration={4}
                    borderWidth={20}
                    colorFrom="#454085"
                    colorTo="#8C5DB3"
                />

                <BorderBeam
                    className="z-20 absolute top-0 left-0"
                    size={128}
                    duration={4}
                    delay={2}
                    borderWidth={20}
                    colorFrom="#454085"
                    colorTo="#8C5DB3"
                />

                {/* ► İç mor buzlu cam gövde */}
                <span
                    className="relative z-10 flex h-20 w-20 items-center justify-center
                   rounded-full overflow-hidden
                   backdrop-blur-xl
                   bg-gradient-to-br from-indigo-900/70 to-indigo-900/70
                   border border-purple-300/20
                   transition-all duration-300 group-hover:shadow-purple-400/40 active:shadow-lg"
                >
                    <MapPin className="h-7 w-7 text-white/90 drop-shadow-lg" strokeWidth={2.5} />
                </span>
            </div>
        </motion.button>
    );
}
