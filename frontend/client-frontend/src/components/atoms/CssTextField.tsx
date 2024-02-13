import {styled} from "@mui/material/styles";
import MuiTextField from '@mui/material/TextField';
import useTheme from "@/theme/themes";

export const CssTextField = styled(
    MuiTextField,
)(() => {
    const theme = useTheme();

    return {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.background.lighter,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.background.lighter,
            },
        },
    };
});