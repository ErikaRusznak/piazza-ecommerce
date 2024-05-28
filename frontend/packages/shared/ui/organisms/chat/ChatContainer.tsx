
import {Box, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useWebSocket} from "components";
import {useThemeToggle} from "../../themes/ThemeContext";
import ChatContainerDetails from "../../moleculas/chat/ChatContainerDetails";

type ChatContainerProps = {
    recipientId: number | null;
    orderId: number | null;
    messages: any[];
    setMessages: (value: (prevMessages: any) => any[]) => void;
    id: number;
    buyerId: number | null;
    courierId: number | null;
    sellerId: number | null;
    userRole: string;
};

const ChatContainer = ({recipientId, orderId, messages, setMessages, id,
                           buyerId, courierId, sellerId, userRole}:ChatContainerProps) => {

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
                    userRole={userRole}
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
                            userRole={userRole}
                        />
                    ) : null)
            )}
        </Box>

    );
};

export default ChatContainer;