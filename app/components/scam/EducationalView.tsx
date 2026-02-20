"use client";

import React from "react";
import { CheckCircle, AlertOctagon, RefreshCw, XCircle } from "lucide-react";

interface EducationalViewProps {
    onRestart: () => void;
}

export const EducationalView: React.FC<EducationalViewProps> = ({ onRestart }) => {
    const steps = [
        {
            title: "ステップ1: 偶然の装い",
            desc: "「番号を間違えた」「知人の紹介」など、自然な形で接触。",
            risk: "返報性の原理 (優しさで返信してしまう)",
        },
        {
            title: "ステップ2: 信頼構築 (ラポート)",
            desc: "日常会話で親近感を抱かせ、「投資家」という権威性をアピール。",
            risk: "ハロー効果 (一面的な成功体験で全体を信用する)",
        },
        {
            title: "ステップ3: 欲望の喚起",
            desc: "「確実に儲かる」「AIシステム」などの強いワードと偽造画像。",
            risk: "確証バイアス (信じたい情報だけを信じる)",
        },
        {
            title: "ステップ4: 急かして契約",
            desc: "「今だけの限定枠」「特別対応」で正常な判断を奪う。",
            risk: "希少性の原理",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6 overflow-y-auto animate-fade-in flex flex-col items-center">
            <div className="max-w-3xl w-full">
                <header className="mb-8 text-center border-b border-gray-700 pb-6">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-red-900/30 mb-4 ring-2 ring-red-500/50">
                        <XCircle size={48} className="text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
                        あなたは騙されました
                    </h1>
                    <p className="text-gray-400 mt-2">SNS型投資詐欺・ロマンス詐欺の手口分析</p>
                </header>

                <div className="grid gap-6 md:grid-cols-2 mb-10">
                    {steps.map((step, idx) => (
                        <div key={idx} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-primary-500/50 transition-colors relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-6xl group-hover:scale-110 transition-transform select-none">
                                {idx + 1}
                            </div>
                            <h3 className="text-xl font-bold text-primary-300 mb-2 flex items-center">
                                <AlertOctagon size={20} className="mr-2 text-yellow-500" />
                                {step.title}
                            </h3>
                            <p className="text-gray-300 mb-3 text-sm">{step.desc}</p>
                            <div className="bg-black/30 p-2 rounded text-xs text-red-300 font-mono border-l-2 border-red-500">
                                ⚠️ {step.risk}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6 mb-8 text-center">
                    <h3 className="text-lg font-bold text-blue-300 mb-2">対策のポイント</h3>
                    <ul className="text-left list-disc list-inside space-y-2 text-gray-300 text-sm max-w-md mx-auto">
                        <li>面識のない相手からの投資話は100%詐欺と疑う</li>
                        <li>振込先が個人名義や外国人名義の場合は要注意</li>
                        <li>「必ず儲かる」「元本保証」は金融商品取引法で禁止されている言葉</li>
                        <li>画像の検索や金融庁の登録業者確認を行う</li>
                    </ul>
                </div>

                <div className="flex justify-center pb-8">
                    <button
                        onClick={onRestart}
                        className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all"
                    >
                        <RefreshCw size={20} />
                        <span>シミュレーションをやり直す</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
