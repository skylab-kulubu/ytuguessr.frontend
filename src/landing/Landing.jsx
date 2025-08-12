"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const EarthCanvas = dynamic(() => import("./3d/Earth"), { 
  ssr: false,
  loading: () => null
});

const StarsCanvas = dynamic(() => import("./3d/Stars"), { 
  ssr: false,
  loading: () => null
});

const Landing = ({ onComplete }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const maxScroll = scrollHeight - clientHeight;
        const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
        setScrollY(scrollTop);
        setScrollProgress(progress);
        
        if (progress > 0.4) {
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onComplete(), 300);
          }, 200);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onComplete]);

  const logoOpacity = Math.max(0, 1 - (scrollProgress / 0.3));
  const starsOpacity = Math.max(0, 1 - (scrollProgress / 0.5));
  const scrollHintOpacity = Math.max(0, 1 - (scrollProgress / 0.15));
  const mainOpacity = scrollProgress > 0.3 ? Math.max(0, 1 - ((scrollProgress - 0.3) / 0.2)) : 1;

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full h-[200vh] overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      style={{ 
        position: 'relative',
        scrollBehavior: 'smooth',
        overscrollBehavior: 'none',
        WebkitOverflowScrolling: 'touch',
        opacity: mainOpacity
      }}
    >
      {/* Yıldızlar */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ opacity: starsOpacity }}
      >
        <StarsCanvas />
      </motion.div>

      {/* Logo */}
      <motion.div 
        className="fixed top-4 right-4 md:top-8 md:right-8 z-30 text-white text-right select-none"
        style={{ opacity: logoOpacity }}
      >
        <motion.img 
          className="h-8 mb-2 md:mb-4"
          src="/logo.svg" alt="YTUGuessr Logo"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-base md:text-lg lg:text-xl text-gray-300 font-medium mb-2">
            Başlamak için aşağı kaydır
          </p>
          <motion.div 
            className="flex justify-end"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg 
              className="w-5 h-5 md:w-6 md:h-6 text-gray-300"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Dünya Modeli */}
      <div className="fixed inset-0 z-20">
        <EarthCanvas scrollProgress={scrollProgress} />
      </div>

      {/* Gradient overlay */}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-t from-[#1B1740] via-transparent to-transparent z-10 pointer-events-none"
        style={{ 
          opacity: scrollProgress > 0.7 ? Math.min(1, (scrollProgress - 0.7) / 0.25) : 0
        }}
      />

      {/* Görünmez kaydırılabilir kısım */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" />
    </motion.div>
  );
};

export default Landing;
