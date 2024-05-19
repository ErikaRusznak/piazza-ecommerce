import React from "react";
import {CssTextField} from "@/components/atoms/form/light/CssTextField";
import {Controller} from "react-hook-form";
import useTheme from "@/theme/themes";

type DatePickerFieldProps = {
    name: string;
    control: any;
    label: string;
    type: string;
    required?: boolean | undefined;
};

const DatePickerField = ({name, control, label, type, required=true}:DatePickerFieldProps) => {

    const theme = useTheme();
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
                            color: theme.palette.info.contrastText,
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            color: theme.palette.info.contrastText,
                        }
                    }}
                />
            )}
        />
    );
};

export default DatePickerField;