"use client";

import React from "react";
import { Zap, Brain, Rocket } from "lucide-react";

interface ModelSelectionProps {
    onSelect: (modelId: string | 'light' | 'gemini', apiKey?: string) => void;
}

export const ModelSelectionScreen: React.FC<ModelSelectionProps> = ({ onSelect }) => {
    const [apiKey, setApiKey] = React.useState("");
    const [showApiKeyInput, setShowApiKeyInput] = React.useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-white p-4 md:p-6 animate-fade-in relative overflow-y-auto">
            {/* Background decoration */}
            <div className="fixed top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 blur-sm pointer-events-none"></div>

            <div className="z-10 max-w-5xl w-full text-center space-y-6 md:space-y-8 py-10">
                <h1 className="text-2xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                    SNS詐欺被害疑似体験
                    <br />
                    <span className="text-lg md:text-2xl text-gray-400 font-normal">シミュレーター</span>
                </h1>

                <p className="text-sm md:text-base text-gray-300 px-2 leading-relaxed">
                    実際に起きている「ロマンス詐欺・投資詐欺」を体験し、その手口を学びましょう。<br className="hidden md:block" />
                    デバイスの性能や通信環境に合わせてモードを選択してください。
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 px-2">
                    {/* Button 0: Light (0MB) */}
                    <button
                        onClick={() => onSelect("light")}
                        className="group relative flex flex-col items-center p-4 md:p-5 bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700 hover:border-green-500 rounded-2xl transition-all duration-300"
                    >
                        <div className="p-3 rounded-full bg-green-500/20 text-green-400 mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                            <Rocket size={24} />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-green-300 mb-1">ライト体験</h3>
                        <span className="text-[10px] bg-green-900/50 text-green-200 px-2 py-0.5 rounded mb-2 md:mb-3">0MB / 即時</span>
                        <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">
                            台本形式で手口を爆速体験。
                        </p>
                        <div className="mt-auto w-full py-2 bg-green-600/20 border border-green-500/50 rounded text-green-300 text-xs font-bold transition-all group-hover:bg-green-600 group-hover:text-white">
                            クイック起動
                        </div>
                    </button>

                    {/* Button 1: Standard AI */}
                    <button
                        onClick={() => onSelect("Llama-3.2-1B-Instruct-q4f16_1-MLC")}
                        className="group relative flex flex-col items-center p-4 md:p-5 bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700 hover:border-blue-500 rounded-2xl transition-all duration-300"
                    >
                        <div className="p-3 rounded-full bg-blue-500/20 text-blue-400 mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-blue-300 mb-1">通常 AI</h3>
                        <span className="text-[10px] bg-blue-900/50 text-blue-200 px-2 py-0.5 rounded mb-2 md:mb-3">1.3GB / ブラウザ</span>
                        <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">
                            軽量AIによる自由な対話。
                        </p>
                        <div className="mt-auto w-full py-2 bg-blue-600/20 border border-blue-500/50 rounded text-blue-300 text-xs font-bold transition-all group-hover:bg-blue-600 group-hover:text-white">
                            Llama-3.2
                        </div>
                    </button>

                    {/* Button 2: Full Spec */}
                    <button
                        onClick={() => onSelect("Phi-3-mini-4k-instruct-q4f16_1-MLC")}
                        className="group relative flex flex-col items-center p-4 md:p-5 bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700 hover:border-purple-500 rounded-2xl transition-all duration-300"
                    >
                        <div className="p-3 rounded-full bg-purple-500/20 text-purple-400 mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                            <Brain size={24} />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-purple-300 mb-1">高性能 AI</h3>
                        <span className="text-[10px] bg-purple-900/50 text-purple-200 px-2 py-0.5 rounded mb-2 md:mb-3">2.3GB / 低速</span>
                        <p className="text-[11px] text-gray-400 mb-4 leading-relaxed">
                            複雑な嘘も再現する高精度AI。
                        </p>
                        <div className="mt-auto w-full py-2 bg-purple-600/20 border border-purple-500/50 rounded text-purple-300 text-xs font-bold transition-all group-hover:bg-purple-600 group-hover:text-white">
                            Phi-3 Mini
                        </div>
                    </button>

                    {/* Button 3: Ultimate (Gemini API) */}
                    <div className="group relative flex flex-col items-center p-4 md:p-5 bg-gradient-to-b from-amber-900/20 to-gray-800/30 hover:from-amber-900/40 border border-amber-600/30 hover:border-amber-500 rounded-2xl transition-all duration-300">
                        <div className="absolute -top-2 -right-2">
                            <span className="bg-amber-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg animate-pulse">ULTIMATE</span>
                        </div>
                        <div className="p-3 rounded-full bg-amber-500/20 text-amber-500 mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                            <Brain size={24} />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-amber-300 mb-1">アルティメット</h3>
                        <span className="text-[10px] bg-amber-900/50 text-amber-200 px-2 py-0.5 rounded mb-2 md:mb-3">API / 無制限</span>
                        <p className="text-[11px] text-gray-400 mb-4 leading-relaxed text-center">
                            Gemini搭載。極限の詐欺。
                        </p>

                        {!showApiKeyInput ? (
                            <button
                                onClick={() => setShowApiKeyInput(true)}
                                className="mt-auto w-full py-2.5 bg-amber-600/20 border border-amber-500/50 rounded text-amber-300 text-xs font-bold hover:bg-amber-600 hover:text-white transition-all"
                            >
                                APIキーを入力
                            </button>
                        ) : (
                            <div className="mt-auto w-full space-y-2">
                                <input
                                    type="password"
                                    placeholder="Gemini API Key"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="w-full bg-black/50 border border-amber-500/50 rounded px-2 py-2 text-[10px] focus:outline-none focus:border-amber-500"
                                />
                                <button
                                    disabled={!apiKey}
                                    onClick={() => onSelect("gemini", apiKey)}
                                    className="w-full py-2 bg-amber-600 border border-amber-500 rounded text-white text-[10px] font-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-500 transition-all font-bold"
                                >
                                    開始
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-[10px] md:text-[11px] text-gray-500 mt-6 leading-relaxed pb-10">
                    ※ AI体験にはブラウザのWebGPU機能が必要です。アルティメット版は別途APIキーが必要です。<br />
                    ※ APIキーは端末にのみ保存され、開発元には送信されません。
                </p>
            </div>
        </div>
    );
}
