import {styled} from "@mui/material/styles";
import MuiTextField from '@mui/material/TextField';
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "../../../../../contexts/ThemeContext";

export const CssTextFieldDarkBackground = styled(
    MuiTextField,
)(() => {
    const theme = useTheme();
    return {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.lightColor.main,

            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
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