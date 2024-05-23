"use client";

import React, {useEffect, useState} from "react";
import {
    getGroupChatsForCourierApi, getMessagesForGroupChatApi,
} from "../../../api/entities/ChatApi";
import {getUserAccountByEmail} from "../../../api/entities/UserAccount";
import {Box, Container, useMediaQuery} from "@mui/material";

import MainLayout from "@/components/templates/MainLayout";
import useTheme from "@/theme/themes";
import {useWebSocket} from "../../../contexts/WebSocketContext";
import ChatContainer from "@/components/organisms/chat/ChatContainer";
import UserAndGroupChats from "@/components/organisms/chat/UserAndGroupChats";

const ChatPage = () => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const [messages, setMessages] = useState<any[]>([]);

    const [courierId, setCourierId] = useState<number|null>(null);
    const [buyerId, setBuyerId] = useState<number|null>(null);
    const [sellerId, setSellerId] = useState<number|null>(null);
    const [orderId, setOrderId] = useState<number|null>(null);

    const [groupChats, setGroupChats] = useState<any>();

    const {connectToWebSocket} = useWebSocket();

    const onMessageReceived = (message: any) => {
        if (message.senderRole !== "COURIER") {
            setMessages(prevMessages => [...prevMessages, {...message, date: new Date().toISOString()}]);
        }
    };
    const getCourierByEmail = (username: string) => {
        getUserAccountByEmail(username)
            .then((res) => {
                setCourierId(res.data.id);
                connectToWebSocket(res.data.id, onMessageReceived);
            })
            .catch((err) => console.log(err))
    };

    const getAllGroupChats = (email: string) => {
        getGroupChatsForCourierApi(email)
            .then((res) => {
                setGroupChats(res.data);
            })
            .catch((err) => console.log(err))
    };

    const fetchChatHistory = async (buyerId: number, courierId: number, sellerId: number, orderId: number) => {
        setBuyerId(buyerId);
        setSellerId(sellerId);
        setOrderId(orderId);
        await getMessagesForGroupChatApi(buyerId, courierId, sellerId, orderId)
            .then((res) => {
                setMessages(res.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        let usernameFromStorage = sessionStorage.getItem("username");
        if (usernameFromStorage) {
            const newUsername = JSON.parse(usernameFromStorage);
            getCourierByEmail(newUsername);
            getAllGroupChats(newUsername);
        }
    }, []);

    useEffect(() => {
        if(courierId && sellerId && buyerId && orderId) {
            fetchChatHistory(buyerId, courierId, sellerId, orderId);
        }
    }, [buyerId, courierId, sellerId, orderId]);

    return (
        (courierId) && (
            <MainLayout>
                <Container>
                    <Box sx={{
                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                        // boxShadow: '-5px 5px 15px rgba(255,255,255, 0.5)',
                        borderRadius: '14px', overflow: 'hidden'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: isSm ? 'column' : 'row',
                            height: '75vh',
                        }}>

                            <UserAndGroupChats
                                setBuyerId={setBuyerId}
                                setCourierId={setCourierId}
                                setSellerId={setSellerId}
                                setOrderId={setOrderId}
                                setMessages={setMessages}
                                groupChats={groupChats}
                            />
                            <ChatContainer
                                orderId={orderId}
                                messages={messages}
                                setMessages={setMessages}
                                buyerId={buyerId}
                                courierId={courierId}
                                sellerId={sellerId} />
                        </Box>
                    </Box>
                </Container>
            </MainLayout>
        )
    );
};

export default ChatPage;