import React from "react";
import {Box, Collapse, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "../../../../contexts/ThemeContext";

type GroupChatMessageUserProps = {
    showChats: boolean;
    chats: any[];
    handleOnClick: (chat: any) => void;
};

const GroupChatMessageUser = ({showChats, chats, handleOnClick}:GroupChatMessageUserProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();

    return (
        <Collapse in={showChats}>
            <Box sx={{display: "flex", flexDirection: "column",}}>
                {chats?.map((chat: any) => (
                    <Box
                        key={chat.id}
                        sx={{
                            color: theme.palette.info.main,
                            p: 1,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: isDark ? 'rgba(0, 0, 0, 0.5)' : '#eee',
                            },
                        }}
                        onClick={() => handleOnClick(chat)}
                    >
                        <Box
                            sx={{display: "flex", alignItems: "center", gap: 1, width: "100%"}}>
                            <Box sx={{
                                width: "2rem",
                                height: "2rem",
                                textAlign: "center",
                                alignContent: "center",
                                color: theme.palette.info.main,
                                borderRadius: "20px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}>
                                <Typography variant="body2">
                                    {/*{typeof chat.c === 'string' && user.sellerAlias.substring(0, Math.min(user.sellerAlias.length, 2))}*/}
                                    {chat.id}
                                </Typography>

                            </Box>
                            <Box sx={{width: "100%"}}>
                                <Typography sx={{
                                    color: theme.palette.info.main,
                                }}>{chat.buyerFirstName}, {chat.sellerFirstName}</Typography>
                                <Typography sx={{
                                    fontSize: "13px",
                                    maxWidth: "200px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    color: "lightgrey",
                                }}>
                                    Last message...
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                ))}
            </Box>
        </Collapse>
    );
};

export default GroupChatMessageUser;