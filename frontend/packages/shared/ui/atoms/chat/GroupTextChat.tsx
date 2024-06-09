import GroupsIcon from "@mui/icons-material/Groups";
import {Box, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {GroupChatType} from "../../moleculas/chat/GroupChatMessageUser";
import {useTheme} from "@mui/material/styles";
import {getSellerByIdApi} from "producer-frontend/api/entities/SellerApi";
import {useThemeToggle} from "../../themes/ThemeContext";

type GroupTextChatProps = {
    chat: GroupChatType;
    lastMessage: string;
}
const GroupTextChat = ({chat, lastMessage}: GroupTextChatProps) => {
    const theme = useTheme();
    const [sellerAlias, setSellerAlias ] = useState();
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
    return (
        <Box
            sx={{display: "flex", alignItems: "center", gap: 1, width: "100%"}}>
            <GroupsIcon />
            <Box sx={{width: "100%"}}>
                <Typography sx={{
                    color: theme.palette.info.main,
                    fontWeight: "normal",
                }}>
                    #{chat.orderNumber}, {sellerAlias}
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
    );
};

export default GroupTextChat;