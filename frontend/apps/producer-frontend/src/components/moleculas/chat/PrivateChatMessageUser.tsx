import React from "react";
import {Box, Collapse, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "ui";

type PrivateChatMessageUserProps = {
    showChats: boolean;
    chats: any[];
    handleOnClick: (value: number) => void;
    fontWeightForLastMessage: (recipientId: number) => string;
    lastMessages: { [key: number]: any; };
};

const PrivateChatMessageUser = ({showChats, chats, handleOnClick, fontWeightForLastMessage, lastMessages}: PrivateChatMessageUserProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();

    return (
        <Collapse in={showChats}>
        <Box sx={{display: "flex", flexDirection: "column", p: 0}}>
            {chats?.map((user: any) => (
                <Box
                    key={user.id}
                    sx={{
                        color: "white", p: 1,
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.5)' : '#eee',
                        },
                    }}
                    onClick={() => handleOnClick(user.id)}
                >
                    <Box
                        sx={{display: "flex", alignItems: "center", gap: 1, width: "100%"}}>
                        <Box sx={{
                            width: "2rem",
                            height: "2rem",
                            textAlign: "center",
                            alignContent: "center",
                            color: theme.palette.info.main,
                            backgroundColor: fontWeightForLastMessage(user.id) === "bold" ? theme.palette.primary.main : theme.palette.lightColor.main,
                            borderRadius: "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center"
                        }}>
                            <Typography variant="body2" sx={{textTransform: "uppercase"}}>
                                {typeof user.email === 'string' && user.email.substring(0, Math.min(user.email.length, 2))}
                            </Typography>

                        </Box>
                        <Box sx={{width: "100%"}}>
                            <Typography sx={{
                                fontWeight: fontWeightForLastMessage(user.id),
                                color: theme.palette.info.main
                            }}>
                                {user.firstName + " " + user.lastName}
                            </Typography>
                            <Typography sx={{
                                fontSize: "13px",
                                maxWidth: "200px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                color: "lightgrey",
                                fontWeight: fontWeightForLastMessage(user.id),
                            }}>
                                {lastMessages[user.id]?.content}
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            ))}
        </Box>
        </Collapse>
    );
};

export default PrivateChatMessageUser;