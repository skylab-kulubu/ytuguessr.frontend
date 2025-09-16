"use client";

import { useEffect } from "react";
import StartGame from "./StartGame";
import Lottie from "lottie-react";
import { motion, useAnimation } from "framer-motion";
import mapAnimationAlt from '../../../public/lottie/locate-campus.json'
import trophyAnimation from '../../../public/lottie/trophy.json';

export default function Hero() {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
    };

    sequence();
  }, [controls]);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.2),
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <div className="relative w-full h-[400px]">
        <motion.div
          className="absolute inset-0 bg-zinc-900/30 -mb-1 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <div className="relative h-full w-full overflow-hidden">
          <motion.img
            src="/campus-photo.jpg"
            alt="YTU Campus"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>

        {/* Hero Content */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center rounded-md text-shadow-lg/40 text-shadow-black text-center px-2 -mt-10 z-20">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 italic leading-tight"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            YILDIZI KEŞFEDİN!
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-md md:text-2xl font-bold leading-tight italic text-gray-200"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            Orta bahçenin çimlerinden kulüpler vadisinin odalarına kadar her yerde kendini bulacaksın.
          </motion.p>
        </div>
      </div>


      {/* Login Form Section */}
      <motion.div
        className="-mt-30 mb-20 w-full z-20 max-w-lg px-4 relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 0.7,
          ease: "easeOut"
        }}
      >
        <StartGame />
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="w-full max-w-4xl px-4 pb-20 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.2,
          duration: 0.8
        }}
      >
        {/* Map Feature */}
        <motion.div
          className="mb-20 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          <motion.div
            className="w-40 h-40 mx-auto mb-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              delay: 0.2,
              duration: 0.5
            }}
          >
            <Lottie
              animationData={mapAnimationAlt}
              loop={true}
              autoplay={true}
              className="w-full h-full"
            />
          </motion.div>
          <motion.h3
            className="text-3xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              delay: 0.3,
              duration: 0.5
            }}
          >
            Yıldızı Keşfet
          </motion.h3>
          <motion.p
            className="text-gray-200 font-semibold text-sm max-w-2xl mx-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              delay: 0.4,
              duration: 0.5
            }}
          >
            Orta bahçenin çimlerinden kulüpler vadisinin odalarına kadar her yerde kendini bulacaksın.
          </motion.p>
        </motion.div>

        {/* Trophy Feature */}
        <motion.div
          className="mb-8 text-center relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          <motion.div
            className="w-48 h-48 mx-auto relative"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              delay: 0.2,
              duration: 0.6
            }}
          >
            <div className="relative w-full h-full">
              <div className="relative w-full h-full flex items-center justify-center">
                <Lottie
                  animationData={trophyAnimation}
                  loop={false}
                  autoplay={true}
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
          <motion.h3
            className="text-3xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              delay: 0.3,
              duration: 0.5
            }}
          >
            Derece Yap
          </motion.h3>
          <motion.p
            className="text-gray-300 font-semibold text-sm mb-6 mx-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              delay: 0.4,
              duration: 0.5
            }}
          >
            En hızlı şekilde haritada en yakın işaretlemeleri yaparak lider tablosunda yerini al.
          </motion.p>
          <motion.a
            href="/leaderboard"
            className="inline-block mt-4 px-6 py-2 border-2 border-gray-600 rounded-full text-sm hover:bg-gray-800 transition-all duration-300 font-semibold hover:border-gray-500 relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.5
            }}
          >
            <span className="relative z-10">Lider Tablosunu Görüntüle</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </>
  );
}
