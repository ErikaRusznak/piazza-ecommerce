import React from "react";
import {Controller} from "react-hook-form";
import {CssTextFieldDarkBackground} from "@/components/atoms/form/dark/CssTextFieldDarkBackground";
import useTheme from "@/theme/themes";
import {TextField} from "@mui/material";

type FormSelectFieldDarkBackgroundProps = {
    name: string;
    control: any;
    label: string;
    type?: string;
    required?: boolean | undefined;
    items: any[];
}
const FormSelectFieldDarkBackground = ({
                                           name,
                                           control,
                                           label,
                                           type = "text",
                                           required = true,
                                           items
                                       }: FormSelectFieldDarkBackgroundProps) => {
    const theme = useTheme();
    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <CssTextFieldDarkBackground
                    id="outlined-select-currency-native"
                    select
                    fullWidth
                    label={label}
                    required={required}
                    {...field}
                    defaultValue={items[0].name}
                    SelectProps={{
                        native: true,

                    }}
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
                    sx={{
                        py: 1, mt: 1,
                        '.MuiSvgIcon-root ': {
                            fill: theme.palette.info.main,
                        }
                    }}
                >
                    {items?.map((option) => (
                        <option key={option.name} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </CssTextFieldDarkBackground>
            )}
        />
    );
};

export default FormSelectFieldDarkBackground;