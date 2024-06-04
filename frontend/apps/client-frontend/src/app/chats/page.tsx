"use client";

import React, {useEffect, useState} from "react";
import { getGroupChatsForBuyerApi } from "../../../api/entities/ChatApi";
import {getUserAccountByEmail} from "components";
import {Box, Container, useMediaQuery} from "@mui/material";

import MainLayout from "@/components/templates/MainLayout";
import {useTheme} from "@mui/material/styles";
import {useWebSocket} from "components";
import {useSearchParams} from "next/navigation";
import {UserAndGroupChats} from "ui";
import {ChatContainer} from "ui";
import {getAllUserSellersApi} from "../../../api/entities/UserAccount";
import {useThemeToggle} from "ui";

const ChatPage = () => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const {connectToWebSocket} = useWebSocket();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const searchParams = useSearchParams();
    const [messages, setMessages] = useState<any[]>([]);

    const [id, setId] = useState<number>(0);
    const [recipientId, setRecipientId] = useState<number | null>(Number(searchParams.get("recipientId")) ?? null);

    const [connectedUsers, setConnectedUsers] = useState<any>();
    const [groupChats, setGroupChats] = useState<any>();

    const [courierId, setCourierId] = useState<number | null>(null);
    const [buyerId, setBuyerId] = useState<number | null>(null);
    const [sellerId, setSellerId] = useState<number | null>(null);
    const [orderId, setOrderId] = useState<number | null>(null);

    const onMessageReceived = (message: any) => {
        if (!!recipientId && recipientId === message.senderId) {
            setMessages(prevMessages => [...prevMessages, {...message, date: new Date().toISOString()}]);
            return;
        }
        if (message.senderRole !== "CLIENT") {
            setMessages(prevMessages => [...prevMessages, {...message, date: new Date().toISOString()}]);
            return;
        }
    };

    const getBuyerByEmail = (username: string) => {
        getUserAccountByEmail(username)
            .then((res) => {
                setId(res.data.id);
                setBuyerId(res.data.id);
                connectToWebSocket(res.data.id, onMessageReceived);
            })
            .catch((err) => console.log(err))
    };

    const getAllSellers = () => {
        getAllUserSellersApi()
            .then((res) => {
                setConnectedUsers(res.data);
            })
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        getAllSellers();
        let usernameFromStorage = sessionStorage.getItem("username");
        if (usernameFromStorage) {
            const newUsername = JSON.parse(usernameFromStorage)
            getBuyerByEmail(newUsername);
            getAllGroupChats(newUsername);
        }

    }, []);

    const getAllGroupChats = (email: string) => {
        getGroupChatsForBuyerApi(email)
            .then((res) => {
                setGroupChats(res.data);
            })
            .catch((err) => console.log(err))
    };

    return (
        (connectedUsers && id) && (
            <MainLayout>
                <Container>
                    <Box sx={{
                        boxShadow: isDark ? '-5px 5px 15px rgba(255,255,255, 0.5)' : '0px 5px 15px rgba(0, 0, 0, 0.1)',
                        borderRadius: '14px', overflow: 'hidden'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: isSm ? 'column' : 'row',
                            height: '75vh',
                        }}>
                            <UserAndGroupChats
                                id={id}
                                setBuyerId={setBuyerId}
                                setCourierId={setCourierId}
                                setSellerId={setSellerId}
                                setOrderId={setOrderId}
                                recipientId={recipientId}
                                setRecipientId={setRecipientId}
                                messages={messages}
                                setMessages={setMessages}
                                connectedUsers={connectedUsers}
                                groupChats={groupChats}
                            />
                            <ChatContainer
                                recipientId={recipientId}
                                orderId={orderId}
                                messages={messages}
                                setMessages={setMessages}
                                id={id}
                                buyerId={buyerId}
                                courierId={courierId}
                                sellerId={sellerId}
                                userRole={"CLIENT"}
                            />
                        </Box>
                    </Box>
                </Container>
            </MainLayout>
        )
    );
};

export default ChatPage;