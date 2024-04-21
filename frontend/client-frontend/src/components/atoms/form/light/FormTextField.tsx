import React from "react";
import {Controller} from "react-hook-form";
import useTheme from "@/theme/themes";
import {CssTextField} from "@/components/atoms/CssTextField";

type FormTextFieldProps = {
    name: string;
    control: any;
    label: string;
    type: string;
    required?: boolean | undefined;
}

const FormTextField = ({name, control, label, type, required=true}:FormTextFieldProps) => {

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

export default FormTextField;

export const FormTextArea = ({name, control, label, type, required=true}:FormTextFieldProps) => {

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
                    rows={2}
                    multiline
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    {...field}
                    sx={{ my: 1, py: 1 }}
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