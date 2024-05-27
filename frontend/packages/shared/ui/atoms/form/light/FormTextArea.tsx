import {useTheme} from "@mui/material/styles";
import {Controller} from "react-hook-form";
import {useThemeToggle} from "ui";
import {CssTextField} from "./CssTextField";

type FormTextAreaProps = {
    name: string;
    control: any;
    label: string;
    type: string;
    required?: boolean | undefined;
}

export const FormTextArea = ({name, control, label, type, required=true}:FormTextAreaProps) => {

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

export default FormTextArea;
