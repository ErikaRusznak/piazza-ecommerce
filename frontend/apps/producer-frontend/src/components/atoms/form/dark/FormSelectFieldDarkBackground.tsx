import React from "react";
import {Controller} from "react-hook-form";
import {CssTextFieldDarkBackground} from "@/components/atoms/form/dark/CssTextFieldDarkBackground";
import {useTheme} from "@mui/material/styles";

type FormSelectFieldDarkBackgroundProps = {
    name: string;
    control: any;
    label: string;
    required?: boolean | undefined;
    items: any[];
}
const FormSelectFieldDarkBackground = ({
                                           name,
                                           control,
                                           label,
                                           required = true,
                                           items
                                       }: FormSelectFieldDarkBackgroundProps) => {
    const theme = useTheme();
    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState}) => (
                <CssTextFieldDarkBackground
                    id="outlined-select-currency-native"
                    select
                    fullWidth
                    label={label}
                    required={required}
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
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
                    {/* todo - add another option to stop overlaping the label*/}
                    <option key={"null"} value={""}>
                        {""}
                    </option>
                    {items?.map((option, index) => (
                        <option key={index} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </CssTextFieldDarkBackground>
            )}
        />
    );
};

export default FormSelectFieldDarkBackground;