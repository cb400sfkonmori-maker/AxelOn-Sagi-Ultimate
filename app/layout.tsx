import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "SNS詐欺疑似体験シミュレーター by AxelOn Inc.",
    description: "AIの進化による詐欺の高度化を体験し、防犯意識を高める教育ツール。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body className={`${inter.variable} antialiased bg-[#0a0a0f] text-white min-h-screen flex items-center justify-center font-sans overflow-hidden relative`}>
                {children}
                <footer className="absolute bottom-4 w-full text-center text-gray-500 text-[10px] pointer-events-none tracking-widest uppercase">
                    © 2026 AxelOn Inc. | Coming soon
                </footer>
            </body>
        </html>
    );
}
