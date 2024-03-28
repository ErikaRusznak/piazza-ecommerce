"use client";

import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import {baseURL} from "../../../api/ApiClient";
import { getMessagesForSenderAndReceiverApi} from "../../../api/entities/ChatApi";
import {useAuth} from "../../../api/auth/AuthContext";
import MainLayout from "@/components/templates/MainLayout";

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
        <MainLayout>
            <h2>
                One to one chat
            </h2>
            <div>
                <h4>Enter chatroom</h4>
                <form>
                    <label htmlFor="nickname">Nick:</label>
                    <input type="text" id="nickname" name="nickname" required/>

                    <label htmlFor="fullname">Real name:</label>
                    <input type="text" id="fullname" name="realname" required/>

                    <button type={"submit"}>enter chatroom</button>
                </form>
            </div>
            <div>
                <div>
                    <div>
                        <h3>online users</h3>
                        <ul>
                            <li>user 1</li>
                        </ul>
                    </div>
                    <div>
                        <p>conn user</p>
                        <a href={()=>logout()}>Logout</a>
                    </div>
                </div>


            </div>
        </MainLayout>
    );
};

export default ChatPage;