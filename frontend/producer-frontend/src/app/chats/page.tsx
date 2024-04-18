"use client";

import React, {useEffect, useState} from "react";
import MainLayout from "@/components/templates/MainLayout";
import Typography from "@mui/material/Typography";
import useTheme from "@/theme/themes";
import {getAllUsersApi, getUserAccountByEmail} from "../../../api/entities/UserAccount";
import {getMessagesForSenderAndRecipientApi} from "../../../api/entities/ChatApi";
import {Box, Container, useMediaQuery} from "@mui/material";
import {SendIcon} from "@/components/atoms/icons";
import {useWebSocket} from "../../../contexts/WebSocketContext";
import {useRouter, useSearchParams} from "next/navigation";

const ChatPage = () => {

    const theme = useTheme();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [id, setId] = useState<number>(0);
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState<any>("");
    const [recipientId, setRecipientId] = useState<number |null>(Number(searchParams.get("recipientId")) ?? null);
    const [lastMessages, setLastMessages] = useState<{[key: number]: string}>({});

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

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams();
        params.set("private", "true");
        params.set(name, value);

        return params.toString();
    };

    const [connectedUsers, setConnectedUsers] = useState<any>();

    const {sendMessage, connectToWebSocket} = useWebSocket();

    const onMessageReceived = (message: string) => {
        console.log("in message received", message)
        // const message = JSON.parse(payload.body);
        // if (recipientId && recipientId === message.senderId) {
        //     setMessages(prevMessages => [...prevMessages, message]);
        // }
    };

    const getSellerByEmail = (username: string) => {
        console.log("email", username)
        getUserAccountByEmail(username)
            .then((res) => {
                setId(res.data.id);
                connectToWebSocket(res.data.id, onMessageReceived);
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
        if(recipientId && id) {
            fetchChatHistory(recipientId);
        }
    }, [recipientId, id]);


    useEffect(() => {
        connectedUsers?.forEach((user: any) => {
                fetchLastMessage(id, user.id);
        });
    }, [connectedUsers, messages]);


    const sendMessageInternal = () => {
        const chatMessage = sendMessage(message, id, recipientId!);
        setMessages(prevMessages => [...prevMessages, chatMessage]);
        setMessage("");
    };

    const fetchChatHistory = async (recipientId: number) => {
        setRecipientId(recipientId);
        await getMessagesForSenderAndRecipientApi(recipientId, id)
            .then((res) => {
                setMessages(res.data);
            })
            .catch((err) => console.error(err));
    };

    const fetchLastMessage = (id: number, recipientId: number) => {
        getMessagesForSenderAndRecipientApi(id, recipientId)
            .then((res) => {
                if (res.data.length > 0) {
                    const lastMessage = res.data[res.data.length - 1].content;
                    setLastMessages(prevState => ({
                        ...prevState,
                        [recipientId]: lastMessage,
                    }));
                }
            })
            .catch((err) => console.error(err));
    };

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
                            <Box
                                sx={{
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
                                                    <Typography variant="body2" sx={{textTransform: "uppercase"}}>
                                                        {typeof user.email === 'string' && user.email.substring(0, Math.min(user.email.length, 2))}
                                                    </Typography>

                                                </Box>
                                                <Box>
                                                    <Typography sx={{
                                                        fontWeight: "bold",
                                                    }}>{user.firstName + " " + user.lastName}</Typography>
                                                    <Typography sx={{
                                                        fontSize: "13px",
                                                        fontWeight: "10px",
                                                        maxWidth: "200px",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}>
                                                        {lastMessages[user.id]}
                                                    </Typography>
                                                </Box>
                                            </Box>
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
                                {recipientId ? (
                                    <>
                                        <Typography color={theme.palette.info.main} sx={{ textTransform: 'uppercase', mb: 2, px: 2.3, py:"10px" ,boxShadow: '0px 5px 100px rgba(255,255,255, 0.15)' }}>
                                            Chat with user
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
                                                            justifyContent: mess.senderId === id ? 'flex-end' : 'flex-start',
                                                            textAlign: mess.senderId === id ? 'right' : 'left',
                                                        }}>
                                                            <Box sx={{
                                                                color: "white",
                                                                maxWidth: "60%",
                                                                p: 1,
                                                                borderRadius: "16px",
                                                                background: mess.senderId === id ? theme.palette.primary.main : theme.palette.background.lighter,
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
                                                    if (e.key === 'Enter' && message !== '') {
                                                        e.preventDefault();
                                                        sendMessageInternal();
                                                    }
                                                }}
                                                value={message} onChange={(e) => setMessage(e.target.value)} />
                                            <SendIcon
                                                sx={{color: theme.palette.primary.main, cursor: "pointer", "&:hover": {
                                                        color: theme.palette.lightColor.main}}}
                                                onClick={sendMessageInternal}/>
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