"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Landing from "../landing/Landing";

export default function Home() {
  const [hasSeenLanding, setHasSeenLanding] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('ytuguessr-landing-seen');
    if (seen) {
      setHasSeenLanding(true);
      setMainVisible(true);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleLandingComplete = () => {
    setMainVisible(true);

    setTimeout(() => {
      setHasSeenLanding(true);
      localStorage.setItem('ytuguessr-landing-seen', 'true');
    }, 500);
  };

  const resetLanding = () => {
    localStorage.removeItem('ytuguessr-landing-seen');
    setHasSeenLanding(false);
    setMainVisible(false);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {!hasSeenLanding && (
        <div className={`absolute inset-0 z-20 transition-opacity duration-100`}>
          <Landing onComplete={handleLandingComplete} />
        </div>
      )}

      {hasSeenLanding && (
        <div className={`main-content-container min-h-screen bg-[#1B1740] flex flex-col relative transition-opacity duration-1000 ease-in-out ${mainVisible ? 'opacity-100' : 'opacity-0'}`}>
          <Header />
          <main className="flex flex-col items-center bg-[#1B1740] text-white">
            <Hero />
          </main>

          {/* Developer Reset Button - productionda kaldırılacak */}
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={resetLanding}
              className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm z-50 opacity-70 hover:opacity-100 transition-opacity"
            >
              Landing'i Sıfırla
            </button>
          )}
        </div>  
      )}
    </div>
  );
}
