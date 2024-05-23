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
            '&.Mui-disabled': {
                '& fieldset': {
                    borderColor: theme.palette.lightColor.main,
                },
            },
        },
        '& .MuiInputBase-input': {
            color: theme.palette.info.main,
            '&.Mui-disabled': {
                color: theme.palette.info.main,
            },
        },
        '& .MuiInputLabel-root': {
            color: theme.palette.common.white,
        },
    };
});