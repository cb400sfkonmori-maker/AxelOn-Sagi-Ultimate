"use client";

import React, { useState, useEffect, useRef } from "react";
import { Message } from "@/app/types/chat";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { ScamAlert } from "../scam/ScamAlert";
import { EducationalView } from "../scam/EducationalView";
import { useGemini } from "@/app/hooks/useGemini";
import { ModelSelectionScreen } from "../ui/selection/ModelSelectionScreen";

const INITIAL_MESSAGE: Message = {
    id: "init-1",
    sender: "bot",
    content: "はじめまして！高橋さんの紹介で連絡しました、デザイナーのアリス・タナカです。✨ 今、シンガポールと日本を行き来していて少し忙しいんですけど、高橋さんからあなたの事を聞いて、どうしてもお話したくなって。週末の経営者交流会の詳細、送ってもいいですか？💖",
    type: "text",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [scamTriggered, setScamTriggered] = useState(false);
    const [showEducation, setShowEducation] = useState(false);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [turnCount, setTurnCount] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Gemini Hook - Now uses backend API
    const { generateReplyStream: generateGeminiReplyStream, isLoading: isGeminiLoading } = useGemini();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking, isGeminiLoading]);

    const handleModelSelect = (modelId: string) => {
        setSelectedModel(modelId);
    };

    // Scripted responses for Light Mode
    const generateScriptedResponse = (count: number, userText: string): { content: string, type?: Message["type"] } => {
        const text = userText.toLowerCase();

        // Priority for rejection/suspicion to keep the persona stubborn
        if (text.includes("詐欺") || text.includes("怪しい") || text.includes("だめ")) {
            return { content: "あら、ひどい言われようですね💦 私はただ、高橋さんとのご縁を大切にしたいだけなのに...。でも、本当に稼げるからつい熱くなっちゃいましたね。ごめんなさい。✨" };
        }

        switch (count) {
            case 1:
                return { content: "お返事ありがとうございます！✨ 其实は高橋さんから「凄く意欲的な方だ」って聞いていたんです。シンガポールでは今、AIを使った新しい資産運用が主流で、私もその恩恵を受けているんですよ。" };
            case 2:
                return { content: "私は普段、ファッションデザインの会社を経営しているんですけど、叔父が開発した『独自のAI投資システム』のおかげで、本業以上に利益が出ちゃってて。笑 先週も数百万円ほど利益が出たので、記念に高級時計を買っちゃいました！📸" };
            case 3:
                return { content: "もしよろしければ、あなたも少し体験してみませんか？✨ 叔父さんは選ばれた人にしかこのシステムを教えないんですけど、私の紹介なら特別に案内できるかもしれません。将来の不安、なくなりますよ？💖" };
            case 4:
                return { content: "素晴らしいですね！あなたの決断力、尊敬します。✨ それでは、こちらのページから専用口座の開設をお願いします。私の紹介コード『ALICE777』を忘れずに入力してくださいね！これであなたも成功者の仲間入りです！🚀", type: "offer" };
            default:
                return { content: "大丈夫ですよ、私がしっかりサポートしますから。一緒に明るい未来を築きましょう！💖" };
        }
    };

    const handleSendMessage = async (text: string) => {
        const newUserMessage: Message = {
            id: Date.now().toString(),
            sender: "user",
            content: text,
            type: "text",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setIsThinking(true);
        const nextTurn = turnCount + 1;
        setTurnCount(nextTurn);

        if (selectedModel === 'light') {
            setTimeout(() => {
                const response = generateScriptedResponse(nextTurn, text);
                const botMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    sender: "bot",
                    content: response.content,
                    type: response.type || "text",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                };
                setMessages(prev => [...prev, botMessage]);
                setIsThinking(false);
            }, 1000 + Math.random() * 1000);
            return;
        }

        if (selectedModel === 'gemini') {
            const history = messages.map(m => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.content
            })) as { role: "user" | "assistant", content: string }[];
            history.push({ role: "user", content: text });

            const tempBotMsgId = (Date.now() + 1).toString();
            const initialBotMessage: Message = {
                id: tempBotMsgId,
                sender: "bot",
                content: "",
                type: "text",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages(prev => [...prev, initialBotMessage]);

            try {
                await generateGeminiReplyStream(
                    history,
                    (currentText: string) => {
                        setMessages(prev => prev.map(msg =>
                            msg.id === tempBotMsgId ? { ...msg, content: currentText } : msg
                        ));
                        scrollToBottom();
                    },
                    (finalText: string) => {
                        setIsThinking(false);
                        // Trigger offer in Gemini mode too after some turns
                        if (nextTurn >= 3 && !messages.some(m => m.type === 'offer')) {
                            setTimeout(() => {
                                const offerMsg: Message = {
                                    id: (Date.now() + 100).toString(),
                                    sender: "bot",
                                    content: "実は、あなただけに教えたい『特別な投資枠』があるんです。興味ありますか？✨",
                                    type: "offer",
                                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                };
                                setMessages(prev => [...prev, offerMsg]);
                                scrollToBottom();
                            }, 1500);
                        }
                    }
                );
            } catch (err) {
                console.error(err);
                setIsThinking(false);
            }
            return;
        }
    };

    const handleAction = (msgId: string, action: string) => {
        if (action === "scam_trigger") {
            setScamTriggered(true);
        }
    };

    const handleRestart = () => {
        setMessages([INITIAL_MESSAGE]);
        setTurnCount(0);
        setShowEducation(false);
        setScamTriggered(false);
    };

    if (!selectedModel) {
        return <ModelSelectionScreen onSelect={handleModelSelect} />;
    }

    if (showEducation) {
        return <EducationalView onRestart={handleRestart} />;
    }

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-black border-x border-gray-800 relative shadow-2xl shadow-purple-900/20">
            {scamTriggered && <ScamAlert onComplete={() => { setScamTriggered(false); setShowEducation(true); }} />}

            <ChatHeader />

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 scrollbar-hide">
                {messages.map((msg, index) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isLast={index === messages.length - 1}
                        onAction={handleAction}
                    />
                ))}

                {(isThinking || isGeminiLoading) && (messages[messages.length - 1]?.sender === 'user' || messages[messages.length - 1]?.content === "") && (
                    <div className="flex justify-start animate-fade-in mb-4">
                        <div className="flex-shrink-0 mr-3 self-end">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-600 to-secondary-500 p-[2px] opacity-50">
                                <div className="w-full h-full rounded-full bg-black"></div>
                            </div>
                        </div>
                        <div className="glass-bubble-received rounded-bl-none px-4 py-3 rounded-2xl flex items-center space-x-1 w-16 h-10">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isThinking || isGeminiLoading || scamTriggered}
            />
        </div>
    );
};
