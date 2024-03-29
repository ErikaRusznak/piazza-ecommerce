"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import useTheme from "@/theme/themes";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import {getAllUsersApi, getUserAccountByEmail} from "../../../api/entities/UserAccount";
import {baseURL} from "../../../api/ApiClient";
import {getMessagesForSenderAndReceiverApi} from "../../../api/entities/ChatApi";
import {Box} from "@mui/material";

const ChatPage = () => {

    const theme = useTheme();
    const [id, setId] = useState<number>();
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState<any>("");
    const [receiverId, setReceiverId] = useState<number>();

    const [connectedUsers, setConnectedUsers] = useState<any>();

    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

    const getSellerByEmail = (username: string) => {
        console.log("email", username)
        getUserAccountByEmail(username)
            .then((res) => {
                console.log(res.data);
                setId(res.data.id);
            })
            .catch((err) => console.log(err))
    };

    const getAllBuyers = () => {
        getAllUsersApi()
            .then((res) => {
                let connectedUsers = res.data;
                connectedUsers = connectedUsers.filter((user: any) => user.userRole !== "ADMIN");
                setConnectedUsers(connectedUsers);
            })
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        getAllBuyers();
        let usernameFromStorage = sessionStorage.getItem("username");
        const usernameWithoutQuotes = usernameFromStorage?.replace(/^"(.*)"$/, '$1');
        if (usernameWithoutQuotes) {
            getSellerByEmail(usernameWithoutQuotes);
        }
    }, []);

    useEffect(() => {
        let usernameFromStorage = sessionStorage.getItem("username");
        const usernameWithoutQuotes = usernameFromStorage?.replace(/^"(.*)"$/, '$1');
        if (usernameWithoutQuotes) {
            const socket = new SockJS(`${baseURL}/ws`);
            const stompClientUsedHere = Stomp.over(socket);
            stompClientUsedHere.connect({}, () => onConnected(usernameWithoutQuotes, stompClientUsedHere), onError);
            setStompClient(stompClientUsedHere);
        }
    }, []);

    const onConnected = (username: string, stompedClientUsed: Stomp.Client) => {
        getUserAccountByEmail(username)
            .then((res) => {
                console.log("user by email", res.data);
                console.log("stompedClientUsed", stompedClientUsed)
                stompedClientUsed?.subscribe(`/user/${res.data.id}/queue/messages`, onMessageReceived);
            })
            .catch((err) => {
                console.log("here is the error")
                console.log(err)
            })
    }
    const onError = () => {
        console.log("WebSocket error:");
    }

    const onMessageReceived = (payload: any) => {
        const message = JSON.parse(payload.body);
        if (receiverId && receiverId === message.senderId) {
            setMessages(prevMessages => [...prevMessages, message]);
        }
    }
    const fetchChatHistory = async (receiverId: number) => {
        setReceiverId(receiverId);
        await getMessagesForSenderAndReceiverApi(receiverId, id)
            .then((res) => {
                setMessages(res.data);
            })
            .catch((err) => console.error(err));
    };
    const sendMessage = () => {
        if (message && stompClient) {
            const chatMessage = {
                senderId: id,
                receiverId: receiverId,
                content: message,
            };
            stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
            setMessages(prevMessages => [...prevMessages, chatMessage]);
            setMessage("")
        }
    }

    console.log("id", id)
    console.log("rec", receiverId)

    return (
        (connectedUsers && id) && (
            // <MainLayout>
            <div>

                <div>
                    <h2>Connected users: </h2>
                    <Box sx={{display: "flex", gap: 3, cursor: "pointer"}}>
                        {connectedUsers?.map((user: any) => (

                            <Box sx={{border: "1px solid black"}} key={user.id} onClick={() => fetchChatHistory(user.id)}>
                                <p>{user.id}</p>
                                <p>{user.email}</p>
                            </Box>


                        ))}
                    </Box>
                </div>
                {receiverId && (
                    <Box>
                        <h2>User chat</h2>

                        {messages?.map((mess, index) => (
                            <Box sx={{border: "1px solid blue"}} key={`${mess.senderId}-${mess.receiverId}-${index}`}>
                                <p>text sent by: {mess.senderId} to {mess.receiverId}</p>
                                <div> {mess.content}</div>
                            </Box>

                        ))}
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </Box>
                )}

            </div>)
            // </MainLayout>
        );
};

export default ChatPage;