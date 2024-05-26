import React, {useState} from "react";
import {Box, Typography, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useRouter} from "next/navigation";
import { getMessagesForGroupChatApi } from "components";
import ToggleChatsShow from "@/components/atoms/chat/ToggleChatsShow";
import GroupChatMessageUser from "@/components/moleculas/chat/GroupChatMessageUser";
import {useThemeToggle} from "ui";

type UserAndGroupChatsProps = {
    setBuyerId: (value: null | number) => void;
    setCourierId: (value: null | number) => void;
    setSellerId: (value: null | number) => void;
    setOrderId: (value: null | number) => void;
    setMessages: (value: any[]) => void;
    groupChats: any[];
};

const UserAndGroupChats = ({ setBuyerId, setCourierId, setSellerId, setOrderId, groupChats, setMessages }: UserAndGroupChatsProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();

    const [showGroupChats, setShowGroupChats] = useState(false);

    const toggleGroupChats = () => {
        setShowGroupChats((prev) => !prev);
    };

    const createQueryString = (name: string, value: string) => {
        const params = new URLSearchParams();
        params.set("private", "false");
        params.set(name, value);
        return params.toString();
    };

    const fetchChatHistoryForGroupChat = (buyerId: number, courierId: number, sellerId: number, orderId: number) => {
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

    const handleOnClickForGroupChats = (chat: any) => {
        fetchChatHistoryForGroupChat(chat.buyerId, chat.courierId, chat.sellerId, chat.orderId);
        router.push(`/chats?${createQueryString("orderId", chat.orderId)}`)
    };

    return (
        <Box
            sx={{
                flex: isSm ? '1' : '1 1 25%', py: 2,
                backgroundColor: isDark ? "#262e3f" : "#E4E8FE",
                boxShadow: isDark ? '-5px 5px 15px rgba(255,255,255, 0.1)' : '5px 5px 15px rgba(0, 0, 0, 0.1)',
            }}>
            <Typography
                color={theme.palette.info.main}
                sx={{ textTransform: 'uppercase', mb: 2, p: 1,
                    borderBottom: `1px solid #d2d9fd`,
                    fontWeight: theme.typography.fontWeightBold,}}
            >
                Chats
            </Typography>

            <ToggleChatsShow label={"Group chats"} toggle={toggleGroupChats} showChats={showGroupChats}/>
            <GroupChatMessageUser
                showChats={showGroupChats}
                chats={groupChats}
                handleOnClick={handleOnClickForGroupChats}
            />
        </Box>
    );

};

export default UserAndGroupChats;
