import React from "react";
import {CssTextFieldDarkBackground} from "@/components/atoms/form/dark/CssTextFieldDarkBackground";
import useTheme from "@/theme/themes";

type SimpleTextFieldDarkBackgroundProps = {
    value: string | Date;
    label: string;
};

const SimpleTextFieldDarkBackground = ({label, value}:SimpleTextFieldDarkBackgroundProps) => {

    const theme = useTheme();

    return (
        <CssTextFieldDarkBackground
            label={label}
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