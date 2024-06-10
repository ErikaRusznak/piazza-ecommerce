import {Box, Typography} from "@mui/material";
import {ChatMessageInput, useThemeToggle} from "../../index";
import {useTheme} from "@mui/material/styles";
import {formatDate} from "../../services/FormatHour";
import React from "react";
import ChatMessageForCourier from "../../atoms/chat/ChatMessageForCourier";
import ChatMessage from "../../atoms/chat/ChatMessage";
import {useSearchParams} from "next/navigation";

type ChatMessForPrivate = {
    id: number;
    content: string;
    senderId: number;
    recipientId: number;
    date: string;
};

type ChatMessForGroup = {
    buyerId: number;
    content: string;
    courierId: number;
    date: string;
    orderId: number;
    sellerId: number;
    senderRole: string;
}

type ChatContainerDetailsWrapperProps = {
    isCourierUser?: boolean;
    label: string;
    messages: any;
    sendMessageFunction: (message: any, setMessage: (value: string) => void) => void;
    distinctSenderFromReceiver?: (mess: any) => boolean;
    id: number;
};
const isPrivateMessage = (message: any): message is ChatMessForPrivate => {
    return (message as ChatMessForPrivate).senderId !== undefined;
};

const isGroupMessage = (message: any): message is ChatMessForGroup => {
    return (message as ChatMessForGroup).senderRole !== undefined;
};


const ChatContainerDetailsWrapper = ({
                                         isCourierUser = false,
                                         label,
                                         messages,
                                         sendMessageFunction,
                                         distinctSenderFromReceiver,
                                         id
                                     }: ChatContainerDetailsWrapperProps) => {

    const theme = useTheme();
    const searchParams = useSearchParams();
    const recipientId = Number(searchParams.get("recipientId")) ?? null;
    const {isDark} = useThemeToggle();

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
                gap: 1,
                '::-webkit-scrollbar': {
                    width: '10px',
                },
                '::-webkit-scrollbar-track': {
                    background: isDark ? "#262e3f" : '#E4E8FE',
                    borderRadius: '5px',
                },
                '::-webkit-scrollbar-thumb': {
                    background: isDark ? theme.palette.background.lighter : theme.palette.lightColor.main,
                    borderRadius: '5px',
                },
                '::-webkit-scrollbar-thumb:hover': {
                    background: isDark ? theme.palette.background.lighter : theme.palette.primary.main,
                },
            }}>
                {messages.slice(0).reverse().map((mess: ChatMessForGroup | ChatMessForPrivate, index: number, array: string | any[]) => {
                    const messageDate = formatDate(mess.date)
                    let shouldDisplayDateHeader = false;
                    if (index === array.length - 1) {
                        shouldDisplayDateHeader = true; // always display date for last message
                    } else {
                        const nextMessageDate = formatDate(array[index + 1].date);
                        shouldDisplayDateHeader = messageDate !== nextMessageDate;
                    }
                    if ((isPrivateMessage(mess) && (id === mess.senderId || recipientId === mess.senderId)) || (isGroupMessage(mess))) {
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
                                {isCourierUser ? (
                                    <ChatMessageForCourier
                                        mess={mess}
                                    />
                                ) : (
                                    (distinctSenderFromReceiver) && (
                                        <ChatMessage
                                            mess={mess}
                                            distinctChatValue={distinctSenderFromReceiver(mess)}
                                        />
                                    )
                                )}
                            </Box>
                        );
                    }
                })}
            </Box>
            <ChatMessageInput
                sendMessageFunction={sendMessageFunction}
            />
        </>
    );
};

export default ChatContainerDetailsWrapper;

