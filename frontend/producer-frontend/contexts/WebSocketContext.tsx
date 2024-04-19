"use client";

import {createContext, useContext, } from "react";
import SockJS from "sockjs-client";
import {baseURL} from "../api/ApiClient";
import * as Stomp from "stompjs";

interface WebSocketContextType {
    sendMessage: (message: string, id: number, recipientId: number) => any;
    connectToWebSocket: (userId: number, onMessageReceived: Function) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const useWebSocket = (): WebSocketContextType => {

    const context = useContext(WebSocketContext);
    if(!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
}

let stompClient: Stomp.Client | null = null;

const WebSocketProvider = ({ children}: any) => {



    const connectToWebSocket = (userId: number, onMessageReceived: Function) => {
        const socket = new SockJS(`${baseURL}/ws`);
        stompClient = Stomp.over(socket);
        stompClient.connect({}, () => onConnected(onMessageReceived, userId), onError);
    };

    const onConnected = (onMessageReceived: Function, userId: number) => {
        stompClient?.subscribe(
            `/user/${userId}/queue/messages`,
            (payload) => {
                const message = JSON.parse(payload.body);
                onMessageReceived(message);
            }
        );
    };

    const onError = (error: any) => {
        console.log(error);
    }


    const sendMessage = (message: string, id: number, recipientId: number, ) => {

        if (message && stompClient) {
            const chatMessage = {
                senderId: id,
                recipientId: recipientId,
                content: message,
                date: new Date().toISOString()
            };
            stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
            return chatMessage;
        }

    };

    return (
        <WebSocketContext.Provider value={{ sendMessage, connectToWebSocket}} >
            {children}
        </WebSocketContext.Provider>
    )
};

export default WebSocketProvider;