import React from "react";
import {CssTextField} from "@/components/atoms/form/light/CssTextField";
import {Controller} from "react-hook-form";
import {useTheme} from "@mui/material/styles";
import {useThemeToggle} from "../../../../../contexts/ThemeContext";

type FormTextFieldProps = {
    name: string;
    control: any;
    label: string;
    type: string;
    required?: boolean | undefined;
}

const FormTextField = ({name, control, label, type, required=true}:FormTextFieldProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <CssTextField
                    label={label}
                    fullWidth
                    required={required}
                    type={type}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    {...field}
                    sx={{ py: 1 }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        field.onChange(event);
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
                />
            )}
        />
    );
};

export default FormTextField;

