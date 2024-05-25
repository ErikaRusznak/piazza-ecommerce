"use client";

import {createContext, useContext} from "react";
import SockJS from "sockjs-client";
import {baseURL} from "components";
import * as Stomp from "stompjs";

interface WebSocketContextType {
    sendMessage: (message: string, id: number, recipientId: number) => any;
    sendMessageToGroupChat: (
        message: string,
        buyerId: number,
        courierId: number,
        sellerId: number,
        orderId: number
    ) => any;
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
        stompClient.connect({}, () => onConnected(userId, onMessageReceived), onError);
    };

    const onConnected = (userId: number, onMessageReceived: Function) => {
        stompClient?.subscribe(
            `/user/${userId}/queue/messages`,
            (payload) => {
                const message = JSON.parse(payload.body);
                onMessageReceived(message);
            }
        );
        stompClient?.subscribe(
            `/user/${userId}/queue/group-messages`,
            (payload) => {
                const message = JSON.parse(payload.body);
                onMessageReceived(message);
            }
        )
    };

    const onError = (error: any) => {
        console.log(error);
    }

    const sendMessage = (message: string, id: number, recipientId: number) => {

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

    const sendMessageToGroupChat = (message: string, buyerId: number, courierId: number, sellerId: number, orderId: number) => {
        if(message && stompClient) {
            const chatMessage = {
                buyerId: buyerId,
                courierId: courierId,
                sellerId: sellerId,
                orderId: orderId,
                content: message,
                date: new Date().toISOString(),
                senderRole: "SELLER",
            };
            stompClient.send("/app/group-chat", {}, JSON.stringify(chatMessage));
            return chatMessage;
        }
    }

    return (
        <WebSocketContext.Provider value={{ sendMessage, sendMessageToGroupChat, connectToWebSocket}} >
            {children}
        </WebSocketContext.Provider>
    )
};

export default WebSocketProvider;