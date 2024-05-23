import React from "react";
import useTheme from "@/theme/themes";
import {Box, Typography} from "@mui/material";
import {formatHour} from "../../../../services/FormatHour";

type ChatMessageProps = {
    mess: any;
};

const ChatMessage = ({ mess }:ChatMessageProps) => {

    const theme = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: mess.senderRole === "COURIER" ? "flex-end" : "flex-start",
            textAlign: mess.senderRole === "COURIER" ? "right" : "left",
        }}>
            <Box sx={{
                color: "white",
                maxWidth: "60%", p: 1,
                borderRadius: "16px",
                background: mess.senderRole === "COURIER" ? theme.palette.primary.main : "grey",
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