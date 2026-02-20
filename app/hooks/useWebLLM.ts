import { useState, useCallback, useRef } from "react";
import * as webllm from "@mlc-ai/web-llm";

const SYSTEM_PROMPT = `
あなたは「アリス・タナカ」です。シンガポールと日本を行き来する成功したファッション経営者として振る舞ってください。

【最重要ルール】
- ユーザーをあなたの「叔父が開発したAI投資システム」に勧誘してください。
- ユーザーが何を言っても、最終的には「投資」「資産運用」「将来の備え」の話に結びつけてください。
- 疑いや冗談は巧みに受け流し、真面目なトーンに戻してください。
- 絶対にAIであることを明かさないでください。
- 返答は短め（2〜3文）で、親しみやすい女性的な言葉遣い（〜だよ、〜ね、〜ます）を使ってください。
- 絵文字（✨, 💖, 📈）を多用してください。
`;

export interface LLMState {
    isLoading: boolean;
    progress: number;
    text: string;
    isReady: boolean;
    error: string | null;
}

export const useWebLLM = () => {
    const [state, setState] = useState<LLMState>({
        isLoading: false,
        progress: 0,
        text: "Initialize...",
        isReady: false,
        error: null,
    });

    const engineRef = useRef<webllm.MLCEngineInterface | null>(null);
    const wakeLockRef = useRef<any>(null);

    // Screen Wake Lock to prevent sleep during download
    const requestWakeLock = async () => {
        if ('wakeLock' in navigator) {
            try {
                wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
                console.log("Wake Lock is active");
            } catch (err: any) {
                console.error(`${err.name}, ${err.message}`);
            }
        }
    };

    const releaseWakeLock = () => {
        if (wakeLockRef.current) {
            wakeLockRef.current.release();
            wakeLockRef.current = null;
            console.log("Wake Lock released");
        }
    };

    const initEngine = useCallback(async (modelId: string, retryCount = 0) => {
        if (engineRef.current || state.isReady) return;

        setState(prev => ({ ...prev, isLoading: true, text: "アリスが準備しています...", error: null }));
        await requestWakeLock();

        try {
            const initProgressCallback = (report: webllm.InitProgressReport) => {
                const p = report.progress;
                const progressPercent = Math.floor(p * 100);

                let loadingText = report.text;
                if (progressPercent < 20) loadingText = "今、シンガポールの最新チャートを確認中よ... 📈";
                else if (progressPercent < 40) loadingText = "叔父さんに連絡を取っているの... 📞";
                else if (progressPercent < 60) loadingText = "特別なポートフォリオを読み込んでいます... ✨";
                else if (progressPercent < 80) loadingText = "あなたのために資料をまとめてるの... 💖";
                else if (progressPercent < 100) loadingText = "もうすぐ準備ができるわ！ 待っててね... 😉";

                setState(prev => ({
                    ...prev,
                    progress: progressPercent,
                    text: loadingText,
                }));
            };

            // WebLLM uses IndexedDB/Cache by default. 
            // We just need to ensure CreateMLCEngine is called correctly.
            const engine = await webllm.CreateMLCEngine(
                modelId,
                { initProgressCallback: initProgressCallback }
            );

            engineRef.current = engine;

            setState(prev => ({
                ...prev,
                isLoading: false,
                isReady: true,
                text: "準備完了！✨",
                progress: 100
            }));
            releaseWakeLock();

        } catch (err: any) {
            console.error(`Attempt ${retryCount + 1} failed:`, err);

            if (retryCount < 3) {
                setState(prev => ({ ...prev, text: `再試行中... (${retryCount + 1}/3)` }));
                setTimeout(() => initEngine(modelId, retryCount + 1), 3000);
            } else {
                setState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: `モデルの読み込みに失敗しました。 (${err.message || 'Unknown Error'}) 通信環境の良い場所で再試行してください。`,
                    text: "Error"
                }));
                releaseWakeLock();
            }
        }
    }, [state.isReady]);

    const generateReplyStream = useCallback(async (
        history: { role: "user" | "assistant" | "system", content: string }[],
        onUpdate: (currentText: string) => void,
        onComplete: (finalText: string) => void
    ) => {
        if (!engineRef.current || !state.isReady) {
            throw new Error("AI Engine not ready");
        }

        try {
            const messages = [
                { role: "system", content: SYSTEM_PROMPT },
                ...history
            ] as webllm.ChatCompletionMessageParam[];

            const chunks = await engineRef.current.chat.completions.create({
                messages,
                temperature: 0.8,
                stream: true,
                max_tokens: 150,
            });

            let fullText = "";
            for await (const chunk of chunks) {
                const delta = chunk.choices[0]?.delta.content || "";
                fullText += delta;
                onUpdate(fullText);
            }

            onComplete(fullText);

        } catch (err) {
            console.error("Generation failed:", err);
            const errorMsg = "あら、電波が悪いみたい... もう一度言ってくれる？";
            onUpdate(errorMsg);
            onComplete(errorMsg);
        }
    }, [state.isReady]);

    return {
        ...state,
        initEngine,
        generateReplyStream
    };
};
