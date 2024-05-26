import React from "react";
import {Box, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useWebSocket} from "components";
import ChatContainerDetails from "@/components/moleculas/chat/ChatContainerDetails";
import {useThemeToggle} from "ui";

type ChatContainerProps = {
    orderId: number | null;
    messages: any[];
    setMessages: (value: (prevMessages: any) => any[]) => void;
    buyerId: number | null;
    courierId: number | null;
    sellerId: number | null;
};

const ChatContainer = ({
                           orderId, messages, setMessages,
                           buyerId, courierId, sellerId
                       }: ChatContainerProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const {sendMessageToGroupChat} = useWebSocket();

    const sendMessageToGroupChatInternal = (message: any, setMessage: (value: string) => void) => {
        const chatMessage = sendMessageToGroupChat(message, buyerId!, courierId!, sellerId!, orderId!);
        setMessages(prevMessages => [...prevMessages, chatMessage]);
        setMessage("");
    };

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
                    label={"Chat with group"}
                    messages={messages}
                    sendMessageFunction={sendMessageToGroupChatInternal}/>
                : null
            }
        </Box>

    );
};

export default ChatContainer;