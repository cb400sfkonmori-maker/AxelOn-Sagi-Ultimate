import { useState, useCallback } from "react";

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
            // Vercel環境で確実にバックエンドを叩くため、絶対パスを使用
            const apiPath = "/api/chat";

            const response = await fetch(apiPath, {
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
                const errorText = await response.text();
                console.error(`API Error (${response.status}):`, errorText);
                let errorMessage = "API connection failed";
                try {
                    const errorData = JSON.parse(errorText);
                    errorMessage = errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = errorText || errorMessage;
                }
                throw new Error(errorMessage);
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
            console.error("Critical Connection Error:", err);
            const fallbackMsg = "ごめんなさい、今シンガポールの空港で少し電波が不安定みたい...！でもあなたの将来の話、どうしても続きが聞きたいの。✨";
            onUpdate(fallbackMsg);
            onComplete(fallbackMsg);
            setError(err.message || "Gemini APIの呼び出しに失敗しました。");
            setIsLoading(false);
        }
    }, []);

    return { generateReplyStream, isLoading, error };
};
