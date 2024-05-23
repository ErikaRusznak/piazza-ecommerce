import React, {useState} from "react";
import {SendIcon} from "@/components/atoms/icons";
import {Box} from "@mui/material";
import useTheme from "@/theme/themes";

type ChatMessageInputProps = {
    sendMessageFunction: (message: any, setMessage: (value: string) => void) => void;
};

const ChatMessageInput = ({sendMessageFunction}:ChatMessageInputProps) => {

    const theme = useTheme();
    const [message, setMessage] = useState<string>("");

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: "center",
            mt: 1, px: 2, gap: 2
        }}>
            <input
                style={{
                    flex: 1,
                    padding: "8px 16px",
                    borderRadius: "14px",
                    border: `0.1px solid ${theme.palette.lightColor.main}`,
                    marginRight: 1,
                    background: "grey",
                    outline: "none",
                    color: "white",
                }}
                type="text"
                placeholder="Send message..."
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && message !== '') {
                        e.preventDefault();
                        sendMessageFunction(message, setMessage);
                    }
                }}
                value={message} onChange={(e) => setMessage(e.target.value)}/>
            <SendIcon
                sx={{
                    color: theme.palette.primary.main,
                    cursor: "pointer",
                    "&:hover": {color: theme.palette.lightColor.main}
                }}
                onClick={() => {
                    sendMessageFunction(message, setMessage);
                }}/>
        </Box>
    );
};

export default ChatMessageInput;