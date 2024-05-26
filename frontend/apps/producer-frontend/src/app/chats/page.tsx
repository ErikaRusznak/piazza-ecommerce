"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import {useTheme} from "@mui/material/styles";
import {getUserAccountByEmail} from "components";
import {
    getGroupChatsForSellerApi,
} from "../../../api/entities/ChatApi";
import {Box, Container, useMediaQuery} from "@mui/material";
import {useWebSocket} from "components";
import {useSearchParams} from "next/navigation";
import {useAuth} from "../../../api/auth/AuthContext";
import UnauthenticatedMessage from "@/components/atoms/UnauthenticatedMessage";
import UserAndGroupChats from "@/components/organisms/chat/UserAndGroupChats";
import ChatContainer from "@/components/organisms/chat/ChatContainer";
import {getAllUsersApi} from "../../../api/entities/UserAccount";
import {useThemeToggle} from "../../../contexts/ThemeContext";

const ChatPage = () => {

    const {isAuthenticated} = useAuth();

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const {connectToWebSocket} = useWebSocket();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

    const searchParams = useSearchParams();
    const [messages, setMessages] = useState<any[]>([]);

    const [id, setId] = useState<number>(0);
    const [recipientId, setRecipientId] = useState<number |null>(Number(searchParams.get("recipientId")) ?? null);

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
        if (message.senderRole !== "SELLER") {
            setMessages(prevMessages => [...prevMessages, {...message, date: new Date().toISOString()}]);
        }
    };

    const getSellerByEmail = (username: string) => {
        getUserAccountByEmail(username)
            .then((res) => {
                setId(res.data.id);
                setSellerId(res.data.id);
                connectToWebSocket(res.data.id, onMessageReceived);
            })
            .catch((err) => console.log(err))
    };


    const getAllBuyers = () => {
        getAllUsersApi()
            .then((res) => {
                let connectedUsers = res.data;
                connectedUsers = connectedUsers.filter((user: any) => user.userRole !== "SELLER" && user.userRole !== "COURIER");
                setConnectedUsers(connectedUsers);
            })
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        getAllBuyers();
        let usernameFromStorage = sessionStorage.getItem("username");
        if (usernameFromStorage) {
            const newUsername = JSON.parse(usernameFromStorage)
            getSellerByEmail(newUsername);
            getAllGroupChats(newUsername);
        }
    }, []);


    const getAllGroupChats = (email: string) => {
        getGroupChatsForSellerApi(email)
            .then((res) => {
                setGroupChats(res.data);
            })
            .catch((err) => console.log(err))
    };

    return (
        <MainLayout>
            {isAuthenticated ? (
                (connectedUsers && id) && (
                    <Container>
                    <Box sx={{
                        boxShadow: isDark ? '-5px 5px 15px rgba(255,255,255, 0.5)' : '0px 5px 15px rgba(0, 0, 0, 0.1)',
                        borderRadius: '14px', overflow: 'hidden' }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: isXs ? 'column' : 'row',
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
                                sellerId={sellerId} />
                        </Box>
                    </Box>
                    </Container>
                )
            ) : (
                <UnauthenticatedMessage />
            )}
        </MainLayout>
    );
};

export default ChatPage;