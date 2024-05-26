import React from "react";
import {Box, Typography} from "@mui/material";
import {formatDate} from "../../../../services/FormatHour";
import {useTheme} from "@mui/material/styles";
import ChatMessage from "@/components/atoms/chat/ChatMessage";
import ChatMessageInput from "@/components/atoms/chat/ChatMessageInput";

type ChatContainerDetailsProps = {
    label: string
    id: number;
    messages: any[];
    sendMessageFunction: (message: any, setMessage: (value: string) => void) => void;
    privateChat: boolean;
};

const ChatContainerDetails = ({label, id, messages, sendMessageFunction, privateChat}: ChatContainerDetailsProps) => {

    const theme = useTheme();

    const distinctSenderFromReceiverPrivateFunction = (mess: any, val: string | number) => {
        return mess.senderId === val;
    };
    const distinctSenderFromReceiverGroupFunction = (mess: any, val: string | number) => {
        return mess.senderRole === val;
    };
    const distinctSenderFromReceiver = (mess: any): boolean => {
        if(privateChat)
            return distinctSenderFromReceiverPrivateFunction(mess, id);
        return distinctSenderFromReceiverGroupFunction(mess, "SELLER");
    };

    return (
        <>
            <Typography color={theme.palette.info.main} sx={{
                textTransform: 'uppercase',
                mb: 2, px: 1, py: 1,
                borderBottom: `1px solid #d2d9fd`,
                fontWeight: theme.typography.fontWeightBold,
            }}>
                {label}
            </Typography>
            <Box sx={{
                flex: 1, p: 2,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                gap: 1
            }}>
                {messages.slice(0).reverse().map((mess, index, array) => {
                    const messageDate = formatDate(mess.date)
                    let shouldDisplayDateHeader = false;
                    if (index === array.length - 1) {
                        shouldDisplayDateHeader = true; // always display date for last message
                    } else {
                        const nextMessageDate = formatDate(array[index + 1].date);
                        shouldDisplayDateHeader = messageDate !== nextMessageDate;
                    }
                    return (
                        <Box key={`${index}`} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            {shouldDisplayDateHeader && (
                                <Typography sx={{
                                    textAlign: 'center', mb: 1,
                                    color: theme.palette.info.main,
                                    fontSize: "0.8rem",
                                }}>
                                    {messageDate}
                                </Typography>
                            )}
                            <ChatMessage
                                mess={mess}
                                distinctChatValue={distinctSenderFromReceiver(mess)}
                            />
                        </Box>
                    );
                })}
            </Box>
            <ChatMessageInput
                sendMessageFunction={sendMessageFunction}
            />
        </>
    );
};

export default ChatContainerDetails;