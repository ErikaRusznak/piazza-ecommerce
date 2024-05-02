import React from "react";
import {Box, useMediaQuery} from "@mui/material";
import useTheme from "@/theme/themes";
import {useWebSocket} from "../../../../contexts/WebSocketContext";
import ChatContainerDetails from "@/components/moleculas/chat/ChatContainerDetails";

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
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));

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
            flex: isXs ? '1' : '1 1 75%',
            py: 2,
            display: 'flex',
            flexDirection: 'column',
        }}>
            {recipientId ? (
                <ChatContainerDetails
                    privateChat={true}
                    label={"Chat with user"}
                    id={id}
                    messages={messages}
                    sendMessageFunction={sendMessageInternal}/>
            ) : (
                (orderId ?
                    (
                        <ChatContainerDetails
                            privateChat={false}
                            label={"Chat with group"}
                            id={id}
                            messages={messages}
                            sendMessageFunction={sendMessageToGroupChatInternal} />
                    ) : null)
            )}
        </Box>

    );
};

export default ChatContainer;