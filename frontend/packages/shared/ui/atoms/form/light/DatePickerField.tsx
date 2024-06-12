"use client";
import {Controller} from "react-hook-form";
import {useTheme} from "@mui/material/styles";
import {CssTextField} from "./CssTextField";
import {useThemeToggle} from "../../../themes/ThemeContext";

type DatePickerFieldProps = {
    name: string;
    control: any;
    label: string;
    type: string;
    required?: boolean | undefined;
};

const DatePickerField = ({name, control, label, type, required=true}:DatePickerFieldProps) => {

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

export default DatePickerField;