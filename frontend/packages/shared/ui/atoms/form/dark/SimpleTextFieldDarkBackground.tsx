import {useTheme} from "@mui/material/styles";
import {CssTextFieldDarkBackground} from "./CssTextFieldDarkBackground";

type SimpleTextFieldDarkBackgroundProps = {
    value: string | Date;
    label: string;
}

const SimpleTextFieldDarkBackground = ({label, value}:SimpleTextFieldDarkBackgroundProps) => {

    const theme = useTheme();

    return (
        <CssTextFieldDarkBackground
            inputProps={{ readOnly: true }}
            label={label}
            value={value}
            fullWidth
            sx={{ py: 1 }}
            InputProps={{
                style: {
                    color: theme.palette.info.main,
                }
            }}
            InputLabelProps={{
                style: {
                    color: theme.palette.info.main,
                }
            }}
        />
    );
};

export default SimpleTextFieldDarkBackground;