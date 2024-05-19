import React from "react";
import {Controller} from "react-hook-form";
import useTheme from "@/theme/themes";
import {CssTextFieldDarkBackground} from "@/components/atoms/form/dark/CssTextFieldDarkBackground";

type FormTextFieldProps = {
    name: string;
    control: any;
    label: string;
    type: string;
    required?: boolean | undefined;
}

const FormTextFieldDarkBackground = ({name, control, label, type, required=true}:FormTextFieldProps) => {

    const theme = useTheme();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <CssTextFieldDarkBackground
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
                            color: theme.palette.info.main,
                        }
                    }}
                    InputLabelProps={{
                        style: {
                            color: theme.palette.info.main,
                        }
                    }}
                />
            )}
        />
    );
};

export default FormTextFieldDarkBackground;