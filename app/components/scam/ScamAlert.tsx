"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, Lock } from "lucide-react";

interface ScamAlertProps {
    onComplete: () => void;
}

export const ScamAlert: React.FC<ScamAlertProps> = ({ onComplete }) => {
    const [showWarning, setShowWarning] = useState(false);
    const [glitchText, setGlitchText] = useState("SYSTEM ERROR");

    useEffect(() => {
        // Stage 1: Initial Glitch/Noise
        const glitchInterval = setInterval(() => {
            const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
            let text = "";
            for (let i = 0; i < 12; i++) {
                text += chars[Math.floor(Math.random() * chars.length)];
            }
            setGlitchText(text);
        }, 50);

        // Stage 2: Show Warning after 1.5s
        const timer1 = setTimeout(() => {
            clearInterval(glitchInterval);
            setGlitchText("FRAUD DETECTED");
            setShowWarning(true);
        }, 1500);

        // Stage 3: Complete after 4s (Move to education)
        const timer2 = setTimeout(() => {
            onComplete();
        }, 4500);

        return () => {
            clearInterval(glitchInterval);
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden font-mono">
            {/* Background Noise Video/GIF replacement with CSS noise */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://media.giphy.com/media/l41lFw057lAJQMxv2/giphy.gif')] bg-cover"></div>

            <div className="relative z-10 flex flex-col items-center animate-pulse">
                {!showWarning ? (
                    <h1 className="text-6xl md:text-9xl font-black text-red-600 tracking-tighter" style={{ textShadow: "4px 4px 0 #fff" }}>
                        {glitchText}
                    </h1>
                ) : (
                    <div className="flex flex-col items-center space-y-8 animate-bounce">
                        <AlertTriangle size={120} className="text-red-500 animate-pulse" />
                        <h1 className="text-5xl md:text-7xl font-bold text-red-500 text-center tracking-widest border-4 border-red-500 p-4 transform rotate-2">
                            詐欺成立
                        </h1>
                        <p className="text-xl text-white bg-red-900/80 px-4 py-2 mt-4">
                            あなたが送金ボタンを押した瞬間、資産は消えました。
                        </p>
                    </div>
                )}
            </div>

            {/* Random overlay lines */}
            <div className="absolute top-1/3 w-full h-1 bg-white opacity-50 animate-ping"></div>
            <div className="absolute bottom-1/4 w-full h-1 bg-red-500 opacity-50 animate-pulse"></div>
        </div>
    );
};
