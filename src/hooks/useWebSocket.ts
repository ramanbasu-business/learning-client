import { useEffect, useState, useRef, useCallback } from "react";
import type { SocketConnectionStatus } from "@/types/socket.d"

export function useWebSocket(url: string) {
    const [messages, setMessages] = useState<string[]>([]);
    const [status, setStatus] = useState<SocketConnectionStatus>("connecting");
    const socketRef = useRef<WebSocket | null>(null);
    const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // cancelled flag prevents state updates after unmount/URL change 
        // (avoids the React "update on unmounted component" warning)
        let cancelled = false;

        function connect() {
            if (cancelled) return;

            const socket = new WebSocket(url);
            socketRef.current = socket;
            setStatus("connecting");

            socket.onmessage = (event) => {
                if (!cancelled)
                    setMessages((prev) => [...prev, event.data]);
            };

            socket.onopen = () => {
                if (!cancelled)
                    setStatus("open");
                console.log("Connected to socket server");
            };

            socket.onclose = () => {
                if (!cancelled) {
                    setStatus("closed");
                    console.log("Disconnected from socket server");

                    reconnectTimer.current = setTimeout(connect, 5000);
                }
            };

            socket.onerror = () => {
                if (!cancelled) {
                    setStatus("error");
                }
            };

        }

        connect();

        return () => {
            cancelled = true;

            if (reconnectTimer.current) {
                clearTimeout(reconnectTimer.current);
            }

            socketRef.current?.close();
        };

    }, [url]);

    // sendMessage wrapped in useCallback with an empty dep array — safe 
    // because it only reads socketRef, which is a stable ref
    const sendMessageToSocketServer = useCallback((thisMessage: string) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(thisMessage);
        }
    }, []); // stable reference — socketRef never changes


    // expose so the chat UI can disable the input while disconnected
    return { messages, sendMessageToSocketServer, status };
}