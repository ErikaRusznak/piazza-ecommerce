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
import {Box, Container, useMediaQuery} from "@mui/material";
import {SendIcon} from "@/components/atoms/icons";

const ChatPage = () => {

    const theme = useTheme();
    const [id, setId] = useState<number>(0);
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

    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        (connectedUsers && id) && (
            <MainLayout>
                <Container>
                    <Box sx={{
                        // boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                        boxShadow: '-5px 5px 15px rgba(255,255,255, 0.5)',
                        borderRadius: '14px', overflow: 'hidden' }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: isXs ? 'column' : 'row',
                            height: '75vh',
                        }}>
                            <Box sx={{
                                flex: isXs ? '1' : '1 1 25%',
                                py: 2,
                                // boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
                                boxShadow: '-5px 5px 15px rgba(255,255,255, 0.1)',
                                '& > *': {
                                    // borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                                    boxShadow: '-5px 5px 15px rgba(255,255,255, 0.1)',
                                    padding: '10px 0',
                                },
                            }}>
                                <Typography color={theme.palette.info.main} sx={{ textTransform: 'uppercase', mb: 2, px:2, boxShadow: '0px 5px  15px rgba(255,255,255, 0.1)', }}>
                                    Connected users
                                </Typography>
                                <Box sx={{display: "flex", flexDirection: "column",}}>
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
                                            onClick={() => fetchChatHistory(user.id)}
                                        >
                                            <Typography>{user.id}</Typography>
                                            <Typography>{user.email}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                            <Box sx={{
                                flex: isXs ? '1' : '1 1 75%',
                                py: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                {receiverId && (
                                    <>
                                        <Typography color={theme.palette.info.main} sx={{ textTransform: 'uppercase', mb: 2, px: 2.3, py:"10px" ,boxShadow: '0px 5px 100px rgba(255,255,255, 0.15)' }}>
                                            Chat with user
                                        </Typography>
                                        <Box sx={{ flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse', gap: 1 }}>
                                            {messages.slice(0).reverse().map((mess, index) => ( // Reverse the array before mapping
                                                <Box key={`${mess.senderId}-${mess.receiverId}-${index}`}  sx={{
                                                    display: 'flex',
                                                    justifyContent: mess.senderId === id ? 'flex-end' : 'flex-start',
                                                    flexDirection: 'column',
                                                    textAlign: mess.senderId === id ? 'right' : 'left',
                                                    alignItems: mess.senderId === id ? 'flex-end' : 'flex-start',

                                                }}>
                                                    <Typography sx={{ color: "white", maxWidth: "60%",
                                                        p: 1, borderRadius: "16px",
                                                        background: mess.senderId === id ? theme.palette.primary.main : theme.palette.background.lighter,
                                                    }}>{mess.content}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", mt: 1, px:2, gap: 2 }}>
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
                                                        sendMessage();
                                                    }
                                                }}
                                                value={message} onChange={(e) => setMessage(e.target.value)} />
                                            <SendIcon
                                                sx={{color: theme.palette.primary.main, cursor: "pointer", "&:hover": {
                                                        color: theme.palette.lightColor.main}}}
                                                onClick={sendMessage}/>
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