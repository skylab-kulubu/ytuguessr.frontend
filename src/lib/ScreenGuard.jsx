"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import ScreenErrorAnimation from "../../public/lottie/screenerror.json";

function ScreenSizeError() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#1B1740] via-[#2A1F5D] to-[#1B1740] text-white overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-6">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="mb-8"
        >
          <Lottie
            animationData={ScreenErrorAnimation}
            style={{ width: 300, height: 300 }}
            loop={true}
          />
        </motion.div>

        <motion.div 
          className="mb-5"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
        >
          <img
            src="/logo.svg"
            alt="YTUGuessr Logo"
            className="h-10 w-auto select-none"
            draggable="false"
          />
        </motion.div>

        <motion.div className="h-[2px] w-32 mx-auto rounded-full bg-gradient-to-r from-transparent via-violet-400/60 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }}
        />

        <motion.p className="text-lg text-gray-300/90 font-medium max-w-md mb-8 leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.9 }}
        >
          Bu deneyim mobil cihazlar için optimize edilmiştir. Lütfen telefonunuzdan veya tabletten erişin.
        </motion.p>
      </div>
    </div>
  );
}

export default function ScreenGuard({ children }) {
  const [mounted, setMounted] = useState(false);
  const [isTooWide, setIsTooWide] = useState(false);

  useEffect(() => {
    setMounted(true);

    const guard = window.matchMedia("(max-width: 600px)");
    const update = () => setIsTooWide(!guard.matches);

    update();
    guard.addEventListener?.("change", update);
    return () => guard.removeEventListener?.("change", update);
  }, []);

  if (!mounted) return null; // SSR/CSR uyumsuzluğu önlemek için

  return isTooWide ? <ScreenSizeError /> : <>{children}</>;
}