import React, { useEffect, useMemo, useRef, useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import type { SocketConnectionStatus } from "../types/socket.d";
import ButtonComponent from "./ButtonComponent";

const statusMeta: Record<
    SocketConnectionStatus,
    { label: string; dot: string; bar: string }
> = {
    connecting: {
        label: "Connecting",
        dot: "bg-amber-400",
        bar: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    },
    open: {
        label: "Connected",
        dot: "bg-emerald-400",
        bar: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    },
    closed: {
        label: "Disconnected",
        dot: "bg-slate-400",
        bar: "border-slate-400/30 bg-slate-400/10 text-slate-200",
    },
    error: {
        label: "Connection error",
        dot: "bg-rose-400",
        bar: "border-rose-400/30 bg-rose-400/10 text-rose-200",
    },
};

export default function WebSocketMessageComponent() {
    const [messageInput, setMessageInput] = useState<string>("");
    const serverUrl = import.meta.env.VITE_SERVER_URL ?? "ws://localhost:5000";
    const { messages, sendMessageToSocketServer, status } = useWebSocket(`${serverUrl}/chat`)
    const messageListRef = useRef<HTMLDivElement | null>(null);

    const handleSend = () => {
        const trimmed = messageInput.trim();
        if (!trimmed) return;
        sendMessageToSocketServer(trimmed);
        setMessageInput("");
        
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            handleSend();
    };

    useEffect(() => {
        messageListRef.current?.scrollTo({
            top: messageListRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    const statusInfo = useMemo(() => statusMeta[status], [status]);

    return (
        <section className="mt-4 flex min-h-95 flex-col rounded-2xl border border-white/10 bg-[#0a1222] shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
            
            <div
                ref={messageListRef}
                className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
                {messages.length === 0 ? (
                    <div className="flex h-full min-h-40 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/5 px-6 text-center">
                        <p className="text-sm text-slate-400">
                            No messages yet. Send one to start the conversation.
                        </p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className="flex justify-start">
                            <div className="max-w-[90%] rounded-xl rounded-bl-md border border-white/10 bg-[#111a31] px-2 py-2 text-xs leading-4 text-slate-100 shadow-sm">
                                {msg}
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="border-t border-white/10 px-4 py-4">
                <div className="flex items-end gap-3">
                    <label className="flex-1">
                        <span className="sr-only">Message</span>
                        <input
                            className="w-full border border-white/10 bg-[#111a31] px-2 py-1 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/30"
                            placeholder="Type a message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </label>

                    <ButtonComponent
                        onClick={handleSend}
                        //disabled={!messageInput.trim() || status !== "open"}
                        color=""                    >
                        Send
                    </ButtonComponent>
                </div>

                <div
                    className={`mt-2 flex items-center justify-between gap-3 
                        rounded-xl border px-4 py-3 text-xs font-medium ${statusInfo.bar}`}
                >
                    <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${statusInfo.dot}`} />
                        <span>{statusInfo.label}</span>
                    </div>
                    <span className="text-slate-400">
                        {status === "open" ? "Ready to send" : "Messages pause until connected"}
                    </span>
                </div>
            </div>
        </section>
    );
}
