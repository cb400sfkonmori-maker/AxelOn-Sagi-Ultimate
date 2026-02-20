"use client";

import React from "react";
import { ChevronLeft, Info, Search, Video, Phone } from "lucide-react";

export const ChatHeader: React.FC = () => {
    return (
        <div className="flex items-center justify-between px-4 py-3 bg-[rgba(10,10,20,0.95)] border-b border-primary-500/20 backdrop-blur-md sticky top-0 z-10 w-full mb-4">
            <div className="flex items-center space-x-3">
                <button className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-300">
                    <ChevronLeft size={24} />
                </button>

                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 via-secondary-600 to-yellow-400 p-[2px]">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&ixlib=rb-4.0.3"
                            alt="Alice Tanaka"
                            className="w-full h-full rounded-full object-cover border-2 border-[var(--background-start-rgb)]"
                        />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a0f] rounded-full animate-pulse"></span>
                </div>

                <div className="flex flex-col">
                    <h2 className="text-sm font-bold text-white tracking-wide">Alice Tanaka (Official)</h2>
                    <span className="text-[10px] text-primary-300 font-medium">FX & Crypto Analyst • Online</span>
                </div>
            </div>

            <div className="flex items-center space-x-4 text-gray-400">
                <button className="hover:text-white transition-colors"><Search size={20} /></button>
                {/* Fake call buttons */}
                <button className="hover:text-green-400 transition-colors"><Phone size={20} /></button>
                <button className="hover:text-secondary-400 transition-colors"><Video size={20} /></button>
                <button className="hover:text-blue-400 transition-colors"><Info size={20} /></button>
            </div>
        </div>
    );
};
