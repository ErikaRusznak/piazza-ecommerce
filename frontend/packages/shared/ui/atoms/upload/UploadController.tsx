import {Box, Button, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {baseURL} from "components";
import UploadIcon from '@mui/icons-material/Upload';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {useThemeToggle} from "../../themes/ThemeContext";

type FormUploadFieldDarkBackgroundProps = {
    onFileChange: (file: File) => void;
    fileName: string | undefined;
    setFileName: (newName: string) => void;
};

const UploadController = ({onFileChange, fileName, setFileName}: FormUploadFieldDarkBackgroundProps) => {

    const theme = useTheme();
    const {isDark} = useThemeToggle();

    const handleButtonClick = () => {
        const fileInput = document.getElementById("file-input");
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setFileName(file.name);
            onFileChange(file);
        }
    };

    const handleClear = () => {
        setFileName("");
        const fileInput = document.getElementById("file-input") as HTMLInputElement;
        if (fileInput) {
            fileInput.value = "";
        }
    };

    const buttonLabelText = fileName ? "Uploaded image" : "Upload image";

    return (
        <Box sx={{
            width: "full", mt: 1,
        }}>
            <Button
                variant="outlined"
                disabled={fileName !== ""}
                sx={{
                    color: theme.palette.lightColor.main,
                    borderColor: theme.palette.lightColor.main,
                    padding: "8px 16px",
                    '&:hover': {
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                    },
                    '&:disabled': {
                        background: theme.palette.tertiary.main,
                        color: isDark ? theme.palette.info.main : theme.palette.info.contrastText,
                    },

                }}
                startIcon={!fileName ? <UploadIcon/> : null}
                onClick={handleButtonClick}
            >
                {buttonLabelText}
            </Button>
            <input
                id="file-input"
                type="file"
                accept="image/*"
                className="hidden"
                style={{display: "none"}} // Set display to none instead of hidden
                onChange={handleFileChange}
            />

            {fileName && (
                <Box sx={{display: "flex", gap: 2, alignItems: "center", mt: 1}}>
                    <img src={`${baseURL}${fileName}`} alt={fileName}
                         style={{width: '100%', height: 'auto', maxWidth: '100px'}}/>
                    <Box sx={{display: "flex", gap: 1}}>
                        <Typography
                            color={theme.palette.info.main}
                        >
                            {fileName}
                        </Typography>
                        <HighlightOffIcon
                            onClick={handleClear}
                            sx={{
                                color: theme.palette.info.main,
                                cursor: "pointer",
                                "&:hover": {
                                    color: theme.palette.lightColor.main
                                }
                            }}/>
                    </Box>
                </Box>

            )}
        </Box>
    );
};

export default UploadController;


