export type MessageType = "text" | "image" | "system" | "chart" | "button_group" | "offer";

export interface Message {
    id: string;
    sender: "user" | "bot";
    content: string;
    type: MessageType;
    timestamp: string;
    meta?: any; // For charts, images, choices, etc.
}

export interface ChatState {
    currentScenario: "initial" | "interest" | "doubt" | "trust_building" | "investment_push" | "scam_revealed" | "educational";
    trustLevel: number; // 0-100
    isTyping: boolean;
}
