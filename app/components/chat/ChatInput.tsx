"use client";

import React, { useState } from "react";
import { Send, Image, Plus, Mic } from "lucide-react";

interface ChatInputProps {
    onSendMessage: (text: string) => void;
    disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
    const [inputText, setInputText] = useState("");

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim() || disabled) return;
        onSendMessage(inputText);
        setInputText("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="sticky bottom-0 left-0 w-full p-4 bg-[rgba(10,10,20,0.95)] border-t border-white/10 backdrop-blur-md z-30">
            <form onSubmit={handleSubmit} className="relative flex items-center space-x-3 w-full max-w-2xl mx-auto">

                {/* Fake attach buttons - mobile style */}
                <button type="button" className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 transition-colors">
                    <Plus size={20} />
                </button>
                <button type="button" className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 transition-colors hidden sm:block">
                    <Image size={20} />
                </button>
                <button type="button" className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 transition-colors hidden sm:block">
                    <Mic size={20} />
                </button>

                <div className="flex-1 relative">
                    <input
                        type="text"
                        className="w-full bg-[#1e1b2e] text-white placeholder-gray-500 rounded-full px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500/50 shadow-inner disabled:opacity-50 transition-all border border-white/10"
                        placeholder="Type a message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                    />
                </div>

                <button
                    type="submit"
                    className={`p-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 shadow-lg shadow-purple-500/20 text-white transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${!inputText.trim() ? "opacity-70 grayscale" : "hover:shadow-purple-500/40"
                        }`}
                    disabled={disabled || !inputText.trim()}
                >
                    <Send size={20} fill="currentColor" />
                </button>
            </form>
        </div>
    );
};
