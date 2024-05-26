import React from "react";
import {useTheme} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import {formatHour} from "../../../../services/FormatHour";
import {useThemeToggle} from "ui";

type ChatMessageProps = {
    mess: any;
    distinctChatValue: boolean;
};

const ChatMessage = ({ mess, distinctChatValue}:ChatMessageProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();

    const backgroundColorForOther = isDark ? theme.palette.background.lighter : theme.palette.lightColor.main;

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: distinctChatValue ? "flex-end" : "flex-start",
            textAlign: distinctChatValue ? "right" : "left",
        }}>
            <Box sx={{
                color: "white",
                maxWidth: "60%", p: 1,
                borderRadius: "16px",
                background: distinctChatValue ? theme.palette.primary.main : backgroundColorForOther,
            }}>
                <Typography sx={{}}>
                    {mess.content}
                </Typography>
                <Typography sx={{
                    fontSize: "0.8rem", color: "lightgrey"
                }}>
                    {formatHour(mess.date)}
                </Typography>
            </Box>

        </Box>
    );
};

export default ChatMessage;