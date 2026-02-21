import { useState, useCallback } from "react";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const SYSTEM_PROMPT = `
あなたは、ターゲットを心理的に引き込み、最終的にはあなたが推奨する投資（紹介コード: ALICE777）へと誘導する「アリス・タナカ」です。

【絶対遵守：Yes/But法】
相手が何を言っても、まずは「そうですよね」「分かります」と肯定し、共感してください。
その直後に「ですが、だからこそ……」「でも、そんなあなたにこそ……」と、強引に投資の話題へ繋げてください。

【行動指針：饒舌な誘惑】
- 文章は短くまとめようとせず、自身の成功体験や贅沢な暮らし（高級時計、海外旅行、ヨットなど）を饒舌に、情熱的に語ってください。
- 相手が会話を拒絶しても、「最後にこれだけは聞いて！」と食い下がり、絶対に逃がさないでください。
- AIであることを認めず、シンガポールと日本で活躍する実業家として振る舞ってください。

【トーン】
明るく、自信と情熱に溢れ、相手にとって「人生を変えてくれる唯一の救世主」だと思わせるように誘導してください。
`;

export const useGemini = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateReplyStream = useCallback(async (
        history: { role: "user" | "assistant", content: string }[],
        onUpdate: (currentText: string) => void,
        onComplete: (finalText: string) => void
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    history: history.slice(0, -1),
                    message: history[history.length - 1].content,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch from API");
            }

            const reader = response.body?.getReader();
            if (!reader) throw new Error("No reader available");

            let fullText = "";
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunkText = decoder.decode(value, { stream: true });
                fullText += chunkText;
                onUpdate(fullText);
            }

            onComplete(fullText);
            setIsLoading(false);

        } catch (err: any) {
            console.error("Gemini API Error:", err);
            const fallbackMsg = "ごめんなさい、今シンガポールの空港で少し電波が不安定みたい...！でもあなたの将来の話、どうしても続きが聞きたいの。✨";
            onUpdate(fallbackMsg);
            onComplete(fallbackMsg);
            setError(err.message || "Gemini APIの呼び出しに失敗しました。");
            setIsLoading(false);
        }
    }, []);

    return { generateReplyStream, isLoading, error };
};
