import React, {useEffect, useState} from "react";
import {Box, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {getOrderByIdApi, useWebSocket} from "components";
import ChatContainerDetails from "@/components/moleculas/chat/ChatContainerDetails";
import {useThemeToggle} from "ui";

type ChatContainerProps = {
    id: number;
    orderId: number | null;
    messages: any[];
    setMessages: (value: (prevMessages: any) => any[]) => void;
    buyerId: number | null;
    courierId: number | null;
    sellerId: number | null;
};

const ChatContainer = ({
                           id, orderId, messages, setMessages,
                           buyerId, courierId, sellerId
                       }: ChatContainerProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const [orderNumber, setOrderNumber] = useState<string>("");

    const {sendMessageToGroupChat} = useWebSocket();

    const sendMessageToGroupChatInternal = (message: any, setMessage: (value: string) => void) => {
        const chatMessage = sendMessageToGroupChat(message, buyerId!, courierId!, sellerId!, orderId!);
        setMessages(prevMessages => [...prevMessages, chatMessage]);
        setMessage("");
    };

    const getOrderById = (id: number) => {
        getOrderByIdApi(id)
            .then((res) => {
                setOrderNumber(res.data.orderNumber);
            })
            .catch((err) => {
                console.error(err);
            })
    };

    useEffect(() => {
        if(orderId) {
            getOrderById(orderId);
        }
    }, [orderId]);

    return (
        <Box sx={{
            flex: isSm ? '1' : '1 1 75%',
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: isDark ? "#3e4554" : "#edf0fe"
        }}>
            {buyerId && sellerId && orderId ?
                <ChatContainerDetails
                    label={`Chat for Order #${orderNumber}`}
                    messages={messages}
                    id={id}
                    sendMessageFunction={sendMessageToGroupChatInternal}/>
                : null
            }
        </Box>

    );
};

export default ChatContainer;