"use client";

import {Box, Collapse} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "../../themes/ThemeContext";
import GroupTextChat from "../../atoms/chat/GroupTextChat";
import {MessageType} from "./PrivateChatMessageUser";

export type GroupChatType = {
    buyerEmail: string;
    buyerFirstName: string;
    buyerId: number;
    buyerLastName: string;
    courierEmail: string;
    courierFirstName: string;
    courierId: number;
    courierLastName: string;
    groupRoomCode: string;
    id: number;
    orderId: number;
    sellerEmail: string;
    sellerFirstName: string;
    sellerId: number;
    sellerLastName: string;
    orderNumber: string;
}
type GroupChatMessageUserProps = {
    showChats: boolean;
    chats: GroupChatType[] | undefined;
    handleOnClick: (chat: GroupChatType) => void;
    lastMessages: { [key: number]: MessageType };
    unreadGroupMessages: { [key: number]: boolean };
    isUserClient: boolean;
};

const GroupChatMessageUser = ({showChats, chats, handleOnClick, lastMessages, unreadGroupMessages, isUserClient}:GroupChatMessageUserProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    return (
        <Collapse in={showChats}>
            <Box sx={{display: "flex", flexDirection: "column",}}>
                {chats?.map((chat: any) => (
                    <Box
                        key={chat.id}
                        sx={{
                            color: theme.palette.info.main, p: 1, cursor: 'pointer',
                            "&:hover": {
                                backgroundColor: isDark ? 'rgba(0, 0, 0, 0.5)' : '#eee',
                            },
                        }}
                        onClick={() => handleOnClick(chat)}
                    >
                        <GroupTextChat
                            chat={chat}
                            lastMessage={lastMessages[chat.orderId]?.content}
                            isUnread={unreadGroupMessages[chat.orderId]}
                            isUserClient={isUserClient}
                        />
                    </Box>
                ))}
            </Box>
        </Collapse>
    );
};

export default GroupChatMessageUser;