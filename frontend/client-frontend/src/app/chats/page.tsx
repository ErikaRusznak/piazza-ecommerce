"use client";

import React, {useEffect, useState} from "react";
import {baseURL} from "../../../api/ApiClient";
import {getMessagesForSenderAndReceiverApi} from "../../../api/entities/ChatApi";
import {getAllUsersApi, getUserAccountByEmail} from "../../../api/entities/UserAccount";
import {Box, Container, Typography, useMediaQuery} from "@mui/material";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import MainLayout from "@/components/templates/MainLayout";
import useTheme from "@/theme/themes";

const ChatPage = () => {

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));


    const [id, setId] = useState<number>(0);
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState<any>("");
    const [receiverId, setReceiverId] = useState<number>();

    const [connectedUsers, setConnectedUsers] = useState<any>();

    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

    const getBuyerByEmail = (username: string) => {
        console.log("email", username)
        console.log("get buyeeremail")
        getUserAccountByEmail(username)
            .then((res) => {
                console.log("data", res.data);
                setId(res.data.id);
            })
            .catch((err) => console.log(err))
    };

    const getAllSellers = () => {
        console.log("here!!!")
        getAllUsersApi()
            .then((res) => {
                let connectedUsers = res.data;
                connectedUsers = connectedUsers.filter((user: any) => user.userRole !== "CLIENT");
                setConnectedUsers(connectedUsers);
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
        await getMessagesForSenderAndReceiverApi(id, receiverId)
            .then((res) => {
                setMessages(res.data);
            })
            .catch((err) => console.error(err));
    };
    const sendMessage = () => {
        console.log("clicked")
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

    console.log(connectedUsers)

    return (
        (connectedUsers && id) && (
            // <div>
            //
            //     <div>
            //         <h2>Connected users: </h2>
            //         <Box sx={{display: "flex", gap: 3, cursor: "pointer"}} >
            //             {connectedUsers?.map((user: any) => (
            //
            //                 <Box sx={{border: "1px solid black"}} key={user.id} onClick={() => fetchChatHistory(user.id)}>
            //                     <p>{user.id}</p>
            //                     <p>{user.email}</p>
            //                 </Box>
            //
            //
            //             ))}
            //         </Box>
            //     </div>
            //     {receiverId && (
            //         <Box>
            //             <h2>User chat</h2>
            //
            //             {messages?.map((mess, index) => (
            //                 <Box sx={{border: "1px solid blue"}} key={`${mess.senderId}-${mess.receiverId}-${index}`}>
            //                     <p>text sent by: {mess.senderId} to {mess.receiverId}</p>
            //                     <div> {mess.content}</div>
            //                 </Box>
            //
            //             ))}
            //             <input
            //                 type="text"
            //                 value={message}
            //                 onChange={(e) => setMessage(e.target.value)}
            //             />
            //             <button onClick={sendMessage}>Send</button>
            //         </Box>
            //     )}
            //
            // </div>
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
                                // boxShadow: '-5px 5px 15px rgba(0, 0, 0, 0.1)',

                                '& > *': {
                                    // borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                                    // boxShadow: '-5px 5px 15px rgba(255,255,255, 0.1)',
                                    padding: '10px 0',
                                },
                            }}>
                                <Typography color={theme.palette.info.main} sx={{ textTransform: 'uppercase', mb: 2, px: 2.3,   boxShadow: '0px 5px 100px rgba(255,255,255, 0.15)', }}>
                                    Chat with user
                                </Typography>
                                <Box sx={{p:2}}>
                                    {messages?.map((mess, index) => (
                                        <Box key={`${mess.senderId}-${mess.receiverId}-${index}`} >
                                            <Typography sx={{color: "white"}}>{`Text sent by: ${mess.senderId} to ${mess.receiverId}`}</Typography>
                                            <Typography sx={{color: "white"}}>{mess.content}</Typography>
                                        </Box>
                                    ))}
                                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                                    <button onClick={sendMessage}>Send</button>
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                </Container>
            </MainLayout>
        )
    );
};

export default ChatPage;