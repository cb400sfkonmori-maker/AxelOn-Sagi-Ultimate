"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ModelLoadingBarProps {
    isLoading: boolean;
    progress: number;
    text: string;
}

export const ModelLoadingBar: React.FC<ModelLoadingBarProps> = ({ isLoading, progress, text }) => {
    if (!isLoading && progress < 100) return null;
    if (!isLoading) return null;

    return (
        <div className="fixed top-16 left-0 right-0 z-40 px-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="max-w-md mx-auto bg-gray-900/90 backdrop-blur-md border border-primary-500/30 rounded-lg p-3 shadow-xl">
                <div className="flex items-center justify-between mb-2 text-xs text-primary-200">
                    <span className="flex items-center gap-2">
                        <Loader2 className="animate-spin w-3 h-3" />
                        AIモデルを準備中 (WebGPU)...
                    </span>
                    <span className="font-mono">{Math.round(progress)}%</span>
                </div>

                <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500 animate-pulse transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="text-[10px] text-gray-400 mt-1 truncate">{text}</p>
            </div>
        </div>
    );
};
