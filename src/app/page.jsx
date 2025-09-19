"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Landing from "../landing/Landing";
import Footer from "./components/Footer";

export default function Home() {
  const [hasSeenLanding, setHasSeenLanding] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('ytuguessr-landing-seen');
    if (seen) setHasSeenLanding(true);
    window.scrollTo(0, 0);
  }, []);

  const handleLandingComplete = () => {
    setTimeout(() => {
      setHasSeenLanding(true);
      localStorage.setItem('ytuguessr-landing-seen', 'true');
    }, 500);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {!hasSeenLanding && (
        <div className={`absolute inset-0 z-20`}>
          <Landing onComplete={handleLandingComplete} />
        </div>
      )}

      {hasSeenLanding && (
        <div className={`main-content-container min-h-screen bg-[#1B1740] flex flex-col relative`}>
          <Header />
          <main className="flex flex-col items-center bg-[#1B1740] text-white">
            <Hero />
          </main>
          <Footer />
        </div>  
      )}
    </div>
  );
}
