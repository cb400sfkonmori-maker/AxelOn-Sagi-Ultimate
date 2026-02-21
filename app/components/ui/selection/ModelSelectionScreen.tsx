"use client";

import React from "react";
import { Brain, Rocket } from "lucide-react";

interface ModelSelectionProps {
    onSelect: (modelId: string | 'light' | 'gemini') => void;
}

export const ModelSelectionScreen: React.FC<ModelSelectionProps> = ({ onSelect }) => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-white p-4 md:p-6 animate-fade-in relative overflow-y-auto">
            {/* Background decoration */}
            <div className="fixed top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 blur-sm pointer-events-none"></div>

            <div className="z-10 max-w-4xl w-full text-center space-y-6 md:space-y-8 py-10">
                <h1 className="text-2xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                    SNS詐欺被害疑似体験
                    <br />
                    <span className="text-lg md:text-2xl text-gray-400 font-normal">シミュレーター</span>
                </h1>

                <p className="text-sm md:text-base text-gray-300 px-2 leading-relaxed">
                    実際に起きている「ロマンス詐欺・投資詐欺」を体験し、その手口を学びましょう。<br className="hidden md:block" />
                    体験コースを選択してください。
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 px-4 max-w-2xl mx-auto">
                    {/* Button 0: Light (0MB) */}
                    <button
                        onClick={() => onSelect("light")}
                        className="group relative flex flex-col items-center p-6 md:p-8 bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700 hover:border-green-500 rounded-2xl transition-all duration-300"
                    >
                        <div className="p-4 rounded-full bg-green-500/20 text-green-400 mb-4 group-hover:scale-110 transition-transform">
                            <Rocket size={32} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-green-300 mb-2">ライト体験</h3>
                        <span className="text-xs bg-green-900/50 text-green-200 px-3 py-1 rounded mb-4">即時起動</span>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            台本形式で手口を爆速体験。<br />
                            初めての方に最適です。
                        </p>
                        <div className="mt-auto w-full py-3 bg-green-600/20 border border-green-500/50 rounded-xl text-green-300 text-sm font-bold transition-all group-hover:bg-green-600 group-hover:text-white">
                            クイック起動
                        </div>
                    </button>

                    {/* Button 3: Ultimate (Backend API) */}
                    <div className="group relative flex flex-col items-center p-6 md:p-8 bg-gradient-to-b from-amber-900/20 to-gray-800/30 hover:from-amber-900/40 border border-amber-600/30 hover:border-amber-500 rounded-2xl transition-all duration-300">
                        <div className="absolute -top-3 -right-3">
                            <span className="bg-amber-500 text-black text-[10px] font-black px-3 py-1 rounded-full shadow-lg animate-pulse">ULTIMATE</span>
                        </div>
                        <div className="p-4 rounded-full bg-amber-500/20 text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                            <Brain size={32} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-amber-300 mb-2">アルティメット</h3>
                        <span className="text-xs bg-amber-900/50 text-amber-200 px-3 py-1 rounded mb-4">最先端 AI</span>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed text-center">
                            Gemini搭載。極限の詐欺体験。<br />
                            自由な対話が可能です。
                        </p>

                        <button
                            onClick={() => onSelect("gemini")}
                            className="mt-auto w-full py-3 bg-amber-600 border border-amber-500 rounded-xl text-white text-sm font-black hover:bg-amber-500 transition-all shadow-lg shadow-amber-900/20"
                        >
                            開始する
                        </button>
                    </div>
                </div>

                <p className="text-[10px] md:text-[11px] text-gray-500 mt-10 leading-relaxed pb-10">
                    ※ 本シミュレーターは教育目的です。実際の詐欺を助長するものではありません。<br />
                    ※ アルティメット版は、より高度でリアルな対話を提供します。
                </p>
            </div>
        </div>
    );
}
