import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {useTheme} from "@mui/material/styles";
import {baseTheme, darkTheme} from "../../themes/themes";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type ToggleChatsShowProps = {
    label: string;
    toggle: () => void;
    showChats: boolean;
};
const ToggleChatsShow = ({label, toggle, showChats}:ToggleChatsShowProps) => {

    const theme = useTheme();

    return (
        <Typography>
            <IconButton
                sx={{
                    color: theme.palette.info.main,
                    "&:hover": {
                        color: darkTheme.palette.lightColor.main,
                    }
                }}
                onClick={toggle}
            >
                <Typography variant="body1" sx={{fontSize: "13px", fontWeight: baseTheme.typography.fontWeightMedium}}>
                    {label}
                </Typography>
                {showChats ? <KeyboardArrowDownIcon sx={{fontSize: "13px"}}/> :
                    <KeyboardArrowRightIcon sx={{fontSize: "13px"}}/>}
            </IconButton>
        </Typography>
    );
};

export default ToggleChatsShow;