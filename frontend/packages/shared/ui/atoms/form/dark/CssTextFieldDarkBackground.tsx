"use client";

import {styled} from "@mui/material/styles";
import MuiTextField from '@mui/material/TextField';
import {useTheme} from "@mui/material/styles";

export const CssTextFieldDarkBackground = styled(
    MuiTextField,
)(() => {
    const theme = useTheme();

    return {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: "#a5b4fc",
            },
            '&:hover fieldset': {
                borderColor: "#6366f1",
            },
            '&.Mui-focused fieldset': {
                borderColor: "#6366f1",
            },
            '&.Mui-disabled': {
                '& fieldset': {
                    borderColor: "#a5b4fc",
                },
            },
            '& input': {
                color: theme.palette.info.main,
                '&::placeholder': {
                    color: theme.palette.info.main,
                    opacity: 0.6,
                },
            },
        },
    };
});