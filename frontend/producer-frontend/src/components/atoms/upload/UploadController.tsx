import { useState } from "react";
import {Box, Button, Typography} from "@mui/material";
import {UploadIcon} from "@/components/atoms/icons";
import useTheme from "@/theme/themes";

type FormUploadFieldDarkBackgroundProps = {
    onFileChange: (file: File) => void;
    fileName: string;
    setFileName: (newName: string) => void;
};

const UploadController = ({ onFileChange, fileName, setFileName }: FormUploadFieldDarkBackgroundProps) => {
    const theme = useTheme();

    const [displayedFileName, setDisplayedFileName] = useState<string>("");
    const handleButtonClick = () => {
        const fileInput = document.getElementById("file-input");
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setDisplayedFileName(file.name);
            onFileChange(file);
        }
    };

    const handleClear = () => {
        setDisplayedFileName("");
        setFileName("");
        const fileInput = document.getElementById("file-input") as HTMLInputElement;
        if (fileInput) {
            fileInput.value = "";
        }
    };

    return (
        <Box sx={{

        }}>
            <Button
                variant="contained"
                color="primary"
                sx={{width: "30%"}}
                startIcon={<UploadIcon />}
                onClick={handleButtonClick}
            >
                Upload File
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    style={{ visibility: "hidden" }}
                    onChange={handleFileChange}
                />
            </Button>
            {fileName && (
                <div className="flex flex-row gap-2 items-center">
                    <Typography color={theme.palette.info.main}>{displayedFileName}</Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleClear}
                    >
                        Clear
                    </Button>
                </div>
            )}
        </Box>
    );
};

export default UploadController;


