"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../lib/queryClient";
import { startGame } from "../../lib/gameService";

import Lottie from "lottie-react";
import { motion } from "framer-motion";
import loadingAnimation from "../../../public/lottie/loading.json";

const textVariants = {
  idle: { y: "0%", transition: { duration: 0.3, ease: "easeOut" } },
  loading: { y: "-100%", transition: { duration: 0.3, ease: "easeOut" } },
  error: { y: "-200%", transition: { duration: 0.3, ease: "easeOut" } },
};

const loaderVariants = {
  idle: { y: "100%", transition: { duration: 0.3, ease: "easeOut" } },
  loading: { y: "0%", transition: { duration: 0.3, ease: "easeOut" } },
  error: { y: "100%", transition: { duration: 0.3, ease: "easeOut" } },
};

const errorVariants = {
  idle: { y: "200%", transition: { duration: 0.3, ease: "easeOut" } },
  loading: { y: "200%", transition: { duration: 0.3, ease: "easeOut" } },
  error: { y: "0%", transition: { duration: 0.3, ease: "easeOut" } },
};

export default function StartGame() {
  const [mail, setMail] = useState("");
  const [buttonState, setButtonState] = useState("idle");
  const [error, setError] = useState(null);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setButtonState("loading");
    
    try {
      await startGame({
        school_mail: mail || undefined,
        show_name: true,
        again: false,
      });
      router.push("/game");
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "Başlatılamadı";
      setError(errorMessage);
      setButtonState("error");
      
      // 2 saniye sonra eski haline döndür
      setTimeout(() => {
        setButtonState("idle");
        setError(null);
      }, 2000);
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[#231c4b] rounded-xl px-4 py-8 mx-4 border-4 border-indigo-900">
        <h3 className="text-md font-bold text-center -mt-2 text-yellow-400 mb-4">
          Oynamak için okul e-postanı kullan
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold ml-0.5 mb-1">E-posta adresi</label>
            <input
              type="email"
              placeholder="öğrenci@yildiz.edu.tr"
              value={mail}
              onChange={(e)=>setMail(e.target.value)}
              className="w-full p-3 rounded bg-[#2c2552] border-2 border-[#3b3163] text-white"
            />
          </div>
          
          <p className="text-xs text-gray-400">
            Oyunu oynadığınızda KVKK koşullarını kabul etmiş olursunuz.
          </p>

          <motion.button
            type="submit"
            disabled={buttonState === "loading"}
            initial="idle"
            animate={buttonState}
            className={`w-full py-3 rounded-md text-white font-semibold relative overflow-hidden transition-all duration-500 ease-in-out ${
            buttonState === "loading" ? "bg-gray-600" : buttonState === "error" ? "bg-red-800" : "bg-green-600 hover:bg-green-500"}`}
            style={{
              transition: 'background-color 0.5s ease-in-out, background-image 0.5s ease-in-out'
            }}
          >
            <div className="relative h-6 overflow-hidden">
              <motion.div
                variants={textVariants}
                className="absolute inset-0 flex items-center justify-center"
              >
                OYNA
              </motion.div>
              <motion.div
                variants={loaderVariants}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="flex items-center space-x-2">
                  <Lottie 
                    animationData={loadingAnimation} 
                    style={{ width: 24, height: 24 }}
                    loop={true}
                  />
                </div>
              </motion.div>
              <motion.div
                variants={errorVariants}
                className="absolute inset-0 flex items-center justify-center text-sm"
              >
                {error}
              </motion.div>
            </div>
          </motion.button>
        </form>
      </div>
    </QueryClientProvider>
  );
}
