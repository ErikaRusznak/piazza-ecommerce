"use client";

import React, {useEffect, useState} from "react";
import {
    getGroupChatsForCourierApi, getMessagesForGroupChatApi,
} from "../../../api/entities/ChatApi";
import {getUserAccountByEmail} from "../../../api/entities/UserAccount";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";

import MainLayout from "@/components/templates/MainLayout";
import useTheme from "@/theme/themes";
import { SendIcon } from "@/components/atoms/icons";
import {useWebSocket} from "../../../contexts/WebSocketContext";
import {useRouter} from "next/navigation";

const ChatPage = () => {
    const theme = useTheme();
    const router = useRouter();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState<string>("");

    const [courierId, setCourierId] = useState<number>(0);
    const [buyerId, setBuyerId] = useState<number>(0);
    const [sellerId, setSellerId] = useState<number>(0);
    const [orderId, setOrderId] = useState<number>(0);

    const [groupChats, setGroupChats] = useState<any>();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };

    const formatHour = (dateString: string) => {
        const date = new Date(dateString);
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${hour < 10 ? "0"+hour : hour}:${minute < 10 ? "0"+minute : minute}`
    };

    const {sendMessageToGroupChat, connectToWebSocket} = useWebSocket();

    const onMessageReceived = (message: string) => {
        console.log("in message received", message)
        // const message = JSON.parse(payload.body);
        // if (recipientId && recipientId === message.senderId) {
        //     setMessages(prevMessages => [...prevMessages, message]);
        // }
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

    useEffect(() => {
        let usernameFromStorage = sessionStorage.getItem("username");
        if (usernameFromStorage) {
            const newUsername = JSON.parse(usernameFromStorage);
            getCourierByEmail(newUsername);
            getAllGroupChats(newUsername);
        }

    }, []);

    console.log("group chats", groupChats)


    useEffect(() => {
        if(courierId && sellerId && buyerId && orderId) {
            fetchChatHistory(buyerId, courierId, sellerId, orderId);
        }
    }, [buyerId, courierId, sellerId, orderId]);


    const sendMessageInternal = () => {
        const chatMessage = sendMessageToGroupChat(message, buyerId, courierId, sellerId, orderId);
        setMessages(prevMessages => [...prevMessages, chatMessage]);
        setMessage("");
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
                            <Box
                                sx={{
                                    flex: isSm ? '1' : '1 1 25%',
                                    py: 2,
                                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
                                    // boxShadow: '-5px 5px 15px rgba(255,255,255, 0.1)',
                                    '& > *': {
                                        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                                        boxShadow: '-5px 5px 15px rgba(255,255,255, 0.1)',
                                        padding: '10px 0',
                                    },
                                }}>
                                <Typography color={theme.palette.info.main} sx={{ textTransform: 'uppercase', mb: 2, px: 2, boxShadow: '0px 5px  15px rgba(255,255,255, 0.1)', }}>
                                    Group chats
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", }}>
                                    {groupChats?.map((chat: any) => (
                                        <Box
                                            key={chat.id}
                                            sx={{
                                                color: "white", p: 1,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                },

                                            }}
                                            onClick={() => {
                                                fetchChatHistory(chat.buyerId, chat.courierId, chat.sellerId, chat.orderId);
                                            }}
                                        >
                                            <Box sx={{display: "flex", alignItems: "center", gap: 1,  width: "100%"}}>
                                                <Box sx={{
                                                    width: "2rem",
                                                    height: "2rem",
                                                    textAlign: "center",
                                                    alignContent: "center",
                                                    color: theme.palette.info.main,
                                                    borderRadius: "20px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center"
                                                }}>
                                                    <Typography variant="body2">
                                                        {/*{typeof chat.c === 'string' && user.sellerAlias.substring(0, Math.min(user.sellerAlias.length, 2))}*/}
                                                        {chat.id}
                                                    </Typography>

                                                </Box>
                                                <Box sx={{width: "100%"}}>
                                                    <Typography sx={{
                                                        color: theme.palette.info.main,
                                                    }}>{chat.buyerFirstName}, {chat.sellerFirstName}</Typography>
                                                    <Typography sx={{
                                                        fontSize: "13px",
                                                        maxWidth: "200px",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                        color: "lightgrey",
                                                    }}>
                                                        Last message...
                                                    </Typography>
                                                </Box>
                                            </Box>

                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{
                                flex: isSm ? '1' : '1 1 75%',
                                py: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                {buyerId && sellerId && orderId ? (
                                    <>
                                        <Typography color={theme.palette.info.main} sx={{ textTransform: 'uppercase', mb: 2, px: 2.3, py: "10px", boxShadow: '0px 5px 100px rgba(255,255,255, 0.15)' }}>
                                           Group chat
                                        </Typography>
                                        <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse', gap: 1 }}>
                                            {messages.slice(0).reverse().map((mess, index, array) => {
                                                const messageDate = formatDate(mess.date);
                                                let shouldDisplayDateHeader = false;
                                                if (index === array.length - 1) {
                                                    shouldDisplayDateHeader = true; // Always display date for last message
                                                } else {
                                                    const nextMessageDate = formatDate(array[index + 1].date);
                                                    shouldDisplayDateHeader = messageDate !== nextMessageDate;
                                                }
                                                return (
                                                    <Box key={`${mess.senderId}-${mess.recipientId}-${index}`} sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                    }}>
                                                        {shouldDisplayDateHeader && (
                                                            <Typography sx={{ textAlign: 'center', mb: 1, color: theme.palette.info.main, fontSize: "0.8rem", }}>
                                                                {messageDate}
                                                            </Typography>
                                                        )}
                                                        <Box sx={{
                                                            display: 'flex',
                                                            justifyContent: mess.courierId === courierId ? 'flex-end' : 'flex-start',
                                                            textAlign: mess.courierId === courierId ? 'right' : 'left',
                                                        }}>
                                                            <Box sx={{
                                                                color: "white",
                                                                maxWidth: "60%",
                                                                p: 1,
                                                                borderRadius: "16px",
                                                                background: mess.courierId === courierId ? theme.palette.primary.main : theme.palette.background.lighter,
                                                            }}>
                                                                <Typography sx={{

                                                                }}>
                                                                    {mess.content}
                                                                </Typography>
                                                                <Typography sx={{
                                                                    fontSize: "0.8rem", color: "lightgrey"
                                                                }}>
                                                                    {formatHour(mess.date)}
                                                                </Typography>
                                                            </Box>

                                                        </Box>
                                                    </Box>
                                                );
                                            })}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", mt: 1, px: 2, gap: 2 }}>
                                            <input
                                                style={{
                                                    flex: 1,
                                                    padding: "8px 16px",
                                                    borderRadius: "14px",
                                                    border: `0.1px solid ${theme.palette.lightColor.main}`,
                                                    marginRight: 1,
                                                    background: theme.palette.background.lighter,
                                                    outline: "none",
                                                    color: theme.palette.info.main,
                                                }}
                                                type="text"
                                                placeholder="Send message..."
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && message !== '') {
                                                        e.preventDefault();
                                                        sendMessageInternal();
                                                    }
                                                }}
                                                value={message} onChange={(e) => setMessage(e.target.value)} />
                                            <SendIcon
                                                sx={{ color: theme.palette.primary.main, cursor: "pointer", "&:hover": { color: theme.palette.lightColor.main } }}
                                                onClick={() => {
                                                    sendMessageInternal();
                                                }} />
                                        </Box>
                                    </>
                                ) : null}

                            </Box>
                        </Box>
                    </Box>
                </Container>
            </MainLayout>
        )
    );
};

export default ChatPage;