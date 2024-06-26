import GroupsIcon from "@mui/icons-material/Groups";
import {Box, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {GroupChatType} from "../../moleculas/chat/GroupChatMessageUser";
import {useTheme} from "@mui/material/styles";
import {getSellerByIdApi} from "components";
import {useThemeToggle} from "../../themes/ThemeContext";
import CircleIcon from "@mui/icons-material/Circle";

type GroupTextChatProps = {
    chat: GroupChatType;
    lastMessage: string;
    isUnread: boolean;
    isUserClient: boolean;
}
const GroupTextChat = ({chat, lastMessage, isUnread, isUserClient}: GroupTextChatProps) => {
    const theme = useTheme();
    const [sellerAlias, setSellerAlias] = useState();
    const {isDark} = useThemeToggle();

    const getSellerByEmail = () => {
        getSellerByIdApi(chat.sellerId)
            .then((res) => {
                setSellerAlias(res.data.alias);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    useEffect(() => {
        getSellerByEmail();
    }, []);

    const groupChatText = isUserClient ? `#${chat.orderNumber}, ${sellerAlias}` : `Order #${chat.orderNumber}`;

    return (
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Box sx={{display: "flex", alignItems: "center", gap: 1, width: "100%"}}>
                <GroupsIcon/>
                <Box sx={{width: "100%"}}>
                    <Typography sx={{
                        color: theme.palette.info.main,
                        fontWeight: isUnread ? "bold" : "normal",
                    }}>
                        {groupChatText}
                    </Typography>
                    <Typography sx={{
                        fontSize: "13px",
                        maxWidth: "200px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: isDark ? "lightgrey" : "grey",
                    }}>
                        {lastMessage}
                    </Typography>
                </Box>
            </Box>
            {isUnread && (
                <CircleIcon sx={{
                    width: "18px",
                    height: "18px",
                    color: theme.palette.primary.main,
                    mr: 2,
                }}/>
            )}
        </Box>
    );
};

export default GroupTextChat;