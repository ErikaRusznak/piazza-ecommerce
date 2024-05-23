import React from "react";
import {Box, Button, Typography} from "@mui/material";
import {HighlightOffIcon, UploadIcon} from "@/components/atoms/icons";
import useTheme from "@/theme/themes";
import {baseURL} from "../../../../api/ApiClient";
import {useProfilePicture} from "../../../../contexts/ProfilePictureContext";

type FormUploadFieldDarkBackgroundProps = {
    onFileChange: (file: File) => void;
    fileName: string;
    setFileName: (newName: string) => void;
};

const UploadController = ({onFileChange, fileName, setFileName}: FormUploadFieldDarkBackgroundProps) => {

    const theme = useTheme();
    const {setProfilePictureUrl} = useProfilePicture();

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
            setProfilePictureUrl("/images/" + file.name);
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
                    color: theme.palette.background.lighter,
                    borderColor: theme.palette.background.lighter,
                    padding: "8px 16px",
                    '&:hover': {
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.primary.main,
                    },
                    '&:disabled': {
                        background: theme.palette.tertiary.main,
                        color: theme.palette.info.main,
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


