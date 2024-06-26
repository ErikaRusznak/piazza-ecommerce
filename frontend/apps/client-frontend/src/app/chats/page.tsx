"use client";

import React, {useEffect, useState} from "react";
import { getGroupChatsForBuyerApi } from "../../../api/entities/ChatApi";
import {getUserAccountByEmail, useAuth} from "components";
import {Box, Container, useMediaQuery} from "@mui/material";
import MainLayout from "@/components/templates/MainLayout";
import {useTheme} from "@mui/material/styles";
import {useWebSocket} from "components";
import {useSearchParams} from "next/navigation";
import {UnauthenticatedMessage, UserAndGroupChats} from "ui";
import {ChatContainer} from "ui";
import {getAllUserSellersApi} from "../../../api/entities/UserAccount";
import {useThemeToggle} from "ui";

type PrivateMessageType = {
    senderId: number;
    recipientId: number;
    date: string;
    content: string;
};

type GroupMessageType = {
    buyerId: number;
    clientId: number;
    courierId: number;
    sellerId: number;
    content: string;
    date: string;
    senderRole: string;
};

type AccountType = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    imageName: string | null;
    password: string;
    telephone: string;
    userRole: string;
};

type GroupChatType = {
    buyerEmail: string;
    buyerFirstName: string;
    buyerId: number;
    buyerLastName: string;
    courierEmail: string;
    courierFirstName: string;
    courierId: number;
    courierLastName: string;
    groupRoomCode: string;
    id: number;
    orderId: number;
    orderNumber: string;
    sellerEmail: string;
    sellerFirstName: string;
    sellerId: number;
    sellerLastName: string;
}

const ChatPage = () => {

    const theme = useTheme();
    const {isAuthenticated} = useAuth();
    const {isDark} = useThemeToggle();
    const {connectToWebSocket} = useWebSocket();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const [unreadGroupMessages, setUnreadGroupMessages] = useState<{ [key: number]: boolean }>({});

    const searchParams = useSearchParams();
    const [messages, setMessages] = useState<PrivateMessageType[] | GroupMessageType[]>([]);

    const [id, setId] = useState<number>(0);
    const [recipientId, setRecipientId] = useState<number | null>(Number(searchParams.get("recipientId")) ?? null);

    const [connectedUsers, setConnectedUsers] = useState<AccountType[]>();
    const [groupChats, setGroupChats] = useState<GroupChatType[]>();

    const [courierId, setCourierId] = useState<number | null>(null);
    const [buyerId, setBuyerId] = useState<number | null>(null);
    const [sellerId, setSellerId] = useState<number | null>(null);
    const [orderId, setOrderId] = useState<number | null>(null);

    const onMessageReceived = (message: any) => {
        const updateMessages = () => {
            setMessages(prevMessages => [...prevMessages, { ...message, date: new Date().toISOString() }]);
        };
        if (!!recipientId && recipientId === message.senderId) {
            updateMessages();
            return;
        }
        if (!!message.senderRole && message.senderRole !== "CLIENT") {
            updateMessages();
            setUnreadGroupMessages(prevState => ({
                ...prevState,
                [message.orderId]: true
            }));
            return;
        }
        updateMessages();
    };


    const getBuyerByEmail = (username: string) => {
        getUserAccountByEmail(username)
            .then((res) => {
                setId(res.data.id);
                setBuyerId(res.data.id);
                connectToWebSocket(res.data.id, onMessageReceived);
            })
            .catch((err) => console.error(err))
    };

    const getAllSellers = () => {
        getAllUserSellersApi()
            .then((res) => {
                setConnectedUsers(res.data);
            })
            .catch((err) => console.error(err))
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
            .catch((err) => console.error(err))
    };

    return isAuthenticated ? (
        (connectedUsers && id) && (
            <MainLayout>
                <Container>
                    <Box sx={{
                        boxShadow: isDark ? '-5px 5px 15px rgba(255,255,255, 0.5)' : '0px 5px 15px rgba(0, 0, 0, 0.1)',
                        borderRadius: '14px', overflow: 'hidden',
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: isSm ? 'column' : 'row',
                            height: '80vh',
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
                                unreadGroupMessages={unreadGroupMessages}
                                setUnreadGroupMessages={setUnreadGroupMessages}
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
    ) : (
        <MainLayout>
            <UnauthenticatedMessage />
        </MainLayout>
    );
};

export default ChatPage;