"use client";

import {useEffect, useState} from "react";
import {Box, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import { getMessagesForSenderAndRecipientApi, markMessagesAsReadApi, getMessagesForGroupChatApi } from "components";
import {useThemeToggle} from "../../themes/ThemeContext";
import ToggleChatsShow from "../../atoms/chat/ToggleChatsShow";
import PrivateChatMessageUser from "../../moleculas/chat/PrivateChatMessageUser";
import GroupChatMessageUser, {GroupChatType} from "../../moleculas/chat/GroupChatMessageUser";

type UserAndGroupChatsProps = {
    id: number;
    setBuyerId: (value: null | number) => void;
    setCourierId: (value: null | number) => void;
    setSellerId: (value: null | number) => void;
    setOrderId: (value: null | number) => void;
    recipientId: number | null;
    setRecipientId: (value: null | number) => void;
    messages: any[];
    setMessages: (value: any[]) => void;
    connectedUsers: any[];
    groupChats: GroupChatType[];
    isUserClient?: boolean;
};

const UserAndGroupChats = ({ id, setBuyerId, setCourierId, setSellerId, setOrderId, recipientId, setRecipientId,
                               connectedUsers, groupChats,
                               messages, setMessages, isUserClient=true,
                           }: UserAndGroupChatsProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const router = useRouter();

    const [showGroupChats, setShowGroupChats] = useState(false);
    const [showConnectedUsers, setShowConnectedUsers] = useState(true);

    const [lastMessages, setLastMessages] = useState<{ [key: number]: any }>({});
    const [lastMessagesForGroup, setLastMessagesForGroup] = useState<{ [key: number]: any }>({});

    useEffect(() => {
        connectedUsers?.forEach((user: any) => {
            fetchLastMessage(id, user.id);
        });
        groupChats?.forEach((gc: any) => {
            console.log(gc.orderId);
            fetchLastMessageForGroup(gc.buyerId, gc.courierId, gc.sellerId, gc.orderId);
        });
    }, [connectedUsers, messages, groupChats]);


    useEffect(() => {
        if (recipientId && id) {
            fetchChatHistory(recipientId);
        }
    }, [recipientId, id]);

    const toggleConnectedUsers = () => {
        setShowConnectedUsers((prev) => !prev);
    };
    const toggleGroupChats = () => {
        setShowGroupChats((prev) => !prev);
    };

    const createQueryString = (name: string, value: string, isPrivate: string) => {
        const params = new URLSearchParams();
        params.set("private", isPrivate);
        params.set(name, value);
        return params.toString();
    };

    const fetchChatHistory = (recipientId: number) => {
        setRecipientId(recipientId);
        getMessagesForSenderAndRecipientApi(id, recipientId)
            .then((res) => {
                setMessages(res.data);
            })
            .catch((err) => console.error(err));
    };

    const fetchChatHistoryForGroupChat = (buyerId: number, courierId: number, sellerId: number, orderId: number) => {
        setRecipientId(null);
        setBuyerId(buyerId);
        setCourierId(courierId);
        setSellerId(sellerId);
        setOrderId(orderId);
        getMessagesForGroupChatApi(buyerId, courierId, sellerId, orderId)
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

    const fetchLastMessageForGroup = (buyerId: number, courierId: number, sellerId: number, orderId: number) => {
        getMessagesForGroupChatApi(buyerId, courierId, sellerId, orderId)
            .then((res) => {
                if(res.data.length > 0) {
                    const lastMessageForGroup = res.data[res.data.length - 1];
                    setLastMessagesForGroup(prevState => ({
                        ...prevState,
                        [orderId]: lastMessageForGroup,
                    }))
                }
            })
    }

    const fontWeightForLastMessage = (recipientId: number) => {
        if (!lastMessages[recipientId] || lastMessages[recipientId].read || lastMessages[recipientId].senderId === id) {
            return "normal";
        } else {
            return "bold";
        }
    };

    const markMessagesAsRead = (id: number, recipientId: number) => {
        markMessagesAsReadApi(id, recipientId)
            .then((res) => {
                return;
            })
            .catch((err) => console.error(err));
    };

    const handleOnClickForPrivateChats = (userId: number) => {
        markMessagesAsRead(id, userId);
        setBuyerId(null);
        setCourierId(null);
        setSellerId(null);
        setOrderId(null);
        fetchChatHistory(userId);
        router.push(`/chats?${createQueryString("recipientId", String(userId), "true")}`)
    };

    const handleOnClickForGroupChats = (chat: any) => {
        setRecipientId(null);
        fetchChatHistoryForGroupChat(chat.buyerId, chat.courierId, chat.sellerId, chat.orderId);
        router.push(`/chats?${createQueryString("orderId", chat.orderId, "false")}`)
    };

    return (
        <Box
            sx={{
                flex: isXs ? '1' : '1 1 25%', py: 2,
                backgroundColor: isDark ? "#262e3f" : "#E4E8FE",
                boxShadow: isDark ? '-5px 5px 15px rgba(255,255,255, 0.1)' : '5px 5px 15px rgba(0, 0, 0, 0.1)',
            }}>
            <Typography
                color={theme.palette.info.main}
                sx={{
                    textTransform: 'uppercase', mb: 2, p: 1,
                    borderBottom: `1px solid #d2d9fd`,
                    fontWeight: theme.typography.fontWeightBold,
                }}
            >
                Chats
            </Typography>

            <ToggleChatsShow label={"Chat messages"} toggle={toggleConnectedUsers} showChats={showConnectedUsers}/>
            <PrivateChatMessageUser
                showChats={showConnectedUsers}
                chats={connectedUsers}
                handleOnClick={handleOnClickForPrivateChats}
                fontWeightForLastMessage={fontWeightForLastMessage}
                lastMessages={lastMessages}
                isUserClient={isUserClient}
            />

            <ToggleChatsShow label={"Group chats"} toggle={toggleGroupChats} showChats={showGroupChats}/>
            <GroupChatMessageUser
                showChats={showGroupChats}
                chats={groupChats}
                handleOnClick={handleOnClickForGroupChats}
                lastMessages={lastMessagesForGroup}
            />
        </Box>
    );

};

export default UserAndGroupChats;
