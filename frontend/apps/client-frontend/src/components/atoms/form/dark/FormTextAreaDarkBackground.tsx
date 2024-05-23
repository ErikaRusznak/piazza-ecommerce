import React from "react";
import useTheme from "@/theme/themes";
import {Controller} from "react-hook-form";
import {CssTextFieldDarkBackground} from "@/components/atoms/form/dark/CssTextFieldDarkBackground";

type FormTextAreaDarkBackgroundProps = {
    name: string;
    control: any;
    label: string;
    type: string;
    required?: boolean | undefined;
}

const FormTextAreaDarkBackground = ({name, control, label, type, required=true}:FormTextAreaDarkBackgroundProps) => {

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

export default FormTextAreaDarkBackground;
