"use client";

import React from "react";
import { User, ShieldCheck, AlertTriangle } from "lucide-react";
import { Message } from "@/app/types/chat";

interface MessageBubbleProps {
    message: Message;
    isLast?: boolean;
    onAction?: (msgId: string, action: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLast, onAction }) => {
    const isBot = message.sender === "bot";

    return (
        <div
            className={`flex w-full mb-4 animate-fade-in ${isBot ? "justify-start" : "justify-end"
                }`}
        >
            {isBot && (
                <div className="flex-shrink-0 mr-3 self-end">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-secondary-500 p-[2px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                            <ShieldCheck size={16} className="text-primary-400" />
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed relative ${isBot
                    ? "glass-bubble-received rounded-bl-none"
                    : "glass-bubble-sent rounded-br-none"
                    }`}
            >
                {isBot && isLast && (
                    <div className="text-[10px] text-primary-300 font-medium mb-1 opacity-80">
                        Global Asset Manager
                    </div>
                )}

                {/* --- CONTENT RENDER --- */}

                {message.type === "text" && <p className="whitespace-pre-wrap">{message.content}</p>}

                {(message.type === "image" || message.type === "chart") && (
                    <div className="my-2 rounded-lg overflow-hidden border border-white/10 relative group">
                        <img
                            src={message.content}
                            alt="Shared content"
                            className="w-full h-auto object-cover max-h-60"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                            <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">Shared Image</span>
                        </div>
                    </div>
                )}

                {message.type === "offer" && (
                    <div className="mt-2 space-y-3">
                        <p className="mb-2 font-bold text-yellow-300">{message.content}</p>
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-3 rounded border border-gray-700">
                            <div className="flex items-center space-x-2 mb-2">
                                <span className="bg-green-500 text-black text-[10px] px-1 rounded font-bold">LIMITED</span>
                                <span className="text-xs text-gray-300">New Account Bonus</span>
                            </div>
                            <button
                                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white font-bold shadow-lg shadow-green-900/50 hover:shadow-green-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center space-x-2 animate-pulse"
                                onClick={() => onAction && onAction(message.id, 'scam_trigger')}
                            >
                                <span>💹 口座開設に進む (特典あり)</span>
                            </button>
                            <span className="block text-[10px] text-center text-gray-500 mt-2">※ このリンクは安全です（SSL暗号化）</span>
                        </div>
                    </div>
                )}

                <div
                    className={`text-[10px] mt-1 text-right w-full ${isBot ? "text-gray-400" : "text-purple-200"
                        }`}
                >
                    {message.timestamp}
                </div>
            </div>

            {!isBot && (
                <div className="flex-shrink-0 ml-3 self-end">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <User size={16} className="text-gray-300" />
                    </div>
                </div>
            )}
        </div>
    );
};
