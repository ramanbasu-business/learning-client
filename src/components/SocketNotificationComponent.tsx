import React, { useEffect, useRef } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import type { SocketConnectionStatus } from "@/types/socket.d";


export default function SocketNotificationComponent() {
    const { messages, sendMessageToSocketServer, status } = useWebSocket("ws://localhost:5000/notifications");

    useEffect(() => {
        sendMessageToSocketServer("notify");
    }, []);

    return (messages === null || messages.length == 0 &&
        (
        <div className="mt-1 flex items-center justify-between gap-2  px-2 py-2 text-xs">
        <ul><li className="mt-1 flex items-center justify-between gap-2 
                px-2 py-2 text-slate-400">No notifications</li>
        </ul ></div>)
    )

    return (
        <>
            <div className="mt-1 flex items-center justify-between gap-2  px-2 py-2 text-xs">
            <ul>
                {messages.map((notice) => (
                    <li className="mt-1 flex items-center justify-between 
                    gap-2  px-2 py-2 text-slate-900">{notice}</li>
                ))
                }
            </ul></div>
        </>);
}

