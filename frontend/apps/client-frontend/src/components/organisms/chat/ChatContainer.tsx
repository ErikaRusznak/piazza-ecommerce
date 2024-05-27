import React from "react";
import {Box, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useWebSocket} from "components";
import {ChatContainerDetails} from "ui";
import {useThemeToggle} from "ui";

type ChatContainerProps = {
    recipientId: number | null;
    orderId: number | null;
    messages: any[];
    setMessages: (value: (prevMessages: any) => any[]) => void;
    id: number;
    buyerId: number | null;
    courierId: number | null;
    sellerId: number | null;
};

const ChatContainer = ({recipientId, orderId, messages, setMessages, id,
                       buyerId, courierId, sellerId}:ChatContainerProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const {sendMessage, sendMessageToGroupChat} = useWebSocket();

    const sendMessageInternal = (message: any, setMessage: (value: string) => void) => {
        const chatMessage = sendMessage(message, id, recipientId!);
        setMessages(prevMessages => [...prevMessages, chatMessage]);
        setMessage("");
    };

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
            {recipientId ? (
                <ChatContainerDetails
                    privateChat={true}
                    label={"Chat with user"}
                    id={id}
                    messages={messages}
                    sendMessageFunction={sendMessageInternal}
                    userRole={"CLIENT"}
                />
            ) : (
                (orderId ?
                    (
                        <ChatContainerDetails
                            privateChat={false}
                            label={"Chat with group"}
                            id={id}
                            messages={messages}
                            sendMessageFunction={sendMessageToGroupChatInternal}
                            userRole={"CLIENT"}
                        />
                    ) : null)
            )}
        </Box>

    );
};

export default ChatContainer;