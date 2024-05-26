import React from "react";
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {KeyboardArrowDownIcon, KeyboardArrowRightIcon} from "@/components/atoms/icons";
import {useTheme} from "@mui/material/styles";

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
                        color: theme.palette.lightColor.main,
                    }
                }}
                onClick={toggle}
            >
                <Typography variant="body1" sx={{fontSize: "13px", fontWeight: theme.typography.fontWeightRegular}}>
                    {label}
                </Typography>
                {showChats ? <KeyboardArrowDownIcon sx={{fontSize: "13px"}}/> :
                    <KeyboardArrowRightIcon sx={{fontSize: "13px"}}/>}
            </IconButton>
        </Typography>
    );
};

export default ToggleChatsShow;