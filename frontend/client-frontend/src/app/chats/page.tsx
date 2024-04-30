"use client";

import React, {useEffect, useRef, useState} from "react";
import {
    getGroupChatsForBuyerApi, getMessagesForGroupChatApi,
    getMessagesForSenderAndRecipientApi,
    markMessagesAsReadApi
} from "../../../api/entities/ChatApi";
import {getAllUserSellersApi, getUserAccountByEmail} from "../../../api/entities/UserAccount";
import {Box, Collapse, Container, Typography, useMediaQuery} from "@mui/material";

import MainLayout from "@/components/templates/MainLayout";
import useTheme from "@/theme/themes";
import {KeyboardArrowDownIcon, KeyboardArrowRightIcon, SendIcon} from "@/components/atoms/icons";
import {useWebSocket} from "../../../contexts/WebSocketContext";
import {useRouter, useSearchParams} from "next/navigation";
import IconButton from "@mui/material/IconButton";

const ChatPage = () => {
    const theme = useTheme();
    const router = useRouter();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const searchParams = useSearchParams();
    const [id, setId] = useState<number>(0);
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState<string>("");
    const [lastMessages, setLastMessages] = useState<{ [key: number]: any }>({});

    const [recipientId, setRecipientId] = useState<number | null>(Number(searchParams.get("recipientId")) ?? null);
    const [connectedUsers, setConnectedUsers] = useState<any>();
    const [showConnectedUsers, setShowConnectedUsers] = useState(false);

    const [selectPrivateChat, setSelectPrivateChat] = useState<boolean>(false);

    const toggleConnectedUsers = () => {
        setShowConnectedUsers((prev) => !prev);
    };

    const [courierId, setCourierId] = useState<number | null>(null);
    const [buyerId, setBuyerId] = useState<number | null>(null);
    const [sellerId, setSellerId] = useState<number | null>(null);
    const [orderId, setOrderId] = useState<number | null>(null);

    const [groupChats, setGroupChats] = useState<any>();
    const [showGroupChats, setShowGroupChats] = useState(false);

    const toggleGroupChats = () => {
        setShowGroupChats((prev) => !prev);
    };

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams();
        params.set("private", "true");
        params.set(name, value);
        return params.toString();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', {month: 'long'});
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };

    const formatHour = (dateString: string) => {
        const date = new Date(dateString);
        const hour = date.getHours();
        const minute = date.getMinutes();
        return `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`
    };

    const {sendMessage, sendMessageToGroupChat, connectToWebSocket} = useWebSocket();

    const onMessageReceived = (message: any) => {
        if (recipientId && recipientId === message.senderId) {
            setMessages(prevMessages => [...prevMessages, {...message, date: new Date().toISOString()}]);
            return;
        }
        if (message.senderRole !== "CLIENT") {
            setMessages(prevMessages => [...prevMessages, {...message, date: new Date().toISOString()}]);
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

    useEffect(() => {
        connectedUsers?.forEach((user: any) => {
            fetchLastMessage(id, user.id);
        });
    }, [connectedUsers, messages]);


    useEffect(() => {
        if (recipientId && id) {
            fetchChatHistory(recipientId);
        }
    }, [recipientId, id]);


    const sendMessageInternal = () => {
        const chatMessage = sendMessage(message, id, recipientId!);
        console.log("chat message", chatMessage)
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

    const fetchLastMessage = (id: number, recipientId: number) => {
        getMessagesForSenderAndRecipientApi(id, recipientId)
            .then((res) => {
                if (res.data.length > 0) {
                    const lastMessage = res.data[res.data.length - 1];
                    setLastMessages(prevState => ({
                        ...prevState,
                        [recipientId]: lastMessage,

                    }));
                }
            })
            .catch((err) => console.error(err));
    };

    const markMessagesAsRead = (id: number, recipientId: number) => {
        markMessagesAsReadApi(id, recipientId)
            .then((res) => {
                return;
            })
            .catch((err) => console.log(err));
    }

    const fontWeightForLastMessage = (recipientId: number) => {
        if (!lastMessages[recipientId] || lastMessages[recipientId].read || lastMessages[recipientId].senderId === id) {
            return "normal";
        } else {
            return "bold";
        }
    };

    const getAllGroupChats = (email: string) => {
        getGroupChatsForBuyerApi(email)
            .then((res) => {
                setGroupChats(res.data);
            })
            .catch((err) => console.log(err))
    };

    const sendMessageToGroupChatInternal = () => {
        const chatMessage = sendMessageToGroupChat(message, buyerId!, courierId!, sellerId!, orderId!);
        console.log("chat message", chatMessage)
        console.log("buyerid,", buyerId)
        setMessages(prevMessages => [...prevMessages, chatMessage]);
        setMessage("");
    };

    const fetchChatHistoryForGroupChat = async (buyerId: number, courierId: number, sellerId: number, orderId: number) => {
        setRecipientId(null);
        console.log("cccc", courierId)
        setBuyerId(buyerId);
        setCourierId(courierId);
        setSellerId(sellerId);
        setOrderId(orderId);
        await getMessagesForGroupChatApi(buyerId, courierId, sellerId, orderId)
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
                            <Box
                                sx={{
                                    flex: isSm ? '1' : '1 1 25%',
                                    py: 2,
                                    // boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
                                    boxShadow: '-5px 5px 15px rgba(255,255,255, 0.1)',
                                }}>
                                <Typography
                                    color={theme.palette.info.main}
                                    sx={{
                                        textTransform: 'uppercase',
                                        mb: 2,
                                        p: 1,
                                        borderBottom: `1px solid ${theme.palette.lightColor.main}`
                                    }}
                                >
                                    Chats
                                </Typography>
                                <Typography>
                                    <IconButton
                                        sx={{
                                            color: theme.palette.info.main,
                                            "&:hover": {
                                                color: theme.palette.lightColor.main,
                                            }
                                        }}
                                        onClick={toggleConnectedUsers}
                                    >
                                        <Typography variant="body1" sx={{fontSize: "13px"}}>
                                            Chat Messages
                                        </Typography>
                                        {showConnectedUsers ? <KeyboardArrowDownIcon sx={{fontSize: "13px"}}/> :
                                            <KeyboardArrowRightIcon sx={{fontSize: "13px"}}/>}
                                    </IconButton>
                                </Typography>
                                <Collapse in={showConnectedUsers}>
                                    <Box sx={{display: "flex", flexDirection: "column", p: 0}}>
                                        {connectedUsers?.map((user: any) => (
                                            <Box
                                                key={user.id}
                                                sx={{
                                                    color: "white", p: 1,
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    },

                                                }}
                                                onClick={() => {
                                                    markMessagesAsRead(id, user.id);
                                                    setSelectPrivateChat(true);
                                                    setBuyerId(null);
                                                    setCourierId(null);
                                                    setSellerId(null);
                                                    setOrderId(null);
                                                    fetchChatHistory(user.id);
                                                    router.push(`/chats?${createQueryString("recipientId", user.id)}`)
                                                }}
                                            >
                                                <Box
                                                    sx={{display: "flex", alignItems: "center", gap: 1, width: "100%"}}>
                                                    <Box sx={{
                                                        width: "2rem",
                                                        height: "2rem",
                                                        textAlign: "center",
                                                        alignContent: "center",
                                                        color: theme.palette.info.main,
                                                        backgroundColor: fontWeightForLastMessage(user.id) === "bold" ? theme.palette.primary.main : theme.palette.lightColor.main,
                                                        borderRadius: "20px",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent: "center"
                                                    }}>
                                                        <Typography variant="body2">
                                                            {typeof user.sellerAlias === 'string' && user.sellerAlias.substring(0, Math.min(user.sellerAlias.length, 2))}
                                                        </Typography>

                                                    </Box>
                                                    <Box sx={{width: "100%"}}>
                                                        <Typography sx={{
                                                            fontWeight: fontWeightForLastMessage(user.id),
                                                        }}>{user.sellerAlias}</Typography>
                                                        <Typography sx={{
                                                            fontSize: "13px",
                                                            maxWidth: "200px",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                            color: "lightgrey",
                                                            fontWeight: fontWeightForLastMessage(user.id),
                                                        }}>
                                                            {lastMessages[user.id]?.content}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                            </Box>
                                        ))}
                                    </Box>
                                </Collapse>
                                <Typography>
                                    <IconButton
                                        sx={{
                                            color: theme.palette.info.main,
                                            "&:hover": {
                                                color: theme.palette.lightColor.main,
                                            }
                                        }}
                                        onClick={toggleGroupChats}
                                    >
                                        <Typography variant="body1" sx={{fontSize: "13px"}}>
                                            Group chats
                                        </Typography>
                                        {showGroupChats ? <KeyboardArrowDownIcon sx={{fontSize: "13px"}}/> :
                                            <KeyboardArrowRightIcon sx={{fontSize: "13px"}}/>}
                                    </IconButton>
                                </Typography>
                                <Collapse in={showGroupChats}>
                                    <Box sx={{display: "flex", flexDirection: "column",}}>
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
                                                    fetchChatHistoryForGroupChat(chat.buyerId, chat.courierId, chat.sellerId, chat.orderId);
                                                    router.push(`/chats?${createQueryString("orderId", chat.orderId)}`)
                                                }}
                                            >
                                                <Box
                                                    sx={{display: "flex", alignItems: "center", gap: 1, width: "100%"}}>
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
                                </Collapse>
                            </Box>
                            <Box sx={{
                                flex: isSm ? '1' : '1 1 75%',
                                py: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                {selectPrivateChat && recipientId ? (
                                    <>
                                        <Typography color={theme.palette.info.main} sx={{
                                            textTransform: 'uppercase',
                                            mb: 2,
                                            px: 1,
                                            py: 1,
                                            borderBottom: `1px solid ${theme.palette.lightColor.main}`
                                        }}>
                                            Chat with user
                                        </Typography>
                                        <Box sx={{
                                            flex: 1,
                                            p: 2,
                                            overflowY: 'auto',
                                            display: 'flex',
                                            flexDirection: 'column-reverse',
                                            gap: 1
                                        }}>
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
                                                            <Typography sx={{
                                                                textAlign: 'center',
                                                                mb: 1,
                                                                color: theme.palette.info.main,
                                                                fontSize: "0.8rem",
                                                            }}>
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
                                                                <Typography sx={{}}>
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
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            mt: 1,
                                            px: 2,
                                            gap: 2
                                        }}>
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
                                                value={message} onChange={(e) => setMessage(e.target.value)}/>
                                            <SendIcon
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                    cursor: "pointer",
                                                    "&:hover": {color: theme.palette.lightColor.main}
                                                }}
                                                onClick={() => {
                                                    sendMessageInternal();
                                                }}/>
                                        </Box>
                                    </>
                                ) : (
                                    (orderId ?
                                        (<>
                                                <Typography color={theme.palette.info.main} sx={{
                                                    textTransform: 'uppercase',
                                                    mb: 2,
                                                    px: 1,
                                                    py: 1,
                                                    borderBottom: `1px solid ${theme.palette.lightColor.main}`
                                                }}>
                                                    Chat with user
                                                </Typography>
                                                <Box sx={{
                                                    flex: 1,
                                                    p: 2,
                                                    overflowY: 'auto',
                                                    display: 'flex',
                                                    flexDirection: 'column-reverse',
                                                    gap: 1
                                                }}>
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
                                                            <Box key={`${mess.senderId}-${mess.recipientId}-${index}`}
                                                                 sx={{
                                                                     display: 'flex',
                                                                     flexDirection: 'column',
                                                                 }}>
                                                                {shouldDisplayDateHeader && (
                                                                    <Typography sx={{
                                                                        textAlign: 'center',
                                                                        mb: 1,
                                                                        color: theme.palette.info.main,
                                                                        fontSize: "0.8rem",
                                                                    }}>
                                                                        {messageDate}
                                                                    </Typography>
                                                                )}
                                                                <Box sx={{
                                                                    display: 'flex',
                                                                    justifyContent: mess.senderRole === "CLIENT" ? 'flex-end' : 'flex-start',
                                                                    textAlign: mess.senderRole === "CLIENT" ? 'right' : 'left',
                                                                }}>
                                                                    <Box sx={{
                                                                        color: "white",
                                                                        maxWidth: "60%",
                                                                        p: 1,
                                                                        borderRadius: "16px",
                                                                        background: mess.senderRole === "CLIENT" ? theme.palette.primary.main : theme.palette.background.lighter,
                                                                    }}>
                                                                        <Typography sx={{}}>
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
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: "center",
                                                    mt: 1,
                                                    px: 2,
                                                    gap: 2
                                                }}>
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
                                                                sendMessageToGroupChatInternal();
                                                            }
                                                        }}
                                                        value={message} onChange={(e) => setMessage(e.target.value)}/>
                                                    <SendIcon
                                                        sx={{
                                                            color: theme.palette.primary.main,
                                                            cursor: "pointer",
                                                            "&:hover": {color: theme.palette.lightColor.main}
                                                        }}
                                                        onClick={() => {
                                                            sendMessageToGroupChatInternal();
                                                        }}/>
                                                </Box>
                                            </>
                                        ) : null)
                                )
                                }

                            </Box>
                        </Box>
                    </Box>
                </Container>
            </MainLayout>
        )
    );
};

export default ChatPage;