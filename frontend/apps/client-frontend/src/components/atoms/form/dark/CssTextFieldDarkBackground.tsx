import {styled} from "@mui/material/styles";
import MuiTextField from '@mui/material/TextField';
import useTheme from "@/theme/themes";

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
                color: 'white',
                '&::placeholder': { // Nested selector for placeholder text
                    color: 'white', // Set placeholder text color to white
                    opacity: 0.6,   // Optionally adjust opacity if needed
                },
            },
        },
    };
});