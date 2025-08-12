"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Landing from "../landing/Landing";
import { BorderBeam } from "./components/BorderBeam";
import LoadingScreen from "./components/LoadingScreen";

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [hasSeenLanding, setHasSeenLanding] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check if user has already seen the landing page
    const seen = localStorage.getItem('ytuguessr-landing-seen');
    if (seen) {
      setShowLanding(false);
      setHasSeenLanding(true);
      setMainVisible(true);
    }
    
    // Sayfa yüklendiğinde scroll pozisyonunu üstte tut
    window.scrollTo(0, 0);
    
    // Initialize loading completed
    setIsInitializing(false);
  }, []);

  const handleLandingComplete = () => {
    // Ana içeriği göster, sonra landing'i kaldır
    setMainVisible(true);
    
    // Sayfayı en yukarı al
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      setShowLanding(false);
      setHasSeenLanding(true);
      localStorage.setItem('ytuguessr-landing-seen', 'true');
      
      // Hero tamamen görünene kadar bekle, sonra tekrar yukarı al
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100); // Kısa bir süre sonra tekrar yukarı al
    }, 500); // Geçiş için biraz bekleme süresi
  };

  const resetLanding = () => {
    localStorage.removeItem('ytuguessr-landing-seen');
    setHasSeenLanding(false);
    setShowLanding(true);
    setMainVisible(false);
  };

  // Show loading screen during initialization
  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {showLanding && !hasSeenLanding && (
        <div className={`absolute inset-0 z-20 ${mainVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-100`}>
          <Landing onComplete={handleLandingComplete} />
        </div>
      )}
      
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
    </div>
  );
}
