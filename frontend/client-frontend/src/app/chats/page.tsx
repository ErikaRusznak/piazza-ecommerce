"use client";

import React, { useEffect, useState } from "react";
import { getMessagesForSenderAndRecipientApi } from "../../../api/entities/ChatApi";
import {getAllUsersApi, getAllUserSellersApi, getUserAccountByEmail} from "../../../api/entities/UserAccount";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";

import MainLayout from "@/components/templates/MainLayout";
import useTheme from "@/theme/themes";
import { SendIcon } from "@/components/atoms/icons";
import {useWebSocket} from "../../../contexts/WebSocketContext";
import {useRouter, useSearchParams} from "next/navigation";

const ChatPage = () => {
    const theme = useTheme();
    const router = useRouter();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams();
        params.set("private", "true");
        params.set(name, value);

        return params.toString();
    };
    const searchParams = useSearchParams();
    const [id, setId] = useState<number>(0);
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState<string>("");
    const [recipientId, setRecipientId] = useState<number |null>(Number(searchParams.get("recipientId")) ?? null);
    const [connectedUsers, setConnectedUsers] = useState<any>();

    const {sendMessage, connectToWebSocket} = useWebSocket();
    const onMessageReceived = (message: string) => {
        console.log("in message received", message)
        // const message = JSON.parse(payload.body);
        // if (recipientId && recipientId === message.senderId) {
        //     setMessages(prevMessages => [...prevMessages, message]);
        // }
    };

    const getBuyerByEmail = (username: string) => {
        getUserAccountByEmail(username)
            .then((res) => {
                setId(res.data.id);
                connectToWebSocket(res.data.id, onMessageReceived);
            })
            .catch((err) => console.log(err))
    };


    const getAllSellers = () => {
        getAllUserSellersApi()
        // getAllUsersApi()
            .then((res) => {
                setConnectedUsers(res.data);
            })
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        getAllSellers();
        let usernameFromStorage = sessionStorage.getItem("username");
        const usernameWithoutQuotes = usernameFromStorage?.replace(/^"(.*)"$/, '$1');
        if (usernameWithoutQuotes) {
            getBuyerByEmail(usernameWithoutQuotes);
        }
    }, []);

    useEffect(() => {
        if(recipientId && id) {
            fetchChatHistory(recipientId);
        }
    }, [recipientId, id]);


    const sendMessageInternal = () => {
        const chatMessage = sendMessage(message, id, recipientId!);
        setMessages(prevMessages => [...prevMessages, chatMessage]);
        setMessage("");
    };

    const fetchChatHistory = async (recipientId: number) => {
        setRecipientId(recipientId);
        await getMessagesForSenderAndRecipientApi(id, recipientId)
            .then((res) => {
                setMessages(res.data);
            })
            .catch((err) => console.error(err));
    };

    return (
        (connectedUsers && id) && (
            <MainLayout>
                <Container>
                    <Box sx={{
                        // boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                        boxShadow: '-5px 5px 15px rgba(255,255,255, 0.5)',
                        borderRadius: '14px', overflow: 'hidden'
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: isSm ? 'column' : 'row',
                            height: '75vh',
                        }}>
                            <Box sx={{
                                flex: isSm ? '1' : '1 1 25%',
                                py: 2,
                                // boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
                                boxShadow: '-5px 5px 15px rgba(255,255,255, 0.1)',
                                '& > *': {
                                    // borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                                    boxShadow: '-5px 5px 15px rgba(255,255,255, 0.1)',
                                    padding: '10px 0',
                                },
                            }}>
                                <Typography color={theme.palette.info.main} sx={{ textTransform: 'uppercase', mb: 2, px: 2, boxShadow: '0px 5px  15px rgba(255,255,255, 0.1)', }}>
                                    Connected users
                                </Typography>
                                <Box sx={{ display: "flex", flexDirection: "column", }}>
                                    {connectedUsers?.map((user: any) => (
                                        <Box
                                            key={user.id}
                                            sx={{
                                                color: "white",
                                                p: 1,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                },
                                            }}
                                            onClick={() => {
                                                fetchChatHistory(user.id);
                                                router.push(`/chats?${createQueryString("recipientId", user.id)}`)
                                            }}
                                        >
                                            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                                                <Box sx={{
                                                    width: "2rem",
                                                    height: "2rem",
                                                    textAlign: "center",
                                                    alignContent: "center",
                                                    color: theme.palette.info.main,
                                                    backgroundColor: theme.palette.lightColor.main,
                                                    borderRadius: "20px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                }}>
                                                    <Typography variant="body2">
                                                        {typeof user.sellerAlias === 'string' && user.sellerAlias.substring(0, Math.min(user.sellerAlias.length, 2))}
                                                    </Typography>

                                                </Box>
                                                <Box>
                                                    <Typography sx={{
                                                        fontWeight: "bold",
                                                    }}>{user.sellerAlias}</Typography>
                                                    <Typography sx={{
                                                        fontSize: "13px",
                                                        fontWeight: "10px",
                                                    }}>Last message ...</Typography>
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
                                {recipientId && (
                                    <>
                                        <Typography color={theme.palette.info.main} sx={{ textTransform: 'uppercase', mb: 2, px: 2.3, py: "10px", boxShadow: '0px 5px 100px rgba(255,255,255, 0.15)' }}>
                                            Chat with user
                                        </Typography>
                                        <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse', gap: 1 }}>
                                            {messages.slice(0).reverse().map((mess, index) => ( // Reverse the array before mapping

                                                <Box key={`${mess.senderId}-${mess.recipientId}-${index}`} sx={{
                                                    display: 'flex',
                                                    justifyContent: mess.senderId === id ? 'flex-end' : 'flex-start',
                                                    flexDirection: 'column',
                                                    textAlign: mess.senderId === id ? 'right' : 'left',
                                                    alignItems: mess.senderId === id ? 'flex-end' : 'flex-start',

                                                }}>
                                                    <Typography sx={{
                                                        color: "white", maxWidth: "60%",
                                                        p: 1, borderRadius: "16px",
                                                        background: mess.senderId === id ? theme.palette.primary.main : theme.palette.background.lighter,
                                                    }}>{mess.content}</Typography>
                                                </Box>
                                            ))}
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
                                                    if (e.key === 'Enter') {
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
                                )}

                            </Box>
                        </Box>
                    </Box>
                </Container>
            </MainLayout>
        )
    );
};

export default ChatPage;
