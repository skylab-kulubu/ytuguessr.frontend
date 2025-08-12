"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);

    const isLeaderboardPage = pathname === "/leaderboard";

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setIsScrolled(scrollTop > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleButtonClick = () => {
        if (isLeaderboardPage) {
            router.push('/');
        } else {
            router.push('/leaderboard');
        }
    };

    const getButtonText = () => {
        return isLeaderboardPage ? 'OYNA' : 'LİDER TABLOSU';
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 
            flex items-center justify-between p-4 text-white
            transition-all duration-300 ease-in-out border-b border-gray-700/50
            ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md ' : 'bg-gray-900'}`}>

            <div className="flex items-center">
                <img src="/logo.svg" alt="YTUGuessr Logo" className="h-7" />
            </div>
            
            <button 
                className="bg-gradient-to-r from-yellow-500 to-yellow-400/95 text-white italic font-medium text-sm rounded-2xl px-4 py-1 text-shadow-md/20 text-shadow-gray-800 hover:bg-yellow-600 transition-all duration-200"
                onClick={handleButtonClick}>
                {getButtonText()}
            </button>
        </header>
    );
}