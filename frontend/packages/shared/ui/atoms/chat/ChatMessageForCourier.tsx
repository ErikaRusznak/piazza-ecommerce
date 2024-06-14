
import {useTheme} from "@mui/material/styles";
import {Box, Typography} from "@mui/material";
import {formatHour} from "../../services/FormatHour";
import {useThemeToggle} from "../../themes/ThemeContext";

type ChatMessageProps = {
    mess: any;
};

const ChatMessageForCourier = ({ mess }:ChatMessageProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();
    const backgroundColorForOther = isDark ? theme.palette.background.lighter : "#94a2e2";

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
                background: mess.senderRole === "COURIER" ?  theme.palette.primary.main : backgroundColorForOther,
            }}>
                <Typography sx={{}}>
                    {mess.content}
                </Typography>
                <Typography sx={{
                    fontSize: "0.8rem", color: "lightgrey"
                }}>
                    {formatHour(mess.date)} • {mess.senderRole.charAt(0).toUpperCase() + mess.senderRole.slice(1).toLowerCase()}
                </Typography>
            </Box>

        </Box>
    );
};

export default ChatMessageForCourier;