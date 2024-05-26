import React from "react";
import {useTheme} from "@mui/material/styles";
import {Controller} from "react-hook-form";
import {CssTextField} from "@/components/atoms/form/light/CssTextField";
import {useThemeToggle} from "ui";

type FormSelectFieldProps = {
    name: string;
    control: any;
    label: string;
    required?: boolean | undefined;
    items: any[];
}

const FormSelectField = ({
                             name,
                             control,
                             label,
                             required = true,
                             items
                         }: FormSelectFieldProps) => {
    const theme = useTheme();
    const {isDark} = useThemeToggle();
    return (
        <Controller
            name={name}
            control={control}
            render={({field, fieldState}) => (
                <CssTextField
                    id="outlined-select-currency-native"
                    select
                    fullWidth
                    label={label}
                    required={required}
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    SelectProps={{
                        native: true,

                    }}
                    InputProps={{
                        style: {
                            color: isDark ? theme.palette.info.contrastText : theme.palette.info.main,
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            color: isDark ? theme.palette.info.contrastText : theme.palette.info.main,
                        }
                    }}
                    sx={{
                        py: 1, mt: 1,
                        '.MuiSvgIcon-root ': {
                            fill: theme.palette.info.contrastText,
                        }
                    }}
                >
                    {/* todo - add another option to stop overlaping the label*/}
                    <option key={"null"} value={""}>
                        {""}
                    </option>
                    {items?.map((option, index) => (
                        <option key={`option.name-${index}`} value={option.name}>
                            {option.name}
                        </option>
                    ))}
                </CssTextField>
            )}
        />
    );
};

export default FormSelectField;