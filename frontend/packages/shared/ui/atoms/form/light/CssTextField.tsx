"use client";
import {styled} from "@mui/material/styles";
import MuiTextField from '@mui/material/TextField';
import {useTheme} from "@mui/material/styles";

export const CssTextField = styled(
    MuiTextField,
)(() => {
    const theme = useTheme();

    return {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: "#1a2747",
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
            },
        },
    };
});