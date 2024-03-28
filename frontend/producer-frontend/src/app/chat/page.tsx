"use client";

import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {baseURL} from "../../../api/ApiClient";
import { getMessagesForSenderAndReceiverApi} from "../../../api/entities/ChatApi";
import {useAuth} from "../../../api/auth/AuthContext";

const ChatPage = () => {

    const [messages, setMessages] = useState<any>([]);
    // State to store the current message
    const [currentMessage, setCurrentMessage] = useState('');
    const [socket, setSocket] = useState<any>();
    useEffect(() => {
        // Create a socket connection
        const token = sessionStorage.getItem('token');
        if(token) {
            const socket = io(baseURL ?? "", {     extraHeaders: { Authorization: token },});
            setSocket(socket);
            // Listen for incoming messages
            socket.on('message', (message) => {
                setMessages((prevMessages: any) => [...prevMessages, message]);
            });

            // Clean up the socket connection on unmount
            return () => {
                socket.disconnect();
            };
        }

    }, []);

    const sendMessage = () => {
        // Send the message to the server
        socket.emit('message', { content: currentMessage, recipientId: 1 });
        // Clear the currentMessage state
        setCurrentMessage('');
    };

    const fetchChatHistory = async () => {
        await getMessagesForSenderAndReceiverApi(1, 4)
            .then((res) => {
                setMessages(res.data);
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            {/* Display the messages */}
            {messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}

            {/* Input field for sending new messages */}
            <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
            />

            {/* Button to submit the new message */}
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatPage;