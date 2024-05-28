import {Box, Typography} from "@mui/material";
import {ChatMessageInput} from "../../index";
import {useTheme} from "@mui/material/styles";
import {formatDate} from "../../services/FormatHour";
import React from "react";
import ChatMessageForCourier from "../../atoms/chat/ChatMessageForCourier";
import ChatMessage from "../../atoms/chat/ChatMessage";

type ChatContainerDetailsWrapperProps = {
    isCourierUser?: boolean;
    label: string;
    messages: any;
    sendMessageFunction: (message: any, setMessage: (value: string) => void) => void;
    distinctSenderFromReceiver?: (mess: any) => boolean;
};

const ChatContainerDetailsWrapper = ({isCourierUser=false, label, messages, sendMessageFunction, distinctSenderFromReceiver}:ChatContainerDetailsWrapperProps) => {

    const theme = useTheme();
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
                {messages.slice(0).reverse().map((mess: { date: string; }, index: number, array: string | any[]) => {
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
                            {isCourierUser ? (
                                <ChatMessageForCourier
                                    mess={mess}
                                />
                            ) : (
                                distinctSenderFromReceiver && (
                                    <ChatMessage
                                        mess={mess}
                                        distinctChatValue={distinctSenderFromReceiver(mess)}
                                    />
                                )
                            )}
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

export default ChatContainerDetailsWrapper;

