
import {Box, Collapse, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "../../themes/ThemeContext";
import {baseURL} from "components";
import CircleIcon from '@mui/icons-material/Circle';
import moment from "moment";

type ChatType = {
    id: number;
    email: string;
    firstName: string;
    imageName: string;
    lastName: string;
    password: string;
    telephone: string;
    userRole: string;
}

export type MessageType = {
    buyerId: number;
    content: string;
    courierId: number;
    date: Date | string;
    orderId: number;
    read: boolean;
    recipientId: number;
    sellerId: number;
    senderId: number;
    senderRole: null | string;
}
type PrivateChatMessageUserProps = {
    showChats: boolean;
    chats: ChatType[];
    handleOnClick: (value: number) => void;
    fontWeightForLastMessage: (recipientId: number) => string;
    lastMessages: { [key: number]: MessageType };
    isUserClient: boolean;
};

const PrivateChatMessageUser = ({
                                    isUserClient,
                                    showChats,
                                    chats,
                                    handleOnClick,
                                    fontWeightForLastMessage,
                                    lastMessages
                                }: PrivateChatMessageUserProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();

    return (
        <Collapse in={showChats}>
            <Box sx={{display: "flex", flexDirection: "column", p: 0}}>
                {chats?.map((user: any) => (
                    <Box
                        key={user.id}
                        sx={{
                            color: theme.palette.info.main, p: 1,
                            cursor: 'pointer',
                            '&:hover': {
                                backgroundColor: isDark ? 'rgba(0, 0, 0, 0.5)' : '#eee',
                            },
                        }}
                        onClick={() => handleOnClick(user.id)}
                    >
                        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
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
                                }}>
                                    {!isUserClient ? (
                                        user.imageName ? (
                                            <img src={`${baseURL}${user.imageName}`} alt={user.imageName}
                                                 style={{width: '2rem', height: '2rem', borderRadius: "20px",}}/>
                                        ) : (
                                            <Typography
                                                variant="body2">{user.firstName[0] + user.lastName[0]}</Typography>
                                        )
                                    ) : (
                                        user.imageName ? (
                                            <img src={`${baseURL}${user.imageName}`} alt={user.imageName}
                                                 style={{width: '2rem', height: '2rem', borderRadius: "20px",}}/>
                                        ) : (
                                            <Typography
                                                variant="body2">{typeof user.sellerAlias === 'string' && user.sellerAlias.substring(0, Math.min(user.sellerAlias.length, 2))}</Typography>
                                        )
                                    )}
                                </Box>
                                <Box sx={{width: "100%"}}>
                                    <Typography sx={{fontWeight: fontWeightForLastMessage(user.id),}}>
                                        {!isUserClient ? `${user.firstName} ${user.lastName}` : user.sellerAlias}
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: "13px",
                                        maxWidth: "200px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        color: isDark ? "lightgrey" : "grey",
                                        fontWeight: fontWeightForLastMessage(user.id),
                                    }}>
                                        {lastMessages[user.id]?.content && (
                                            <>
                                                {lastMessages[user.id].content}  {moment(lastMessages[user.id].date)?.format("HH:mm")}
                                            </>
                                        )}
                                    </Typography>

                                </Box>
                            </Box>
                            {!lastMessages[user.id]?.read && lastMessages[user.id]?.senderId === user.id && (
                                <CircleIcon sx={{
                                    width: "18px",
                                    height: "18px",
                                    color: theme.palette.primary.main,
                                    mr: 2,
                                }}/>
                            )}
                        </Box>

                    </Box>
                ))}
            </Box>
        </Collapse>
    );
};

export default PrivateChatMessageUser;